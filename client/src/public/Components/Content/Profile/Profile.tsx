import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Context/UserContext";
import Wrapper from "./ProfileComponents/Wrapper";
import TweetCard from '../../Cards/TweetCard'
import { ProfileHeaderComp } from './ProfileComponents/ProfileHeaderComp'
import { LoadingIndicator } from '../../../Loader';
import {BioCompOwnProfile} from './ProfileComponents/BioCompOwnProfile'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

const Profile: React.FC = () => {
  const { user } = useContext(UserContext);
  const [tweets, setTweets] = useState([]);
   const { promiseInProgress } = usePromiseTracker();
   const [followed, setFollowed] = useState<[]>([]);
  const [follower, setFollower] = useState<[]>([]);
   useEffect(() => {
    //@ts-ignore
    async function getPosts() {
      if (user) {
        const tweets = await trackPromise(axios.post('/api/tweet/getPosts', {
          username: user.userName,
        }))
        //@ts-ignore
        setTweets(tweets['data']);
      }
    }
    getPosts()
    console.log(tweets)

   }, []);
  
  useEffect(() => {
    //@ts-ignore
    async function getFollower() {
      
      const follower = await trackPromise(axios.post('/api/user/getFollower', {
        username: user.userName,
      }))

      const followed = await trackPromise(axios.post('/api/user/getFollowed', {
        username: user.userName,
      }))
      console.log(follower);
      
       // @ts-ignore
      setFollower(follower['data']);
      setFollowed(followed['data']);

    }
    getFollower()
    

   }, []);
  
  

   
  return (
    <Wrapper>
  
      <ProfileHeaderComp username={user.userName} length={tweets.length} />
      
      <BioCompOwnProfile follower={follower.length} followed={followed.length} />
      <LoadingIndicator />
      {!promiseInProgress && tweets.map((tweet, index) => {
        return <TweetCard key={index} tweet={tweet} username={user.userName} />
     })}

    
    </Wrapper>
    
    
    
    
   

  )

  
   
}
export default Profile;
