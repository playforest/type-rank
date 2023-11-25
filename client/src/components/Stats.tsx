interface StatsProps {
    wordCount: number;
    accuracy: number;
}

export function Stats({ wordCount, accuracy }: StatsProps) {
    return (
        <div style={{
            fontSize: 18,
            width: '25vw',
            margin: '20px auto 0',
            textAlign: 'left'
        }}>
            <span>WPM: {Math.round(wordCount)}</span> <br />
            <span>Accuracy: {Math.round(accuracy)}%</span>
        </div>
    );
}