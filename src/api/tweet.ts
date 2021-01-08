
import { Tweet } from './../entity/Tweet';
import express, { Request, Response, } from 'express';
import { getManager, getRepository, QueryFailedError } from "typeorm";
import { User } from "../entity/User";
import { UserLikedTweets } from '../entity/UserLikedTweet';

const auth = require('./auth').authenticateToken;
const router = express.Router();




router.post('/post', auth, (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const tweetRepository = getRepository(Tweet);
  userRepository.findOne({
    where: {
      id: req.body.id
    }
  }).then((user) => {
   
    
    if (user) {
      const newTweet = {
        content: req.body.content,
        likes: 0,
        userId: user.id,
        userName : user.userName
      };
      tweetRepository.save(newTweet)


      return res.status(200).send("success");
    }
    if (user == null ) {
      return res.status(400).send("Coudnt create Tweet");
    } 
    
  }).catch((err: QueryFailedError) => {
    console.log(err);
    
    
    
    
  })
  

})




router.post('/getPosts', (req: Request, res: Response) => {
  
  
  
  const tweetRepository = getRepository(Tweet);
  const userRepository = getRepository(User);
   userRepository.findOne({
      where: {
      userName: req.body.username
    }
  }).then((user)=>
  
  tweetRepository.find({
    where: {
      userId: user?.id
    },order:{id:"DESC"}
  }).then((Tweets) => {
console.log(Tweets);

    
    
    return res.status(200).send(Tweets);
  }).catch((err: QueryFailedError) => {
    console.log(err);  
  }))
})

router.post('/increaseLikes', auth, async (req: Request, res: Response) => {
  const tweetRepository = getRepository(Tweet);
  const likedTweets = getRepository(UserLikedTweets)
  const likedTweet = { userId: req.body.userId, tweetId: req.body.tweetId }
  likedTweets.save(likedTweet)

  
 await  tweetRepository.findOne({
    where: {
      id: req.body.tweetId
    }
  }).then((tweet) => {
    if (tweet) {

      tweet.likes += 1 ;
      tweetRepository.save(tweet)
    
    }
   
    return res.sendStatus(200);
  }).catch((err: QueryFailedError) => {
    
    
    console.log(err);
  })
});

router.post('/decreaseLikes', auth, async(req: Request, res: Response) => {
  const likedTweets = getRepository(UserLikedTweets)
  const tweetRepository = getRepository(Tweet);
  
   likedTweets.findOne({
    where: {
      userId: req.body.userId,
      tweetId: req.body.tweetId
    }
    }).then((tweet) => {

      
      if (tweet) {
         likedTweets.delete(tweet);
      }
     
      
    }).then(() => {
      tweetRepository.findOne({
        where: {
          id: req.body.tweetId
        }
      }).then((tweet) => {
        if (tweet) {

          tweet.likes -= 1;
          tweetRepository.save(tweet)
    
        }
   
        return res.sendStatus(200)
      });
    })
  .catch((err: QueryFailedError) => {
    
    
    console.log(err);
  })
});


router.post('/isLiked', auth, (req: Request, res: Response) => {
  const likedTweets = getRepository(UserLikedTweets)
 
  likedTweets.findOne({
    where: {
        userId: req.body.userId,
      tweetId: req.body.tweetId
    }
  }).then((tweet) => {
    
    if (tweet) {
       

      return res.status(200).send(true);
    
    } else {
      return res.status(200).send(false);
    }
   
  }).catch((err: QueryFailedError) => {
    
    console.log(err);
  })
})
router.post('/getFollowedPost', auth, async (req: Request, res: Response) => {
  console.log(req.body);
  const entitityManager = getManager();
  
 entitityManager.query(`
      select tweet.*
      from "user" u
      inner join "subscription" as sub 
      on sub."followerId" = u.id 
      inner join tweet 
      on tweet."userId" = sub."userId" 
      where u.id = $1
      order by "created_at" DESC
      `
      
   , [req.body.id])
   .then((posts) => {
     console.log(posts);
     
     if (posts) {
       return res.status(200).send(posts)
     }
    return res.status(200).send([])
    })

  
});

module.exports = router;