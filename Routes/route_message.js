const express = require('express');
// const { route, router } = require('../app');
const messageController = require('../controllers/messages_controllers');
const verification = require('../middlewares/verifications');
router = express.Router();


//ACOUNT ROUTER

router.post('/new_message',messageController.create_new_article);
router.get('/messages',messageController.showArticles);
router.get('/messages/:id',messageController.show1Article);
router.delete('/messages/:id',messageController.deleteMessage);


// router.post('/login',authController.login);


//ca http://localhost.com::3306

// router("/list_message",)


module.exports = router;