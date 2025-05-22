import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft, User2} from "lucide-react";

const LoginHeader = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="absolute left-4 top-4">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <User2 className="h-6 w-6 text-gray-600" />
      </div>
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Sign in to your account
        </p>
      </div>
    </div>
  )
}

export default LoginHeader;