import { User, ScrollText, BriefcaseBusiness, CircleCheckBig } from "lucide-react"
const steps = [
  {
    icon: User,
    title: "Create Account",
    description: "Sign up for free and build your professional profile to get started with your internship search.",
  },
  {
    icon: ScrollText,
    title: "Upload Resume",
    description: "Upload your resume and portfolio to showcase your skills and experience to potential employers.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Find Jobs",
    description:
      "Browse through thousands of internship opportunities and find the perfect match for your career goals.",
  },
  {
    icon: CircleCheckBig,
    title: "Apply Job",
    description: "Apply to your dream internships with just one click and track your application status in real-time.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-dark mb-4">How it works</h2>
          <p className="text-dark max-w-2xl mx-auto">
            An integrated platform that connects talented students with amazing internship opportunities through a
            streamlined process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 bg-text-white">
              <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                <step.icon className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-dark mb-2">{step.title}</h3>
              <p className="text-light text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}