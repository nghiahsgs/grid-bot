import { createGrids } from "@/apis/order";
import { useMutation } from "react-query";

function useCreateGrid() {
  const query = useMutation(createGrids);
  return query;
}

export default useCreateGrid;
