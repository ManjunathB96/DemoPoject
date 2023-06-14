import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth ,verifyRefreshToken} from '../middlewares/auth.middleware';
import passport from 'passport';
const router = express.Router();

//route to get all users
router.get('/getAll', userController.getAllUsers);

router.post('',newUserValidator, userController.userRegistration);

router.post('/login', userController.loginUser);


router.post('/refreshToken', verifyRefreshToken, userController.regenrateAccessToken);

//route to get a single user by their user id
router.get('/:_id', userAuth, userController.getUser);

//route to update a single user by their user id
router.put('/:_id', userController.updateUser);

//route to delete a single user by their user id
router.delete('/:_id', userController.deleteUser);

export default router;
