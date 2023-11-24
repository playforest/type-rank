import { useState, useEffect, useRef } from 'react'
import { Prompt } from './components/Prompt'

function App() {
  const promptRef = useRef<HTMLDivElement>(null)

  let displayText: string = 'let the spice flow.'

  const [inputText, setInputText] = useState<string[]>([])
  const [cursor, setCursor] = useState<number>(0)

  useEffect(() => {
    if (promptRef.current) {
      const handleTextInput = (e: KeyboardEvent) => {
        let newInputText: string[] = inputText.slice()
        let newCursor: number = cursor;

        console.log(e.key)
        console.log(`cursor: ${cursor}`)

        if (e.key === 'Backspace') {
          newInputText.pop()
          setInputText(newInputText)
          if (cursor > 0) {
            newCursor = newCursor - 1;
          }

        } else {

          if (e.key === displayText[cursor]) {

            newInputText.push(e.key)
            setInputText(newInputText)

            newCursor = newCursor + 1;
          }

        }
        setCursor(newCursor)

        console.log(inputText)
      }

      window.addEventListener('keydown', handleTextInput)

      return () => {
        window.removeEventListener('keydown', handleTextInput)
      }

    }
  }, [cursor, inputText])


  return (
    <>
      <Prompt
        displayText={displayText}
        promptRef={promptRef}
        cursor={cursor} />
    </>
  )
}

export default App
