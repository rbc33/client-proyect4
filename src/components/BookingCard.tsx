import type { Booking } from "../types/types";

interface BookingCardProps {
  booking: Booking;
  handleDelete: (bookingId: string) => void;
}

const BookingCard = ({ booking, handleDelete }: BookingCardProps) => {
  return (
    <div className="card bg-base-100 shadow-md border border-slate-600 rounded-lg">
      <div className="card-body p-4">
        <h3 className="card-title text-base">
          {booking.guest_name}
          <div className="badge badge-sm badge-ghost">
            {booking.guests} guests
          </div>
        </h3>
        <div className="text-sm text-base-content/70">
          <p>
            From:{" "}
            {new Date(booking.check_in).toLocaleDateString(
              "en-GB",
            )}
          </p>
          <p>
            To:{" "}
            {new Date(booking.check_out).toLocaleDateString(
              "en-GB",
            )}
          </p>
        </div>
        <div className="card-actions justify-end mt-2">
          <button
            className="btn btn-error btn-xs btn-outline"
            onClick={() => handleDelete(booking.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
