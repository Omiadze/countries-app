import React, { PropsWithChildren } from "react";

import { Header } from "@components/header";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
