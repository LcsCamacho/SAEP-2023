import { Request, Response } from "express";
import { prisma } from "../../dao/prisma";

export const read = async (req: Request, res: Response) => {
  try {
    const vendas = await prisma.vendas.findMany({
      include: {
        Alocacao: true,
        cliente: true,
      },
    });

    return res.json(vendas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Não foi possível listar as alocações" });
  }
};
