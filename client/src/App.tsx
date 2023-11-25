import { useState, useEffect, useRef } from 'react'
import { Prompt } from './components/Prompt'

function App() {
  const promptRef = useRef<HTMLDivElement>(null)

  let displayText: string = 'let the spice flow. flow.'

  const [inputText, setInputText] = useState<string[]>([])
  const [cursor, setCursor] = useState<number>(0)
  const [errors, setErrors] = useState<number[]>([])

  useEffect(() => {
    if (promptRef.current) {
      const handleTextInput = (e: KeyboardEvent) => {
        let newInputText: string[] = inputText.slice()
        let newCursor: number = cursor;

        console.log(`cursor: ${cursor}`)
        console.log('errors: ', errors)


        if (e.key === 'Backspace') {
          newInputText.pop()
          setInputText(newInputText)

          if (cursor > 0) {
            newCursor = newCursor - 1;
          }

        } else {

          // if (e.key === displayText[cursor]) {

          newInputText.push(e.key)
          setInputText(newInputText)

          newCursor = newCursor + 1;
          // }

          if (e.key !== displayText[cursor]) {
            setErrors([...errors, cursor])
          }

        }
        setCursor(newCursor)
      }

      window.addEventListener('keydown', handleTextInput)

      return () => {
        window.removeEventListener('keydown', handleTextInput)
      }

    }
  }, [cursor, inputText, errors])


  return (
    <>
      <Prompt
        displayText={displayText}
        promptRef={promptRef}
        inputText={inputText}
        cursor={cursor}
        errors={errors} />
    </>
  )
}

export default App
