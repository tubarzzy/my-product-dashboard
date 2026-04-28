import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/products");
      return res.data;
    },
  });
};