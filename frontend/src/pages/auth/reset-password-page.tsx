import ResetPasswordForm from "@/components/reset-password/reset-password-form.tsx";
import ResetPasswordHeader from "@/components/reset-password/reset-password-header.tsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ResetPasswordPage = () => {
  return (
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
  );
};

export default ResetPasswordPage;
