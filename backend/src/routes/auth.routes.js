import {Router} from "express"
import {protectRoute} from "../middilewear/protectroute.middilewear.js"
import {registeruser,login,verifyOtp,logout,check_auth} from "../controller/auth.controller.js"
const router = Router();

router.route("/Signup").post(registeruser);
router.route("/login").post(login);
router.route("/verify").post(protectRoute,verifyOtp);
router.route("/logout").post(logout);
router.route("/check" ).get(protectRoute,check_auth)

export const authroutes = router;










