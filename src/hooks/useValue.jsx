import { useState } from "react"

export const useValue = (init="", type="text") => {
    const [value, setValue] = useState(init);
    const handleChange = event => {
        switch(type){
            case "text":
                setValue(event.target.value);
                break;
            case "file":
                setValue(event.target.files[0]);
                break;
        }
    }
    const clear = () => {
        setValue("");
    }
    return [value, handleChange, clear];
}