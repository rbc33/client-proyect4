import React from "react";
import type { Apartment } from "../types/types";
import { Link } from "react-router-dom";
import { EmblaCarousel } from "./EmblaCarousel";

interface AptCardProps {
  apartment: Apartment;
  children?: React.ReactNode;
}

const AptCard = ({ apartment, children }: AptCardProps) => {
  const { id, name, description, size, capacity, price_per_day, images } =
    apartment;

  const renderCarousel = () => {
    if (!images || images.length === 0) return null;

    return (
      <div className="relative h-64 w-full overflow-hidden rounded-t-lg group">
        <div className="h-full w-full">
          <EmblaCarousel images={images} name={name} id={id} />
        </div>
      </div>
    );
  };

  return (
    <div className="card border-2 border-slate-600 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden">
      {renderCarousel()}
      <div className="card-body">
        {id ? (
          <Link to={`/apartment/${id}`}>
            <h2 className="card-title hover:text-primary transition-colors">
              {name}
              <div className="badge badge-secondary">{price_per_day}€/day</div>
            </h2>
          </Link>
        ) : (
          <h2 className="card-title">
            {name}
            <div className="badge badge-secondary">{price_per_day}€/day</div>
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
