
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface God {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const GodProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [god, setGod] = useState<God | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGod = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/learn/gods/${id}`);
        setGod(response.data);
      } catch (err) {
        setError('Failed to fetch god data. Please try again later.');
      }
      setIsLoading(false);
    };

    fetchGod();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!god) {
    return <div>God not found.</div>;
  }

  return (
    <div className="text-center papyrus-bg rounded-lg p-6 sm:p-8 md:p-12 shadow-papyrus">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold nile-blue mb-4 text-shadow-gold">
        {god.name}
      </h2>
      <img src={god.imageUrl} alt={god.name} className="mx-auto mb-4" />
      <p className="text-base sm:text-lg hieroglyph-brown font-serif leading-relaxed max-w-3xl mx-auto mb-8">
        {god.description}
      </p>
    </div>
  );
};

export default GodProfilePage;
