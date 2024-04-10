import { AppContainer } from "@/components/app-container";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export type Props = AppProps & {
  Component: Page;
};

export default function App(props: Props) {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <AppContainer {...props} />
    </RecoilRoot>
  );
}
