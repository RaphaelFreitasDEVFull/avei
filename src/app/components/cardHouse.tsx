"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useRef, useState } from "react";

const CardHouse = () => {
  const images = ["/img/house.png", "/img/house-2.png", "/img/house-3.png"];

  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const timer = useRef<NodeJS.Timeout | null>(null);

  // Autoplay
  useEffect(() => {
    if (!instanceRef.current) return;

    timer.current = setInterval(() => {
      instanceRef.current?.next();
    }, 3000); // muda a cada 3 segundos

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [instanceRef]);

  return (
    <Card className="max-w-95">
      <CardContent className="p-0 overflow-hidden mt-[-25px] rounded-t-2xl">
        <div className="relative h-64">
          <div ref={sliderRef} className="keen-slider h-full w-full">
            {images.map((src, index) => (
              <div
                className="keen-slider__slide relative h-full w-full"
                key={index}
              >
                <Image
                  src={src}
                  alt={`house-${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {/* Bolinhas de navegação */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => instanceRef.current?.moveToIdx(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  currentSlide === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Curitiba</h3>
          <p className="text-sm">
            2 quartos, Sala, Cozinha, 2 Banheiros com Banheira, Churrasqueira
          </p>
          <div>
            <span className="font-light text-blue-500 text-sm">
              R$ 125,00 o dia
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardHouse;
