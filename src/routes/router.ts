import { routerPrivate } from "./private";
import { routerPublic } from "./public";
import { Router } from "express";
import { router as alocacaoRouter } from "./alocacao.route";
import { router as automoveisRouter } from "./automoveis.route";
import { router as clientesRouter } from "./clientes.route";
import { router as concessionariasRouter } from "./concessionarias.route";
import { router as vendasRouter } from "./vendas.route";

export const router = Router();

<<<<<<< HEAD
router.use(alocacaoRouter);
router.use(automoveisRouter);
router.use(clientesRouter);
router.use(concessionariasRouter);
router.use(vendasRouter);
=======
router.use(routerPublic);
router.use(routerPrivate);
>>>>>>> 0e38b9fe14f07aa9673992376fa8a887c6938828
