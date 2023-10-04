import { Request, Response } from "express";
import { prisma } from "../../dao/prisma";
import { Vendas } from "@prisma/client";

export const create = async (req: Request, res: Response) => {
  const { clienteId, alocacaoId }: Vendas = req.body;

  try {
    const venda = await prisma.vendas.create({
      data: {
        clienteId,
        alocacaoId,
      },
    });

    return res.json(venda);
  } catch (error) {
    console.info(error);
    return res.status(400).json({ error: "Erro ao criar uma venda" });
  }
};
