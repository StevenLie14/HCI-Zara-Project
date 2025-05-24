import {useAuth} from "@/context/auth-context.tsx";
import {type ChangeEvent, useState} from "react";
import {ToastService} from "@/utils/toast.ts";
import {UserService} from "@/services/user-service.ts";
import {useMutation} from "@tanstack/react-query";
import {Card, CardContent} from "@/components/ui/card.tsx";
import CustomAlertDialog from "@/components/custom-alert-dialog.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {getProjectEnvVariables} from "@/utils/env.ts";
import {Button} from "@/components/ui/button.tsx";
import {Camera} from "lucide-react";
import {changeImageName} from "@/utils/utils.ts";

const ProfileAvatarCard = () => {
  const { me } = useAuth()
  const [imagePreview, setImagePreview] = useState<File | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const handleProfilePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        ToastService.error("Image is too large. Maximum size is 5MB.")
        return
      }
      setImagePreview(file)
      setOpen(true)
    }
  }

  const handleSaveProfile = async () => {
    if (imagePreview) {
      const formData = new FormData()
      const file = changeImageName(imagePreview)
      formData.append("profilePicture", file)
      return await UserService.updateProfilePicture(formData)
    }
  }

  const profileMutation = useMutation({
    mutationFn: handleSaveProfile,
    onSuccess : () => {
      ToastService.success("Profile updated successfully")
      setOpen(false)
    },
    onError: (error) => {
      ToastService.error(error.message)
    },
  })



  return (
    <Card>
      <CustomAlertDialog loading={profileMutation.isPending} open={open} setOpen={setOpen} onConfirm={handleSaveProfile}>
        <Avatar className="h-28 w-28">
          <AvatarImage src={ imagePreview ? URL.createObjectURL(imagePreview) : "/placeholder.svg"} alt={me?.name} />
          <AvatarFallback className="text-xl">
            {me?.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </CustomAlertDialog>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-4 border-b">
          <div className="relative">
            <Avatar className="h-28 w-28">
              <AvatarImage src={me?.profilePicture ? getProjectEnvVariables().VITE_MINIO_URL + me.profilePicture :  "/placeholder.svg"} alt={me?.name} />
              <AvatarFallback className="text-xl">
                {me?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold">{me?.name}</h3>
            <p className="text-gray-600 mb-2">{me?.email}</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('profile-picture-upload')?.click()}
                className="text-xs"
              >
                <Camera className="h-3 w-3 mr-1" /> Change Photo
              </Button>
              <input
                id="profile-picture-upload"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileAvatarCard