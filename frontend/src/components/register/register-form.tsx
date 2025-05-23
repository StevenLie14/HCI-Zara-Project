import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import {type RegisterRequest, registerSchema} from "@/models/dto/request/auth/register-request.ts";
import {useMutation} from "@tanstack/react-query";
import {ToastService} from "@/utils/toast.ts";
import {AuthService} from "@/services/auth-service.ts";
import {useAuth} from "@/context/auth-context.tsx";



const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const {register} = useAuth()
  const navigate = useNavigate()

  const otpMutation = useMutation({
    mutationFn: AuthService.getRegisterOtp,
    onSuccess: () => {
      setOtpSent(true)
      ToastService.success("OTP sent successfully")
    },
    onError: (error) => {
      ToastService.error(error.message)
    },
  })


  const form = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      verificationCode: "",
      password: "",
      agreeToTerms: false,
    },
  })

  const onSubmit = (values: RegisterRequest) => {
    register.mutate(values)
    register.isSuccess && navigate("/")
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="Your Name" className="bg-gray-50" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                    <Button disabled={otpMutation.isPending} type="button" variant="outline" onClick={sendOtp} className="whitespace-nowrap">

                      {otpMutation.isPending ? "Sending Code.." : otpSent ? "Resend Code" : "Send Code"}
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
        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row align-center items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <label className="text-sm font-medium leading-none">
                  I agree to the{" "}
                  <Link to="#" className="text-blue-500 hover:text-blue-600">
                    Terms
                  </Link>
                  {" & "}
                  <Link to="#" className="text-blue-500 hover:text-blue-600">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={register.isPending || otpMutation.isPending} type="submit" className="w-full">
          {register.isPending ? "Registering..." : "Register"}
        </Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </div>
      </form>
    </Form>
  )
}

export default RegisterForm
