import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.get('/sign-up', AuthControllers.createUser)

export const AuthRoutes = router
