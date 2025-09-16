import { getJobAnalytics } from "../services/analytics.service";
import { useQuery } from "@tanstack/react-query";



export const useAnalytics = () => {
    return useQuery({
        queryKey: ["get-analytics"],
        queryFn: getJobAnalytics
    });
};