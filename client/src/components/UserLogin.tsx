import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import './UserLoginCss.css'

interface LoginProps {
    onLogin: () => void;
    // setUsername: () => void;
    // setPassword: () => void;
    onRegister: (email: string, username: string, password: string) => void;
}

export function UserLogin({ onLogin, onRegister }: LoginProps) {
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [timer, setTimer] = useState<number>();
    const [usernameIsValid, setUsernameIsValid] = useState<boolean | undefined>(undefined);

    const MIN_USERNAME_LENGTH: number = 3;
    const USERNAME_VERIFICATION_INTERVAL: number = 1000;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isRegistering) {
            onRegister(email, username, password);
        } else {
            onLogin();
        }
    };

    const handleSwitchForm = () => {
        setIsRegistering(!isRegistering);
    };

    const handleOnUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputUsername: string = event.target.value;
        setUsername(inputUsername)

        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            if (inputUsername.length >= MIN_USERNAME_LENGTH && isRegistering) {
                const protocol: string = window.location.protocol;
                const hostname: string = window.location.hostname;
                const port: string = window.location.port ? `:${window.location.port}` : '';
                const usernameExistsUrl = `${protocol}//${hostname}${port}/usernameExists`;

                const options = {
                    'method': 'POST',
                    'body': JSON.stringify({
                        'username': inputUsername
                    }),
                    'headers': {
                        'Content-Type': 'application/json'
                    }
                }

                fetch(usernameExistsUrl, options)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        if (data.usernameExists) {
                            setUsernameIsValid(false)
                        } else {
                            setUsernameIsValid(true)
                        }
                    })
                console.log(inputUsername)
            }
        }, USERNAME_VERIFICATION_INTERVAL);

        setTimer(newTimer);
    }

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [timer])

    return (
        <form className={isRegistering ? "user-login is-registering" : "user-login"} onSubmit={handleSubmit}>
            <div className="forms-container">
                {isRegistering && (
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                )}
                <input
                    className={
                        isRegistering ?
                            usernameIsValid === undefined || username.length < MIN_USERNAME_LENGTH
                                ? 'neutral'
                                : usernameIsValid ? 'valid' : 'invalid'
                            : ''}
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleOnUsernameChange}
                    placeholder="Username"
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit" name="submit">{isRegistering ? "Register" : "Login"}</button>
            </div>
            <div className="login-links">
                <a href="#" onClick={handleSwitchForm}>
                    {isRegistering ? "Back to Login" : "Create Account"}
                </a>
            </div>
        </form>
    );
}