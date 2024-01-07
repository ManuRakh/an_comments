const { Op } = require("sequelize");
const commentsModel = require("../../models/comments");

const createComment = async (params) => {
    const {file_ids, ...updatedParams} =  params;
    const fileIds = JSON.stringify(file_ids || []);

    const comment = await commentsModel.create({
        ...updatedParams,
        file_ids: fileIds,
      }, {
        returning: true,
      });
    
      console.log("comment created");
    
      return comment ? comment.get() : null;
}

const updateComment = async (params, id) => {
    const {file_ids, ...updatedParams} =  params;
    const fileIds = JSON.stringify(file_ids || []);
    console.log({updatedParams, id});
    const updatedComment = await commentsModel.update({
        ...updatedParams,
        file_ids: fileIds,
      }, {
          where :{
            id: {
              [Op.eq]: id
            }
          }
      }, {
        returning: true,
      });
    
      console.log("comment updated");
    
    return updatedComment;
}

const getComment = async (id) => {
    const foundComment = await commentsModel.findOne({
        where :{
          id: {
            [Op.eq]: id
          }
        }
      });
    
      return foundComment ? foundComment.get() : null; 
}

const getCommentsByRequest = async (id) => {
    const foundComment = await commentsModel.findAll({
        where :{
          request_id: {
            [Op.eq]: id
          },
          deletedAt : null,
        }
      });
    
      return foundComment; 
}

const deleteComment = async (id) => {
    return await updateComment({ deletedAt: new Date(), id});
}

module.exports = {
    createComment, 
    updateComment, 
    getComment, 
    deleteComment,
    getCommentsByRequest
}