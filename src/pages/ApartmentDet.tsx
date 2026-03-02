import { useContext, useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import AptCard from "../components/AptCard";
import BookingCard from "../components/BookingCard";
import DatePicker from "../components/DatePicker";
import { type Apartment, type Booking } from "../types/types";
import { BASE_URL } from "./NewBooking";
import { AuthContext } from "../context/auth.context";

interface ApartmentDet extends Apartment {
  bookings: Booking[];
}
const ApartmentDet = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [apartment, setApartment] = useState<ApartmentDet | undefined>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>(user!.name);
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  const storedToken = localStorage.getItem("authToken");

  

  useEffect(() => {
    const fetchApt = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5005"}/api/apartment/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        },
      );
      const data = await res.json();
      setApartment(data);
      // console.log(data);
    };

    fetchApt();
  }, [id, apartment?.bookings.length, hasChanged, storedToken]);
  const handleDelete = async (bookingId: string) => {
    try {
      const response = await fetch(BASE_URL + `/booking/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      if (response.ok) {
        setApartment((currentApartment) => {
          if (!currentApartment) {
            return undefined;
          }
          return {
            ...currentApartment,
            bookings: currentApartment.bookings.filter(
              (booking) => booking.id !== bookingId,
            ),
          };
        });
      } else {
        console.error("Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };
  const handleClick = async (apartment: Apartment) => {
    if (guestName === "") {
      toast.error("Please enter a guest name", { position: "top-right" });
      return;
    }
    if (guests < 1) {
      toast.error("Please enter a valid number of guests", {
        position: "top-right",
      });
      return;
    } else {
      try {
        if (!dateRange?.from || !dateRange.to) {
          toast.error("Please select a valid date range", {
            position: "top-right",
          });
          return;
        }
        const res = await fetch(BASE_URL + "/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({
            apartment_id: apartment.id,
            check_in: dateRange.from.toISOString(),
            check_out: dateRange.to.toISOString(),
            guest_name: guestName,
            // guests: guests,
          }),
        });
        if (!res.ok) {
          throw new Error("Error creating booking");
        }
        setHasChanged(!hasChanged);
        setGuestName("");
        toast.success("Booking created successfully!", {
          position: "top-right",
        });
      } catch (err) {
        console.error("booking error", err);
      }
    }
  };
  return (
    <div className="container mx-auto px-4 pb-10">
      {apartment && (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <AptCard apartment={apartment} />
            <div className="flex gap-4 mt-5">
              <button
                className="btn btn-primary flex-1"
                onClick={() => handleClick(apartment)}
              >
                Book now
              </button>
              <Link
                to={`/apartment/${apartment.id}/edit`}
                className="btn btn-secondary flex-1"
              >
                Edit Apartment
              </Link>
            </div>
          </div>

          <div className="flex-1 card bg-base-100 shadow-xl border border-base-200 h-fit">
            <div className="card-body">
              <h2 className="card-title mb-4">Make a Booking</h2>
              <div className="flex flex-col gap-4">
                <div className="form-control w-full">
                  <label className="label" htmlFor="guests">
                    <span className="label-text font-semibold">Guests</span>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    type="number"
                    id="guests"
                    value={guests}
                    name="guests"
                    min={1}
                    max={10}
                    onChange={(e) => setGuests(Number(e.target.value))}
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label" htmlFor="guestName">
                    <span className="label-text font-semibold">Guest Name</span>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    type="text"
                    id="guestName"
                    value={guestName}
                    name="guestName"
                    placeholder="Enter your name"
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      {dateRange?.from ? "Select Check out" : "Select Check in"}
                    </span>
                  </label>
                  <div className="border  border-slate-600 rounded-lg p-2 flex justify-center bg-base-200/50">
                    <DatePicker
                      selectedDate={dateRange}
                      onDateChange={(dateRange) => setDateRange(dateRange!)}
                      disabled={apartment.bookings.map((booking) => ({
                        from: new Date(booking.check_in),
                        to: new Date(booking.check_out),
                      }))}
                    />
                  </div>
                </div>
                <button
                  className="btn bg-[#1d272e] text-black dark:text-white mt-4"
                  onClick={() => setDateRange(undefined)}
                  disabled={!dateRange}
                >
                  Clear dates
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {apartment && apartment.bookings && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Current Bookings</h2>
          {apartment.bookings.length === 0 ? (
            <div className="alert alert-info">
              No bookings for this apartment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {apartment.bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApartmentDet;
