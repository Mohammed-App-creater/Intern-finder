import { useMutation } from "@tanstack/react-query";
import { uploadProfilePicture, uploadResume } from "@/services/fileUpload.service";


export const useUploadResume = () => {
  return useMutation({
    mutationKey: ["upload", "resume"],
    mutationFn: (file: File) => uploadResume(file),
  });
}
export const useUploadProfilePicture = () => {
  return useMutation({
    mutationKey: ["upload", "profile-picture"],
    mutationFn: (file: File) => uploadProfilePicture(file),
  });
}