import { v4 } from "uuid";
import {ToastService} from "@/utils/toast.ts";
import {getProjectEnvVariables} from "@/utils/env.ts";

export const changeImageName = (file: File): File => {
  if (!file.name.includes(".jpg") && !file.name.includes(".jpeg") && !file.name.includes(".png")) {
    ToastService.error("Invalid file type. Please upload a JPG, JPEG, or PNG image.");
  }
  const extension = file.name.split(".").pop();
  const newFileName = `${v4()}.${extension}`;

  return new File([file], newFileName, {
    type: file.type,
    lastModified: file.lastModified,
  });
};

export const loadImage = (imagePath : string): string => {
  if (imagePath.includes('/picture'))  return imagePath
  return getProjectEnvVariables().VITE_MINIO_URL + imagePath;
}
