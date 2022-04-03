import "./Register.css";
import { Button, Error } from "components";
import AuthContext from "context/AutoContext";
import { useValue } from "hooks/useValue";
import { useContext, useState } from "react";

const Register = () => {
    const { signup } = useContext(AuthContext);
    const [nameValue, setName] = useValue();
    const [emailValue, setsetEmail] = useValue();
    const [passwordValue, setPassword] = useValue();
    const [error, setError] = useState("");

    const handleSignup = () => {
        signup(emailValue, passwordValue, nameValue).
        catch((e) => {
            setError(e.message);
        });
    }

    return (
        <div className="regContainer">
        <h1>Register</h1>
        <div>
            <label>Username:</label>
            <input type="text" value={nameValue} onChange={setName}/>
        </div>
        <div>
            <label>Email:</label>
            <input type="text" value={emailValue} onChange={setsetEmail}/>
        </div>
        <div>
            <label>Password:</label>
            <input type="password" value={passwordValue} onChange={setPassword}/>
        </div>
        {error && <Error>{error}</Error>}
        <Button onClick={handleSignup} >Register</Button>
    </div>
    );
} 
export default Register;