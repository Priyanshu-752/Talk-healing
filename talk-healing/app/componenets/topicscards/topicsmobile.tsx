import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export default function TopicsMobile() {
  const topics = [
    "Hypertension (High Blood Pressure)",
    "Coronary Artery Disease",
    "Stroke",
    "Cancer",
    "Asthma",
    "Alzheimer's Disease",
    "Chronic Obstructive Pulmonary Disease",
    "Arthritis",
  ];

  return (
    <div className="relative w-full max-w-full px-2">
      <Carousel className="relative w-full">
        {/* Carousel Buttons*/}
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />

        <CarouselContent className="flex gap-3 px-12"> 
          {topics.map((topic, index) => (
            <CarouselItem key={index} className="w-auto">
              <Button className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium transition hover:scale-105 hover:bg-green-600 whitespace-nowrap">
                {topic}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
