import { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client';

import { Prompt } from './components/Prompt'
import { Stats } from './components/Stats'
import { RoomControl } from './components/RoomControl';

export interface ServerToClientEvents {
  room_assigned: (data: { room_id: string }) => void;
}

export interface ClientToServerEvents {
  join: (data: { room_id: string }) => void;
  keystroke: (data: { wpm: number, accuracy: number }) => void;
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
  const [accuracy, setAccuracy] = useState<number>(0)
  const [autoAssignedRoom, setAutoAssignedRoom] = useState<string>('')
  const [isPromptFocus, setIsPromptFocus] = useState<boolean>(true)

  function calculateWPM(): void {
    if (timer > 0) {
      let currentInputText: string = inputText.join('')
      let currentWordCount: number = currentInputText.split(' ').length;
      setWordCount(currentWordCount)

      let currentWPM: number = (wordCount / (timer / 60))
      console.log(currentWPM)
      setWPM(currentWPM)

      socketRef.current?.emit('keystroke', {
        wpm,
        accuracy
      })
    }
  }

  function calculateAccuracy(): void {
    let totalCharacters: number = displayText.length;
    let currentAccuracy: number = ((totalCharacters - errors.length) / totalCharacters) * 100;
    setAccuracy(currentAccuracy)
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

  function handleJoinRoom(roomId: string) {
    console.log('joining room', roomId);
  }

  useEffect(() => {
    const checkFocus = () => {
      console.log(document.activeElement)
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

      socketRef.current.on('room_assigned', (data) => {
        setAutoAssignedRoom(data.room_id)
        console.log(`auto assigned room: ${data.room_id}`)
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
        // console.table({ cursor, wordCount, timer, wpm, errors });
        console.log(e.key)
        let newInputText: string[] = inputText.slice()
        let newCursor: number = cursor;

        if (e.key === 'Backspace') {
          console.log(`cursor: ${cursor}`)

          newInputText.pop()
          setInputText(newInputText)

          if (cursor === errors[errors.length - 1]) {
            let newErrors = errors.slice()
            newErrors.pop()
            setErrors(newErrors)
            console.log(`errors: ${errors}`)

          }

          if (cursor > 0) {
            newCursor = newCursor - 1;
            setCursor(newCursor)
            console.log(`cursor: ${cursor}`)

          }

        } else if (!nonCharKeys.includes(e.key)) {
          console.log(`cursor: ${cursor}`)
          if (e.key === ' ') {
            calculateWPM()
            calculateAccuracy()
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

  return (
    <>
      <RoomControl
        currentRoomId={autoAssignedRoom}
        onJoinRoom={handleJoinRoom}
        socketRef={socketRef} />
      <Prompt
        displayText={displayText}
        promptRef={promptRef}
        cursor={cursor}
        errors={errors} />
      <Stats
        wordCount={wpm}
        accuracy={accuracy}
        isTypingActive={isTypingActive}
        resetFunction={resetState} />

    </>
  )
}

export default App
