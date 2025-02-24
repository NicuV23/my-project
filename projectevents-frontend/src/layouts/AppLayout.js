import React from 'react';
import Navigation from '../components/eventhub/Navigation';

const AppLayout = ({ children }) => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen w-full font-[Inter]">
   <Navigation/>
      <div className="container mx-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;