import { useState } from "react"
import {Link} from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx"
import {type AuthRequest, authSchema} from "@/models/dto/request/auth/auth-request.ts";
import {useAuth} from "@/context/auth-context.tsx";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()


  const form = useForm<AuthRequest>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (request: AuthRequest) => {
    login.mutate(request)
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
                  <Input
                    placeholder="your@email.com"
                    type="email"
                    className="bg-gray-50"
                    {...field}
                  />
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
                          placeholder="Enter your password"
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
            <div className="flex items-center justify-end">
              <Link
                to="/reset-password"
                className="text-sm font-medium text-blue-500 hover:text-blue-600"
              >
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-700">
              {login.isPending ? "Logging in..." : "Login"}
            </Button>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-blue-500 hover:text-blue-600">
                Register
              </Link>
            </div>
          </form>
        </Form>
  )
}

export default LoginForm;