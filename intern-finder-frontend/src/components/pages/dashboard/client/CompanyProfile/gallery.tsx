import Image from "next/image";

export function Gallery() {
  return (
    <div className="bg-white p-6 border-t">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-dark">Working at Nomad</h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <span className="text-primary">+</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <span className="text-primary">✏️</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src="/modern-office-workspace-with-person-working-at-des.jpg"
              alt="Modern office workspace"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src="/modern-office-collaboration.png"
                alt="Team collaboration"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src="/creative-workspace-with-colorful-design.jpg"
                alt="Creative workspace"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src="/team-meeting-in-conference-room.jpg"
              alt="Team meeting"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
