import { useState, useEffect, useRef } from 'react'
import { ProgressBar } from './ProgressBar';

interface PromptProps {
    promptRef: React.RefObject<HTMLDivElement>
    displayText: string;
    inputText: string[];
    cursor: number;
    errors: number[];
}


export function Prompt({ displayText, promptRef, inputText, cursor, errors }: PromptProps) {
    const cursorRef = useRef<HTMLSpanElement>(null)
    const preCursorRef = useRef<HTMLSpanElement>(null)

    const [isError, setIsError] = useState<boolean>(false)

    let displayTextChars: string[] = Array.from(displayText)

    // console.log('width vals: ', cursorRef.current?.offsetLeft, cursorRef.current?.offsetWidth, preCursorRef.current?.offsetWidth)

    useEffect(() => {
        if (cursor > 0 && cursor - 1 == errors[errors.length - 1]) {
            setIsError(true)
        } else {
            setIsError(false)
        }
    }, [cursor, inputText])

    return (
        <div className='prompt' ref={promptRef} style={{
            fontSize: '30px', display: 'flex',
            justifyContent: 'center', alignItems: 'center',
            height: '100vh', whiteSpace: 'pre-wrap'
        }}>
            <div style={{ position: 'relative' }}> {/* Inner container for the text and the line */}
                {displayTextChars.map((el, indx) => {
                    let style: React.CSSProperties = {
                        color: indx === cursor ? 'black' : '#999999',
                        position: 'relative',
                        zIndex: 1,
                        fontVariantLigatures: 'no-common-ligatures'
                    };

                    errors.map((el) => {
                        if (indx === el) {
                            style.color = 'red'
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
                    cursor={cursor} cursorRef={cursorRef} />
            </div>

        </div>
    )
}