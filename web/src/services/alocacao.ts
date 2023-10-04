import { useAxios } from "@/hooks/useAxios";

export const alocacaoService = {
  read: async () => {
    const { api } = useAxios();
    const { data } = await api.get("/alocacao");
    return data;
  },
  create: () => {},
};
