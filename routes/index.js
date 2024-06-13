const express = require('express'); 

const router = express.Router();
const homeController = require('../controllers/home_controller')
const postController = require('../controllers/posts_controller')

console.log('router loaded');

router.get('/', homeController.home)
router.get('/posts',postController.post)
router.get('/index', homeController.index) 
router.use('/users',require('./users'))



//for any further routes, access from here
// router.use('/routerName', require(./routerfile));


 


module.exports = router