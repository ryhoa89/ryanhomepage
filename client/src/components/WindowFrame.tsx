import React, { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import type { Props as RndProps } from 'react-rnd';
import { X, Minus, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  width = 700,
  height = 500,
  id
}: WindowFrameProps) {
  // Convert width and height to numbers for Rnd
  const initialWidth = typeof width === 'number' ? width : 700;
  const initialHeight = typeof height === 'number' ? height : 500;

  const [isMaximized, setIsMaximized] = useState(false);
  const [restoreState, setRestoreState] = useState({
    x: initialPosition.x,
    y: initialPosition.y,
    width: initialWidth,
    height: initialHeight,
  });
  const rndRef = useRef<Rnd>(null);

  const handleMaximize = () => {
    if (!rndRef.current) return;

    if (isMaximized) {
      // Restore to previous size and position
      rndRef.current.updatePosition({ x: restoreState.x, y: restoreState.y });
      rndRef.current.updateSize({ width: restoreState.width, height: restoreState.height });
      setIsMaximized(false);
    } else {
      // Save current state before maximizing
      const currentState = {
        x: rndRef.current.props.position?.x ?? initialPosition.x,
        y: rndRef.current.props.position?.y ?? initialPosition.y,
        width: rndRef.current.props.size?.width ?? initialWidth,
        height: rndRef.current.props.size?.height ?? initialHeight,
      };
      setRestoreState(currentState);

      // Maximize to fill parent (with small margins)
      rndRef.current.updatePosition({ x: 0, y: 0 });

      // Get parent dimensions
      const parent = rndRef.current.resizableElement.current?.parentElement;
      if (parent) {
        const parentWidth = parent.clientWidth;
        const parentHeight = parent.clientHeight;
        rndRef.current.updateSize({
          width: parentWidth - 10,
          height: parentHeight - 40 // Leave room for taskbar
        });
      }

      setIsMaximized(true);
    }
  };

  return (
    <Rnd
      ref={rndRef}
      default={{
        x: initialPosition.x,
        y: initialPosition.y,
        width: initialWidth,
        height: initialHeight,
      }}
      minWidth={200}
      minHeight={150}
      bounds="parent"
      dragHandleClassName="window-title-bar"
      onMouseDown={onFocus}
      // Disable resizing when maximized
      enableResizing={isMaximized ? false : {
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: false,
        topLeft: true,
        bottomRight: true,
        bottomLeft: true,
      }}
      // Disable dragging when maximized
      disableDragging={isMaximized}
      className={cn(
        "win-window shadow-[4px_4px_10px_rgba(0,0,0,0.3)]",
        isActive ? "z-50" : "z-10",
        className
      )}
    >
      <div
        className="flex flex-col w-full h-full"
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
              onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
              onTouchEnd={(e) => { e.stopPropagation(); handleMaximize(); }}
              className="win-button w-[16px] h-[14px] p-0 flex items-center justify-center active:translate-y-[1px]"
              aria-label="Maximize"
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
    </Rnd>
  );
}
