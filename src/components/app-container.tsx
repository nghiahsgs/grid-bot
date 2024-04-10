import { Props } from "@/pages/_app";
import Toast from "./alert";
import { ReactNode } from "react";
import AppLayout from "@/layouts/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSetRecoilState } from "recoil";
import toastState, { IToast } from "@/stores/toast";

export function AppContainer({ Component, pageProps }: Props) {
  const setToast = useSetRecoilState<IToast>(toastState);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        onError: (error: any) => {
          setToast({ type: "error", message: error?.data?.detail });
        },
      },
      mutations: {
        retry: false,
        onError: (error: any) => {
          setToast({ type: "error", message: error?.data?.detail });
        },
      },
    },
  });

  const getLayout =
    Component.getLayout || ((page: ReactNode) => <AppLayout>{page}</AppLayout>);

  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
      <Toast />
    </QueryClientProvider>
  );
}
