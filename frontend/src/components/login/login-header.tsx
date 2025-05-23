import BackButton from "@/components/back-button.tsx";
import { User2 } from "lucide-react";

const LoginHeader = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-full">
        <BackButton />
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full">
        <User2 className="h-6 w-6 " />
      </div>
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Sign in to your account
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;
