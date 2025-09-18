import { UpdateBasicInfoTalent, UpdateEmail, UpdatePassword } from "@/services/talent.service"
import { useMutation } from "@tanstack/react-query";
import { BasicInfo, Password } from "@/types/setting";

export const useUpdateBasicInfo = () => {
    return useMutation({
        mutationKey: ["talent", "setting", "basic-info"],
        mutationFn: ({ talentId, basicInfo }: { talentId: string; basicInfo: BasicInfo }) =>
            UpdateBasicInfoTalent(talentId, basicInfo),
      });
}

export const useUpdateEmail = () => {
    return useMutation({
        mutationKey: ["talent", "setting", "Email"],
        mutationFn: ({ talentId, email }: { talentId: string; email: string }) =>
            UpdateEmail(talentId, email),
      });

    }
export const useUpdatePassword = () => {
    return useMutation({
        mutationKey: ["talent", "setting", "password"],
        mutationFn: ({ talentId, passwords }: { talentId: string; passwords: Password }) =>
            UpdatePassword(talentId, passwords),
      });
}

