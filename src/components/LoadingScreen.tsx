import React from 'react';
import "../css/loading_screen.css";

interface LoadingScreenProps {}

const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  return (
    <div className="loading-screen">
      <h1>Loading...</h1>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingScreen;