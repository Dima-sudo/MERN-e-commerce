const Post = require("../Models/Post");


exports.getPosts = async (req, res) => {
  try {
    let foundPosts = await Post.find();
    return res.status(200).json({ posts: foundPosts });
  } catch (err) {
    return res.status(500).json({
      message: "There is an error in dislaying the posts",
      error: err
    });
  }
};

exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;

  const post = new Post({
    title,
    content,
    author
  });

  try {
    savedPost = await post.save();

    return res
      .status(201)
      .json({ Message: "Your post was successfully created", post: savedPost });
  } catch (err) {
    return res.status(500).json({
      Message: "There was an error in creating your post",
      error: err
    });
  }
};

exports.deletePost = async (req, res) => {
  console.log(req.params)
  const { postId } = req.params;

  try {
    deletedPost = await Post.findByIdAndDelete({_id: postId});
    if (!deletedPost) {
      return res.status(204).json({ message: "Could not find the post" });
    }
    return res.status(200).json({ message: "Post deleted", post: deletedPost });

  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error in deleting your post", error: err });
  }
};

exports.findById = async (req, res) => {
    const {postId} = req.params;

    try{
        const foundPost = await Post.findById({_id: postId});

        if(!foundPost) return res.status(204).json({message: "Post not found in db"});
        return res.status(200).json({message: "Post found", post: foundPost});
    }
    catch(err){
        return res.status(500).json({message: "There was a server-side error in finding the post", error: err});
    }
}

exports.updatePost = async (req, res) => {
    const {postId} = req.params;
    const {title, content, author} = req.body;

    try{
       const updatedPost = await Post.findByIdAndUpdate({_id: postId}, {title, content, author});
       console.log(updatedPost);
       if(!updatedPost) return res.status(400).json({message: "Post was not updated"});
       return res.status(200).json({message: "Post was updated", post: updatedPost});
    }
    catch(err){
        return res.status(500).json({message: "Post was not updated due to a server-side error", error: err});
    }
}