import * as React from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const AuthContainer = () => {
  const [currentView, setCurrentView] = React.useState("login");

  const renderForm = () => {
    switch (currentView) {
      case "login":
        return <LoginForm onViewChange={setCurrentView} />;
      case "register":
        return <RegisterForm onViewChange={setCurrentView} />;
      case "forgot":
        return <ForgotPasswordForm onViewChange={setCurrentView} />;
      default:
        return null;
    }
  };

  return (
    <section className="w-full lg:w-2/3 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-b from-[#1c1c1c] to-[#111] rounded-2xl p-8 shadow-xl border border-gray-800">
          {renderForm()}
        </div>
      </div>
    </section>
  );
};
