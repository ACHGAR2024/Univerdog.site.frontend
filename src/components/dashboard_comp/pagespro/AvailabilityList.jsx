import PropTypes from "prop-types";
const periode = ["Matin", "Aprés Midi"];

function AvailabilityList({
  availabilities,
  setSelectedAvailability,
  deleteAvailability,
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border-b-2">Jour</th>
              <th className="p-2 border-b-2">Periode</th>
              <th className="p-2 border-b-2">Horaire</th>
              <th className="p-2 border-b-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {availabilities.map((availability) => (
              <tr key={availability.id}>
                <td className="p-2 border-b">{availability.day}</td>
                <td className="p-2 border-b">
                  {availability.start_time < "12:00:00"
                    ? periode[0]
                    : periode[1]}
                </td>
                <td className="p-2 border-b">
                  {availability.start_time.slice(0, 5)} -{" "}
                  {availability.end_time.slice(0, 5)}
                </td>
                <td className="p-2 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedAvailability(availability)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => deleteAvailability(availability.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

AvailabilityList.propTypes = {
  availabilities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      day: PropTypes.string.isRequired,
      start_time: PropTypes.string.isRequired,
      end_time: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedAvailability: PropTypes.func.isRequired,
  deleteAvailability: PropTypes.func.isRequired,
};

export default AvailabilityList;
