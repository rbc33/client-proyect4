import { DayPicker, type DateRange, type Matcher } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const DatePicker = ({ selectedDate, onDateChange, disabled = false }: { selectedDate: DateRange | undefined, onDateChange: (dateRange: DateRange) => void, disabled?: Matcher | Matcher[]}) => {
  // https://daypicker.dev/docs/selection-modes, "range" mode can be used for check-in/check-out 
  return (
    <div className="custom-datepicker">
      <style>{`
        .custom-datepicker .rdp {
          --rdp-accent-color: #10b981; /* Color principal (botones, seleccionados) */
          --rdp-range_middle-background-color: #66748c; /* Color de fondo para los días en el rango */
        }

        /* Modo oscuro */
        @media (prefers-color-scheme: dark) {
          .custom-datepicker .rdp {
            --rdp-accent-color: #34d399;
            
          }
        }

       
      `}</style>
      <DayPicker 
        mode="range"
        className="rdp"
        selected={selectedDate}
        onSelect={(dateRange) =>onDateChange(dateRange!)}
        disabled={disabled}
      />
    </div>
  );
};

export default DatePicker;