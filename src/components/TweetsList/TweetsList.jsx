import "./TweetsList.css";
import { Button, Tweet } from "components";
import { useCallback, useContext, useRef, useState } from "react";
import TweetsContext from 'context/TweetsContext';
import AuthContext from "context/AutoContext";


const TweetsList = () => {
    const { tweets, getNextPage, loading, hasMorePages, isSearching} = useContext(TweetsContext);
    const [myTweetsMode, setMyTweetsMode] = useState(false);
    const { user } = useContext(AuthContext);
    const observer = useRef();
    const lastTweetRef = useCallback(node => {
        if (loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMorePages && !isSearching){
                getNextPage();
            }
        });
        if(node) observer.current.observe(node);
    },[tweets, loading]);

    const handleTweetsMode = () =>{
        setMyTweetsMode(!myTweetsMode);
    }

    const btnStyle = {
        marginBottom:"20px",
        background: myTweetsMode ? "red" : undefined
    }
    

    return (
        <ul className="tweetsList">
            <Button style={btnStyle} onClick={handleTweetsMode}>{myTweetsMode ?  "Show All Tweets" : "Show My Tweets"}</Button>
            {tweets.filter(tweet => {
                return myTweetsMode ? (user.uid === tweet.userId):true;
            }).map((tweet, i) => (
                <Tweet
                    name={tweet.name}
                    photoURL={tweet.photoURL} 
                    date={tweet.date} 
                    content={tweet.content}  
                    key={tweet.id}  
                    lastTweetRef={(i === tweets.length-1) && lastTweetRef}
                />
            ))}
            {loading && hasMorePages && <div>Loading more tweets...</div>}
            {!loading && !tweets.length && <div>Couldn't find any tweets...</div>}
        </ul>
    );
}

export default TweetsList;