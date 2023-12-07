import React, { FormEvent, useState } from "react";

import './UserLoginCss.css'

interface LoginProps {
    // setUsername: () => void;
    // setPassword: () => void;
    onLogin: () => void;
}

export function UserLogin({ onLogin }: LoginProps) {
    const [username, setLocalUsername] = useState("");
    const [password, setLocalPassword] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLocalUsername(username);
        setLocalPassword(password);
        onLogin();
    };

    return (

        <form className="user-login" onSubmit={handleSubmit}>
            <div className="forms-container">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setLocalUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setLocalPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>

            </div>
            <div className="login-links">
                <div className="forgot-password">
                    <a href="#">Forgot Password</a>
                </div>
                <div className="create-account">
                    <a href="#">Create Account</a>
                </div>
            </div>
        </form>
    );
}
