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
  const [pricePerDay, setPricePerDay] = useState(apartment?.price_per_day);
  const [size, setSize] = useState(apartment?.size);
  const [images, setImages] = useState<string[]>(apartment?.images || []);
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
      setPricePerDay(data.price_per_day);
      setSize(data.size);
      setImages(data.images || []);
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
    if (!images || images.length === 0) {
      alert("Please upload at least one image");
      return;
    }
    const updatedApartment = {
      ...apartment,
      name,
      description,
      capacity,
      price_per_day: pricePerDay,
      size,
      images,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5005"}/api/apartment/${apartment.id}`,
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
        navigate(`/apartment/${apartment.id}`);
      } else {
        console.error("Failed to update apartment");
      }
    } catch (error) {
      console.error("Error updating apartment:", error);
    }
  };
  const handleDelete = async () => {
    if (!apartment) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5005"}/api/apartment/${apartment.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        },
      );
      if (response.ok) {
        navigate(`/`);
      } else {
        console.error("Failed to delete apartment");
      }
    } catch (error) {
      console.error("Error deleting apartment:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 pb-10">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Apartment</h1>
      {apartment && (
        <AptForm
          id={apartment.id}
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
      )}
      <div className="flex flex-row justify-between">

      <button className="btn btn-secondary mt-4 ml-6 w-" onClick={handleDelete}>
        Delete Apartment
      </button>
      <div className="flex flex-row justify-end">
        {images && images.map((image, index) => (
          <div key={index} className="relative m-2 w-32 h-32">
            <img
              src={image}
              alt={`Apartment ${index}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => {
                const newImages = images.filter((_, i) => i !== index);
                setImages(newImages);
              }}
              aria-label={`Remove image ${index + 1}`}
              className="absolute bottom-1 left-1 bg-black bg-opacity-40 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default EditApartment;
