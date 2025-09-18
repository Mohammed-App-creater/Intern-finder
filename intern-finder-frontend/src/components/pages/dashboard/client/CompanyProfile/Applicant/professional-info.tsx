import { Badge } from "@/components/ui/badge";

export function ProfessionalInfo() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-dark">Professional Info</h3>

      <div>
        <p className="text-sm text-light mb-2">About Me</p>
        <p className="text-dark leading-relaxed">
          I&apos;m a product designer + filmmaker currently working remotely at
          Twitter from beautiful Manchester, United Kingdom. I&apos;m passionate
          about designing digital products that have a positive impact on the
          world.
        </p>
        <p className="text-dark leading-relaxed mt-4">
          For 10 years, I&apos;ve specialised in interface, experience &
          interaction design as well as working in user research and product
          strategy for product agencies, big tech companies & start-ups.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-light mb-1">Current Job</p>
          <p className="text-dark font-medium">Product Designer</p>
        </div>

        <div>
          <p className="text-sm text-light mb-1">Experience in Years</p>
          <p className="text-dark font-medium">4 Years</p>
        </div>

        <div className="col-span-2">
          <p className="text-sm text-light mb-1">Highest Qualification Field</p>
          <p className="text-dark font-medium">Bachelors in Engineering</p>
        </div>

        <div className="col-span-2">
          <p className="text-sm text-light mb-3">Skill set</p>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-secondary text-primary">
              Project Management
            </Badge>
            <Badge variant="secondary" className="bg-secondary text-primary">
              Copywriting
            </Badge>
            <Badge variant="secondary" className="bg-secondary text-primary">
              English
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
