import { getListOrder } from "@/apis/order";
import { useQuery } from "react-query";

function useGetOrder() {
  const query = useQuery("order", getListOrder);
  return query;
}

export default useGetOrder;
