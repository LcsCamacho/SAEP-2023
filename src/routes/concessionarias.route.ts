import { read, create, remove, update } from "../controller/concessionarias";
import { Router } from "express";

export const router = Router();

router.get("/concessionarias", read);
router.post("/concessionarias", create);
router.put("/concessionarias/:id", update);
router.delete("/concessionarias/:id", remove);
