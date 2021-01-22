import axios from "axios";


export function LikeTweet(likes: number, setLikes, isClicked: boolean, setClicked, tweetId: number, user) {
  
  console.log(user);
  
    //const userId =  getId(username)
    axios.post('/api/user/getId', {
      username: user.userName
          
           
    }).then((userId) => {
    
      if (isClicked) {
        axios.post('/api/tweet/decreaseLikes', {
          userId: userId['data'],
          tweetId: tweetId
           
        });
        setLikes(likes -= 1);
         
        setClicked(false);
      } else {
        axios.post('/api/tweet/increaseLikes', {
          tweetId: tweetId,
          userId: userId['data'],
          
          
           
        });
        setLikes(likes += 1)
        setClicked(true);
      }
 
    })
  
  return null;
  
}
