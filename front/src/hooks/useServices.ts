import { LocacaoProps } from "@/pages/types";
import { useAxios } from "./useAxios";

interface efetuarVendasProps {
  quantidade: number;
  locacaoId: number;
  clienteId: number | undefined;
}

export const useServices = () => {
  const { api } = useAxios();

  const getLocacao = async () =>
    (await api.get<LocacaoProps[]>("/alocacao")).data;

  const getConcessionarias = async () =>
    (await api.get("/concessionarias")).data;

  const getClientes = async () => (await api.get("/clientes")).data;

  const efetuarVenda = async ({
    quantidade,
    locacaoId,
    clienteId,
  }: efetuarVendasProps) => {
    const responseLocacao = await api.post("/alocacao", {
      quantidade: quantidade,
      id: locacaoId,
    });
    const responseVenda = await api.post("vendas", {
      clienteId: clienteId,
      alocacaoId: locacaoId,
    });
    console.log({ responseLocacao, responseVenda });
    return { responseLocacao, responseVenda };
  };

  return { getLocacao, getConcessionarias, getClientes, efetuarVenda };
};
