import { ReactFCWithChildren } from "lib/types";
import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";

const Layout: ReactFCWithChildren = ({ children }) => {
  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <Header />
      <div className="min-h-screen w-full">
        <main className="w-10/12 max-w-[1440px] m-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
