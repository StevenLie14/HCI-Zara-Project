import {useForm} from "react-hook-form";
import {type ProfileRequest, profileSchema} from "@/models/dto/request/user/update-user-request.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/context/auth-context.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Save} from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {useMutation} from "@tanstack/react-query";
import {UserService} from "@/services/user-service.ts";
import {ToastService} from "@/utils/toast.ts";

const ProfileForm = () => {
  const { me, getMe } = useAuth();

  if (!me) {
    return <div>Loading...</div>
  }
  const profileForm = useForm<ProfileRequest>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: me?.name,
      email: me?.email,
      phone: me?.phone || undefined,
      gender: me?.gender || undefined,
      birthDate: me?.birthDate?.toString() || undefined,
      verificationDate: me?.verificationDate?.toString(),
    },
  })


  const profileMutation = useMutation({
    mutationFn: UserService.updateProfileData,
    onSuccess: () => {
      ToastService.success("Profile updated successfully");
      getMe.mutate();
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  })

  const onSubmit = (request : ProfileRequest) => {
    profileMutation.mutate(request);
  };

  return (
    <Form {...profileForm}>
      <form onSubmit={profileForm.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={profileForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={profileForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={true} type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={profileForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={profileForm.control}
            name="gender"
            render={({ field }) => (
              <FormItem className={"w-full"}>
                <FormLabel>Gender</FormLabel>
                <Select  onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Select gender"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className={"w-full"}>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={profileForm.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={profileForm.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Member Since</FormLabel>
                <FormControl>
                  <Input disabled={true} type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className={"flex items-center justify-end"}>
          <Button type="submit" >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProfileForm