interface KeyRepresentationProps {
    keyName: string;
}

function KeyRepresentation({ keyName }: KeyRepresentationProps) {
    return (
        <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(153,153,153, 0.5)', // Grey background
            opacity: '100%',
            color: 'white', // White text
            padding: '4px 7px', // Adjust padding as needed
            margin: '0 5px', // Space between keys
            borderRadius: '3px', // Rounded corners
            textTransform: 'uppercase', // Uppercase text
            fontFamily: 'monospace', // Monospace font
            fontSize: '8px' // Smaller font size
        }}>
            {keyName}
        </div>
    );
}


interface MenuProps {
    active: boolean;
    resetFunction: () => void;
}

export function Menu({ active, resetFunction }: MenuProps) {
    return (
        <div style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '10px'
        }}>
            <button style={{
                backgroundColor: 'black',
                borderColor: 'border: 2px solid #ffbbbb;',
                color: '#ffbbbb'
            }} onClick={resetFunction} disabled={active}>Reset</button>
            <div>

                <KeyRepresentation keyName="ctrl" />
                <span style={{ fontSize: '12px', color: 'lightgrey' }}>+</span>
                <KeyRepresentation keyName="space" />
            </div>
        </div>
    );
}