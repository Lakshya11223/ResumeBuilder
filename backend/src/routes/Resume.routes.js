import {Router} from "express"
import {createResume,updateResume,deleteResume,getallresume,getresumebyid} from "../controller/Resume.controller.js"
import {protectRoute } from "../middilewear/protectroute.middilewear.js"
const router = Router();

router.route("/create").post(protectRoute,createResume);
router.route("/update/:id").put(updateResume);
router.route("/delete/:id").post(protectRoute,deleteResume);
router.route("/all").get(protectRoute,getallresume);
router.route("/get/:id").get(protectRoute,getresumebyid)

export const resumeroutes = router;