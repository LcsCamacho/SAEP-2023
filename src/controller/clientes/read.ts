import { Request, Response } from "express";
import { prisma } from "../../dao/prisma";

export const read = async (req: Request, res: Response) => {
  try {
    const clientes = await prisma.clientes.findMany({});
    res.json(clientes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Não foi possível listar os clientes" });
  }
};
