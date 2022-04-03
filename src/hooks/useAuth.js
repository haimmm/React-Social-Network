import fb from "firebase-config";
import { useEffect, useState } from "react";

const useAuth = () => {
    const [user, setUser] = useState(null);
    // console.log("user", user);

    const signup = async (email, password, name) => {
        const user = await fb.signup(email, password);
        const defaultPhoto = await fb.getPhotoURL("defaults/defaultPicture.png");
        await setPublicData(name, defaultPhoto);
        setUser(user);
        return user;
    }

    const login = async (email, password) => {
        const user = await fb.login(email, password);
        setUser(user);
    }

    const googleLogin = async () => {
        const user = await fb.loginWithGoogle();
        await setPublicData(user.displayName, user.photoURL);
        setUser(user);
    }

    const setPublicData = async (userName, photoURL) => {
        await fb.setPublicData({userName, photoURL})
    }

    const signout = async () => {
        await fb.signout();
        setUser(null);
    }

    const updatePublicData = async ({userName, photo}) => {
        if(userName){
            await fb.updatePublicData({userName});
        }
        if(photo){
            const path = user.uid + "/profilePicture/" + photo.name;
            await fb.storePhoto(photo, path);
            const photoURL = await fb.getPhotoURL(path);
            fb.updatePublicData({photoURL})
        }
    }


    useEffect(() => {
    fb.isUserSignedIn((user) => {
        user && setUser(user);
    });
    }, []);

    return {
        user,
        signup,
        login,
        googleLogin,
        signout,
        updatePublicData
    };
}

export default useAuth;
