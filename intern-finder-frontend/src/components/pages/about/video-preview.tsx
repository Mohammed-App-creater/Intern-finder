import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play } from "lucide-react"

export default function VideoPreview() {
  return (
    <div className="max-w-7xl mx-auto rounded-2xl py-16">
      {/* Hero Section with Video Background */}
      <section className="relative h-150 flex items-center justify-center overflow-hidden rounded-t-2xl">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://d.newsweek.com/en/full/2169488/group-business-workers-smiling.jpg')`,
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-8">
          {/* Video Play Button */}
          <Button className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg">
            <Play className="w-10 h-10" fill="currentColor" />
          </Button>

          {/* Hero Text */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance">
              Good Life Begins With
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance">A Good Company</h2>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="bg-black py-8 rounded-b-2xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Card 1 */}
            <Card className="bg-black p-6 border-none">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-white font-medium">Elit gravida lorem amet porta risus vitae at</h3>
                  <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto font-normal">
                    Learn more
                  </Button>
                </div>
              </div>
            </Card>

            {/* Feature Card 2 */}
            <Card className="bg-black p-6 border-none">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-white font-medium">Volutpat dui lacus mattis urna placerat...</h3>
                  <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto font-normal">
                    Learn more
                  </Button>
                </div>
              </div>
            </Card>

            {/* Feature Card 3 */}
            <Card className="bg-black p-6 border-none">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-white font-medium">Elementum faucibus netus gravida lacus lorem</h3>
                  <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto font-normal">
                    Learn more
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
