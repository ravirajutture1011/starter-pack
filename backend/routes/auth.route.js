import express from "express"
import { login , getData} from "../controllers/auth.controller.js";

const router = express.Router()

router.post('/login',login);
router.post('/getdata' , getData);


export default router
