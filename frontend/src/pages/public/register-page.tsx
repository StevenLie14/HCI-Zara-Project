import RegisterForm from "@/components/register/register-form.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import RegisterHeader from "@/components/register/register-header.tsx";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="pt-6 pb-0">
          <RegisterHeader />
        </CardHeader>
        <CardContent className="pt-6">
          <RegisterForm />
        </CardContent>
      </Card>

    </div>
  )
}

export default RegisterPage;