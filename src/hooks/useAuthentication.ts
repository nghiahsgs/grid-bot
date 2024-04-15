import { registerAccount, loginAccount } from "@/apis/authen";
import loadingState from "@/stores/loading";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";

function useAuthentication() {
  const setLoadingState = useSetRecoilState(loadingState);
  const register = useMutation(registerAccount, {
    onSuccess: () => {
      setLoadingState(false);
    },
  });
  const login = useMutation(loginAccount, {
    onSuccess: (data) => {
      setLoadingState(false);
      console.log({ data });
    },
  });
  return { register, login };
}

export default useAuthentication;
