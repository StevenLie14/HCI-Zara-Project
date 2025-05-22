import { Card, CardContent, CardHeader } from "@/components/ui/card"
import ResetPasswordHeader from "@/components/reset-password/reset-password-header.tsx";
import ResetPasswordForm from "@/components/reset-password/reset-password-form.tsx";

const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="pt-6 pb-0">
          <ResetPasswordHeader />
        </CardHeader>
        <CardContent className="pt-6">
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPasswordPage;
