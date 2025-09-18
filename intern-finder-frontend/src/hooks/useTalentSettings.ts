import { UpdateBasicInfoTalent } from "@/services/talent.service"
import { useMutation } from "@tanstack/react-query";
import { BasicInfo } from "@/types/setting";

export const useUpdateBasicInfo = () => {
    return useMutation({
        mutationKey: ["talent", "setting", "basic-info"],
        mutationFn: ({ talentId, basicInfo }: { talentId: string; basicInfo: BasicInfo }) =>
            UpdateBasicInfoTalent(talentId, basicInfo),
      });
}

