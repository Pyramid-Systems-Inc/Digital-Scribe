import React from 'react';

interface TooltipProps {
  title: string;
  description: string;
  category: string;
  unicode: string;
  // x?: number; // Manual positioning if needed
  // y?: number; // Manual positioning if needed
}

const Tooltip: React.FC<TooltipProps> = ({ title, description, category, unicode }) => {
  return (
    <div
      className="absolute z-10 p-2 sm:p-3 -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full
                 bg-papyrus-bg bg-opacity-85 shadow-lg rounded-md
                 border border-gray-400 border-opacity-50
                 w-max max-w-[16rem] sm:max-w-[18rem] md:max-w-xs text-xs sm:text-sm text-gray-800"
      role="tooltip"
    >
      <h3 className="font-bold text-sm sm:text-base mb-1">{title}</h3>
      <p className="mb-1 text-xs sm:text-sm"><span className="font-semibold">Description:</span> {description}</p>
      <p className="mb-1 text-xs sm:text-sm"><span className="font-semibold">Category:</span> {category}</p>
      <p className="text-xs sm:text-sm"><span className="font-semibold">Unicode:</span> {unicode}</p>
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full
                   w-0 h-0 border-l-[6px] sm:border-l-8 border-l-transparent
                   border-r-[6px] sm:border-r-8 border-r-transparent
                   border-t-[6px] sm:border-t-8 border-t-papyrus-bg border-opacity-85"
        style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))' }} // Optional: to match shadow
      ></div>
    </div>
  );
};

export default Tooltip;