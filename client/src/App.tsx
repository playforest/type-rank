import { useState, useEffect, useRef } from 'react'
import { Prompt } from './components/Prompt'
import { Stats } from './components/Stats'

function App() {
  const promptRef = useRef<HTMLDivElement>(null)

  let displayText: string = 'let the spice flow. flow.'

  const [isTypingActive, setIsTypingActive] = useState<boolean>(true)
  const [inputText, setInputText] = useState<string[]>([])
  const [cursor, setCursor] = useState<number>(0)
  const [errors, setErrors] = useState<number[]>([])

  const [wordCount, setWordCount] = useState<number>(0)
  const [timer, setTimer] = useState<number>(0)
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false)
  const [wpm, setWPM] = useState<number>(0)
  const [accuracy, setAccuracy] = useState<number>(0)


  function startTimer() {
    setIsTimerActive(true)
  }

  function stopTimer() {
    setIsTimerActive(false)
  }


  function calculateWPM() {
    if (timer > 0) {
      let currentInputText: string = inputText.join('')
      let currentWordCount: number = currentInputText.split(' ').length;
      setWordCount(currentWordCount)

      let currentWPM: number = (wordCount / (timer / 60))
      console.log(currentWPM)
      setWPM(currentWPM)
    }
  }

  function calculateAccuracy() {
    let totalCharacters: number = displayText.length;
    let currentAccuracy: number = ((totalCharacters - errors.length) / totalCharacters) * 100;
    setAccuracy(currentAccuracy)
  }

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
    if (promptRef.current) {
      const handleTextInput = (e: KeyboardEvent) => {
        setIsTimerActive(true)
        calculateAccuracy()
        console.table({ cursor, wordCount, timer, wpm });

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
          }

        } else {

          if (e.key === ' ') {
            calculateWPM()
            calculateAccuracy()
          }

          newInputText.push(e.key)
          setInputText(newInputText)

          newCursor = newCursor + 1;

          if (e.key !== displayText[cursor]) {
            setErrors([...errors, cursor])
          }

        }
        setCursor(newCursor)

      }

      if (isTypingActive) {
        window.addEventListener('keydown', handleTextInput)
      }

      return () => {
        window.removeEventListener('keydown', handleTextInput)
      }

    }
  }, [isTypingActive, cursor, inputText, errors])

  useEffect(() => {
    if (cursor > displayText.length) {
      setIsTypingActive(false);
      setIsTimerActive(false);
    }
  })

  return (
    <>
      <Prompt
        displayText={displayText}
        promptRef={promptRef}
        inputText={inputText}
        cursor={cursor}
        errors={errors} />
      <Stats
        wordCount={wpm}
        accuracy={accuracy} />
    </>
  )
}

export default App
