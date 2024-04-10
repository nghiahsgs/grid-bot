import { getUserInfo } from "@/apis/authen";
import { useQuery } from "react-query";

function useGetUserInfo() {
  const query = useQuery("user-info", getUserInfo);
  return query;
}

export default useGetUserInfo;
