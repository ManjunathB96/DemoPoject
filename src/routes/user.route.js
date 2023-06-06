import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import passport from 'passport';
const router = express.Router();
require('../utils/passport');


//middleware fun
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get('/', (req, res) => {
  res.send('<a herf="/auth/google">Authentication with google </a>');
});

router.get('/auth/google',passport.authenticate('google', { scope: ['email', 'profile'] }));

 // callback route for google to redirect to
 // hand control to passport to use code to grab profile info
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure'
  })
);
router.get('/protected', isLoggedIn, (req, res) => {
    console.log("User login  details-----",req.user);
    res.send("Hello")
});
router.get('/auth/failure', (req, res) => {
  res.send('somthing went wrong');
});

router.get('/logout',(req,res)=>{
    req.logOut()
    res.send('Good Bye!')
})

/********************************************************** */
//route to get all users
router.get('/getAll', userController.getAllUsers);

//route to create a new user
router.post('', newUserValidator, userController.newUser);

router.post('/details', userController.userRegistration);

//route to get a single user by their user id
router.get('/:_id', userAuth, userController.getUser);

//route to update a single user by their user id
router.put('/:_id', userController.updateUser);

//route to delete a single user by their user id
router.delete('/:_id', userController.deleteUser);
//************************************************************ */

export default router;
