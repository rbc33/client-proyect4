import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AptForm from "../components/AptForm";
import { type Apartment } from "../types/types";

const EditApartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState<Apartment | undefined>();
  const [name, setName] = useState(apartment?.name);
  const [description, setDescription] = useState(apartment?.description);
  const [capacity, setCapacity] = useState(apartment?.capacity);
  const [pricePerDay, setPricePerDay] = useState(apartment?.pricePerDay);
  const [size, setSize] = useState(apartment?.size);
  const [image, setImage] = useState(apartment?.image);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchApt = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5005"}/api/apartment/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        },
      );
      const data = await response.json();
      setApartment(data);
      setName(data.name);
      setDescription(data.description);
      setCapacity(data.capacity);
      setPricePerDay(data.pricePerDay);
      setSize(data.size);
      setImage(data.image);
    };
    fetchApt();
  }, [id]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apartment) return;
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
    if (image === "") {
      alert("Please enter an image");
      return;
    }
    const updatedApartment = {
      ...apartment,
      name,
      description,
      capacity,
      pricePerDay,
      size,
      image,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5005"}/api/apartment/${apartment._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify(updatedApartment),
        },
      );
      if (response.ok) {
        navigate(`/apartment/${apartment._id}`);
      } else {
        console.error("Failed to update apartment");
      }
    } catch (error) {
      console.error("Error updating apartment:", error);
    }
  };
  return (
    <div className="container mx-auto px-4 pb-10">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Apartment</h1>
      {apartment && (
        <AptForm
          _id={apartment._id}
          name={name}
          description={description}
          capacity={capacity}
          pricePerDay={pricePerDay}
          size={size}
          image={image}
          setName={setName}
          setDescription={setDescription}
          setCapacity={setCapacity}
          setPricePerDay={setPricePerDay}
          setSize={setSize}
          setImage={setImage}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default EditApartment;
