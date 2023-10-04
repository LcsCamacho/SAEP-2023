import { Request, Response } from "express";
import { prisma } from "../../dao/prisma";

export const read = async (req: Request, res: Response) => {
  try {
    const alocacoes = await prisma.alocacao.findMany({
      include: {
        automovel: true,
        concessionaria: true,
      },
    });

    return res.json(alocacoes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Não foi possível listar as alocações" });
  }
};
