import { useState } from "react";
import { DayPicker } from "@daypicker/react";

const CalendarInput = ({ id, label, value, onChange, mostrarCalendario = false }) => {
  const [abierto, setAbierto] = useState(false);

  const calendarioVisible = mostrarCalendario || abierto;

  const obtenerFechaHoy = () => {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, "0");
    const day = String(hoy.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const convertirStringAFecha = (fechaString) => {
    if (!fechaString) {
      return new Date();
    }

    const [year, month, day] = fechaString.split("-");

    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const formatearFecha = (fecha) => {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const fechaSeleccionada = convertirStringAFecha(value || obtenerFechaHoy());

  return (
    <div className="calendar-input">
      <label htmlFor={id}>{label}</label>

      <button
        id={id}
        type="button"
        className="calendar-trigger"
        onClick={() => setAbierto(!abierto)}
      >
        {value || obtenerFechaHoy()}
      </button>

      {calendarioVisible && (
        <div className={mostrarCalendario ? "calendar-popover calendar-inline" : "calendar-popover"}>          <DayPicker
          mode="single"
          selected={fechaSeleccionada}
          defaultMonth={fechaSeleccionada}
          onSelect={(fecha) => {
            if (!fecha) {
              return;
            }

            onChange(formatearFecha(fecha));
            if(!mostrarCalendario) {
            setAbierto(false);
            }
          }}
        />
        </div>
      )}
    </div>
  );
};

export default CalendarInput;
