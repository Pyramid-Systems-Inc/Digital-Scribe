
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface God {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const GodsListPage: React.FC = () => {
  const [gods, setGods] = useState<God[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGods = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/learn/gods');
        setGods(response.data);
      } catch (err) {
        setError('Failed to fetch gods. Please try again later.');
      }
      setIsLoading(false);
    };

    fetchGods();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="text-center papyrus-bg rounded-lg p-6 sm:p-8 md:p-12 shadow-papyrus">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold nile-blue mb-4 text-shadow-gold">
        Meet the Gods
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gods.map((god) => (
          <Link key={god.id} to={`/learn/gods/${god.id}`} className="block p-6 gold-bg rounded-lg shadow-gold hover:opacity-90 transition-opacity">
            <h3 className="text-xl font-display font-bold text-white">{god.name}</h3>
            <p className="font-serif text-white/90">{god.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GodsListPage;
