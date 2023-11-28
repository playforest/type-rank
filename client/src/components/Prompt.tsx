import { useState, useEffect, useRef } from 'react'
import { ProgressBar } from './ProgressBar';
import './PromptCss.css'
// .header {
//   font-family: 'Press Start 2P';
//   font-size: 10px;
//   color: black;
//   background-color: white;
//   line-height: 0;
// }

interface PromptProps {
    promptRef: React.RefObject<HTMLDivElement>
    displayText: string;
    inputText: string[];
    cursor: number;
    errors: number[];
}


export function Prompt({ displayText, promptRef, inputText, cursor, errors }: PromptProps) {
    // console.log('prompt width: ', promptRef.current?.clientWidth)
    const cursorRef = useRef<HTMLSpanElement>(null)
    const preCursorRef = useRef<HTMLSpanElement>(null)

    const [isError, setIsError] = useState<boolean>(false)

    let displayTextChars: string[] = Array.from(displayText)
    let isTypingActive: boolean = cursor < displayText.length;

    useEffect(() => {
        setIsError(false)
        if (cursor > 0 && cursor == errors[errors.length - 1]) {
            setIsError(true)
        } else {
            setIsError(false)
        }
    }, [cursor, inputText])

    return (
        <div className='prompt' ref={promptRef} style={{
            fontSize: '30px', display: 'flex',
            justifyContent: 'center', alignItems: 'center',
            height: '65vh', whiteSpace: 'pre-wrap', fontFamily: 'Press Start 2P'
        }}>
            <div style={{ position: 'relative', width: '70vw' }}> {/* 9cdcfe Inner container for the text and the line */}
                {displayTextChars.map((el, indx) => {
                    let style: React.CSSProperties = {
                        color: indx < cursor ? '#569cd6' : '#0056a7',
                        position: 'relative',
                        zIndex: 1,
                        fontVariantLigatures: 'no-common-ligatures'
                    };

                    errors.map((el) => {
                        if (indx === el) {
                            displayText[el] !== ' ' ?
                                style.color = '#da70d6' :
                                Object.assign(style, { backgroundColor: '#ff82fc', opacity: 0.35 })
                        }
                    })

                    return <span ref={
                        indx === cursor ? cursorRef :
                            indx === cursor - 1 ? preCursorRef : null
                    }
                        key={crypto.randomUUID()}
                        style={style}>{el}</span>
                })}
                <ProgressBar
                    cursor={cursor} cursorRef={cursorRef} isTypingActive={isTypingActive} />
            </div>

        </div>
    )
}