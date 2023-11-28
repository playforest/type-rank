import { Menu } from "./Menu";
import './StatsCss.css'

interface StatsProps {
    wordCount: number;
    accuracy: number;
    isTypingActive: boolean;
    resetFunction: () => void;
}

export function Stats({ wordCount, accuracy, isTypingActive, resetFunction }: StatsProps) {
    const opponentWPM: number = 67;
    const opponentAccuracy: number = 95;



    return (
        <div style={{
            fontFamily: 'Menlo, Monaco, Courier New, monospace',
            fontSize: 14,
            width: '300px',
            margin: '20px auto 0',
            textAlign: 'left',
            color: 'lightgrey'
        }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr id="players">
                        <th></th>
                        <th>You</th>
                        <th>Opponent</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td id="metricName">WPM</td>
                        <td id="yourResult">{Math.round(wordCount)}</td>
                        <td id="opponentResult">{opponentWPM}</td>
                    </tr>
                    <tr>
                        <td id="metricName">Accuracy</td>
                        <td id="yourResult">{Math.round(accuracy)}%</td>
                        <td id="opponentResult">{opponentAccuracy}%</td>
                    </tr>                    <tr>
                        <td id="metricName">Time</td>
                        <td id="yourResult">15s</td>
                        <td id="opponentResult">19s</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <Menu
                active={isTypingActive}
                resetFunction={resetFunction} />
        </div>
    );
}