import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function AvailabilityForm({ addAvailability, updateAvailability, selectedAvailability, setSelectedAvailability }) {
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    if (selectedAvailability) {
      setDay(selectedAvailability.day);
      setStartTime(selectedAvailability.start_time);
      setEndTime(selectedAvailability.end_time);
    }
  }, [selectedAvailability]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const availability = { day, start_time: startTime, end_time: endTime };
    const [startHour, startMinute] = startTime.split(':');
    const [endHour, endMinute] = endTime.split(':');
    const newStartTime = `${startHour.padStart(2, '0')}:${startMinute.padStart(2, '0')}`;
    const newEndTime = `${endHour.padStart(2, '0')}:${endMinute.padStart(2, '0')}`;
    availability.start_time = newStartTime;
    availability.end_time = newEndTime;
    console.log('Submitting availability:', availability);  // Debugging log

    if (selectedAvailability) {
      updateAvailability(selectedAvailability.id, availability);
    } else {
      addAvailability(availability);
    }

    setDay('');
    setStartTime('');
    setEndTime('');
    setSelectedAvailability(null);
  };

  return (
    <div className="text-xs">
      <form onSubmit={handleSubmit}>
        <select 
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
        >
          <option value="">Jour de la semaine</option>
          <option value="Lundi">Lundi</option>
          <option value="Mardi">Mardi</option>
          <option value="Mercredi">Mercredi</option>
          <option value="Jeudi">Jeudi</option>
          <option value="Vendredi">Vendredi</option>
          <option value="Samedi">Samedi</option>
          <option value="Dimanche">Dimanche</option>
        </select>
        <input 
          type="time" 
          className='mx-4 my-2'
          value={startTime} 
          onChange={(e) => setStartTime(e.target.value)} 
          placeholder="Start Time" 
          required 
        />
        <input 
          type="time" 
          value={endTime} 
          onChange={(e) => setEndTime(e.target.value)} 
          placeholder="End Time" 
          required 
        />
        <button type="submit" className='bg-blue-500 text-white px-4 py-2 mx-4 rounded'>
          {selectedAvailability ? 'Modifier' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
}

AvailabilityForm.propTypes = {
  addAvailability: PropTypes.func.isRequired,
  updateAvailability: PropTypes.func.isRequired,
  selectedAvailability: PropTypes.shape({
    id: PropTypes.number,
    day: PropTypes.string,
    start_time: PropTypes.string,
    end_time: PropTypes.string
  }),
  setSelectedAvailability: PropTypes.func.isRequired
};

export default AvailabilityForm;
