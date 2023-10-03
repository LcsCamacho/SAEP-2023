import { create, update, remove, read } from "../../controller/example";
import { Router } from "express";
import { auth } from "../../middleware/auth";

export const routerPrivate = Router();

router.get("/", auth, read);
router.post("/", auth, create);
router.put("/", auth, update);
router.delete("/", auth, remove);
