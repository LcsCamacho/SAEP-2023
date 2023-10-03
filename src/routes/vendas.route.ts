import { read, create, remove, update } from "../controller/vendas";
import { Router } from "express";

export const router = Router();

router.get("/vendas", read);
router.post("/vendas", create);
router.put("/vendas/:id", update);
router.delete("/vendas/:id", remove);
