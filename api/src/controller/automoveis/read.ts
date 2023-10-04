import { Request, Response } from "express";
import { prisma } from "../../dao/prisma";

export const read = async (req: Request, res: Response) => {
  try {
    const automoveis = await prisma.automoveis.findMany({
      include: {
        Alocacao: true,
      },
    });
    res.json(automoveis);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Não foi possível listar os automóveis" });
  }
};
