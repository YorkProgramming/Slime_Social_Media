import Post from '../models/Post.js';
import User from '../models/User.js';

/* Create */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);             // 201 is successful creation

    } catch (err) {
        res.status(409).json({ error: err.message });      // 409 is conflict
    }
};

/* Read */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);        // 200 is successful retrieval
    } catch (err) {
        res.status(404).json({ error: err.message });      // 404 is not found
    }
        
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ error: err.message });
    }
};

/* Update */
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;          // id is the post id
        const { userId } = req.body;        // userId comes from the body of the request
        const post = await Post.findById(id);   
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);      // deletes the like from the map if it is liked
        } else {
            post.likes.set(userId, true);   // adds a like if it is not liked
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },        // updates the likes in the post
            { new: true }               // returns the updated post
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};


/* Delete */
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.userId.toString() !== userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        await Post.findByIdAndDelete(postId);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};