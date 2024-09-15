import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext'; // Importer le AuthContext

const CommentsUser = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useContext(AuthContext); // Récupérer le token depuis AuthContext

  // Fonction pour récupérer les utilisateurs et les messages
  useEffect(() => {
    const fetchData = async () => {
      
    
      try {
        setLoading(true);
    
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        };
    
        const [usersResponse, messagesResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/users', config),
          axios.get('http://127.0.0.1:8000/api/messages', config),
        ]);
    
        const filteredMessages = messagesResponse.data.filter(message => message.content !== 'Favoris Ajouté' && message.content !== 'Signalement Ajouté');
    
        
        setUsers(usersResponse.data.users);
        setMessages(filteredMessages);
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError('Une erreur est survenue lors de la récupération des données.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [token]); // Dépendance sur le token

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2 text-red-600">
          <i className="fas fa-comments mr-2"></i>Commentaires
        </h3>
        {messages.map((message) => {
          // Trouver l'utilisateur associé à ce message via user_id
          const user = users.find((u) => u.id === message.user_id);
          return (
            <div
              key={message.id}
              className="flex items-center mb-4 space-x-4 rounded bg-slate-200 p-4"
            >
              <div className="flex-shrink-0 ">
                
                <img src={`http://127.0.0.1:8000${user?.image}`} alt="profile" className="w-10 h-10 rounded-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium  text-red-500">
                  {user?.first_name} {user?.name} 
                </p>
                <p className="text-xs text-gray-600">
                  <i className="fas fa-calendar-alt mr-2"></i>
                  {new Date(message.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <i className="fas fa-comment-alt mr-2"></i>
                  {message.content}
                </p>
               
              </div>
            </div>
          );
        })}
      </div>
   
    </div>
  );
};

export default CommentsUser;
