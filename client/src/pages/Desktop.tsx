import React, { useState } from "react";
import { WindowFrame } from "@/components/WindowFrame";
import { DesktopIcon } from "@/components/DesktopIcon";
import { DocsWindow } from "@/pages/Docs";
import { TextPadWindow } from "@/pages/TextPad";
import {
  User,
  Briefcase,
  Mail,
  Monitor,
  HardDrive,
  Terminal,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Desktop() {
  const [activeWindow, setActiveWindow] = useState<string | null>("about");
  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({
    mycomputer: false,
    about: true,
    projects: true,
    why: false,
    contact: false,
    docs: false,
    textpad: false,
  });
  const [minimizedWindows, setMinimizedWindows] = useState<
    Record<string, boolean>
  >({
    mycomputer: false,
    about: false,
    projects: false,
    why: false,
    contact: false,
    docs: false,
    textpad: false,
  });

  const bringToFront = (id: string) => {
    setActiveWindow(id);
    setMinimizedWindows((prev) => ({ ...prev, [id]: false }));
    if (!openWindows[id]) {
      setOpenWindows((prev) => ({ ...prev, [id]: true }));
    }
  };

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => ({ ...prev, [id]: false }));
  };

  const minimizeWindow = (id: string) => {
    setMinimizedWindows((prev) => ({ ...prev, [id]: true }));
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
          icon={
            <Monitor className="w-10 h-10 text-win-gray-light fill-win-teal stroke-[1.5]" />
          }
          onClick={() => openFromIcon("mycomputer")}
        />
        <DesktopIcon
          label="About Ryan"
          icon={
            <User className="w-10 h-10 text-yellow-200 fill-yellow-600 stroke-[1.5]" />
          }
          onClick={() => openFromIcon("about")}
        />
        <DesktopIcon
          label="Projects"
          icon={
            <Briefcase className="w-10 h-10 text-blue-200 fill-blue-600 stroke-[1.5]" />
          }
          onClick={() => openFromIcon("projects")}
        />
        <DesktopIcon
          label="Essays"
          icon={
            <FileText className="w-10 h-10 text-orange-200 fill-orange-600 stroke-[1.5]" />
          }
          onClick={() => openFromIcon("docs")}
        />
        <DesktopIcon
          label="Text Pad.txt"
          icon={
            <FileText className="w-10 h-10 text-gray-300 fill-gray-400 stroke-[1.5]" />
          }
          onClick={() => openFromIcon("textpad")}
        />
        <DesktopIcon
          label="Why This Exists"
          icon={
            <Terminal className="w-10 h-10 text-gray-200 fill-black stroke-[1.5]" />
          }
          onClick={() => openFromIcon("why")}
        />
        <DesktopIcon
          label="Contact"
          icon={
            <Mail className="w-10 h-10 text-white fill-win-blue stroke-[1.5]" />
          }
          onClick={() => openFromIcon("contact")}
        />
      </div>

      {/* Windows */}

      {openWindows.mycomputer && (
        <WindowFrame
          id="mycomputer"
          title="My Computer"
          initialPosition={{ x: 50, y: 40 }}
          isActive={activeWindow === "mycomputer"}
          onFocus={() => bringToFront("mycomputer")}
          onClose={() => closeWindow("mycomputer")}
          onMinimize={() => minimizeWindow("mycomputer")}
          width="400px"
          height="400px"
          className={minimizedWindows.mycomputer ? "hidden" : ""}
        >
          <div className="flex flex-col h-full bg-white">
            <div className="px-3 py-2 text-xs text-gray-600 border-b border-gray-200">
              Select an item to open.
            </div>
            <div className="flex-1 overflow-auto">
              <div className="space-y-0">
                <button
                  onClick={() => bringToFront("about")}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-win-blue hover:text-white border-b border-gray-100"
                  data-testid="mycomputer-about"
                >
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span>About Ryan</span>
                </button>
                <button
                  onClick={() => bringToFront("projects")}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-win-blue hover:text-white border-b border-gray-100"
                  data-testid="mycomputer-projects"
                >
                  <Briefcase className="w-4 h-4 flex-shrink-0" />
                  <span>Projects</span>
                </button>
                <div className="px-3 py-2 text-xs text-gray-600 font-bold">
                  <Briefcase className="w-3 h-3 inline mr-1" />Projects
                </div>
                <button
                  onClick={() => window.open("https://neurotraits.trymosaic.co", "_blank")}
                  className="w-full text-left px-6 py-2 text-xs hover:bg-win-blue hover:text-white border-b border-gray-100"
                  data-testid="mycomputer-neurotraits"
                >
                  NeuroTraits
                </button>
                <button
                  onClick={() => window.open("https://focus.trymosaic.co", "_blank")}
                  className="w-full text-left px-6 py-2 text-xs hover:bg-win-blue hover:text-white border-b border-gray-100"
                  data-testid="mycomputer-pomadeaux"
                >
                  Mosaic Focus
                </button>
                <button
                  onClick={() => window.open("https://trymosaic.co", "_blank")}
                  className="w-full text-left px-6 py-2 text-xs hover:bg-win-blue hover:text-white border-b border-gray-100"
                  data-testid="mycomputer-mosaic"
                >
                  Mosaic
                </button>
                <button
                  onClick={() => bringToFront("docs")}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-win-blue hover:text-white border-b border-gray-100"
                  data-testid="mycomputer-essays"
                >
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span>Essays</span>
                </button>
                <button
                  onClick={() => bringToFront("why")}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-win-blue hover:text-white border-b border-gray-100"
                  data-testid="mycomputer-why"
                >
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span>Why This Exists.txt</span>
                </button>
                <button
                  onClick={() => bringToFront("textpad")}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-win-blue hover:text-white border-b border-gray-100"
                  data-testid="mycomputer-textpad"
                >
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span>Text Pad.txt</span>
                </button>
                <button
                  onClick={() => bringToFront("contact")}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-win-blue hover:text-white"
                  data-testid="mycomputer-contact"
                >
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span>Contact</span>
                </button>
              </div>
            </div>
          </div>
        </WindowFrame>
      )}

      {openWindows.about && (
        <WindowFrame
          id="about"
          title="About Ryan"
          initialPosition={{ x: 40, y: 30 }}
          isActive={activeWindow === "about"}
          onFocus={() => bringToFront("about")}
          onClose={() => closeWindow("about")}
          onMinimize={() => minimizeWindow("about")}
          width="80vw"
          height="80vh"
          className={minimizedWindows.about ? "hidden" : ""}
        >
          <div className="prose prose-sm max-w-none text-black">
            <div className="flex gap-4 mb-4 items-start">
              <div className="w-16 h-16 bg-gray-200 border border-black shadow-inner flex-shrink-0 flex items-center justify-center">
                {/* Placeholder for avatar if needed, or just a gray box */}
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-sans m-0">Ryan Hoare</h3>
                <p className="text-sm mt-1 italic">
                  Builder by nature. Infrastructure by inclination.
                </p>
              </div>
            </div>
            <h4 className="font-bold mb-2">About</h4>
            <p className="mb-4">
              I build systems that help organisations deal with reality rather than pretend it is simpler than it is.
            </p>
            <p className="mb-4">
              Most of my work sits at the junction of software, policy, and human behaviour. I focus on the parts that are usually hand-waved away: edge cases, accountability, compliance, trust, and what happens when a process meets a tired person on a bad day.
            </p>
            <p className="mb-4">
              I'm the founder of TryMosaic, a platform that turns reasonable adjustments from an awkward conversation into dependable infrastructure. The work is grounded in lived experience, and shaped by time spent inside large institutions where good intentions routinely fail without systems to support them.
            </p>
            <p className="mb-4">
              I'm sceptical of novelty for its own sake. I care about things that work quietly, scale without drama, and stand up to scrutiny. My default move is to reduce complexity, make responsibility explicit, and design for the person who has to use the system when they are already under pressure.
            </p>
            <p className="mb-4">
              I write in plain English because clarity is a form of respect. I build software the same way.
            </p>
            <p>
              I'm based in Bristol, and I'm a parent to a wonderful child.
            </p>
          </div>
        </WindowFrame>
      )}

      {openWindows.projects && (
        <WindowFrame
          id="projects"
          title="What I'm Working On"
          initialPosition={{ x: 40, y: 30 }}
          isActive={activeWindow === "projects"}
          onFocus={() => bringToFront("projects")}
          onClose={() => closeWindow("projects")}
          onMinimize={() => minimizeWindow("projects")}
          width="80vw"
          height="80vh"
          className={minimizedWindows.projects ? "hidden" : ""}
        >
          <div className="flex flex-col gap-4">
            <div className="border border-win-gray-dark p-2 bg-white">
              <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                <HardDrive className="w-4 h-4" /> TryMosaic
              </h4>
              <p className="text-xs text-gray-800">
                A software platform that makes reasonable adjustments
                unreasonably easy found at{" "}
                <a
                  href="https://trymosaic.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  trymosaic.co
                </a>
                .
              </p>
            </div>

            <div className="border border-win-gray-dark p-2 bg-white">
              <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                <Monitor className="w-4 h-4" /> neurotraits
              </h4>
              <p className="text-xs text-gray-800">
                A light tough profiler which makes a simple profile of your
                spiky profile found at{" "}
                <a
                  href="https://neurotraits.trymosaic.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  neurotraits.trymosaic.co
                </a>
                .
              </p>
            </div>
            <div className="border border-win-gray-dark p-2 bg-white">
              <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                <Monitor className="w-4 h-4" /> Mosaic focus
              </h4>
              <p className="text-xs text-gray-800">
                A hygee pomodero timer(A gentle focus timer) which is ND
                friendly. Described as the "cutest time i've ever seen." found
                at{" "}
                <a
                  href="https://focus.trymosaic.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  focus.trymosaic.co
                </a>
                .
              </p>
            </div>

            <div className="border border-win-gray-dark p-2 bg-white">
              <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                <User className="w-4 h-4" /> Consulting
              </h4>
              <p className="text-xs text-gray-800">
                I do talks on product, neurodiversty and tech contact me{" "}
                <a
                  href="mailto:hello@trymosaic.co"
                  className="text-blue-500 underline"
                >
                  here
                </a>{" "}
                to find out more.
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
          isActive={activeWindow === "why"}
          onFocus={() => bringToFront("why")}
          onClose={() => closeWindow("why")}
          onMinimize={() => minimizeWindow("why")}
          width="80vw"
          height="80vh"
          className={minimizedWindows.why ? "hidden" : ""}
        >
          <div className="font-mono text-sm leading-relaxed">
            <p className="mb-4">This site is a reaction to the modern web.</p>
            <p className="mb-1">It is calm.</p>
            <p className="mb-1">It is static.</p>
            <p className="mb-4">It does not track you</p>
            <p className="mb-4">
              I spend my working life building systems that are meant to support people. Too often, the tools we use do the opposite. They add friction, noise, and obligation where there should be clarity.
            </p>
            <p className="mb-4">
              This site is intentionally simple. It loads quickly. It explains itself. It gets out of the way.
            </p>
            <p>Also, I really miss Windows 95.</p>
          </div>
        </WindowFrame>
      )}

      {openWindows.contact && (
        <WindowFrame
          id="contact"
          title="Contact Me"
          initialPosition={{ x: 40, y: 30 }}
          isActive={activeWindow === "contact"}
          onFocus={() => bringToFront("contact")}
          onClose={() => closeWindow("contact")}
          onMinimize={() => minimizeWindow("contact")}
          width="80vw"
          height="80vh"
          className={minimizedWindows.contact ? "hidden" : ""}
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
          isActive={activeWindow === "docs"}
          onFocus={() => bringToFront("docs")}
          onClose={() => closeWindow("docs")}
          onMinimize={() => minimizeWindow("docs")}
          width="80vw"
          height="80vh"
          className={minimizedWindows.docs ? "hidden" : ""}
        />
      )}

      {openWindows.textpad && (
        <WindowFrame
          id="textpad"
          title="Text Pad.txt"
          initialPosition={{ x: 60, y: 50 }}
          isActive={activeWindow === "textpad"}
          onFocus={() => bringToFront("textpad")}
          onClose={() => closeWindow("textpad")}
          onMinimize={() => minimizeWindow("textpad")}
          width="600px"
          height="500px"
          className={minimizedWindows.textpad ? "hidden" : ""}
        >
          <TextPadWindow />
        </WindowFrame>
      )}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 w-full h-[28px] bg-win-gray border-t border-win-white flex items-center px-1 z-[100] shadow-[0_-1px_0_#808080]">
        <button className="flex items-center gap-1 px-1 h-[22px] border-2 border-t-white border-l-white border-b-black border-r-black bg-win-gray active:border-t-black active:border-l-black active:border-b-white active:border-r-white font-bold text-sm shadow-[1px_1px_0_black]">
          <div className="w-4 h-4 bg-black/20 italic font-serif font-black text-xs flex items-center justify-center">
            W
          </div>
          <span className="mr-1">Start</span>
        </button>
        <div className="w-[2px] h-[20px] bg-win-gray-dark mx-2 border-r border-win-white"></div>

        {/* Open Windows in Taskbar */}
        <div className="flex-1 flex gap-1 overflow-hidden">
          {Object.entries(openWindows).map(
            ([id, isOpen]) =>
              isOpen && (
                <button
                  key={id}
                  onClick={() => toggleTaskbarWindow(id)}
                  className={cn(
                    "h-[22px] px-2 min-w-[120px] max-w-[160px] text-left truncate text-xs flex items-center gap-2",
                    activeWindow === id && !minimizedWindows[id]
                      ? "bg-win-gray-light border-2 border-t-black border-l-black border-b-white border-r-white font-bold pattern-dots" // Depressed state
                      : "bg-win-gray border-2 border-t-white border-l-white border-b-black border-r-black shadow-[1px_1px_0_black]",
                  )}
                >
                  {id === "mycomputer" && <Monitor className="w-3 h-3" />}
                  {id === "about" && <User className="w-3 h-3" />}
                  {id === "projects" && <Briefcase className="w-3 h-3" />}
                  {id === "docs" && <FileText className="w-3 h-3" />}
                  {id === "textpad" && <FileText className="w-3 h-3" />}
                  {id === "why" && <Terminal className="w-3 h-3" />}
                  {id === "contact" && <Mail className="w-3 h-3" />}
                  <span className="capitalize truncate">
                    {id === "mycomputer"
                      ? "My Computer"
                      : id === "why"
                        ? "Why This Exists.txt"
                        : id === "docs"
                          ? "Essays"
                          : id === "textpad"
                            ? "Text Pad.txt"
                            : id}
                  </span>
                </button>
              ),
          )}
        </div>

        <div className="ml-auto border-2 border-t-gray-500 border-l-gray-500 border-b-white border-r-white px-2 py-0.5 text-xs bg-win-gray-light flex items-center gap-2 shadow-[1px_1px_0_white]">
          <div className="w-3 h-3">🔊</div>
          <span>12:00 PM</span>
        </div>
      </div>
    </div>
  );
}
