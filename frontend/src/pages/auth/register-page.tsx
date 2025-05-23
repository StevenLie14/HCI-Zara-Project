import RegisterForm from "@/components/register/register-form.tsx";
import RegisterHeader from "@/components/register/register-header.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";

const RegisterPage = () => {
  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader>
          <RegisterHeader />
        </CardHeader>
        <CardContent className="pt-6">
          <RegisterForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default RegisterPage;
