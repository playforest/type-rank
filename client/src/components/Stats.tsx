import { Menu } from "./Menu";
import './StatsCss.css'

interface StatsProps {
    wpm: number;
    opponentWpm: number;
    accuracy: number;
    opponentAccuracy: number;
    isTypingActive: boolean;
    resetFunction: () => void;
}

export function Stats({ wpm, opponentWpm, accuracy, opponentAccuracy, isTypingActive, resetFunction }: StatsProps) {
    // const opponentWPM: number = 67;
    // const opponentAccuracy: number = 95;



    return (
        <div style={{
            fontFamily: 'Menlo, Monaco, Courier New, monospace',
            fontSize: 16,
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
                        <td id="yourResult">{Math.round(wpm)}</td>
                        <td id="opponentResult">{Math.round(opponentWpm)}</td>
                    </tr>
                    <tr>
                        <td id="metricName">Accuracy</td>
                        <td id="yourResult">{Math.round(accuracy)}%</td>
                        <td id="opponentResult">{Math.round(opponentAccuracy)}%</td>
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