const express = require('express'); 
const router = express.Router();

const userController = require('../controllers/users_controller');
router.get('/profile',userController.profile);
router.get('/privacy',userController.privacy);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

router.post('/create', userController.create);


module.exports = router 