import express from 'express'
import { getFeedPosts, getUserPosts, likePost } from '../controllers/posts.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

/* READ */
router.get('/', verifyToken, getFeedPosts) //grab user feed when on their homepage, homepage will give you all the posts.
router.get('/:userId/posts', verifyToken, getUserPosts) //grab the posts of the user on their porfile page

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost); //for liking and unliking a post

export default router;