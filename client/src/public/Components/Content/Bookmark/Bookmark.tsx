import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../../Context/UserContext";
import TweetCard from '../../Cards/TweetCard'
import ProfileHeader from '../Profile/ProfileComponents/ProfileHeader'
import Wrapper from '../Profile/ProfileComponents/Wrapper';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import {LoadingIndicator} from '../../../Loader'
const HeaderWrapper = styled.div`
  
  width : 100%;
  margin-left:20px;
  display: flex;
  flex-direction: column;
`

const Bookmark: React.FC = () => {
  const { user } = useContext(UserContext);
  const [bookmark, setBookmark] = useState([]);
  const {promiseInProgress} = usePromiseTracker()
  useEffect(() => {
    //@ts-ignore
    async function getBookmark() {
      if (user) {
        const bookmark = await trackPromise((axios.post('/api/bookmark/getBookmark', {
          userId: user.id,
        })))
        
        // @ts-ignore
        setBookmark(bookmark['data']);
      }

    }
    getBookmark()
    
    console.log(bookmark);
    
   }, []);
  return (
    <Wrapper>
    <ProfileHeader>
    <HeaderWrapper>
        <div >
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Bookmark</h2>
        </div>
        <div>
          {user.userName}
        </div>  
      </HeaderWrapper>
     

      </ProfileHeader>

       <LoadingIndicator/>
      
      {!promiseInProgress &&bookmark.map((bookmark, index) => {
        return <TweetCard key={index} tweet={bookmark.tweet} username={bookmark.tweet.userName} />
     })}
          {bookmark.map((bookmark, index) => {
        return <TweetCard key={index} tweet={bookmark.tweet} username={bookmark.tweet.userName} />
     })}
    
    
    
    </Wrapper>
  )

  
   
}
export default Bookmark;
