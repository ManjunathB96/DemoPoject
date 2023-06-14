import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth ,verifyRefreshToken} from '../middlewares/auth.middleware';
const router = express.Router();

//route to get all users
router.get('/getAll', userController.getAllUsers);

//route to  create new user
router.post('',newUserValidator, userController.userRegistration);

//route to  user login
router.post('/login', userController.loginUser);

//route to generate access token
router.post('/refreshToken', verifyRefreshToken, userController.generateAccessToken);

//route to get a single user by their user id
router.get('/:_id', userAuth, userController.getUser);

//route to update a single user by their user id
router.put('/:_id', userController.updateUser);

//route to delete a single user by their user id
router.delete('/:_id', userController.deleteUser);

export default router;
