import { updateUserInfo } from "@/apis/authen";
import loadingState from "@/stores/loading";
import toastState from "@/stores/toast";
import { QueryClient, useMutation } from "react-query";
import { useSetRecoilState } from "recoil";

function useUpdateUserInfo() {
  const queryClient = new QueryClient();
  const setToastState = useSetRecoilState(toastState);

  const query = useMutation("update-user-info", updateUserInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries("user-info");
      setToastState({
        message: "Update user information successfully",
        type: "info",
      });
    },
  });
  return query;
}

export default useUpdateUserInfo;
