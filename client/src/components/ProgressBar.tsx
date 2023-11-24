import { useRef, useEffect, useState } from 'react'

interface ProgressBarProps {
    cursor: number;
    cursorRef: React.RefObject<HTMLSpanElement>;
    postCursorRef: React.RefObject<HTMLSpanElement>;
}

export function ProgressBar({ cursor, cursorRef, postCursorRef }: ProgressBarProps) {
    const progressRef = useRef<HTMLDivElement>(null)
    const [lineTrackerWidth, setLineTrackerWidth] = useState<number>(0)
    const [lineTrackerPos, setLineTrackerPos] = useState<number>(0)

    useEffect(() => {
        if (progressRef.current) {
            const newWidth = cursorRef.current?.offsetWidth ?? 0;
            const newPos = cursorRef.current?.offsetLeft ?? 0;
            setLineTrackerWidth(newWidth);
            setLineTrackerPos(newPos);

            console.log('width vals: ', cursorRef.current?.offsetLeft, cursorRef.current?.offsetWidth, postCursorRef.current?.offsetWidth)

        }
    }, [cursor])


    //    let lineTrackerWidth: number = ((Number.isFinite(cursorRef.current?.offsetLeft) ? cursorRef.current?.offsetLeft : 0) + (Number.isFinite(cursorRef.current?.offsetWidth) ? cursorRef.current?.offsetWidth : 0));


    return (
        <div className='progress' ref={progressRef} style={{
            position: 'absolute', // Position absolutely within the inner container
            bottom: 2, // Position at the bottom of the inner container
            left: lineTrackerPos,
            width: lineTrackerWidth,
            right: 0,
            height: '3px', // Thickness of the line
            backgroundColor: 'black', // Color of the line
            borderRadius: '2px'
        }}></div>
    )
}














/*

    // if (progressRef.current) {
    //   lineTrackerWidth = (Number.isFinite(cursorRef.current?.offsetLeft) ? cursorRef.current?.offsetLeft : 0) +
    //     (Number.isFinite(cursorRef.current?.offsetWidth) ? cursorRef.current?.offsetWidth : 0) +
    //     (Number.isFinite(postCursorRef.current?.offsetWidth) ? postCursorRef.current?.offsetWidth : 0)
    // }

    // if (cursor >= 0 && cursor < displayText.length) {
    //   lineTrackerWidth = (Number.isFinite(cursorRef.current?.offsetLeft) ? cursorRef.current?.offsetLeft : 0) +
    //     (Number.isFinite(cursorRef.current?.offsetWidth) ? cursorRef.current?.offsetWidth : 0) +
    //     (Number.isFinite(postCursorRef.current?.offsetWidth) ? postCursorRef.current?.offsetWidth : 0);
    // }

*/