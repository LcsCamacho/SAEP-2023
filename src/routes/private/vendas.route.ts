import { read, create, remove, update } from "../../controller/vendas";
import { Router } from "express";
import { auth } from "../../middleware/auth";

export const router = Router();

router.get("/vendas", auth, read);
router.post("/vendas", auth, create);
router.put("/vendas/:id", auth, update);
router.delete("/vendas/:id", auth, remove);
