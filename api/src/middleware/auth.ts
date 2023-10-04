import { Request, Response, NextFunction } from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || token !== "123456")
      return res.status(401).json({ error: "Não autorizado" });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Não foi possível autenticar" });
  }
};
