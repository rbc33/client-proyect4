import type { DateRange } from 'react-day-picker';
import DatePicker from './DatePicker';

interface BookingFormProps {
  dateRange: DateRange | undefined;
  setDateRange: (dateRange: DateRange | undefined) => void;
  guests: number;
  setGuests: (guests: number) => void;
  guestName: string;
  setGuestName: (guestName: string) => void;
}

const BookingForm = ({
  dateRange,
  setDateRange,
  guests,
  setGuests,
  guestName,
  setGuestName,
}: BookingFormProps) => {

  return (
    <div className="card bg-base-100 shadow-lg p-6 max-w-4xl mx-auto mt-5">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4">
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

          <button
            className="btn bg-[#1d272e] text-white mt-auto hidden md:flex"
            onClick={() => setDateRange(undefined)}
            disabled={!dateRange}
          >
            Clear dates
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <label className="label">
            <span className="label-text text-lg font-semibold">
              {(dateRange?.from) ? "Select Check out" : "Select Check in"}
            </span>
          </label>
          <div className="border border-slate-600 rounded-lg p-2 flex justify-center bg-base-200/50">
            <DatePicker
              selectedDate={dateRange}
              onDateChange={(dateRange) => setDateRange(dateRange!)}
            />
          </div>
          <button
            className="btn bg-[#1d272e] text-black dark:text-white md:hidden mt-4"
            onClick={() => setDateRange(undefined)}
            disabled={!dateRange}
          >
            Clear dates
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingForm