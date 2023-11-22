import { useState, useEffect, useRef } from 'react'


function App() {
  let displayText: string = 'let the spice flow.'
  let displayTextChars: string[] = Array.from(displayText)
  const [inputText, setInputText] = useState<string[]>([])
  const [cursor, setCursor] = useState<number>(0)

  const promptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (promptRef.current) {
      const handleTextInput = (e: KeyboardEvent) => {
        let newInputText: string[] = inputText.slice()
        let newCursor: number = cursor;

        console.log(e.key)
        console.log(cursor)
        if (e.key === 'Backspace') {
          newInputText.pop()
          setInputText(newInputText)

          cursor > 0 ? newCursor -= 1 : newCursor;
          setCursor(newCursor)
        } else {

          newInputText.push(e.key)
          setInputText(newInputText)

          newCursor = newCursor + 1;
          setCursor(newCursor)
        }
        console.log(inputText)
      }

      const promptElement = promptRef.current;

      window.addEventListener('keydown', handleTextInput)

      return () => {
        window.removeEventListener('keydown', handleTextInput)
      }

    }
  }, [inputText, cursor])

  return (
    <div
      className='prompt' ref={promptRef} style={{
        fontSize: '24px', display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        whiteSpace: 'pre-wrap'
      }}>
      {displayTextChars.map((el, indx) => {
        return <span key={indx}>{el}</span>
      })}
    </div>
  )
}

export default App
