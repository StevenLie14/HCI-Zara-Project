import LoginForm from "@/components/login/login-form.tsx";
import LoginHeader from "@/components/login/login-header.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";

const LoginPage = () => {
  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader>
          <LoginHeader />
        </CardHeader>
        <CardContent className="pt-6">
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
