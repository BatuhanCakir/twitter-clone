import styled from 'styled-components';
import { StyledAvatar } from '../Avatar'
import { Comment } from '@styled-icons/fa-regular/Comment';
import { Heart } from '@styled-icons/boxicons-regular/Heart';
import { Retweet } from '@styled-icons/evil/Retweet';

import {  useEffect, useState } from 'react';
import { LikeTweet } from '../../util/LikeTweet'
import {Bookmark} from '@styled-icons/boxicons-regular/Bookmark'
import { UserContext } from '../../Context/UserContext';
import { useContext } from 'react';
import { ModalContext } from '../../Context/ModalContext';
import axios from 'axios';
import { BookmarkTweet } from '../../util/BookmarkTweet';
import { useHistory } from 'react-router-dom';


const Wrapper = styled.div`
    padding: 10px 10px;
    
    
    min-height:110px;
   
    height:fit-content;
    
    display:flex;
    border-bottom: thin solid #D6D9D8;
     overflow: hidden;
`

const Avatar = styled(StyledAvatar)`
  flex:0.1;

  &:hover{
  cursor:pointer
}
  
`
const Content = styled.div`

flex:0.9;
display:flex;
flex-direction:column;
padding-left:10px;
`

const ContentHeader = styled.div`
    flex:0.2;
    display:flex;
    padding-top:5px;
    min-height:30px;

`
const TweetContent = styled.div`
    flex:0.7;
    
    padding-bottom:20px;
    
   
    

`
const ContentReview = styled.div`
    flex:0.1;
    display:flex;
    flex-direction:flex-start;
    justify-content:space-between;
    padding-right :40px;
    white-space: pre-wrap
    
    

`



const TweetCard = (info) => {
  let history = useHistory()
  const {user} = useContext(UserContext);
    //@ts-ignore
  const { tweet, username } = info;
  const { content , likes, created_at,id} = tweet;
  const [tempLikes, setLikes] = useState<number>(likes);
  const [likeIsClicked, setClicked] = useState<boolean>(false);
  const [isBookmarked, setBookmark] = useState<boolean>(false);
  const { setModalState } = useContext(ModalContext);
  useEffect(() => {
    //@ts-ignore
    async function getLikes() {
      if (user) {
        axios.post('/api/tweet/isLiked', {
          //@ts-ignore
          userId: user.id,
          tweetId: id 
        })
          .then((value) => {
    
            setClicked(value['data']);
      
          })
      }
    }
    getLikes()
    

   }, [likes,id,user ]);
  useEffect(() => {
    //@ts-ignore
    async function getBookmark() {
      if (user) {
        axios.post('/api/bookmark/isBookmarked', {
          //@ts-ignore
          userId: user.id,
          tweetId: id 
        })
          .then((value) => {

            setBookmark(value['data']);
      
          })
      }
    }
    getBookmark()
    

   }, [id,user ]);
   return (
     <Wrapper>
       <div>
         <Avatar onClick={() => history.push(`/${username}`)} />
       </div>
      <Content>
        <ContentHeader>
          
          <div style={{ fontWeight: 600, fontSize: `${15}px` }}>{username}</div>
          &nbsp;&nbsp;
         <div style={{fontSize:`${15}px`}}>{created_at.substring(0,10).split("-").join(".") }</div>
        </ContentHeader>
        <TweetContent>
          <span style={{ overflowWrap: 'break-word', hyphens: "auto" ,textAlign:"left"}}>
            {content}
          </span>
          
        
        </TweetContent>
        <ContentReview>
          <div>
            <Comment size="20" />
            &nbsp;
            0
            </div>
            
          <div>
            <Heart style={{ fill: likeIsClicked ? "red" : "black" }} size="20" onClick={() =>
            {
               if (user) return LikeTweet(tempLikes, setLikes, likeIsClicked, setClicked, id,user);
               setModalState(true);
               
              
            }} />
            &nbsp;
            {tempLikes}
          </div>
          <div>
            
            <Retweet size="25" />
            &nbsp;
            0
          </div>
          <div>
          <Bookmark  style={{ fill: isBookmarked ? "blue" : "black" }}size="20" onClick={() =>
            {
               if (user) return BookmarkTweet( isBookmarked, setBookmark, id,user);
               
               
              
            }}/></div>
        </ContentReview>
      </Content>
      
    </Wrapper>
  )
};

export default TweetCard;