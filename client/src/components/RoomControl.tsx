import React, { useState } from "react";
import { Socket } from "socket.io-client";

import { ServerToClientEvents, ClientToServerEvents } from "../App";
import './RoomControlCss.css'

interface RoomControlProps {
    username: string;
    currentRoomId: string;
    socketRef: React.RefObject<Socket<ServerToClientEvents, ClientToServerEvents> | null>;
    setRoom: (roomId: string) => void;
    setUsername: (username: string) => void;
}

export function RoomControl({ username, currentRoomId, socketRef, setRoom }: RoomControlProps) {
    const [newRoomId, setNewRoomId] = useState<string>('')

    const handleJoinRoom = () => {
        socketRef.current?.emit('leave', { room_id: currentRoomId })
        socketRef.current?.emit('join', { username: username, room_id: newRoomId })
        setRoom(newRoomId)
        setNewRoomId('');
    }

    return (
        <div className="room-control">
            <div className="current-user"> Username: {username}</div>
            <div className="current-room"> Room: {currentRoomId}</div>
            <div className="input-group">
                <input
                    type="text"
                    value={newRoomId}
                    onChange={(e) => setNewRoomId(e.target.value)}
                    placeholder="Enter Room ID"
                    maxLength={5}
                />
                <button onClick={handleJoinRoom}> Join </button>
            </div>
        </div>
    )

}