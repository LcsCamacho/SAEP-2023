import { read, create, remove, update } from "../controller/alocacao";
import { Router } from "express";

export const router = Router();

router.get("/alocacao", read);
router.post("/alocacao", create);
router.put("/alocacao/:id", update);
router.delete("/alocacao/:id", remove);
