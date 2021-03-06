const Post = require("../Models/Post");


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                          //
    // NOTE:                                                                                                    //
    // Originally planned to implement some sort of a customer review system but that probably won't be         //
    // done since I've done similar things in other projects and don't see the learning value. Backend code is  //
    // here in any case.                                                                                        //
    //                                                                                                          //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////


exports.getPosts = async (req, res) => {
  try {
    let foundPosts = await Post.find();
    return res.status(200).json({ posts: foundPosts });
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching posts from DB",
      error: err,
      status: "failure",
    });
  }
};

exports.createPost = async (req, res) => {
  const post = new Post({
    ...req.body,
  });

  try {
    savedPost = await post.save();

    return res
      .status(201)
      .json({
        Message: "Your post was successfully created",
        post: savedPost,
        status: "success",
      });
  } catch (err) {
    return res.status(500).json({
      Message: "There was an error in creating your post",
      error: err,
      status: "failure",
    });
  }
};

exports.deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    deletedPost = await Post.findByIdAndDelete({ _id: postId });
    if (!deletedPost) {
      return res
        .status(204)
        .json({
          message: "Could not find the post",
          error: "No post found",
          status: "failure",
        });
    }
    return res
      .status(200)
      .json({ message: "Post deleted", post: deletedPost, status: "success" });
  } catch (err) {
    return res
      .status(500)
      .json({
        message: "Error in deleting your post",
        error: err,
        status: "failure",
      });
  }
};

exports.findById = async (req, res) => {
  const { postId } = req.params;

  try {
    const foundPost = await Post.findById({ _id: postId });

    if (!foundPost)
      return res
        .status(204)
        .json({
          message: "No post was found in the DB",
          error: "No post found",
          status: "failure",
        });
    return res
      .status(200)
      .json({ message: "Post found", post: foundPost, status: "success" });
  } catch (err) {
    return res
      .status(500)
      .json({
        message: "There was a server-side error in finding the post",
        error: err,
        status: "failure",
      });
  }
};

exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, content, author } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: postId },
      { title, content, author }
    );
    if (!updatedPost)
      return res
        .status(400)
        .json({
          message: "Post was not updated",
          error: "No post found",
          status: "failure",
        });
    return res
      .status(200)
      .json({
        message: "Post was updated",
        post: updatedPost,
        status: "success",
      });
  } catch (err) {
    return res
      .status(500)
      .json({
        message: "Post was not updated due to a server-side error",
        error: err,
        status: "failure",
      });
  }
};
