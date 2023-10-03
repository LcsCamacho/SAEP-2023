import { read, create, remove, update } from "../../controller/automoveis";
import { Router } from "express";
import { auth } from "../../middleware/auth";

export const router = Router();

router.get("/automoveis", auth, read);
router.post("/automoveis", auth, create);
router.put("/automoveis/:id", auth, update);
router.delete("/automoveis/:id", auth, remove);
