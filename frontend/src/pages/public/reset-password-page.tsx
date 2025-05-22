import { Card, CardContent, CardHeader } from "@/components/ui/card"
import ResetPasswordHeader from "@/components/reset-password/reset-password-header.tsx";
import ResetPasswordForm from "@/components/reset-password/reset-password-form.tsx";
import {AuthHeader} from "@/components/auth-navbar.tsx";

const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AuthHeader title="Login" showBackButton={false}/>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-sm">
          <CardHeader>
            <ResetPasswordHeader />
          </CardHeader>
          <CardContent className="pt-6">
            <ResetPasswordForm />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default ResetPasswordPage;
