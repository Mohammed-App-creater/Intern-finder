import api from "@/lib/axios";
import { JobAnalytics } from "@/types/analytics";

export const getJobAnalytics = async (): Promise<JobAnalytics> => {
  const res = await api.get("/analytics");
  return res.data.data;
}