import { Button } from "components";
import AuthContext from "context/AutoContext";
import { useValue } from "hooks/useValue";
import { Line } from "layouts"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css"


const Profile = () => {
    const { updatePublicData } = useContext(AuthContext);
    const [displayName, setDisplayname] = useValue("");
    const [file, setFile] = useValue(undefined, "file");
    const navigate = useNavigate();

    const handleSave = (e) => {
        const publicData = {};
        if(displayName) publicData.userName = displayName;
        if(file) publicData.photo = file;
        updatePublicData(publicData)
        .then(() => {
            navigate("/home");
        })
    }

    return (
        <div className="profile">
            <h1>Profile</h1>
            <h3>Update displayed name:</h3>
            <input type="text" onChange={setDisplayname} value={displayName}></input>
            <h3>Update Photo:</h3>
            <input type="file" onInput={setFile}></input>
            <Line justify={"end"}>
                <Button onClick={handleSave}>Save</Button>
            </Line>
        </div>
    );
}

export default Profile;