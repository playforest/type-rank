import { useRef, useEffect, useState } from 'react'

interface ProgressBarProps {
    cursor: number;
    cursorRef: React.RefObject<HTMLSpanElement>;
}

export function ProgressBar({ cursor, cursorRef }: ProgressBarProps) {
    const progressRef = useRef<HTMLDivElement>(null)
    const [lineTrackerWidth, setLineTrackerWidth] = useState<number>(0)
    const [lineTrackerPos, setLineTrackerPos] = useState<number>(0)

    useEffect(() => {
        if (progressRef.current) {
            const newWidth = cursorRef.current?.offsetWidth ?? 0;
            const newPos = cursorRef.current?.offsetLeft ?? 0;
            setLineTrackerWidth(newWidth);
            setLineTrackerPos(newPos);

            console.log('width vals: ', cursorRef.current?.offsetLeft, cursorRef.current?.offsetWidth)

        }
    }, [cursor])

    return (
        <div className='progress' ref={progressRef} style={{
            position: 'absolute', // Position absolutely within the inner container
            bottom: 2, // Position at the bottom of the inner container
            left: lineTrackerPos,
            width: lineTrackerWidth,
            right: 0,
            height: '3px',
            backgroundColor: 'black',
            borderRadius: '2px',
            transition: 'left 0.2s ease, width 0.3s ease'
        }}></div>
    )
}