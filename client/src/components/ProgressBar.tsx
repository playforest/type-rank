import { useRef, useEffect, useState } from 'react'

interface ProgressBarProps {
    cursor: number;
    cursorRef: React.RefObject<HTMLSpanElement>;
    isTypingActive: boolean;
}

export function ProgressBar({ cursor, cursorRef, isTypingActive }: ProgressBarProps) {
    const progressRef = useRef<HTMLDivElement>(null)
    const [lineTrackerWidth, setLineTrackerWidth] = useState<number>(0)
    const [lineTrackerPosX, setLineTrackerPosX] = useState<number>(0)
    const [lineTrackerPosY, setLineTrackerPosY] = useState<number>(0)

    useEffect(() => {
        if (progressRef.current) {
            const cursorHeight = cursorRef.current?.offsetHeight ?? 0;
            const newWidth = cursorRef.current?.offsetWidth ?? 0;
            const newPosX = cursorRef.current?.offsetLeft ?? 0;
            const newPosY = cursorRef.current?.offsetTop ?? 0;

            setLineTrackerWidth(newWidth);
            setLineTrackerPosX(newPosX);
            setLineTrackerPosY(newPosY + cursorHeight);
        }
    }, [cursor])

    return (
        <div className='progress' ref={progressRef} style={{
            display: isTypingActive ? 'flex' : 'none',
            position: 'absolute', // Position absolutely within the inner container
            bottom: 2, // Position at the bottom of the inner container
            left: lineTrackerPosX,
            width: lineTrackerWidth,
            top: lineTrackerPosY,
            right: 0,
            height: '3px',
            backgroundColor: '#73dd63',
            borderRadius: '2px',
            transition: 'left 0.2s ease, width 0.3s ease'
        }}></div>
    )
}