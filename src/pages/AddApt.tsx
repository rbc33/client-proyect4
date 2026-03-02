import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AptForm from "../components/AptForm";

const AddApt = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [pricePerDay, setPricePerDay] = useState(0);
  const [size, setSize] = useState(0);
  const [images, setImages] = useState<string[]>();
  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name === "") {
      alert("Please enter a name");
      return;
    }
    if (description === "") {
      alert("Please enter a description");
      return;
    }
    if (capacity === 0) {
      alert("Please enter a capacity");
      return;
    }
    if (pricePerDay === 0) {
      alert("Please enter a price per day");
      return;
    }
    if (size === 0) {
      alert("Please enter a size");
      return;
    }
    if (images === undefined) {
      alert("Please enter an image");
      return;
    }
    const newApartment = {
      name,
      description,
      capacity,
      price_per_day: pricePerDay,
      size,
      images,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5005"}/api/apartment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify(newApartment),
        },
      );
      if (response.ok) {
        navigate(`/`);
      } else {
        console.error("Failed to create apartment");
      }
    } catch (error) {
      console.error("Error creating apartment:", error);
    }
  };
  return (
    <div className="container mx-auto px-4 pb-10">
      <h1 className="text-3xl font-bold text-center mb-8">Add Apartment</h1>

      <AptForm
        name={name}
        description={description}
        capacity={capacity}
        price_per_day={pricePerDay}
        size={size}
        images={images}
        setName={setName}
        setDescription={setDescription}
        setCapacity={setCapacity}
        setPricePerDay={setPricePerDay}
        setSize={setSize}
        setImages={setImages}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddApt;
