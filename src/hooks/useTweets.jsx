import fb from "firebase-config";
import { useEffect, useRef, useState } from "react";

export const useTweets = () => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMorePages, sethasMorePages] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const failureMessage = useRef("");
    console.log("searching:", isSearching);
    useEffect(() => { 
      hookReload();
    }, []);

    useEffect(() => {
      //listen for live updates if: 1.not searching 2.tweet is not displayed already
      const unsub = fb.onTweetsDbChange(async rawTweets => {
        if(!isSearching && tweets[0] && tweets[0].id !== rawTweets[0].id ){
          const readyTweets = await addPublicData(rawTweets);
          setTweets([...readyTweets, ...tweets]);
        }
      });
    return unsub;
    },[tweets]);

    const hookReload = () => {
      if(!hasMorePages) sethasMorePages(true);
      if(isSearching) setIsSearching(false);
      getNextPage(true);
    }

    const getNextPage = async (isFirstMount=false) => {
      setLoading(true);
      const rawTweets = await fb.getTweetsByCount(10, isFirstMount);
      if(rawTweets.length){
        const readyTweets = await addPublicData(rawTweets);
        setLoading(false);
        setTweets( isFirstMount ? [...readyTweets] : [...tweets, ...readyTweets]);
      }else{
        sethasMorePages(false);
      }
    }

    const search = async (propery, value) => {
      setIsSearching(true);
      setLoading(true);
      const results = await fb.getTweetsBySearch(propery, value);
      let readyTweets = [];
      if(results.length)
        readyTweets =  await addPublicData(results);
      setLoading(false);
      console.log("tweets", readyTweets);
      setTweets(readyTweets);
    }

    const addPublicData = async (rawTweets) => {
      const tweetsPromises = rawTweets.map(async tweet => {
        const publicData = await fb.getPublicData(tweet.userId);
        return {...tweet,
                name: publicData.userName,
                photoURL: publicData.photoURL
        }
      });
      const readyTweets = await Promise.all(tweetsPromises)
      return readyTweets;
    }
    
    const saveTweet = tweet => {
      fb.addNewTweet(tweet)
      .catch(err => {
        console.log(err);
      });
    }

    return {tweets,
            saveTweet,
            failureMessage:failureMessage.current,
            getNextPage,
            loading,
            hasMorePages,
            search,
            isSearching,
            hookReload};
}