import { read, create, remove, update } from "../../controller/alocacao";
import { Router } from "express";
import { auth } from "../../middleware/auth";

export const router = Router();

router.get("/alocacao", auth, read);
router.post("/alocacao", auth, create);
router.put("/alocacao/:id", auth, update);
router.delete("/alocacao/:id", auth, remove);
