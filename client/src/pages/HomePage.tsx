import React from 'react';
import { useSearchParams } from 'react-router-dom';
import HieroglyphComposer from '../components/HieroglyphComposer';

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  // Get initial text from URL query parameter if it exists
  const initialText = searchParams.get('text') || '';

  return <HieroglyphComposer initialText={initialText} />;
};

export default HomePage;