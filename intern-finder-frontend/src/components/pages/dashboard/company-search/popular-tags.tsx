import { Badge } from "@/components/ui/badge"

export function PopularTags() {
  const tags = ["Twitter", "Microsoft", "Apple", "Facebook"]

  return (
    <div className="mb-6">
      <span className="text-light text-sm mr-3">Popular:</span>
      <div className="inline-flex gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-secondary text-primary hover:bg-secondary/80 cursor-pointer"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
