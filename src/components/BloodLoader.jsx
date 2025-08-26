import { Droplet } from "lucide-react"; // You can use lucide-react or any icon library

const BloodLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="animate-bounce text-red-600">
        <Droplet size={48} />
      </div>
      <p className="mt-4 text-lg font-medium text-red-600">Loading...</p>
    </div>
  );
};

export default BloodLoader;
