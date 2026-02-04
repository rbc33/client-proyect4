import React from "react";
import type { Apartment } from "../types/types";
import { Link } from "react-router-dom";
import { Carousel } from "flowbite-react";

interface AptCardProps {
  apartment: Apartment;
  children?: React.ReactNode;
}

const AptCard = ({ apartment, children }: AptCardProps) => {
  const { _id, name, description, size, capacity, pricePerDay, images } =
    apartment;

  const renderCarousel = () => {
    if (!images || images.length === 0) return null;

    return (
      <div className="relative h-64 w-full overflow-hidden rounded-t-lg group">
        {/* Overlay Link - only covers the image area, NOT the buttons */}
        {_id && (
          <Link
            to={`/apartment/${_id}`}
            className="absolute inset-0 z-10 cursor-pointer"
            aria-label={`View details for ${name}`}
          >
            {/* Transparent overlay that catches clicks except on elements with higher z-index */}
          </Link>
        )}

        <div className="h-full w-full">
          <Carousel
            slideInterval={5000}
            pauseOnHover
            theme={{
              control: {
                base: "relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10 z-20",
              },
              indicators: {
                active: {
                  off: "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800 z-20",
                  on: "bg-white dark:bg-gray-800 z-20",
                },
                base: "relative h-3 w-3 rounded-full z-20",
                wrapper:
                  "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3 z-20",
              },
            }}
          >
            {images.map((image, index) => (
              <div key={index} className="h-full w-full">
                <img
                  src={image}
                  alt={`${name ?? "Apartment"} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    );
  };

  return (
    <div className="card border-2 border-slate-600 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden">
      {renderCarousel()}
      <div className="card-body">
        {_id ? (
          <Link to={`/apartment/${_id}`}>
            <h2 className="card-title hover:text-primary transition-colors">
              {name}
              <div className="badge badge-secondary">{pricePerDay}€/day</div>
            </h2>
          </Link>
        ) : (
          <h2 className="card-title">
            {name}
            <div className="badge badge-secondary">{pricePerDay}€/day</div>
          </h2>
        )}
        <div className="flex gap-2 text-sm text-base-content/70">
          <span>Size: {size} m²</span>
          <span>•</span>
          <span>Capacity: {capacity} guests</span>
        </div>
        <p className="line-clamp-3">{description}</p>
        {children && (
          <div className="card-actions justify-end mt-4">{children}</div>
        )}
      </div>
    </div>
  );
};

export default AptCard;
