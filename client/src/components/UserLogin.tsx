import { FormEvent, useState } from "react";
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
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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