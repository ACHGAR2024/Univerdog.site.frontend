import { useState, useContext } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import PropTypes from 'prop-types';

import { useNavigate } from "react-router-dom";

const TimeCalandarPro_store = ({ onSubmit }) => {
  const { token } = useContext(AuthContext);
  const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const navigate = useNavigate();
  const [horaires, setHoraires] = useState({
    Lundi: { matin: { debut: '', fin: '' }, apresMidi: { debut: '', fin: '' }, ferme: false },
    Mardi: { matin: { debut: '', fin: '' }, apresMidi: { debut: '', fin: '' }, ferme: true },
    Mercredi: { matin: { debut: '', fin: '' }, apresMidi: { debut: '', fin: '' }, ferme: true },
    Jeudi: { matin: { debut: '', fin: '' }, apresMidi: { debut: '', fin: '' }, ferme: true },
    Vendredi: { matin: { debut: '', fin: '' }, apresMidi: { debut: '', fin: '' }, ferme: true },
    Samedi: { matin: { debut: '', fin: '' }, apresMidi: { debut: '', fin: '' }, ferme: true },
    Dimanche: { matin: { debut: '', fin: '' }, apresMidi: { debut: '', fin: '' }, ferme: true },
  });

  const handleHoraireChange = (jour, periode, type, valeur) => {
    console.log(`Changement pour ${jour}, période: ${periode}, type: ${type}, nouvelle valeur: ${valeur}`);
    setHoraires({
      ...horaires,
      [jour]: {
        ...horaires[jour],
        [periode]: {
          ...horaires[jour][periode],
          [type]: valeur,
        },
      },
    });
    console.log('Nouvel état des horaires :', horaires);
  };

  const handleFermeChange = (jour, valeur) => {
    console.log(`Changement de l'état "fermé" pour ${jour} : ${valeur}`);
    setHoraires({
      ...horaires,
      [jour]: {
        ...horaires[jour],
        ferme: valeur,
      },
    });
    console.log('Nouvel état des horaires :', horaires);
  };

  const handleSubmit = async () => {
    const professionalId = 9; // Remplacez par l'ID professionnel approprié

    for (const jour of jours) {
      if (!horaires[jour].ferme) {
        const dayMapping = {
          Lundi: 'Lundi',
          Mardi: 'Mardi',
          Mercredi: 'Mercredi',
          Jeudi: 'Jeudi',
          Vendredi: 'Vendredi',
          Samedi: 'Samedi',
          Dimanche: 'Dimanche',
        };

        const requestData = [
          {
            day: dayMapping[jour],
            start_time: horaires[jour].matin.debut,
            end_time: horaires[jour].matin.fin,
            professional_id: professionalId,
          },
          {
            day: dayMapping[jour],
            start_time: horaires[jour].apresMidi.debut,
            end_time: horaires[jour].apresMidi.fin,
            professional_id: professionalId,
          },
        ];

        try {
          for (const data of requestData) {
            if (data.start_time && data.end_time) {
              const response = await fetch('http://127.0.0.1:8000/api/availability', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
              });

              if (!response.ok) {
                throw new Error(`Erreur lors de l'envoi des données pour ${jour}: ${response.statusText}`);
              }

              const result = await response.json();
              console.log(`Données envoyées pour ${jour}:`, result);
              navigate("/dashboard");
            }
          }
          // Appeler la fonction de rappel pour notifier le parent
          if (onSubmit) {
            onSubmit();
          }
        } catch (error) {
          console.error('Erreur lors de la soumission des horaires:', error);
        }
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="overflow-x-auto  ml-24">
        {jours.map((jour) => (
          <div key={jour} className="mb-4">
            <label>
              <input
                type="checkbox"
                checked={horaires[jour].ferme}
                onChange={(e) => handleFermeChange(jour, e.target.checked)}
              />
              {` ${jour} : Fermé`}
            </label>
            {!horaires[jour].ferme && (
              <div className="mb-4 w-1/3">
                <div>
                  <label>Matin:</label>
                  <input
                    type="time"
                    value={horaires[jour].matin.debut}
                    onChange={(e) => handleHoraireChange(jour, 'matin', 'debut', e.target.value)}
                    className="w-full p-1 border rounded mb-2"
                  />
                  <input
                    type="time"
                    value={horaires[jour].matin.fin}
                    onChange={(e) => handleHoraireChange(jour, 'matin', 'fin', e.target.value)}
                    className="w-full p-1 border rounded mb-2"
                  />
                </div>
                <div>
                  <label>Après-midi:</label>
                  <input
                    type="time"
                    value={horaires[jour].apresMidi.debut}
                    onChange={(e) => handleHoraireChange(jour, 'apresMidi', 'debut', e.target.value)}
                    className="w-full p-1 border rounded mb-2"
                  />
                  <input
                    type="time"
                    value={horaires[jour].apresMidi.fin}
                    onChange={(e) => handleHoraireChange(jour, 'apresMidi', 'fin', e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <button onClick={handleSubmit} className="ml-44 bg-blue-500 text-white p-2 rounded">Valider</button>
      </div>
    </div>
  );
};
TimeCalandarPro_store.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default TimeCalandarPro_store;
