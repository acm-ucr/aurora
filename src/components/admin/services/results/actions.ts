import { api } from "@/utils/api";

export const getResults = async () => {
  const { items } = await api({
    method: "GET",
    url: `/api/results`,
  });

  return items;
};
