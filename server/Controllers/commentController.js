const Comment = require('../Models/Comment');
const Product = require('../Models/AbstractProduct')


exports.create = async (req, res) => {
    const {itemId} = req.params;
    const createdBy = req.User.id;

    const comment = new Comment({
        ...req.body, createdBy
    })

    try{
       const foundProduct = await Product.findOne({_id: itemId});
       if(!foundProduct) return res.status(200).json({message: "No item found", status: "success"});

       await comment.save();
       await foundProduct.comments.push(comment);
       await foundProduct.save();
       return res.status(201).json({message: "Comment created", comment: comment, status: "success"});
    }
    catch(err){
       return res.status(500).json({message: "Error during comment creation", error: err, status: "failure"});
    }
}

exports.delete = async (req, res) => {
    const {itemId, commentId} = req.params;

    try{
        const foundProduct = await Product.findOne({_id: itemId});
        const deletedComment = await Comment.findOneAndDelete({_id: commentId});

        if(!foundProduct) return res.status(200).json({message: "No product found", status: "success"});
        if(!deletedComment) return res.status(200).json({message: "No comment found", status: "success"});

        // Index of deleted comment. First delete comment from db then delete reference from product.
        const index = foundProduct.comments.indexOf(`${commentId}`);
        foundProduct.comments.splice(index, 1);
        await foundProduct.save();

        return res.status(200).json({message: "Comment deleted", comment: deletedComment, status: "success"});

    }
    catch(err){
        return res.status(500).json({message: "Error during comment deletion", error: err, status: "failure"});
    }
}

exports.findById = async (req, res) => {
    const {commentId} = req.params;

    try{
    const foundComment = await Comment.findById({_id: commentId});
    if(!foundComment) return res.status(200).json({message: "No comment found", status: "success"});

    return res.status(200).json({message: "Comment found", comment: foundComment, status: "success"});
    }
    catch(err){
        return res.status(500).json({message: "Error finding the comment", error: err, status: "failure"});
    }
}

exports.update = async (req, res) => {

    const {itemId, commentId} = req.params;

    try{
        const foundComment = await Comment.findOne({_id: commentId});
        const foundProduct = await Product.findOne({_id: itemId});
        
        const updatedComment = {
            ...req.body, created: foundComment.created, createdBy: foundComment.createdBy
        }

        // Replace original comment with the updated one
        foundProduct.comments.forEach((comment, i) => {
            if(comment._id.toString() === foundComment._id.toString()){
                foundProduct.comments[i] === updatedComment;
            }
        });

        // Comments are tracked as a seperate collection as well as inside in the product object
        await Comment.findByIdAndUpdate({_id: commentId}, updatedComment, {useFindAndModify: false});
        // Save the product with the updated comment 
        await foundProduct.save();

        // console.log(foundProduct.comments[0])

        return res.status(201).json({message: "The comment was updated", comment: updatedComment, status: "success"});

    }
    catch(err){
        console.log(err.message)
        return res.status(500).json({message: "Error updating the comment", error: err, status: "failure"});
    }

}

exports.findByEmail = async (req, res) => {
    // @TODO
}