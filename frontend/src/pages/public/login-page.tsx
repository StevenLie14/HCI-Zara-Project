import LoginForm from "@/components/login/login-form.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import LoginHeader from "@/components/login/login-header.tsx";
import {AuthHeader} from "@/components/auth-navbar.tsx";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AuthHeader title="Login" showBackButton={false}/>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-sm">
          <CardHeader>
            <LoginHeader  />
          </CardHeader>
          <CardContent className="pt-6">
            <LoginForm />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default LoginPage;