import { useState, useEffect, useRef } from 'react'
import { ProgressBar } from './ProgressBar';

interface PromptProps {
    promptRef: React.RefObject<HTMLDivElement>
    displayText: string;
    cursor: number;

}

export function Prompt({ displayText, promptRef, cursor }: PromptProps) {
    const cursorRef = useRef<HTMLSpanElement>(null)
    const postCursorRef = useRef<HTMLSpanElement>(null)


    let displayTextChars: string[] = Array.from(displayText)

    console.log('width vals: ', cursorRef.current?.offsetLeft, cursorRef.current?.offsetWidth, postCursorRef.current?.offsetWidth)

    return (
        <div className='prompt' ref={promptRef} style={{
            fontSize: '30px', display: 'flex',
            justifyContent: 'center', alignItems: 'center',
            height: '100vh', whiteSpace: 'pre-wrap'
        }}>
            <div style={{ position: 'relative' }}> {/* Inner container for the text and the line */}
                {displayTextChars.map((el, indx) => {
                    return <span ref={
                        indx === cursor ? cursorRef :
                            indx === cursor + 1 ? postCursorRef : null
                    }
                        key={crypto.randomUUID()}
                        style={{
                            color: indx === cursor ? 'black' : '#999999',
                            position: 'relative', // Position the text
                            zIndex: 1, // Higher z-index for text
                        }}>{el}</span>
                })}
                <ProgressBar
                    cursor={cursor} cursorRef={cursorRef} postCursorRef={postCursorRef} />
            </div>

        </div>
    )
}