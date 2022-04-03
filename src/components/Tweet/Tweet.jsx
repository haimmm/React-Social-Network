import "./Tweet.css"
import { Line } from "layouts"

const Tweet = (props) =>{
    return (
        <li className="tweet" ref={props.lastTweetRef || null}>
            <div className="tweetHeader">
                <Line justify={"space-between"}>
                    <Line>
                    <div className="profilePicture">
                        <img src={props.photoURL}></img>
                    </div>
                    <div>{props.name}</div>
                    </Line>
                    <div>{new Date(props.date).toISOString()}</div>
                </Line>
            </div>
            <div>{props.content}</div>
        </li>
    );
}

export default Tweet;