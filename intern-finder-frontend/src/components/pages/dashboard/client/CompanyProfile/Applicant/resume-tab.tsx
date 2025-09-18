import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ResumeTab() {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">Jerome Bell</h1>
          <p className="text-lg text-light">Product Designer</p>
        </div>
        <Avatar className="w-20 h-20">
          <AvatarImage src="/professional-headshot.png" alt="Jerome Bell" />
          <AvatarFallback>JB</AvatarFallback>
        </Avatar>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          <section>
            <h2 className="text-lg font-semibold text-dark mb-4 uppercase tracking-wide">
              Experience
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-dark">
                  Senior UI/UX Product Designer
                </h3>
                <p className="text-light">Enterprise name</p>
                <p className="text-sm text-light">
                  Aug 2018 - Present • 1 year, Paris
                </p>
                <p className="text-sm text-dark mt-2">
                  Directly collaborated with CEO and Product team to prototype,
                  design and deliver the UI and UX experience with a lean design
                  process: research, design, test, and iterate.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-dark">
                  UI/UX Product Designer
                </h3>
                <p className="text-light">Enterprise name</p>
                <p className="text-sm text-light">
                  Aug 2013 - Aug 2018 • 5 years, Paris
                </p>
                <p className="text-sm text-dark mt-2">
                  Lead the UI design with the accountability of the design
                  system, collaborated with product and development teams on
                  core user experience to improve product interfaces and
                  experiences.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-dark">UI Designer</h3>
                <p className="text-light">Enterprise name</p>
                <p className="text-sm text-light">
                  Aug 2012 - Jul 2013 • 1 year, Paris
                </p>
                <p className="text-sm text-dark mt-2">
                  Designed mobile UI applications for Orange R&D department, BNP
                  Paribas, La Poste, Le Créd...
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-dark">Graphic Designer</h3>
                <p className="text-light">Enterprise name</p>
                <p className="text-sm text-light">
                  Dec 2010 - Jul 2012 • 1 year, Paris
                </p>
                <p className="text-sm text-dark mt-2">
                  Designed print and web applications for Paul Breart, Renault,
                  Le théâtre du Marché, La mairie de Mantes la Ville...
                </p>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-lg font-semibold text-dark mb-4 uppercase tracking-wide">
              Education
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-dark">
                  Bachelor European in Graphic Design
                </h3>
                <p className="text-light">School name</p>
                <p className="text-sm text-light">2008 - 2010, Received</p>
              </div>

              <div>
                <h3 className="font-semibold text-dark">
                  BTS Communication Visuelle option Multimédia
                </h3>
                <p className="text-light">School name</p>
                <p className="text-sm text-light">2007 - 2008, Received</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Contact & Skills */}
        <div className="space-y-6">
          {/* Contact */}
          <section>
            <p className="text-primary">jeromebell@gmail.com</p>
            <p className="text-light">+44 1245 572 135</p>
            <p className="text-light">Vernouillet</p>
          </section>

          {/* Industry Knowledge */}
          <section>
            <h3 className="font-semibold text-dark mb-3">Industry Knowledge</h3>
            <div className="space-y-1 text-sm text-light">
              <p>Product Design</p>
              <p>User Interface</p>
              <p>User Experience</p>
              <p>Interaction Design</p>
              <p>Wireframing</p>
              <p>Rapid Prototyping</p>
              <p>Design Research</p>
            </div>
          </section>

          {/* Tools & Technologies */}
          <section>
            <h3 className="font-semibold text-dark mb-3">
              Tools & Technologies
            </h3>
            <div className="space-y-1 text-sm text-light">
              <p>
                Figma, Sketch, Prototype, Framer, InVision, Abstract, Zeplin,
                Google Analytics, Amplitude, Fullstory...
              </p>
            </div>
          </section>

          {/* Other Skills */}
          <section>
            <h3 className="font-semibold text-dark mb-3">Other Skills</h3>
            <div className="space-y-1 text-sm text-light">
              <p>HTML, CSS, jQuery</p>
            </div>
          </section>

          {/* Languages */}
          <section>
            <h3 className="font-semibold text-dark mb-3">Languages</h3>
            <div className="space-y-1 text-sm text-light">
              <p>French (native)</p>
              <p>English (professional)</p>
            </div>
          </section>

          {/* Social */}
          <section>
            <h3 className="font-semibold text-dark mb-3">Social</h3>
            <div className="space-y-1 text-sm text-light">
              <p>jeromebell.com</p>
              <p>linkedin.com/in/</p>
              <p>yourname</p>
              <p>dribbble.com/yourname</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
