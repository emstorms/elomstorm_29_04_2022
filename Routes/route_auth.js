const express = require('express');
// const  router  = require('../app');
// const { route, router } = require('../app');
// const authController = require('../controllers/auth_controllers');
// const verification = require('../middlewares/verifications');
const authController = require('../controllers/auth_controllers');
const verification = require('../middlewares/verifications');
router = express.Router();


//ACOUNT ROUTER
router.post('/signup',authController.subscription);
router.post('/login',authController.login);
router.get('/users_info', authController.getUsers);
router.delete('/user/:id', authController.deleteUser);


//ca http://localhost.com::3306

// router("/list_message",)


module.exports = router;