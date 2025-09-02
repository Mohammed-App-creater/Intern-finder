import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  return (
    <div className="bg-secondary p-8 rounded-lg max-w-lg">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl font-bold text-dark mb-2">Contact Info</h2>
        <p className="text-light">Reach out to us. Our team is here to answer your questions.</p>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-dark mb-2">
              First Name
            </label>
            <Input id="firstName" placeholder="Your name" className="bg-white" />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-dark mb-2">
              Last Name
            </label>
            <Input id="lastName" placeholder="Your last name" className="bg-white" />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
            Email Address
          </label>
          <Input id="email" type="email" placeholder="Your E-mail address" className="bg-white" />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
            Message
          </label>
          <Textarea
            id="message"
            placeholder="Your message..."
            rows={4}
            className="bg-white"
          />
        </div>

        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3">
          Send Message
        </Button>
      </form>
    </div>
  )
}
