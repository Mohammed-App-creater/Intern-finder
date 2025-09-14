import api from "@/lib/axios";
import { UploadResponse } from "@/types/fileUpload";


export const uploadResume = async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post("storage/resume", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
};

export const uploadProfilePicture = async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post("storage/profile-picture", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
};