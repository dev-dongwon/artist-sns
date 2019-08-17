const express         = require('express'),
      router          = express.Router(),
      indexController = require('../controller/index-controller'),
      authMiddlewares = require('../middlewares/auth')

router.get('/', indexController.home);

router.get('/signin', indexController.signin);

router.get('/signup', indexController.signup);

router.get('/forgotpassword', indexController.forgotpassword);

router.get('/discover', indexController.discover);

router.get('/following', authMiddlewares.isLoggedIn, indexController.following);

module.exports = router;
