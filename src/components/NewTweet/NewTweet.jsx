import { Line } from "layouts";
import {Button, Error } from "components";
import "./NewTweet.css";
import { useValue } from "hooks/useValue";
import { useContext } from "react";
import TweetsContext from 'context/TweetsContext';
import AuthContext from "context/AutoContext";


const NewTweet = (props) => {
    const [value, setValue, clear] = useValue();
    const tweets = useContext(TweetsContext);
    const { user } = useContext(AuthContext);
    const isMaxLength = value.length === 140;
    let failureMessage = isMaxLength ? "The tweet can't contain more than 140 chars.":tweets.failureMessage;

    const handleClick = () =>{
        const tweet = {
            userId: user.uid,
            date: new Date().getTime(),
            content: value,
        }
        tweets.saveTweet(tweet);
        clear();
    }

    return (
        <div className="container">
            <textarea className="newTweetText" placeholder="What you have in mind..." maxLength="140" onChange={setValue} value={value}/>
            <div className="counter">{value.length}/140</div>
            <Line justify={failureMessage ? "space-between":"end"}>
                {failureMessage && <Error>{failureMessage}</Error>}
                <Button isDisabled={isMaxLength || props.isLoading} onClick={handleClick}>Tweet</Button>
            </Line>
        </div>
    );
}

export default NewTweet;