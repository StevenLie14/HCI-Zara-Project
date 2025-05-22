import LoginForm from "@/components/login/login-form.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import LoginHeader from "@/components/login/login-header.tsx";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="pt-6 pb-0">
          <LoginHeader  />
        </CardHeader>
        <CardContent className="pt-6">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage;