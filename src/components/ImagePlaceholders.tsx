import {
  Camera,
  ImageOff,
  Image,
  FileImage,
  ImagePlus,
  Images,
  Clock,
  Calendar,
  FileText,
  Search,
  Upload,
} from "lucide-react";
import { Button } from "./ui/button";

// Option 1: Decorative Pattern with Topic-Related Icon
export const NoImagePlaceholder1 = ({ title = "Historical Event" }) => {
  return (
    <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-4 relative">
      <div className="bg-white/80 p-6 rounded-lg shadow-sm z-10">
        <Camera className="w-12 h-12 mx-auto mb-3 text-capsule-accent opacity-70" />
        <p className="text-center text-gray-600 font-medium">{title}</p>
        <p className="text-center text-sm text-gray-500 mt-1">
          No image available
        </p>
      </div>
      {/* Decorative background pattern using Lucide icons */}
      <div className="absolute inset-0 w-full h-full opacity-5 overflow-hidden pointer-events-none">
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <ImageOff
              key={i}
              className="absolute text-gray-500"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
      </div>
    </div>
  );
};

// Option 2: Abstract Placeholder with Lucide Icons
export const NoImagePlaceholder2 = () => {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full">
        {/* Icons as decorative elements positioned randomly */}
        <Image className="absolute top-1/4 left-[20%] w-16 h-16 text-capsule-accent" />
        <FileImage className="absolute bottom-1/4 right-1/3 w-12 h-12 text-capsule-accent/20" />
        <ImagePlus className="absolute top-1/3 right-[20%] w-10 h-10 text-gray-300/60" />
        <Images
          className="absolute bottom-[5%] left-1/3 w-8 h-8 text-black/10"
          size={20}
        />

        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4 bg-white/75 rounded-lg shadow-sm">
            <ImageOff className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-600">No image</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Option 3: Timeline-inspired Placeholder
export const NoImagePlaceholder3 = ({ date }) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center">
      <div className="relative w-3/4 h-3/4 border-l-4 border-t-4 border-r-4 border-dashed border-gray-300 flex flex-col items-center justify-center p-6">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1">
          <Clock className="w-6 h-6 text-gray-500" />
        </div>
        <div className="flex flex-col items-center">
          <Calendar className="w-12 h-12 mb-3 text-capsule-accent" />
          <p className="font-serif text-xl text-gray-700">{date}</p>
          <p className="text-sm text-gray-500 mt-2">No image</p>
        </div>
      </div>
    </div>
  );
};

// Option 4: Historical Document Placeholder
export const NoImagePlaceholder4 = () => {
  return (
    <div className="w-full h-full bg-[#f8f5e9] flex items-center justify-center p-4">
      <div className="w-5/6 h-5/6 border-2 border-gray-400/20 rounded-sm p-6 flex flex-col items-center justify-center bg-[#f8f5e9] shadow-inner">
        <FileText className="w-12 h-12 mb-4 text-gray-400" />
        <p className="font-serif text-lg text-center text-gray-700">
          This historical record exists in written form only
        </p>
        <div className="w-1/2 h-px bg-gray-300 my-4"></div>
        <p className="text-sm text-gray-500 italic text-center">
          The original document is preserved in archives
        </p>
      </div>
    </div>
  );
};

// Option 5: Interactive "Contribute" Placeholder
export const NoImagePlaceholder5 = () => {
  return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-5/6 max-w-md text-center">
        <Search className="w-10 h-10 mx-auto mb-3 text-capsule-accent" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Image Pending Discovery
        </h3>
        <p className="text-gray-600 mb-4">
          We're still searching for visual documentation of this historical
          moment.
        </p>
        <Button
          variant="outline"
          className="text-capsule-accent border-capsule-accent hover:bg-capsule-accent/10"
        >
          <Upload className="w-4 h-4 mr-2" />
          Contribute an Image
        </Button>
      </div>
    </div>
  );
};
