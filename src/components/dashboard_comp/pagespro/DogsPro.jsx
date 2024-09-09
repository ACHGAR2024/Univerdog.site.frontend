import { useState, useEffect } from 'react';

const DogsPro = () => {
    const [patients, setPatients] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [owners, setOwners] = useState({});
    const [searchTerm, setSearchTerm] = useState(''); // Ajout du state pour la recherche

    const generateSecureQRCodeURL = (dogId) => {
        const dogIdcrypted = (dogId * 3456).toString();
        return `/dog/${dogIdcrypted}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching dogs...');
                const response = await fetch('http://127.0.0.1:8000/api/dogs');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données des chiens');
                }
                const dogsData = await response.json();
                console.log('Dogs data:', dogsData);
    
                console.log('Fetching photos...');
                const photosResponse = await fetch('http://127.0.0.1:8000/api/dogs-photos');
                if (!photosResponse.ok) {
                    throw new Error('Erreur lors de la récupération des photos des chiens');
                }
                const photosData = await photosResponse.json();
                console.log('Photos data:', photosData);
    
                const userIds = [...new Set(dogsData.map(dog => dog.user_id))];
                console.log('Unique user IDs:', userIds);
    
                const ownerPromises = userIds.map(id => 
                    fetch(`http://127.0.0.1:8000/api/user/${id}`)
                        .then(res => res.json())
                        .then(ownerData => ({ id, name: ownerData.name }))
                );
                const ownersData = await Promise.all(ownerPromises);
    
                // Map owners by their IDs
                const ownersMap = ownersData.reduce((acc, owner) => {
                    acc[owner.id] = owner.name;
                    return acc;
                }, {});
                console.log('Owners map:', ownersMap);
    
                setPatients(dogsData);
                setPhotos(photosData);
                setOwners(ownersMap);
            } catch (error) {
                console.error('Error fetching dogs, photos, or owners:', error);
            }
        };
    
        fetchData();
    }, []);

    const getPhotoUrl = (dogId) => {
        console.log('Getting photo URL for dog ID:', dogId);
        const photo = photos.find(photo => photo.dog_id === dogId);
        const url = photo ? `http://127.0.0.1:8000/storage/dogs_photos/${photo.photo_name_dog}` : null;
        console.log('Photo URL:', url);
        return url;
    };

    // Filtrer les patients selon le terme de recherche
    const filteredPatients = patients.filter((patient) => {
        const ownerName = owners[patient.user_id] || 'Inconnu';
        return (
            patient.name_dog.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ownerName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="bg-gray-100 min-h-screen p-6 rounded-lg">
            {/* Champ de recherche */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Rechercher par nom de chien ou propriétaire..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>
            
            {/* Tableau des patients */}
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        {/* Ajoutez d'autres en-têtes de colonne ici */}
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
                            {/* Autres colonnes du tableau */}
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
                                <p className="text-gray-900 whitespace-no-wrap">{owners[patient.user_id] || 'Inconnu'}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <a
                                    href={generateSecureQRCodeURL(patient.id)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    {patient.sex === "Femelle"
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
