export function CompanyProfile() {
  return (
    <div className="bg-white p-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-dark">Company Profile</h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <span className="text-primary">+</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <span className="text-primary">✏️</span>
            </button>
          </div>
        </div>
        <p className="text-light leading-relaxed">
          Nomad is a software platform for starting and running internet businesses. Millions of businesses rely on
          Stripe&apos;s software tools to accept payments, expand globally, and manage their businesses online. Stripe has
          been at the forefront of expanding internet commerce, powering new business models, and supporting the latest
          platforms, from marketplaces to mobile commerce sites. We believe that growing the GDP of the internet is a
          problem rooted in code and design, not finance. Stripe is built for developers, makers, and creators. We work
          on solving the hard technical problems necessary to build global economic infrastructure—from designing highly
          reliable systems to developing advanced machine learning algorithms to prevent fraud.
        </p>
      </div>
    </div>
  )
}
