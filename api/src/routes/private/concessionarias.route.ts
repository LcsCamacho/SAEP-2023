import { read, create, remove, update } from "../../controller/concessionarias";
import { Router } from "express";
import { auth } from "../../middleware/auth";

export const router = Router();

router.get("/concessionarias", auth, read);
router.post("/concessionarias", auth, create);
router.put("/concessionarias/:id", auth, update);
router.delete("/concessionarias/:id", auth, remove);
