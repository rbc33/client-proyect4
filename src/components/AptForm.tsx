import React from 'react';
import AptCard from './AptCard';
import FileUpload from './FileUpload';

interface AptFormProps {
    _id?: string
    name?: string;
    description?: string;
    capacity?: number;
    pricePerDay?: number;
    size?: number;
    images?: string[];
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    setCapacity: (capacity: number) => void;
    setPricePerDay: (pricePerDay: number) => void;
    setSize: (size: number) => void;
    setImages: (images: string[]) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const AptForm = ({
    _id,
    name,
    description,
    capacity,
    pricePerDay,
    size,
    images,
    setName,
    setDescription,
    setCapacity,
    setPricePerDay,
    setSize,
    setImages,
    handleSubmit,
}: AptFormProps ) => {
  const handleImageUpload = (imageUrl: string) => {
    if (images != undefined){

      setImages([...images,imageUrl]);
    }
    else {
      setImages([imageUrl]);
    }
    console.log('Image URL:', images);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="flex-1 card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Name</span>
              </label>
              <br />
              <input
                className="input input-bordered"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="description">
                <span className="label-text">Description</span>
              </label>
              <br />
              <textarea
                className="textarea textarea-bordered h-24 w-[80%]"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label" htmlFor="capacity">
                  <span className="label-text">Capacity</span>
                </label>
                <input
                  className="input input-bordered"
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="pricePerDay">
                  <span className="label-text">Price per Day</span>
                </label>
                <input
                  className="input input-bordered"
                  type="number"
                  id="pricePerDay"
                  name="pricePerDay"
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="size">
                <span className="label-text">Size (m²)</span>
              </label>
              <br />
              <input
                className="input input-bordered"
                type="number"
                id="size"
                name="size"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
              />
            </div>
            <FileUpload onImageUpload={handleImageUpload} />
            <button className="btn btn-primary mt-4" type="submit">
              Save Changes
            </button>
          </form>
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4 text-center">Preview</h2>
        <div className="sticky top-4">
          <AptCard apartment={{ _id, name, description, capacity, pricePerDay, size, images }} />
        </div>
      </div>
    </div>
  );
};

export default AptForm