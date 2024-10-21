import React from 'react';
import { SplashImage } from '../../assets/export';
import { useNavigate } from 'react-router-dom';


const Splash = () => {
 const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <img 
        src={SplashImage} 
        alt="Splash" 
        className="max-w-full max-h-full object-contain p-4"
        onClick={() => navigate('/login')} 
      />
    </div>
  );
};

export default Splash;
