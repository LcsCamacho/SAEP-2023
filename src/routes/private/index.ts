import { Router } from "express";
import { router as alocacaoRouter } from "./alocacao.route";
import { router as automoveisRouter } from "./automoveis.route";
import { router as clientesRouter } from "./clientes.route";
import { router as concessionariasRouter } from "./concessionarias.route";
import { router as vendasRouter } from "./vendas.route";

export const routerPrivate = Router();

routerPrivate.use(alocacaoRouter);
routerPrivate.use(automoveisRouter);
routerPrivate.use(clientesRouter);
routerPrivate.use(concessionariasRouter);
routerPrivate.use(vendasRouter);
