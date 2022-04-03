import { Button, Error } from "components";
import AuthContext from "context/AutoContext";
import { useValue } from "hooks/useValue";
import { Line } from "layouts";
import { useContext, useState } from "react";
import "./Login.css"

const Login = () => {
    const { login, googleLogin } = useContext(AuthContext);
    const [emailValue, setsetEmail] = useValue();
    const [passwordValue, setPassword] = useValue();
    const [error, setError] = useState("");

    const handleLogin = () => {
        login(emailValue, passwordValue).then((user) => {
        }).catch((e) => {
            setError(e.message);
        });
    }

    
    const handleGoogleSignIn = () =>{
        googleLogin();
    }

    return (
        <div className="loginContainer">
            <h1>Login</h1>
            <div>
                <label>Email:</label>
                <input type="text" value={emailValue} onChange={setsetEmail}/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={passwordValue} onChange={setPassword}/>
            </div>
            {error && <Error>{error}</Error>}
            <Line justify={"space-between"}>
                <Button onClick={handleLogin}>Login</Button>
                <Button onClick={handleGoogleSignIn}>Login with google</Button>
            </Line>
        </div>
    );
}

export default Login;

