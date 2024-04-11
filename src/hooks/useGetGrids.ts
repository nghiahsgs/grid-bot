import { getGrids } from "@/apis/order";
import { useQuery } from "react-query";

function useGetGrids() {
  const query = useQuery(["list-grid"], getGrids);
  return query;
}

export default useGetGrids;
