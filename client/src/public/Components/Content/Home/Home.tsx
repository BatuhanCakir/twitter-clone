import TweetCard from '../../Cards/TweetCard'
import TweetBox from './HomeComponents/TweetBox';
import Wrapper from './HomeComponents/Wrapper';
import HomeHeader from './HomeComponents/HomeHeader'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { UserContext } from '../../../Context/UserContext';
import { LoadingIndicator } from '../../../Loader';
import { usePromiseTracker } from "react-promise-tracker";
const Home: React.FC = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState<[]>([]);
  const { promiseInProgress } = usePromiseTracker();
  
  
    useEffect(() => {
    //@ts-ignore
    async function getPosts() {
      if (user) {
        const tweets = await trackPromise(axios.post('/api/tweet/getFollowedPost', {
          id: user.id,
        }))
        //@ts-ignore
        setPosts(tweets['data']);

        
      }
    }
    getPosts()


   }, [user]);
 
  
  
  
  return (
    <Wrapper>
      
      <HomeHeader>
        <h2 style={{fontSize:20,fontWeight:800}}>Home</h2>
      </HomeHeader>
    
      <TweetBox
        //@ts-ignore
        posts={posts} setPosts={setPosts} />
      <LoadingIndicator />
     {!promiseInProgress && posts.map((tweet, index) => {
        
        return <TweetCard key={index} tweet={tweet} username={tweet['userName']} />
     })}
      
      
      
      
      
    </Wrapper>

  )

  
   
}
export default Home;
