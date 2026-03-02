import { useEffect, useState } from "react";
import AptCard from "../components/AptCard";
import { type Apartment } from "../types/types";

const HomePage = () => {
  const [apartaments, setApartaments] = useState<Apartment[] | []>([]);

  useEffect(() => {
    const fetchApts = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5005"}/api/apartment`,
      );
      const data = await res.json();
      // console.log(data)

      setApartaments(data);
    };
    fetchApts();
  }, []);
  return (
    <div className="container mx-auto px-4 pb-10">
      <div className="hero bg-base-200 rounded-box mb-10 py-10">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold md:whitespace-nowrap text-primary">
              Find Your Perfect Stay
            </h1>
            <p className="py-6 md:whitespace-nowrap">
              Discover comfortable and affordable apartments for your next trip.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Available Apartments
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartaments &&
          apartaments.map((apartment) => (
            <AptCard key={apartment.id} apartment={apartment} />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
