import BackButton from "@/components/back-button.tsx";
import { UserPlus } from "lucide-react";

const RegisterHeader = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-full">
        <BackButton />
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full">
        <UserPlus className="h-6 w-6" />
      </div>
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-semibold tracking-tight">Register</h1>
        <p className="text-sm text-muted-foreground">
          Let's get you started with an account
        </p>
      </div>
    </div>
  );
};

export default RegisterHeader;
