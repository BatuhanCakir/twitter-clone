import { Bookmarked } from './../entity/Bookmarked';
import express, { Request, Response, } from 'express';
import { getRepository } from "typeorm";

const auth = require('./auth').authenticateToken; 
const router = express.Router();


router.post('/add', auth , (req: Request, res: Response) => {
  const bookmarkRepository = getRepository(Bookmarked);
  const bookmark= {
    userId: req.body.userId,
    tweetId : req.body.tweetId

  }
  
  bookmarkRepository.save(bookmark)
  return res.sendStatus(200);
  
})

router.post('/delete',auth, (req: Request, res: Response) => {
  
  const bookmarkRepository = getRepository(Bookmarked);
  

  bookmarkRepository.findOne({
    where: {
       userId: req.body.userId,
      tweetId : req.body.tweetId

    }
  }).then((bookmark) => {
    if (bookmark) {
      console.log('ksks');
      
       bookmarkRepository.delete(bookmark.id)
      
      return res.sendStatus(200);
    }
       
  })
 
})

router.post('/isBookmarked',auth, async(req: Request, res: Response) => {
  const bookmarkRepository = getRepository(Bookmarked);
  bookmarkRepository.findOne({
    where: {
       userId: req.body.userId,
      tweetId : req.body.tweetId

    }
  }).then((bookmark) => {
    if (bookmark) {
      return res.status(200).send(true);
    } else {
       return res.status(200).send(false);
    }
   
  }) 
})
router.post('/getBookmark',auth, async(req: Request, res: Response) => {
  
  const bookmarkRepository = getRepository(Bookmarked);
  bookmarkRepository.find({
    where: {
       userId: req.body.userId,

    }, relations: ["tweet"]
    , order : {createdAt:"DESC"}
  }).then((bookmark) => {
    console.log(bookmark);
    if (bookmark) {
      return res.status(200).send(bookmark);
    } else {
       return res.status(200).send("error");
    }    
  }) 
})


module.exports = router;