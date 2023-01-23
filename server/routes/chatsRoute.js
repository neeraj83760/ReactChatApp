const router = require('express').Router();
const Chat = require('../models/chatModels');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new Chat 

router.post('create-new-chat', authMiddleware, async (req, res) => {

    try {
        
    const newChat = new Chat(req.body); 
    const savedChat = await newChat.save();
    res.send({

        success:true,
        message: 'Chat created sucessfully!!',
        data: savedChat, 
    })      

    } catch (error) {

        res.send({
        success:false,
        message: 'Error Creating Chat',
        error: error.message, 
       
        })
        
    }


})

// Get all chats of the current User 

router.get("/get-all-chats", authMiddleware, async (req, res) => {

    try {
       const chats = await Chat.find({members: {$in : [req.body.userId]}});
       res.send({
       success:true,
       message:"Chat fetched Sucessfully",
       data: chats, 
       }); 
        
    } catch (error) {
      
      res.send({
      success:false, 
      message:"Error fetching chats",
      error:error.message,
      });  
        
    }
})

module.exports = router; 

