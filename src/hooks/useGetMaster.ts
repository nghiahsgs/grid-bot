import { getMasterData } from "@/apis/master";
import { useQuery } from "react-query";

function useGetMaster() {
  const query = useQuery("master-data", getMasterData, {
    staleTime: Infinity,
  });
  return query;
}

export default useGetMaster;
