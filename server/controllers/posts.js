import Post from '../models/Post.js'
import User from '../models/User.js';

/* CREATE */
export const createPost = async (req, res)=>{
    try{
        const { userId, description, picturePath } = req.body; //userId the user who is posting it  //coming from frontend
        const user = await User.findById(userId);

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath, //profile picture
            picturePath, //picture that is posted
            likes: {},
            comments: []
        })

        await newPost.save(); //saved post

        const post = await Post.find(); //find all the saved posts

        res.status(201).json(post); // returning all the posts in the collection

        //NOTE
        //IF YOU WANT to return only the post that you have just saved, use this instead
        
        // await newPost.save();
        // res.status(201).json(newPost);


    }catch(err){
        res.status(409).json({message:err.message})
    }
}

/* READ */
export const getFeedPosts = async (req,res) => {
    try{
        const post = await Post.find();
        res.status(200).json(post)
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

//Find all posts of a user
export const getUserPosts = async (req,res) =>{
    try{
        const { userId } = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post)
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

/* UPDATE */
export const likePost = async (req,res)=>{
    try{
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId) //if user id exists hence it has been liked by that user
        
        if(isLiked){
            post.likes.delete(userId); //if it exists we will delete it , unliked
        } else{ //if not exist add it, liked
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes } , //passing the new likes into the post
            { new : true }
        );

        res.status(200).json(updatedPostost)
    }catch(err){
        res.status(404).json({message:err.message})
    }
}