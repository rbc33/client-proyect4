import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router-dom";

type PropType = {
  images: string[];
  name?: string;
  id?: string;
};

export function EmblaCarousel({ images, name, id }: PropType) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  console.log("EmblaCarousel images:", images);

  if (!images || images.length === 0)
    return (
      <div className="h-full w-full bg-gray-300 flex items-center justify-center">
        No Images
      </div>
    );

  return (
    <div className="h-full w-full bg-gray-200">
      <div className="h-full w-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {images.map((src, index) => (
            <div
              className="relative h-full flex-[0_0_100%] min-w-0"
              key={index}
            >
              {id ? (
                <Link to={`/apartment/${id}`} className="block h-full w-full">
                  <img
                    className="block h-full w-full object-cover"
                    src={src}
                    alt={`${name || "Apartment"} - ${index + 1}`}
                  />
                </Link>
              ) : (
                <img
                  className="block h-full w-full object-cover"
                  src={src}
                  alt={`${name || "Apartment"} - ${index + 1}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
