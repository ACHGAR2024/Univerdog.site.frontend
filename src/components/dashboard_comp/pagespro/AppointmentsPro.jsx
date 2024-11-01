import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import getDay from "date-fns/getDay";
import fr from "date-fns/locale/fr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import Notiflix from "notiflix";
import proFetchProfessionalId from "./hooks/proFetchProfessionalId";

const locales = { fr: fr };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const messages = {
  allDay: "Toute la journée",
  previous: "Précédent",
  next: "Suivant",
  today: "Aujourd'hui",
  month: "Mois",
  week: "Semaine",
  day: "Jour",
  agenda: "Agenda",
  date: "Date",
  time: "Heure",
  event: "Événement",
  noEventsInRange: "Aucun événement à cette période.",
  showMore: (total) => `+ ${total} événement(s) supplémentaire(s)`,
};

const formats = {
  dayFormat: "eee",
  dayHeaderFormat: "eeee",
};

const getDatesFromDayInRange = (day, start, end) => {
  const dates = [];
  let current = start;
  while (current <= end) {
    if (getDay(current) === day) {
      dates.push(format(current, "yyyy-MM-dd"));
    }
    current = new Date(current);
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

const AppointmentsPro = () => {
  // my dog and professional choices

  const professionalId = proFetchProfessionalId();
  const [events, setEvents] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date_appointment: "",
    time_appointment: "",
    reason: "",
    status: "En attente",
    dog_id: 45,
    professional_id: professionalId,
  });

  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    //(" professionalId : ======", professionalId);
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "https://api.univerdog.site/api/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEvents(
          response.data
            .filter(
              (appointment) => appointment.professional_id === professionalId
            )
            .map((appointment) => {
              const appointmentEnd = new Date(
                `${appointment.date_appointment}T${appointment.time_appointment}`
              );
              appointmentEnd.setMinutes(appointmentEnd.getMinutes() + 30);

              return {
                id: appointment.id,
                status: appointment.status,
                title: `RDV : ${appointment.reason}`,
                start: new Date(
                  `${appointment.date_appointment}T${appointment.time_appointment}`
                ),
                end: appointmentEnd,
                ...appointment,
              };
            })
        );
      } catch (error) {
        console.error("Erreur lors du chargement des rendez-vous :", error);
      }
    };

    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get(
          `https://api.univerdog.site/api/availability_pro/${professionalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const today = new Date();
        const threeMonthsLater = new Date(
          today.getFullYear(),
          today.getMonth() + 3,
          today.getDate()
        );
        const startOfRange = startOfWeek(today, { weekStartsOn: 1 });
        const endOfRange = endOfWeek(threeMonthsLater, { weekStartsOn: 1 });

        const slots = response.data.flatMap((slot) => {
          const dayIndex = [
            "Dimanche",
            "Lundi",
            "Mardi",
            "Mercredi",
            "Jeudi",
            "Vendredi",
            "Samedi",
          ].indexOf(slot.day);
          const dates = getDatesFromDayInRange(
            dayIndex,
            startOfRange,
            endOfRange
          );

          return dates.map((date) => ({
            date,
            start_time: slot.start_time,
            end_time: slot.end_time,
          }));
        });

        setAvailableSlots(slots);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des créneaux horaires :",
          error
        );
      }
    };

    fetchAppointments();
    fetchAvailableSlots();
  }, [token, professionalId]);

  const isSlotAvailable = (date, time) => {
    const slot = availableSlots.find(
      (s) => s.date === date && s.start_time <= time && s.end_time > time
    );
    return !!slot;
  };

  const handleSelectSlot = (slotInfo) => {
    const selectedDate = format(slotInfo.start, "yyyy-MM-dd");
    const selectedTime = format(slotInfo.start, "HH:mm");

    if (isSlotAvailable(selectedDate, selectedTime)) {
      setNewEvent({
        ...newEvent,
        date_appointment: selectedDate,
        time_appointment: selectedTime,
      });
      setShowModal(true);
    } else {
      Notiflix.Notify.failure(
        "Le créneau sélectionné n'est pas disponible. Veuillez choisir un autre créneau."
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewEvent({
      date_appointment: "",
      time_appointment: "",
      reason: "",
      status: "En attente",
      dog_id: 45,
      professional_id: professionalId,
    });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.univerdog.site/api/appointments",
        newEvent,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const appointmentEnd = new Date(
        `${response.data.date_appointment}T${response.data.time_appointment}`
      );
      appointmentEnd.setMinutes(appointmentEnd.getMinutes() + 30);

      setEvents([
        ...events,
        {
          id: response.data.id,
          status: response.data.status,
          title: `RDV ${response.data.reason}`,
          start: new Date(
            `${response.data.date_appointment}T${response.data.time_appointment}`
          ),
          end: appointmentEnd,
        },
      ]);
      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de la création du rendez-vous :", error);
    }
  };

  const handleEventClick = (event) => {
    if (event.status === "En attente") {
      Notiflix.Notify.info(
        `Rendez-vous en attente pour ${event.reason} le ${format(
          event.start,
          "dd/MM/yyyy HH:mm"
        )}`
      );
    } else if (event.status === "Confirmé") {
      Notiflix.Notify.success(
        `Rendez-vous confirmé pour ${event.reason} le ${format(
          event.start,
          "dd/MM/yyyy HH:mm"
        )}`
      );
    } else if (event.status === "Annulé") {
      Notiflix.Notify.failure(
        `Rendez-vous annulé pour ${event.reason} le ${format(
          event.start,
          "dd/MM/yyyy HH:mm"
        )}`
      );
    }
  };

  const slotPropGetter = (date) => {
    const dateFormatted = format(date, "yyyy-MM-dd");
    const timeFormatted = format(date, "HH:mm");

    if (isSlotAvailable(dateFormatted, timeFormatted)) {
      return {
        style: {
          backgroundColor: "#d4edda", // Color for available time slots
          borderColor: "#28a745",
        },
      };
    } else {
      return {
        style: {
          backgroundColor: "#f8d7da", // Color for unavailable time slots
          borderColor: "#dc3545",
          color: "black", // Text color
        },
      };
    }
  };

  const eventPropGetter = (event) => {
    let backgroundColor;
    let borderColor;

    switch (event.status) {
      case "Confirmé":
        backgroundColor = "#d4edda"; // Color for confirmed events
        borderColor = "#000000";
        break;
      case "Annulé":
        backgroundColor = "#f8d7da"; // Color for canceled events
        borderColor = "#000000";
        break;
      case "En attente":
      default:
        backgroundColor = "#fff3cd"; // Color for pending events
        borderColor = "#000000";
        break;
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        color: "black", // text color
        borderWidth: "2px",
      },
    };
  };

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-lg p-6"
        style={{ height: "calc(200vh - 0px)" }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          //selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleEventClick}
          messages={messages}
          formats={formats}
          defaultView="month"
          culture="fr"
          className="custom-calendar"
          slotPropGetter={slotPropGetter}
          eventPropGetter={eventPropGetter}
          min={new Date(1970, 1, 1, 8, 0, 0)}
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Ajouter un nouveau rendez-vous
            </h2>
            <form onSubmit={handleCreateEvent}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Raison
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  value={newEvent.reason}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, reason: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={handleCloseModal}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentsPro;
