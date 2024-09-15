import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useFetchProfessionalId from "./hooks/proFetchProfessionalId";

import { AuthContext } from "../../../context/AuthContext";

const DogsPro = () => {
    const { token } = useContext(AuthContext);
    const professionalId = useFetchProfessionalId();
  const [patients, setPatients] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [owners, setOwners] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Optional: For loading state

  const generateSecureQRCodeURL = (dogId) => {
    const dogIdcrypted = (dogId * 3456).toString();
    return `/dog/${dogIdcrypted}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!professionalId) return;

      try {
        setLoading(true); // Start loading

        // Fetch appointments for this professional
        const appointmentsResponse = await axios.get(
          `http://127.0.0.1:8000/api/appointments_pro/${professionalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        // Get unique dog IDs from appointments for this professional
        const uniqueDogIds = [
          ...new Set(
            appointmentsResponse.data.map((appointment) => appointment.dog_id)
          ),
        ];

        // Fetch dogs data
        const dogsResponse = await axios.get('http://127.0.0.1:8000/api/dogs', {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        // Filter dogs that have appointments with this professional
        const dogsData = dogsResponse.data.filter((dog) =>
          uniqueDogIds.includes(dog.id)
        );

        // Fetch dogs' photos
        const photosResponse = await axios.get(
          'http://127.0.0.1:8000/api/dogs-photos',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const photosData = photosResponse.data;

        // Get owners' data
        const userIds = [...new Set(dogsData.map((dog) => dog.user_id))];
        const ownerPromises = userIds.map((id) =>
          axios.get(`http://127.0.0.1:8000/api/user/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }).then((res) => ({ id, name: res.data.name }))
        );
        const ownersData = await Promise.all(ownerPromises);

        // Map owners by their IDs
        const ownersMap = ownersData.reduce((acc, owner) => {
          acc[owner.id] = owner.name;
          return acc;
        }, {});

        setPatients(dogsData);
        setPhotos(photosData);
        setOwners(ownersMap);
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching dogs, photos, or owners:', error);
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchData();
  }, [professionalId, token]);

  const getPhotoUrl = (dogId) => {
    const photo = photos.find((photo) => photo.dog_id === dogId);
    return photo ? `http://127.0.0.1:8000/storage/dogs_photos/${photo.photo_name_dog}` : null;
  };

  const filteredPatients = patients.filter((patient) => {
    const ownerName = owners[patient.user_id] || 'Inconnu';
    return (
      patient.name_dog.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 rounded-lg">
      {/* Search field */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher par nom de chien ou propriétaire..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Table of patients */}
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Photo
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Nom
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Propriétaire
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Dossier médical
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{patient.id}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <img
                  src={getPhotoUrl(patient.id)}
                  alt={patient.name_dog}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{patient.name_dog}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {owners[patient.user_id] || 'Inconnu'}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <a
                  href={generateSecureQRCodeURL(patient.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {patient.sex === 'Femelle'
                    ? `Clique ici pour accéder à toutes les informations sur cette chienne ${patient.name_dog.toUpperCase()} !`
                    : `Clique ici pour accéder à toutes les informations sur ce chien ${patient.name_dog.toUpperCase()} !`}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default DogsPro;
