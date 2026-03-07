import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    title: "Amazing services",
    content:
      "The structure of the internship program ensured clear goals and strong communication from day one. The intern we hosted was given meaningful, challenging work and delivered tangible results. It was a highly valuable experience for our entire team.",
    author: "Marco Kihn",
    role: "Happy Client",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRij6dtiHizH96qpCOe8WeXXP3yLyQJkPdGVg&s",
  },
  {
    id: 2,
    title: "Everything simple",
    content:
      "We believe landing a life-changing internship shouldn't be complicated. That's why we've streamlined every step—from finding your perfect match to excelling on your first day. Focus on your future, not the paperwork.",
    author: "Kristin Hester",
    role: "Happy Client",
    avatar:
      "data:image/jpeg;base64,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",
  },
  {
    id: 3,
    title: "Awesome, thank you!",
    content:
      "This internship completely changed my perspective. I got to work on real projects with real impact, and the mentorship was beyond anything I expected. Highly recommend!",
    author: "Zion Cisneros",
    role: "Happy Client",
    avatar: "",
  },
];

export default function Testimonials() {
  return (
    <div className="bg-secondary">
      <section className="max-w-7xl mx-auto py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 sm:mb-4">
            Testimonials from Our Customers
          </h2>
          <p className="text-dark max-w-2xl mx-auto text-sm sm:text-base px-4">
            The true measure of our success is the growth of our participants.
            Don&apos;t just take our word for it see what past clients have
            achieved and how the program launched their careers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-white border-0 shadow-sm relative"
            >
              <CardContent className="p-4 sm:p-5 md:p-6">
                {/* Stars */}
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-semibold text-dark mb-2 sm:mb-3">
                  {testimonial.title}
                </h3>

                {/* Content */}
                <p className="text-dark text-sm leading-relaxed mb-4 sm:mb-6">
                  {testimonial.content}
                </p>
                <div className="flex justify-end pr-3 sm:pr-4 md:pr-5">
                  {/* Quote Mark */}
                  <Image
                    width={25}
                    height={25}
                    src="/images/quotes.png"
                    alt={"Quotes Icon"}
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                  />
                </div>
                {/* Author */}
                <div className="flex items-center gap-3 mt-3 sm:mt-4">
                  <Image
                    width={500}
                    height={500}
                    src={testimonial.avatar || "/images/image_placeholder.jpg"}
                    alt={testimonial.author}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-dark text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-light text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
