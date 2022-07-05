const express = require('express');
// const { route, router } = require('../app');
const messageController = require('../controllers/messages_controllers');
const verification = require('../middlewares/verifications');
router = express.Router();


//ACOUNT ROUTER

router.post('/new_message',messageController.create_new_article);
router.post('/new_answer',messageController.create_new_answer);
router.get('/messages',messageController.showArticles);
router.get('/messages/:id',messageController.show1Article);
router.get('/messages/polling/:id',messageController.messagePollingList);
router.get('/messages/article_answer_list/:id',messageController.get_article_answers);
router.delete('/messages/:id',messageController.deleteMessage);

//POLLING
router.post('/messages/polling', messageController.polling);


// router.post('/login',authController.login);


//ca http://localhost.com::3306

// router("/list_message",)


module.exports = router;