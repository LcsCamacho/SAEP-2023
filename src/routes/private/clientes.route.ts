import { read, create, remove, update } from "../../controller/clientes";
import { Router } from "express";
import { auth } from "../../middleware/auth";

export const router = Router();

router.get("/clientes", auth, read);
router.post("/clientes", auth, create);
router.put("/clientes/:id", auth, update);
router.delete("/clientes/:id", auth, remove);
