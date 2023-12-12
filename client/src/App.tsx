import { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client';

import { Prompt } from './components/Prompt'
import { Stats } from './components/Stats'
import { RoomControl } from './components/RoomControl';
import { UserLogin } from './components/UserLogin';

import './App.css';

export interface ServerToClientEvents {
  user_room_assigned: (data: { username: string, room_id: string }) => void;
  keystroke: (data: { username: string, wpm: number, accuracy: number }) => void;

}

export interface ClientToServerEvents {
  join: (data: { username: string, room_id: string }) => void;
  leave: (data: { room_id: string }) => void;
  keystroke: (data: { username: string, room_id: string, wpm: number, accuracy: number }) => void;
  custom_connect_event: (data: string) => void;
}


function App() {
  const SOCKETIO_HOST: string = 'http://127.0.0.1:5000';
  let displayText: string = 'A fierce dragon swooped over the kingdom of Eldoria. '

  const promptRef = useRef<HTMLDivElement>(null)
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

  const [isTypingActive, setIsTypingActive] = useState<boolean>(true)
  const [inputText, setInputText] = useState<string[]>([])
  const [cursor, setCursor] = useState<number>(0)
  const [errors, setErrors] = useState<number[]>([])
  const [wordCount, setWordCount] = useState<number>(0)
  const [timer, setTimer] = useState<number>(0)
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false)
  const [wpm, setWPM] = useState<number>(0)
  const [opponentWpm, setOpponentWPM] = useState<number>(0)
  const [accuracy, setAccuracy] = useState<number>(0)
  const [OpponentAccuracy, setOpponentAccuracy] = useState<number>(0)
  const [room, setRoom] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [isPromptFocus, setIsPromptFocus] = useState<boolean>(true)

  const usernameRef = useRef(username)

  useEffect(() => {
    usernameRef.current = username;
  }, [username]);

  function calculateStats(): void {
    calculateWPM()
    calculateAccuracy()
    emitKeystroke()
  }

  function calculateWPM(): number {
    if (timer > 0) {
      let currentInputText: string = inputText.join('')
      let currentWordCount: number = currentInputText.split(' ').length;
      setWordCount(currentWordCount)

      let currentWPM: number = (wordCount / (timer / 60))
      setWPM(currentWPM)
      return currentWPM
    }
    return 0;
  }

  function calculateAccuracy(): number {
    let totalCharacters: number = displayText.length;
    let currentAccuracy: number = ((totalCharacters - errors.length) / totalCharacters) * 100;
    setAccuracy(currentAccuracy)
    return currentAccuracy;
  }

  function emitKeystroke(): void {
    const currentWPM = calculateWPM()
    const currentAccuracy = calculateAccuracy()

    socketRef.current?.emit('keystroke', {
      'username': username,
      'room_id': room,
      'wpm': currentWPM,
      'accuracy': currentAccuracy
    })
  }

  function handleReset(e: KeyboardEvent): void {
    if (e.ctrlKey && e.key === ' ') {
      resetState()
    }
  }

  function resetState(): void {
    setCursor(0)
    setInputText([])
    setErrors([])
    setTimer(0)
    setWPM(0)
    setAccuracy(0)

    setIsTypingActive(true)
  }

  function onRegister(email: string, username: string, password: string): void {
    console.log(`email: ${email}, username: ${username}, password: ${password}`)
  }

  useEffect(() => {
    const checkFocus = () => {
      if (!document.activeElement?.contains(promptRef.current)) {
        setIsPromptFocus(false)
      } else {
        setIsPromptFocus(true)
      }
    }

    window.addEventListener('focus', checkFocus, true)
    window.addEventListener('blur', checkFocus, true)

    return () => {
      window.removeEventListener('focus', checkFocus, true)
      window.removeEventListener('blur', checkFocus, true)
    }
  }, [])

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKETIO_HOST);

      socketRef.current.on('connect', () => {
        console.log('client connect')
        socketRef.current?.emit('custom_connect_event', 'from client: user connected!')
      });

      socketRef.current.on('user_room_assigned', (data) => {

        setUsername(data.username)
        setRoom(data.room_id)
        console.log(`user: ${data.username} assigned room: ${data.room_id}, username: ${username}`)
      })

      socketRef.current.on('keystroke', (data) => {
        if (data.username !== usernameRef.current) {
          setOpponentWPM(data.wpm)
          setOpponentAccuracy(data.accuracy)
        } else if (data.username === username) {
        }
      })
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    }
  }, [])

  useEffect(() => {
    let interval: number;

    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + .1);
      }, 100)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isTimerActive])


  useEffect(() => {
    if (promptRef.current && isPromptFocus) {
      const nonCharKeys = ['Shift', 'Control', 'Alt', 'CapsLock', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

      const handleTextInput = (e: KeyboardEvent) => {
        setIsTimerActive(true)
        calculateAccuracy()

        let newInputText: string[] = inputText.slice()
        let newCursor: number = cursor;

        if (e.key === 'Backspace') {
          newInputText.pop()
          setInputText(newInputText)

          if (cursor === errors[errors.length - 1]) {
            let newErrors = errors.slice()
            newErrors.pop()
            setErrors(newErrors)
          }

          if (cursor > 0) {
            newCursor = newCursor - 1;
            setCursor(newCursor)
            console.log(`cursor: ${cursor}`)

          }

        } else if (!nonCharKeys.includes(e.key)) {

          if (e.key === ' ') {
            calculateStats()
          }

          newInputText.push(e.key)
          setInputText(newInputText)

          newCursor = newCursor + 1;
          setCursor(newCursor)
          if (e.key !== displayText[cursor]) {
            setErrors([...errors, cursor])
          }


        }

      }

      if (isTypingActive) {
        window.addEventListener('keydown', handleTextInput)
      }

      return () => {
        window.removeEventListener('keydown', handleTextInput)
      }

    }
  }, [isTypingActive, cursor, inputText, errors, isPromptFocus])

  useEffect(() => {
    if (cursor > displayText.length) {
      setIsTypingActive(false);
      setIsTimerActive(false);

      if (!isTypingActive) {
        window.addEventListener('keydown', handleReset)
      }

      return () => {
        window.removeEventListener('keydown', handleReset);
      };

    }
  }, [cursor, isTypingActive])

  useEffect(() => {
    const handleBeforeUnload = () => {
      socketRef.current?.emit('leave', { room_id: room })
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  return (
    <>
      <div
        className='right-aligned-container'>
        <UserLogin
          onLogin={() => { }}
          onRegister={onRegister}
        />
        <RoomControl
          username={username}
          currentRoomId={room}
          socketRef={socketRef}
          setRoom={setRoom}
          setUsername={setUsername} />
      </div>
      <Prompt
        displayText={displayText}
        promptRef={promptRef}
        cursor={cursor}
        errors={errors} />
      <Stats
        wpm={wpm}
        opponentWpm={opponentWpm}
        accuracy={accuracy}
        opponentAccuracy={OpponentAccuracy}
        isTypingActive={isTypingActive}
        resetFunction={resetState} />

    </>
  )
}

export default App
