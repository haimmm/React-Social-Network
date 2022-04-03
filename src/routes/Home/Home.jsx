import { NewTweet, TweetsList } from 'components';

function Home(props) {
    return (
      <div className="App">
          <NewTweet/>
          <TweetsList/>
      </div>
    );
  }
  
  export default Home;

