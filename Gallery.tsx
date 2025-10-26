import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Plus, HelpCircle } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import { toast } from "sonner";

const Gallery = () => {
  const [images, setImages] = useState([gallery1, gallery2, gallery3]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = event.target?.result as string;
        setImages((prev) => [...prev, newImage]);
        setCurrentIndex(images.length);
        toast.success("Image added successfully!");
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  return (
    <div className="bg-gradient-subtle rounded-2xl shadow-elevated border border-border overflow-hidden transition-all duration-300 hover:shadow-soft">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 md:px-6 py-4 md:py-6">
        <div className="flex items-center gap-3 md:gap-4">
          <button className="p-2 rounded-full bg-secondary/60 hover:bg-secondary transition-colors">
            <HelpCircle className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Gallery</h2>
        </div>

        <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={handleAddImage}
            className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 shadow-soft hover:shadow-elevated"
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs md:text-sm uppercase tracking-wider">Add Image</span>
          </button>
          <button
            onClick={prevImage}
            className="p-2 md:p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-all duration-300 shadow-soft hover:shadow-elevated"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
          </button>
          <button
            onClick={nextImage}
            className="p-2 md:p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-all duration-300 shadow-soft hover:shadow-elevated"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Image Display */}
      <div className="px-4 md:px-6 pb-4 md:pb-6">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary/40 ring-1 ring-border">
          <div className="flex gap-4 transition-transform duration-500 ease-smooth">
            {images.map((image, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-full transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0 absolute inset-0"
                }`}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-border">
            <span className="text-xs md:text-sm font-semibold text-foreground">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
