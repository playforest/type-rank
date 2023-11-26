import { Menu } from "./Menu";

interface StatsProps {
    wordCount: number;
    accuracy: number;
    isTypingActive: boolean;
    resetFunction: () => void;
}

export function Stats({ wordCount, accuracy, isTypingActive, resetFunction }: StatsProps) {
    return (
        <div style={{
            fontSize: 18,
            width: '25vw',
            margin: '20px auto 0',
            textAlign: 'left'
        }}>
            <span>WPM: {Math.round(wordCount)}</span> <br />
            <span>Accuracy: {Math.round(accuracy)}%</span>
            <br />
            <Menu
                active={isTypingActive}
                resetFunction={resetFunction} />
        </div>
    );
}