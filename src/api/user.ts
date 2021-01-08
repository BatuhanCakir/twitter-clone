import { Subscription } from './../entity/Subscription';
import express, { Request, Response, } from 'express';
import { getRepository, QueryFailedError } from "typeorm";
import {User} from "../entity/User";
const auth = require('./auth').authenticateToken; 
const router = express.Router();

router.get('/', auth,(req:Request,res: Response) => {
  const userRepository = getRepository(User); 
     userRepository.findOne({
      where: {
        userName: res.locals.user.username
      }
    }).then((user) => {
    
      if (user) {
        const clientUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          age: user.age,
          created_at: user.created_at,
        }
        
        
        return res.status(200).send(clientUser);
      }
      if (user == null) {
        return res.status(401).send("No User found");
      }
    
   
    
    }).catch((err: QueryFailedError) => {
      console.log(err);
      console.log(req);
    
    
    
    
    })
  

})
 async function getId(username: string): Promise<number|null|void|User> {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({
    where: {
      userName: username
    }
  })
    
    if (user) {
      return user.id
    
    }
    return null
   
  

}
router.post('/getId', async(req: Request, res: Response) => {

  const userId = await getId( req.body.username)
  
  
    
    if (userId) {
     
      return res.status(200).send(String(userId));
      
    }
    if (userId == null ) {
      return res.status(401).send("No User found");
    } 
  })

router.post('/getFollower', async(req: Request, res: Response) => {
 const id = await getId(req.body.username);
  const subscriptionRepository = getRepository(Subscription);
  

  subscriptionRepository.find({
    where: {
      userId: id
    }
  }).then((follower) => {
   
    
    if (follower) return res.status(200).send(follower);
    return res.status(400).send("error")
  })
})


router.post('/follow', async (req: Request, res: Response) => {
  console.log(req.body);
  
   const id = await getId(req.body.username);
  const subscriptionRepository = getRepository(Subscription);
  const sub = {
    userId: id ,
    followerId : req.body.followerId

  }
  //@ts-ignore
  subscriptionRepository.save(sub)
  return res.sendStatus(200);
})

router.post('/getNotFollowedUser', async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  userRepository.find({
    take: 4
    , where:  `id != ${req.body.id}`
  }).then((data) => {
     
        return res.status(200).send(data);
     })

 
})


router.post('/unfollow', async(req: Request, res: Response) => {
   const id = await getId(req.body.username);
  const subscriptionRepository = getRepository(Subscription);
  
  const sub = {
     userId: id ,
    followerId : req.body.followerId

  }
   //@ts-ignore
  subscriptionRepository.delete(sub)
  return res.sendStatus(200);
})






router.post('/getFollowed', async(req: Request, res: Response) => {
  const id = await getId(req.body.username)
  const subscriptionRepository = getRepository(Subscription)
 subscriptionRepository.find({
    where: {
      followerId : id
    }
  }).then((followed) => {
    if (followed) return res.status(200).send(followed);
    return res.status(400).send("error")
  })
  
  
  
  

})



module.exports = router;