import ProfileCard from "@/components/ProfileCard";
import Gallery from "@/components/Gallery";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Left side - Empty on desktop, hidden on mobile */}
          <div className="hidden lg:block" />

          {/* Right side - Widgets */}
          <div className="space-y-6 md:space-y-8 w-full">
            <ProfileCard />
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
