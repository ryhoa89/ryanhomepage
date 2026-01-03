import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import { X, Minus, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import 'react-resizable/css/styles.css';

interface WindowFrameProps {
  title: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  isActive?: boolean;
  onFocus?: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
  className?: string;
  width?: number | string;
  height?: number | string;
  id: string;
}

export function WindowFrame({
  title,
  children,
  initialPosition = { x: 50, y: 50 },
  isActive = false,
  onFocus,
  onClose,
  onMinimize,
  className,
  width = 400,
  height = 'auto',
  id
}: WindowFrameProps) {
  const nodeRef = useRef(null);

  // Convert initial width/height to numbers for resizing
  const initialWidth = typeof width === 'number' ? width : parseInt(String(width)) || 400;
  const initialHeight = typeof height === 'number' ? height : (height === 'auto' ? 300 : parseInt(String(height)) || 300);

  // State to track current window size
  const [windowSize, setWindowSize] = useState({
    width: initialWidth,
    height: initialHeight
  });

  // Handle resize events
  const handleResize = (event: React.SyntheticEvent, data: ResizeCallbackData) => {
    setWindowSize({
      width: data.size.width,
      height: data.size.height
    });
  };

  return (
    <Draggable
      handle=".window-title-bar"
      defaultPosition={initialPosition}
      nodeRef={nodeRef}
      onStart={onFocus}
      bounds="parent"
    >
      <Resizable
        width={windowSize.width}
        height={windowSize.height}
        onResize={handleResize}
        minConstraints={[200, 150]}
        maxConstraints={[window.innerWidth * 0.94, window.innerHeight * 0.9]}
        resizeHandles={['se', 'e', 's', 'sw', 'ne', 'nw', 'n', 'w']}
      >
        <div
          ref={nodeRef}
          className={cn(
            "win-window absolute flex flex-col shadow-[4px_4px_10px_rgba(0,0,0,0.3)]",
            isActive ? "z-50" : "z-10",
            className
          )}
          style={{ width: `${windowSize.width}px`, height: `${windowSize.height}px` }}
          onClick={onFocus}
          id={id}
        >
        <div className={cn(
          "window-title-bar flex items-center justify-between px-1 py-0.5 mb-1 cursor-default select-none",
          isActive ? "bg-win-blue text-white" : "bg-win-gray-dark text-win-gray-light"
        )}>
          <div className="flex items-center gap-2 font-bold tracking-wide text-sm truncate max-w-[calc(100%-60px)]">
            {/* Optional Icon could go here */}
            <span>{title}</span>
          </div>
          <div className="flex gap-0.5">
            <button 
              onClick={(e) => { e.stopPropagation(); onMinimize?.(); }}
              onTouchEnd={(e) => { e.stopPropagation(); onMinimize?.(); }}
              className="win-button w-[16px] h-[14px] p-0 flex items-center justify-center active:translate-y-[1px]"
              aria-label="Minimize"
            >
              <div className="w-[8px] h-[2px] bg-black translate-y-[3px]" />
            </button>
            <button 
              className="win-button w-[16px] h-[14px] p-0 flex items-center justify-center opacity-50 cursor-not-allowed"
              aria-label="Maximize"
              disabled
            >
              <div className="w-[9px] h-[8px] border-t border-l border-r border-black" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onClose?.(); }}
              onTouchEnd={(e) => { e.stopPropagation(); onClose?.(); }}
              className="win-button w-[16px] h-[14px] p-0 flex items-center justify-center active:translate-y-[1px] ml-0.5"
              aria-label="Close"
            >
              <X className="w-3 h-3 text-black stroke-[3]" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 bg-white border-2 border-t-black border-l-black border-r-win-white border-b-win-white overflow-auto p-4 text-black font-sans">
          {children}
        </div>
      </div>
      </Resizable>
    </Draggable>
  );
}
