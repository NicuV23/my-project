import * as React from "react";
import { BrandingSidebar } from "../components/BrandingSidebar";
import { AuthContainer } from "../components/AuthContainer";
export const AuthLayout = () => {
  return (
    <main className="bg-[#0a0a0a] min-h-screen w-full font-[Inter]">
      <div className="flex min-h-screen">
        <BrandingSidebar />
        <AuthContainer />
      </div>
    </main>
  );
};
