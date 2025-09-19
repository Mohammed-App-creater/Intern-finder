export function PersonalInfo() {
  return (
    <div className="space-y-6  border-b pb-5">
      <h3 className="text-lg font-semibold text-dark">Personal Info</h3>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-light mb-1">Full Name</p>
          <p className="text-dark font-medium">Jerome Bell</p>
        </div>

        <div>
          <p className="text-sm text-light mb-1">Gender</p>
          <p className="text-dark font-medium">Male</p>
        </div>

        <div>
          <p className="text-sm text-light mb-1">Date of Birth</p>
          <p className="text-dark font-medium">
            March 23, 1995 <span className="text-light">(26 y.o)</span>
          </p>
        </div>

        <div>
          <p className="text-sm text-light mb-1">Language</p>
          <p className="text-dark font-medium">English, French, Bahasa</p>
        </div>

        <div className="col-span-2">
          <p className="text-sm text-light mb-1">Address</p>
          <p className="text-dark font-medium">
            4517 Washington Ave, Manchester, Kentucky 39495
          </p>
        </div>
      </div>
    </div>
  );
}
