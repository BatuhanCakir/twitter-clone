import axios from "axios";


export function BookmarkTweet(  isBookmarked: boolean, setBookmark, tweetId: number, user) {
  
  console.log(user);
  
    
    axios.post('/api/user/getId', {
      username: user.userName
          
           
    }).then((userId) => {
    
      if (!(isBookmarked)) {
        axios.post('/api/bookmark/add', {
          userId: userId['data'],
          tweetId: tweetId
           
        });

         
        setBookmark(true);
      } else {
        axios.post('/api/bookmark/delete', {
          tweetId: tweetId,
          userId: userId['data'],
        });
        
        setBookmark(false);
      }
 
    })
  
  return null;
  
}
