import { Phone, Mail, Clock, MapPin } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-4xl font-bold text-dark mb-4 leading-tight">
          You Will Grow, You Will Succeed. We Promise That
        </h1>
        <p className="text-light text-base leading-relaxed">
          Your journey of growth is built on a foundation of dedicated support
          and the right challenges. We provide the expert guidance, curated
          resources, and unwavering belief in your potential to create an
          environment where your ambition naturally leads to accomplishment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Call for inquiry */}
        <div className="flex flex-col items-start space-x-3">
          <div className="flex-shrink-0">
            <Phone className="w-6 h-6 text-primary my-1" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-dark mb-1">
              Call for inquiry
            </h3>
            <p className="text-dark">+257 388-6895</p>
          </div>
        </div>

        {/* Send us email */}
        <div className="flex flex-col items-start space-x-3">
          <div className="flex-shrink-0">
            <Mail className="w-6 h-6 text-primary my-1" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-dark mb-1">Send us email</h3>
            <p className="text-dark">kramulous@sbcglobal.net</p>
          </div>
        </div>

        {/* Opening hours */}
        <div className="flex flex-col items-start space-x-3">
          <div className="flex-shrink-0">
            <Clock className="w-6 h-6 text-primary my-1" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-dark mb-1">Opening hours</h3>
            <p className="text-dark">Mon - Fri: 10AM - 10PM</p>
          </div>
        </div>

        {/* Office */}
        <div className="flex flex-col items-start space-x-3">
          <div className="flex-shrink-0">
            <MapPin className="w-6 h-6 text-primary my-1" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-dark mb-1">Office</h3>
            <p className="text-dark">19 North Road Piscataway, NY 08854</p>
          </div>
        </div>
      </div>
    </div>
  );
}
