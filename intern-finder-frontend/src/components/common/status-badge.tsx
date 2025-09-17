import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status:
    | "accepted"
    | "offered"
    | "pending"
    | "rejected"
    | "shortlisted"
    | "interview"
    | "In Review"
    | "Interviewing"
    | "Interviewed"
    | "Shortlisted"
    | "Declined"
    | "Unsuitable"
    | "Hired"
    | "Interview"
    | "Offered";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "In Review":
        return "text-yellow-400 border-yellow-400";
      case "Interviewing":
        return "text-yellow-400 border-yellow-400";
      case "Interviewed":
        return "text-blue-500 border-blue-500";
      case "Shortlisted":
        return "text-purple-500 border-purple-500";
      case "Declined":
        return "text-red-400 border-red-400";
      case "Unsuitable":
        return "text-red-400 border-red-400";
      case "Offered":
        return "text-purple-400 border-purple-400";
      case "Hired":
        return "text-primary border-primary";
      case "Interview":
        return "text-yellow-400 border-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={cn(
        "flex items-center px-2.5 py-1 rounded-full text-xs font-medium border w-fit",
        getStatusStyles(status),
        className
      )}
    >
      {status}
    </span>
  );
}
