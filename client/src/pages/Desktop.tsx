import React, { useState } from 'react';
import { WindowFrame } from '@/components/WindowFrame';
import { DesktopIcon } from '@/components/DesktopIcon';
import { DocsWindow } from '@/pages/Docs';
import { User, Briefcase, Mail, Monitor, HardDrive, Terminal, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Desktop() {
  const [activeWindow, setActiveWindow] = useState<string | null>('about');
  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({
    about: true,
    projects: true,
    why: false,
    contact: false,
    docs: false,
  });
  const [minimizedWindows, setMinimizedWindows] = useState<Record<string, boolean>>({
    about: false,
    projects: false,
    why: false,
    contact: false,
    docs: false,
  });

  const bringToFront = (id: string) => {
    setActiveWindow(id);
    setMinimizedWindows(prev => ({ ...prev, [id]: false }));
    if (!openWindows[id]) {
      setOpenWindows(prev => ({ ...prev, [id]: true }));
    }
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => ({ ...prev, [id]: false }));
  };

  const minimizeWindow = (id: string) => {
    setMinimizedWindows(prev => ({ ...prev, [id]: true }));
    setActiveWindow(null);
  };

  const toggleTaskbarWindow = (id: string) => {
    if (activeWindow === id && !minimizedWindows[id]) {
      // If it's active and visible, minimize it
      minimizeWindow(id);
    } else {
      // If it's inactive or minimized, bring to front
      bringToFront(id);
    }
  };

  const openFromIcon = (id: string) => {
    bringToFront(id);
  };

  return (
    <div className="w-full h-screen bg-win-teal relative overflow-hidden select-none p-4 font-sans text-sm">
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-6 z-0">
        <DesktopIcon 
          label="My Computer" 
          icon={<Monitor className="w-10 h-10 text-win-gray-light fill-win-teal stroke-[1.5]" />} 
          onClick={() => {}} 
        />
        <DesktopIcon 
          label="About Ryan" 
          icon={<User className="w-10 h-10 text-yellow-200 fill-yellow-600 stroke-[1.5]" />} 
          onClick={() => openFromIcon('about')} 
        />
        <DesktopIcon 
          label="Projects" 
          icon={<Briefcase className="w-10 h-10 text-blue-200 fill-blue-600 stroke-[1.5]" />} 
          onClick={() => openFromIcon('projects')} 
        />
        <DesktopIcon 
          label="Essays" 
          icon={<FileText className="w-10 h-10 text-orange-200 fill-orange-600 stroke-[1.5]" />} 
          onClick={() => openFromIcon('docs')} 
        />
        <DesktopIcon 
          label="Why This Exists" 
          icon={<Terminal className="w-10 h-10 text-gray-200 fill-black stroke-[1.5]" />} 
          onClick={() => openFromIcon('why')} 
        />
        <DesktopIcon 
          label="Contact" 
          icon={<Mail className="w-10 h-10 text-white fill-win-blue stroke-[1.5]" />} 
          onClick={() => openFromIcon('contact')} 
        />
      </div>

      {/* Windows */}
      
      {openWindows.about && (
        <WindowFrame
          id="about"
          title="About Ryan"
          initialPosition={{ x: 40, y: 30 }}
          isActive={activeWindow === 'about'}
          onFocus={() => bringToFront('about')}
          onClose={() => closeWindow('about')}
          onMinimize={() => minimizeWindow('about')}
          width="80vw"
          height="80vh"
          className={minimizedWindows.about ? 'hidden' : ''}
        >
          <div className="prose prose-sm max-w-none text-black">
            <div className="flex gap-4 mb-4 items-start">
              <div className="w-16 h-16 bg-gray-200 border border-black shadow-inner flex-shrink-0 flex items-center justify-center">
                 {/* Placeholder for avatar if needed, or just a gray box */}
                 <User className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-sans m-0">Ryan Hoare</h3>
                <p className="text-sm mt-1 italic">Builder, Infrastructure, Human.</p>
              </div>
            </div>
            <p className="mb-4">
              I build software infrastructure. I prefer simple systems that actually work over complex ones that promise to.
            </p>
            <p className="mb-4">
              Currently based in London. I enjoy calm technology, reliable tools, and solving boring problems well.
            </p>
            <p>
              I write plain English and Code. Usually in that order.
            </p>
          </div>
        </WindowFrame>
      )}

      {openWindows.projects && (
        <WindowFrame
          id="projects"
          title="What I'm Working On"
          initialPosition={{ x: 40, y: 30 }}
          isActive={activeWindow === 'projects'}
          onFocus={() => bringToFront('projects')}
          onClose={() => closeWindow('projects')}
          onMinimize={() => minimizeWindow('projects')}
          width="80vw"
          height="80vh"
          className={minimizedWindows.projects ? 'hidden' : ''}
        >
           <div className="flex flex-col gap-4">
              <div className="border border-win-gray-dark p-2 bg-white">
                 <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                    <HardDrive className="w-4 h-4" /> Infrastructure Design
                 </h4>
                 <p className="text-xs text-gray-800">
                    Building resilient backend systems. Focus on high availability and low maintenance.
                 </p>
              </div>
              
              <div className="border border-win-gray-dark p-2 bg-white">
                 <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                    <Monitor className="w-4 h-4" /> Legacy Systems
                 </h4>
                 <p className="text-xs text-gray-800">
                    Modernising critical business software without breaking it. Digital archaeology.
                 </p>
              </div>

              <div className="border border-win-gray-dark p-2 bg-white">
                 <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                    <User className="w-4 h-4" /> Consulting
                 </h4>
                 <p className="text-xs text-gray-800">
                    Helping small technical teams scale their processes, not just their servers.
                 </p>
              </div>
           </div>
        </WindowFrame>
      )}

      {openWindows.why && (
        <WindowFrame
          id="why"
          title="Why This Exists.txt"
          initialPosition={{ x: 40, y: 30 }}
          isActive={activeWindow === 'why'}
          onFocus={() => bringToFront('why')}
          onClose={() => closeWindow('why')}
          onMinimize={() => minimizeWindow('why')}
          width="80vw"
          height="80vh"
          className={minimizedWindows.why ? 'hidden' : ''}
        >
          <div className="font-mono text-sm">
            <p className="mb-2">This site is a reaction to the modern web.</p>
            <p className="mb-2">It is calm. It is static. It does not track you.</p>
            <p className="mb-2">It loads instantly and respects your attention.</p>
            <p>Also, I really miss Windows 95.</p>
          </div>
        </WindowFrame>
      )}

      {openWindows.contact && (
        <WindowFrame
          id="contact"
          title="Contact Me"
          initialPosition={{ x: 40, y: 30 }}
          isActive={activeWindow === 'contact'}
          onFocus={() => bringToFront('contact')}
          onClose={() => closeWindow('contact')}
          onMinimize={() => minimizeWindow('contact')}
          width="80vw"
          height="80vh"
          className={minimizedWindows.contact ? 'hidden' : ''}
        >
          <div className="text-center p-4 space-y-4">
            <p>The best way to reach me is email.</p>
            <div className="flex flex-col gap-3 items-center">
              <a 
                href="mailto:ryan@trymosaic.co" 
                className="inline-block border-2 border-win-gray-dark border-t-white border-l-white bg-win-gray px-4 py-1 active:border-t-black active:border-l-black active:border-b-white active:border-r-white hover:bg-win-gray-light text-black no-underline"
              >
                Email Ryan
              </a>
              <a 
                href="https://www.linkedin.com/in/ryan-hoare-344b0590/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-win-gray-dark border-t-white border-l-white bg-win-gray px-4 py-1 active:border-t-black active:border-l-black active:border-b-white active:border-r-white hover:bg-win-gray-light text-black no-underline"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
        </WindowFrame>
      )}

      {openWindows.docs && (
        <DocsWindow
          id="docs"
          initialPosition={{ x: 40, y: 30 }}
          isActive={activeWindow === 'docs'}
          onFocus={() => bringToFront('docs')}
          onClose={() => closeWindow('docs')}
          onMinimize={() => minimizeWindow('docs')}
          width="80vw"
          height="80vh"
          className={minimizedWindows.docs ? 'hidden' : ''}
        />
      )}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 w-full h-[28px] bg-win-gray border-t border-win-white flex items-center px-1 z-[100] shadow-[0_-1px_0_#808080]">
        <button 
           className="flex items-center gap-1 px-1 h-[22px] border-2 border-t-white border-l-white border-b-black border-r-black bg-win-gray active:border-t-black active:border-l-black active:border-b-white active:border-r-white font-bold text-sm shadow-[1px_1px_0_black]"
        >
            <div className="w-4 h-4 bg-black/20 italic font-serif font-black text-xs flex items-center justify-center">W</div>
            <span className="mr-1">Start</span>
        </button>
        <div className="w-[2px] h-[20px] bg-win-gray-dark mx-2 border-r border-win-white"></div>
        
        {/* Open Windows in Taskbar */}
        <div className="flex-1 flex gap-1 overflow-hidden">
            {Object.entries(openWindows).map(([id, isOpen]) => isOpen && (
                <button
                    key={id}
                    onClick={() => toggleTaskbarWindow(id)}
                    className={cn(
                        "h-[22px] px-2 min-w-[120px] max-w-[160px] text-left truncate text-xs flex items-center gap-2",
                        activeWindow === id && !minimizedWindows[id]
                        ? "bg-win-gray-light border-2 border-t-black border-l-black border-b-white border-r-white font-bold pattern-dots" // Depressed state
                        : "bg-win-gray border-2 border-t-white border-l-white border-b-black border-r-black shadow-[1px_1px_0_black]"
                    )}
                >
                   {id === 'about' && <User className="w-3 h-3" />}
                   {id === 'projects' && <Briefcase className="w-3 h-3" />}
                   {id === 'docs' && <FileText className="w-3 h-3" />}
                   {id === 'why' && <Terminal className="w-3 h-3" />}
                   {id === 'contact' && <Mail className="w-3 h-3" />}
                   <span className="capitalize truncate">{id === 'why' ? 'Why This Exists.txt' : id === 'docs' ? 'Essays' : id}</span>
                </button>
            ))}
        </div>

        <div className="ml-auto border-2 border-t-gray-500 border-l-gray-500 border-b-white border-r-white px-2 py-0.5 text-xs bg-win-gray-light flex items-center gap-2 shadow-[1px_1px_0_white]">
             <div className="w-3 h-3">🔊</div>
             <span>12:00 PM</span>
        </div>
      </div>
    </div>
  );
}
