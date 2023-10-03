import { read, create, remove, update } from "../controller/automoveis";
import { Router } from "express";

export const router = Router();

router.get("/automoveis", read);
router.post("/automoveis", create);
router.put("/automoveis/:id", update);
router.delete("/automoveis/:id", remove);
