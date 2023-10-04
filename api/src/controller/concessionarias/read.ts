import { Request, Response } from "express";
import { prisma } from "../../dao/prisma";

export const read = async (req: Request, res: Response) => {
  try {
    const concessionarias = await prisma.concessionarias.findMany();
    res.status(200).json(concessionarias);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Não foi possível listar as concessionárias" });
  }
};

export const readByIdVehicle = async (req: Request, res: Response) => {
  try {
    const concessionarias = await prisma.concessionarias.findMany({
      where: {
        Alocacao: {
          some: {
            automovelId: {
              equals: Number(req.params.id),
            },
          },
        },
      },
      include: {
        Alocacao: true,
      },
    });
    res.status(200).json(concessionarias);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Não foi possível listar as concessionárias" });
  }
};
