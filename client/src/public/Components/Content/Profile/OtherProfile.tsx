import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Context/UserContext";
import { ProfileHeaderComp } from './ProfileComponents/ProfileHeaderComp';
import { BioCompOtherProfile } from './ProfileComponents/BioCompOtherProfile';
import { useHistory, useParams } from 'react-router-dom';
import Wrapper from "./ProfileComponents/Wrapper"
import TweetCard from '../../Cards/TweetCard'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import {LoadingIndicator} from '../../../Loader'
const OtherProfile: React.FC = () => {
  
  
  let history = useHistory();
  const { user } = useContext(UserContext);
  const [tweets, setTweets] = useState([]);
  const [followed, setFollowed] = useState<[]>([]);
  const [follower, setFollower] = useState<[]>([]);
  const [isFollowed, setFollowedStatus] = useState<boolean>(false);
   const { promiseInProgress } = usePromiseTracker();
  //@ts-ignore
  const { username} = useParams();
  
  

  useEffect(() => {
    
    
    if (user) {
      
      //@ts-ignore
      if (username === user.userName) {
        history.push(`/Profile/${username}`)
      }
    }
  }, [username, user, history]);
 
  
  useEffect(() => {
    //@ts-ignore
    async function getPosts() {
      
      const tweets = await trackPromise(axios.post('/api/tweet/getPosts', {
        username: username,
      }))

       // @ts-ignore
      setTweets(tweets['data']);

    }
    getPosts()
    

  }, [username]);
  

   useEffect(() => {
    //@ts-ignore
    async function getFollower() {
      
      const follower = await trackPromise(axios.post('/api/user/getFollower', {
        username: username,
      }))

      const followed = await trackPromise(axios.post('/api/user/getFollowed', {
        username: username,
      }))
      console.log(follower);
      
       // @ts-ignore
      setFollower(follower['data']);
      setFollowed(followed['data']);

      if (user) {

        
        follower['data'].map((follower) => {

          if (follower.followerId === user.id) {
            return setFollowedStatus(true);
          }
          return null;
        })

      }


    }
    getFollower()
    

   }, [username,user]);
  
  
  
  return (
    <Wrapper>
      <ProfileHeaderComp username={username} length={tweets.length} />
      <BioCompOtherProfile follower={follower.length} followed={followed.length}  isFollowed={isFollowed} setFollowedStatus={setFollowedStatus}/>
      <LoadingIndicator/>
      
      {!promiseInProgress &&tweets.map((tweet, index) => {
        return <TweetCard key={index} tweet={tweet} username={username} />
     })}

    </Wrapper>
  )

  
   
}
export default OtherProfile;
