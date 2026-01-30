import { useContext, useEffect, useState } from "react";
import { type DateRange } from "react-day-picker";
import toast from "react-hot-toast";
import AptCard from "../components/AptCard";
import BookingForm from "../components/BookingForm";
import { type Apartment, type Booking } from "../types/types";
import { AuthContext } from "../context/auth.context";

export const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5005"}/api`;
const storedToken = localStorage.getItem("authToken");

const NewBooking = () => {
  const [apartaments, setApartaments] = useState<Apartment[]>([]);
  const { user } = useContext(AuthContext);
  const now = new Date();
  const tomorrowDate = new Date(now);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>(user!.name);
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  useEffect(() => {
    getAvailableApartments(dateRange?.from, dateRange?.to, guests).then(
      (availableApartments) => {
        setApartaments(availableApartments);
      },
    );
  }, [dateRange, guests, hasChanged]);

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
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5005"}/api/booking`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
            body: JSON.stringify({
              apartmentId: apartment._id,
              checkIn: dateRange.from,
              checkOut: dateRange.to!,
              guestName: guestName,
              guests: guests,
            }),
          },
        );
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
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">
        Book Your Stay
      </h1>

      <BookingForm
        dateRange={dateRange}
        setDateRange={setDateRange}
        guests={guests}
        setGuests={setGuests}
        guestName={guestName}
        setGuestName={setGuestName}
      />

      <div className="divider my-10"></div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">
          Available Apartments
        </h2>
        <div className="badge badge-primary badge-lg">
          {apartaments.length} available
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartaments.map((apartment) => (
          <AptCard key={apartment._id} apartment={apartment}>
            <button
              className="btn btn-primary w-full"
              onClick={() => handleClick(apartment)}
            >
              Book now
            </button>
          </AptCard>
        ))}
      </div>
    </div>
  );
};

export default NewBooking;

async function getAvailableApartments(
  checkInDate: Date | undefined,
  checkOutDate: Date | undefined,
  guests: number = 1,
) {
  try {
    // Petición simple a apartment
    const resApt = await fetch(
      `${import.meta.env.VITE_API_URL || "http://localhost:5005"}/api/apartment`,
    );
    const allApartments = await resApt.json();

    const resBook = await fetch(
      `${import.meta.env.VITE_API_URL || "http://localhost:5005"}/api/booking`,
      {
        headers: { Authorization: `Bearer ${storedToken}` },
      },
    );
    const allBookings = await resBook.json();

    // console.log("All apartments:", allApartments);
    // console.log("All bookings:", allBookings);

    // Si no hay fechas, devolver todos los apartamentos filtrados por capacidad
    if (!checkInDate || !checkOutDate) {
      return allApartments.filter((apt: Apartment) => apt.capacity! >= guests);
    }

    // Filtrar apartamentos disponibles
    const availableApartments = allApartments
      .filter((apartment: Apartment) => {
        // Obtener reservas de este apartamento
        const apartmentBookings = allBookings.filter(
          (booking: Booking) => booking.apartmentId === apartment._id,
        );

        // Verificar disponibilidad
        return checkAvailability(checkInDate, checkOutDate, apartmentBookings);
      })
      .filter((apartment: Apartment) => apartment.capacity! >= guests);

    return availableApartments;
  } catch (error) {
    console.error("Error fetching apartments:", error);
    return [];
  }
}

function checkAvailability(
  checkIn: Date,
  checkOut: Date,
  apartmentBookings: Booking[],
) {
  return !apartmentBookings.some((booking) => {
    // Fallback for legacy data (in/out)
    const start = booking.checkIn || booking.in;
    const end = booking.checkOut || booking.out;

    console.log("Raw booking values:", start, end); // Ver valores raw

    if (!start || !end) {
      console.log("Missing booking dates, skipping");
      return false;
    }

    const bookingIn = new Date(start);
    const bookingOut = new Date(end);

    // console.log(
    //   `Checking booking: ${bookingIn.toDateString()} - ${bookingOut.toDateString()}`,
    // );
    // console.log(
    //   `Against dates: ${checkIn.toDateString()} - ${checkOut.toDateString()}`,
    // );

    // Si las fechas son inválidas, no hay overlap
    if (isNaN(bookingIn.getTime()) || isNaN(bookingOut.getTime())) {
      // console.log("Invalid booking dates, skipping");
      return false;
    }

    // Check for date overlap
    const hasOverlap = checkIn < bookingOut && checkOut > bookingIn;
    // console.log(`Has overlap: ${hasOverlap}`);

    return hasOverlap;
  });
}
