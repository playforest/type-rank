import React, { useState } from "react";
import { Socket } from "socket.io-client";

import { ServerToClientEvents, ClientToServerEvents } from "../App";
import './RoomControlCss.css'

interface RoomControlProps {
    currentRoomId: string;
    onJoinRoom: (joinRoomId: string) => void;
    socketRef: React.RefObject<Socket<ServerToClientEvents, ClientToServerEvents> | null>;
}

export function RoomControl({ currentRoomId, onJoinRoom, socketRef }: RoomControlProps) {
    const [joinRoomId, setJoinRoomId] = useState<string>('')

    const handleJoinRoom = () => {
        socketRef.current?.emit('join', { room_id: joinRoomId })
        onJoinRoom(joinRoomId);
        setJoinRoomId('');
    }

    return (
        <div className="room-control">
            <div className="current-room">Current Room: {currentRoomId}</div>
            <div className="input-group">
                <input
                    type="text"
                    value={joinRoomId}
                    onChange={(e) => setJoinRoomId(e.target.value)}
                    placeholder="Enter Room ID"
                    maxLength={5}
                />
                <button onClick={handleJoinRoom}> Join </button>
            </div>
        </div>
    )

}