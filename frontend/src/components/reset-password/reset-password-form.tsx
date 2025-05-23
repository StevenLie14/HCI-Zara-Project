import {useState} from "react";
import {useForm} from "react-hook-form";
import {type ResetPasswordRequest, resetPasswordSchema} from "@/models/dto/request/auth/reset-password-request.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import {Input} from "@/components/ui/input.tsx";
import {Eye, EyeOff} from "lucide-react";
import {useMutation} from "@tanstack/react-query";
import {AuthService} from "@/services/auth-service.ts";
import {ToastService} from "@/utils/toast.ts";
import {UserService} from "@/services/user-service.ts";


const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const otpMutation = useMutation({
    mutationFn: AuthService.getResetPasswordOtp,
    onSuccess: () => {
      setOtpSent(true)
      form.reset()
      ToastService.success("OTP sent successfully")
    },
    onError: (error) => {
      ToastService.error(error.message)
    },
  })

  const resetPasswordMutation = useMutation({
    mutationFn: UserService.changePassword,
    onSuccess: () => {
      ToastService.success("Password reset successfully")
    },
    onError: (error) => {
      ToastService.error(error.message)
    },
  })

  const form = useForm<ResetPasswordRequest>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      verificationCode: "",
      password: "",
    },
  })

  const onSubmit = (values: ResetPasswordRequest) => {
    resetPasswordMutation.mutate(values)
  }

  function sendOtp() {
    const email = form.getValues("email")
    if (!email || !email.includes("@")) {
      form.clearErrors()
      form.setError("email", {
        message: "Please enter a valid email address to receive the code",
      })
      return
    }
    otpMutation.mutate(email)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Email address</label>
                  <Input placeholder="your@email.com" type="email" className="bg-gray-50" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-1">
                  <label className="text-sm font-medium">OTP Code</label>
                  <div className="flex space-x-2">
                    <Input placeholder="Enter 6-digit code" className="bg-gray-50" {...field} />
                    <Button disabled={otpMutation.isPending || resetPasswordMutation.isPending} type="button" variant="outline" onClick={sendOtp} className="whitespace-nowrap">
                      {otpMutation.isPending ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
                    </Button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <Input
                      placeholder="Create a password"
                      type={showPassword ? "text" : "password"}
                      className="bg-gray-50 pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={resetPasswordMutation.isPending || otpMutation.isPending} type="submit" className="w-full">
          {resetPasswordMutation.isPending ? "Resetting Password..." : "Reset Password"}
        </Button>
        <div className="text-center text-sm">
          Remember your password?{" "}
          <Link to="/login" className="font-medium text-blue-500 hover:text-blue-600">
            Back to login
          </Link>
        </div>
      </form>
    </Form>
  )
}

export default ResetPasswordForm