import { useRef } from 'react'
import { ProgressBar } from './ProgressBar';
import './PromptCss.css'

interface PromptProps {
    promptRef: React.RefObject<HTMLDivElement>
    displayText: string;
    cursor: number;
    errors: number[];
}


export function Prompt({ displayText, promptRef, cursor, errors }: PromptProps) {

    const cursorRef = useRef<HTMLSpanElement>(null)
    const preCursorRef = useRef<HTMLSpanElement>(null)

    let displayTextChars: string[] = Array.from(displayText)
    let isTypingActive: boolean = cursor < displayText.length;

    return (
        <>
            <div className='prompt' ref={promptRef} style={{
                fontSize: '30px', display: 'flex',
                justifyContent: 'center', alignItems: 'center',
                height: '65vh', whiteSpace: 'pre-wrap'
            }}>
                <div style={{ position: 'relative', width: '900px' }}> {/* 9cdcfe Inner container for the text and the line */}
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
        </>
    )
}