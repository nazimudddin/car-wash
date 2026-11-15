import { Header } from "@/components/shered/Header";
import { Navbar } from "@/components/shered/Navbar";
import React from "react";

const RootLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <Header></Header>
      <Navbar></Navbar>
      {children}
    </div>
  );
};

export default RootLayoutPage;
