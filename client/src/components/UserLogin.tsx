import { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react";
import { Tooltip, TooltipRefProps } from "react-tooltip";

import './UserLoginCss.css'

interface LoginProps {
    onLogin: (username: string, password: string, remember_me: boolean) => void;
    onRegister: (email: string, username: string, password: string) => void;
    onLogout: (username: string) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setUsername: (username: string) => void;
    username: string;
    loginError: string | null;
    clearLoginError: () => void;
}

export function UserLogin({ onLogin, onRegister, onLogout, isLoggedIn, setIsLoggedIn, loginError, clearLoginError, setUsername, username }: LoginProps) {
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("")
    // const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>();
    const [usernameIsValid, setUsernameIsValid] = useState<boolean | undefined>(undefined);
    const [usernameValidationMessage, setUsernameValidationMessage] = useState<string>("");

    const usernameInputRef = useRef<TooltipRefProps>(null);
    const passwordInputRef = useRef<TooltipRefProps>(null);
    const MIN_USERNAME_LENGTH: number = 3;
    const USERNAME_VERIFICATION_INTERVAL: number = 1000;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isRegistering && !isLoggedIn) {
            onRegister(email, username, password);
        } else if (!isRegistering && !isLoggedIn) {
            onLogin(username, password, rememberMe);
        } else if (!isRegistering && isLoggedIn) {
            setIsLoggedIn(false)
        }
    };

    const handleSwitchForm = () => {
        setIsRegistering(!isRegistering);
    };

    const handleOnUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        clearLoginError();
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
                            setUsernameValidationMessage("username unavailable :(")
                        } else {
                            setUsernameIsValid(true)
                            setUsernameValidationMessage("username available!")
                        }
                    })
                console.log(inputUsername)
            }
        }, USERNAME_VERIFICATION_INTERVAL);

        setTimer(newTimer);
    }

    const handleOnPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        clearLoginError();
        setPassword(event.target.value)
    }

    const handleLogout = () => {
        onLogout(username)
        setIsLoggedIn(false)
    }

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [timer])

    useEffect(() => {
        if (usernameInputRef.current && usernameValidationMessage) {
            usernameInputRef.current.open({
                content: usernameValidationMessage
            })
        }
    }, [usernameValidationMessage])

    useEffect(() => {
        if (passwordInputRef.current && loginError) {
            passwordInputRef.current.open({
                content: loginError
            })
        }
    }, [loginError])

    if (isLoggedIn) {
        return (
            <div className="user-login">
                <div className="forms-container logged-in-container">
                    <div className="username-display">hey, <b>{username}</b></div>
                    <button
                        type="submit" name="submit" onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
                <div className="login-links">
                    <a href="#" onClick={handleLogout}>
                        User settings
                    </a>
                </div>
            </div>
        );
    }


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
                    id={
                        isRegistering ?
                            usernameIsValid === undefined || username.length < MIN_USERNAME_LENGTH
                                ? 'neutral'
                                : usernameIsValid ? 'valid' : 'invalid'
                            : ''}
                    className="username"
                    autoComplete="off"
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleOnUsernameChange}
                    placeholder="Username"


                    data-tooltip-id="username-tooltip"
                    data-tooltip-content={usernameValidationMessage}
                />
                {usernameValidationMessage && <Tooltip ref={usernameInputRef} id="username-tooltip" />}

                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleOnPasswordChange}
                    placeholder="Password"

                    data-tooltip-id="password-tooltip"
                    data-tooltip-content={loginError}
                />
                {loginError && <Tooltip ref={passwordInputRef} id="password-tooltip" />}
                <button
                    type="submit" name="submit">{
                        isRegistering && !isLoggedIn
                            ? "Register"
                            : isLoggedIn ? "Logout" : "Login"}
                </button>
            </div>
            <div className="remember-me-container">
                <div className="remember-me">
                    <input
                        id="rememberMe"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                </div>
                <div className="login-links">
                    <a href="#" onClick={handleSwitchForm}>
                        {isRegistering ? "Back to Login" : "Create Account"}
                    </a>
                </div>
            </div>
        </form>
    );
}