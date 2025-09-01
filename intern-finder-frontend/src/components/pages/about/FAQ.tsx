import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";

export default function FAQ() {
  return (
    <div>
      {/* FAQ Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-dark mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-light text-lg">
            Find quick answers about our services and process
          </p>
        </div>

        <Accordion type="multiple" className="space-y-4 w-full">
          <AccordionItem
            value="item-1"
            className="rounded-lg px-6"
          >
            <AccordionTrigger className="text-left hover:no-underline cursor-pointer">
              <div className="flex items-center gap-4">
                <span className="text-light data-[state=open]:text-primary font-semibold" >01</span>
                <span className="text-dark font-medium">
                  Can I upload a CV?
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-light pt-4">
              Yes, you can easily upload your CV. We support multiple file
              formats including PDF, DOC, and DOCX. Once uploaded, our system
              will automatically parse your information to help match you with
              relevant opportunities.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="rounded-lg px-6"
          >
            <AccordionTrigger className="text-left hover:no-underline cursor-pointer">
              <div className="flex items-center gap-4">
                <span className="text-light data-[state=open]:text-primary font-semibold">02</span>
                <span className="text-dark font-medium">
                  How long will the recruitment process take?
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-light pt-4">
              The recruitment process typically takes 2-4 weeks from initial
              application to final decision, depending on the role and company
              requirements.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="rounded-lg px-6"
          >
            <AccordionTrigger className="text-left hover:no-underline cursor-pointer">
              <div className="flex items-center gap-4">
                <span className="text-light data-[state=open]:text-primary font-semibold">03</span>
                <span className="text-dark font-medium">
                  Do you recruit for Graduates, Apprentices and Students?
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-light pt-4">
              Yes, we work with candidates at all career stages including recent
              graduates, apprentices, and current students looking for
              internships or entry-level positions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="rounded-lg px-6"
          >
            <AccordionTrigger className="text-left hover:no-underline cursor-pointer">
              <div className="flex items-center gap-4">
                <span className="text-light data-[state=open]:text-primary font-semibold">04</span>
                <span className="text-dark font-medium">
                  What does the recruitment and selection process involve?
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-light pt-4">
              Our process includes initial screening, skills assessment,
              interviews with our team and the client, and final reference
              checks to ensure the best match for both parties.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-5"
            className="rounded-lg px-6"
          >
            <AccordionTrigger className="text-left hover:no-underline cursor-pointer">
              <div className="flex items-center gap-4">
                <span className="text-light data-[state=open]:text-primary font-semibold">05</span>
                <span className="text-dark font-medium">
                  Can I receive notifications for any future jobs that may
                  interest me?
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-light pt-4">
              You can set up job alerts based on your preferences for location,
              industry, salary range, and job type to receive notifications
              about relevant opportunities.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}