import {Router} from "express";
import { getUsers, userPostLogin,userPostRegister} from "../controllers/userController.js"
import authenticate from "../middleware/auth.js";



const router = Router();

/**GET METHODS */
router.get('/users',authenticate,getUsers)
/**POST METHODS */
router.post('/user/register',userPostRegister)
router.post('/user/login',userPostLogin)

/**PUT METHODS */

/**DELETE METHODS */

export default router;