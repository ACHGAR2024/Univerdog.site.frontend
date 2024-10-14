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
import PropTypes from "prop-types";

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

const AppointmentsUser = ({
  selectedService,
  selectedDog,
  selectedProfessional,
}) => {
  const [events, setEvents] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [numberOfAppointmentsWaiting, setNumberOfAppointmentsWaiting] =
    useState(0);

  const [newEvent, setNewEvent] = useState({
    date_appointment: "",
    time_appointment: "",
    reason: "",
    status: "En attente",
    dog_id: selectedDog, // Replace with the dog's ID
    professional_id: selectedProfessional, // Replace with the professional's ID
  });
  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const responseWaiting = await axios.get(
          `https://api.univerdog.site/api/appointments_pro/${selectedProfessional}/${selectedDog}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const numberOfAppointmentsWaiting = responseWaiting.data.filter(
          (appointment) => appointment.status === "En attente"
        ).length;

        setNumberOfAppointmentsWaiting(numberOfAppointmentsWaiting);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("Aucun rendez-vous en attente pour ce professionnel.");
        } else {
          console.error(
            "Erreur lors du chargement des rendez-vous en attente :",
            error
          );
        }
      }
    };

    const fetchAppointmentsForCalendar = async () => {
      try {
        const responseEvents = await axios.get(
          `https://api.univerdog.site/api/appointments_pro/${selectedProfessional}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (responseEvents.data.length === 0) {
          console.warn("Aucun rendez-vous trouvé pour ce professionnel.");
          return;
        }

        setEvents(
          responseEvents.data
            .filter((appointment) => appointment.status !== "Annulé")
            .map((appointment) => {
              const appointmentEnd = new Date(
                `${appointment.date_appointment}T${appointment.time_appointment}`
              );
              appointmentEnd.setMinutes(appointmentEnd.getMinutes() + 30);

              const isOtherDog =
                Number(appointment.dog_id) !== Number(selectedDog);

              return {
                id: appointment.id,
                status: appointment.status,
                title: isOtherDog ? `` : `RDV : ${appointment.reason}`,
                start: new Date(
                  `${appointment.date_appointment}T${appointment.time_appointment}`
                ),
                end: appointmentEnd,
                isOtherDog,
                ...appointment,
              };
            })
        );
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error(
            "Aucun rendez-vous trouvé pour ce chien ou ce professionnel."
          );
        } else {
          console.error(
            "Erreur lors du chargement des événements pour le calendrier :",
            error
          );
        }
      }
    };

    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get(
          `https://api.univerdog.site/api/availability_pro/${selectedProfessional}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Processing to get available slots
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
    fetchAvailableSlots();
    fetchAppointments();
    fetchAppointmentsForCalendar();
  }, [token, selectedProfessional, selectedDog, selectedService]);

  const isSlotAvailable = (date, time) => {
    const slot = availableSlots.find(
      (s) => s.date === date && s.start_time <= time && s.end_time > time
    );
    return !!slot;
  };

  const handleSelectSlot = (slotInfo) => {
    const selectedDate = format(slotInfo.start, "yyyy-MM-dd");
    const selectedTime = format(slotInfo.start, "HH:mm");

    // Check if the slot is already booked
    const isBooked = events.some(
      (event) =>
        format(event.start, "yyyy-MM-dd") === selectedDate &&
        format(event.start, "HH:mm") === selectedTime
    );

    if (isBooked) {
      Notiflix.Notify.failure(
        "Le créneau sélectionné est déjà réservé par un autre utilisateur. Veuillez choisir un autre créneau."
      );
      return; // Exit the function as the slot is already taken
    }

    // Check if the slot is available
    if (isSlotAvailable(selectedDate, selectedTime)) {
      setNewEvent({
        ...newEvent,
        date_appointment: selectedDate,
        time_appointment: selectedTime,
      });
      setShowModal(true); // Show the appointment creation form
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
      dog_id: selectedDog,
      professional_id: selectedProfessional,
    });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    if (!selectedDog || !selectedProfessional) {
      console.error(
        "Veuillez sélectionner un chien et un professionnel avant de créer le rendez-vous."
      );
      Notiflix.Notify.failure(
        "Veuillez sélectionner un chien et un professionnel avant de créer le rendez-vous."
      );
      return;
    }
    if (numberOfAppointmentsWaiting >= 3) {
      console.error(
        "Vous avez le droit que seulement 3 rendez-vous en attente."
      );
      Notiflix.Notify.failure(
        "Vous avez le droit que seulement 3 rendez-vous en attente."
      );
      return;
    }
    const updatedEvent = {
      ...newEvent,
      reason: `${selectedService} - ${newEvent.reason}`,
      dog_id: selectedDog,
      professional_id: selectedProfessional,
    };

    setNewEvent(updatedEvent);

    try {
      const response = await axios.post(
        "https://api.univerdog.site/api/appointments",
        updatedEvent,
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
          title: `RDV ${selectedService} ${response.data.reason}`,
          start: new Date(
            `${response.data.date_appointment}T${response.data.time_appointment}`
          ),
          end: appointmentEnd,
        },
      ]);
      Notiflix.Notify.success(
        "Le rendez-vous a été créé avec_succès. Veuillez patienter pour confirmer le rendez-vous."
      );
      handleCloseModal();
      // Update the number of pending appointments
      setNumberOfAppointmentsWaiting(numberOfAppointmentsWaiting + 1);
    } catch (error) {
      console.error("Erreur lors de la création du rendez-vous :", error);
    }
  };

  const handleEventClick = (event) => {
    if (event.status === "En attente") {
      Notiflix.Notify.info(
        `Rendez-vous en attente  le ${format(event.start, "dd/MM/yyyy HH:mm")}`
      );
    } else if (event.status === "Confirmé") {
      Notiflix.Notify.success(
        `Rendez-vous confirmé  le ${format(event.start, "dd/MM/yyyy HH:mm")}`
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

    // Check if the date and time are already taken by another appointment
    const isBooked = events.some(
      (event) =>
        format(event.start, "yyyy-MM-dd") === dateFormatted &&
        format(event.start, "HH:mm") === timeFormatted
    );

    // If the slot is booked
    if (isBooked) {
      return {
        style: {
          backgroundColor: "#f8d7da", // Red for booked slots
          borderColor: "#dc3545", // Red border for booked slots
          color: "black",
          cursor: "not-allowed",
        },
      };
    }

    // If the slot is available
    if (isSlotAvailable(dateFormatted, timeFormatted)) {
      return {
        style: {
          backgroundColor: "#d4edda", // Green for available slots
          borderColor: "#28a745",
        },
      };
    } else {
      return {
        style: {
          backgroundColor: "#f8d7da", // Light red for unavailable slots
          borderColor: "#dc3545",
          color: "black",
        },
      };
    }
  };

  const eventPropGetter = (event) => {
    let backgroundColor;
    let borderColor;
    let color;
    /*//("event", event.dog_id, selectedDog);
    if (event.dog_id !== selectedDog) {
      return { style: { backgroundColor: "#f8d7da", borderColor: "#000000" } };
    }*/

    switch (event.status) {
      case "Confirmé":
        backgroundColor = "green"; // Color for confirmed events
        color = "white";
        borderColor = "#000000";
        break;
      case "Annulé":
        backgroundColor = "red"; // Color for canceled events
        borderColor = "#000000";
        color = "white";
        break;
      case "En attente":
      default:
        backgroundColor = "#fff3cd"; // Color for pending events
        borderColor = "#000000";
        color = "black";
        break;
    }

    return {
      style: {
        backgroundColor,
        color,
        borderColor,
        // Text color
        borderWidth: "2px",
      },
    };
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="">
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
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleEventClick}
            views={{ week: true, day: true, month: true }} // Show default views
            messages={messages}
            formats={formats}
            defaultView="week"
            culture="fr"
            className="custom-calendar"
            slotPropGetter={slotPropGetter} // Apply styles to slots
            eventPropGetter={eventPropGetter} // Manage event display
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
                  {/*<h2 className="block text-gray-700 font-semibold mb-2">
                    Chien :{newEvent.dog_id}
                  </h2>
                  <h2 className="block text-gray-700 font-semibold mb-2">
                    Professionnel : {newEvent.professional_id}
                  </h2>*/}
                  <h2 className="block text-gray-700 font-semibold mb-2">
                    Date : {newEvent.date_appointment}
                  </h2>
                  <h2 className="block text-gray-700 font-semibold mb-2">
                    Heure : {newEvent.time_appointment}
                  </h2>
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
      </div>
    </div>
  );
};

AppointmentsUser.propTypes = {
  selectedService: PropTypes.any.isRequired, // or PropTypes.string, PropTypes.number, etc.
  selectedDog: PropTypes.any.isRequired,
  selectedProfessional: PropTypes.any.isRequired,
};

export default AppointmentsUser;
