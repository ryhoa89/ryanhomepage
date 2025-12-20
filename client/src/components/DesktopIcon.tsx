import React from 'react';

interface DesktopIconProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
}

export function DesktopIcon({ label, icon, onClick, selected }: DesktopIconProps) {
  return (
    <div 
      className="flex flex-col items-center gap-1 w-20 cursor-pointer group"
      onClick={onClick}
    >
      <div className={`w-14 h-14 flex items-center justify-center ${selected ? 'opacity-50' : ''}`}>
        {icon}
      </div>
      <span className={`
        text-white text-xs text-center px-1 py-0.5 font-sans leading-tight
        ${selected ? 'bg-win-blue border border-dotted border-white' : 'bg-transparent'}
      `}>
        {label}
      </span>
    </div>
  );
}
