import { routerPrivate } from "./private";
import { routerPublic } from "./public";
import { Router } from "express";

export const router = Router();

router.use(routerPublic);
router.use(routerPrivate);
