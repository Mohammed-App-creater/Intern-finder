import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "In Review" | "Interviewed" | "Declined"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "In Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Interviewed":
        return "bg-secondary text-secondary border-green-200"
      case "Declined":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getStatusStyles(status),
        className,
      )}
    >
      {status}
    </span>
  )
}
