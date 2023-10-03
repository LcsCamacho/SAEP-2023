import { Request, Response } from "express";
import { prisma } from "../../dao/prisma";
import { Alocacao } from "@prisma/client";

export const create = async (req: Request, res: Response) => {
  const { quantidade, id }: Alocacao = req.body;
  const alocacao = await prisma.alocacao.update({
    where: {
      id,
    },
    data: {
      quantidade: quantidade - 1,
    },
  });

  res.json(alocacao);
};
