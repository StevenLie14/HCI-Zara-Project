import {Mail} from "lucide-react";
import BackButton from "@/components/back-button.tsx";

const ResetPasswordHeader = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-full">
        <BackButton />
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <Mail className="h-6 w-6 text-gray-600" />
      </div>
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-semibold tracking-tight">Forgot your password?</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
    </div>
  )
}

export  default ResetPasswordHeader