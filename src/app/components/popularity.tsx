import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import CardHouse from "./cardHouse";

const Popularity = () => {
  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        Os locais mais populares
      </h2>

      <Carousel>
        <CarouselContent>
          <CarouselItem className="basis-1/3">
            <CardHouse />
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <CardHouse />
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <CardHouse />
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <CardHouse />
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <CardHouse />
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <CardHouse />
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <CardHouse />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Popularity;
