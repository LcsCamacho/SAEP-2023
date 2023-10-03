import { read, create, remove, update } from "../controller/clientes";
import { Router } from "express";

export const router = Router();

router.get("/clientes", read);
router.post("/clientes", create);
router.put("/clientes/:id", update);
router.delete("/clientes/:id", remove);
