import React, { useState, useEffect } from "react";
import { WindowFrame } from "@/components/WindowFrame";
import { DesktopIcon } from "@/components/DesktopIcon";
import { DocsWindow } from "@/pages/Docs";
import { TextPadWindow } from "@/pages/TextPad";
import { PhotosWindow } from "@/pages/Photos";
import {
  User,
  Briefcase,
  Mail,
  Monitor,
  HardDrive,
  Terminal,
  FileText,
  Image,
  PlayIcon,
  Calendar,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Desktop() {
  const [activeWindow, setActiveWindow] = useState<string | null>("about");
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isShutDown, setIsShutDown] = useState(false);
  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({
    mycomputer: false,
    about: true,
    projects: true,
    why: false,
    contact: false,
    docs: false,
    textpad: false,
    photos: false,
    music: false,
    featured: false,
    recyclebin: false,
    mosaic: false,
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
    photos: false,
    music: false,
    featured: false,
    recyclebin: false,
    mosaic: false,
  });
  const [openedBinFile, setOpenedBinFile] = useState<{type: 'recent' | 'archive', name: string} | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      setCurrentTime(`${displayHours}:${minutes} ${period}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    if (!isShutDown) return;
    
    const handleKeyPress = () => {
      setIsShutDown(false);
      setStartMenuOpen(false);
    };
    
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isShutDown]);

  return (
    <div className="w-full h-screen bg-win-teal relative overflow-hidden select-none p-4 font-sans text-sm">
      {/* Desktop Icons - Left */}
      <div className="absolute top-4 left-4 flex flex-col gap-3 z-0">
        <DesktopIcon
          label="My Computer"
          icon={
            <Monitor className="w-10 h-10 text-win-gray-light fill-win-teal stroke-[1.5]" />
          }
          onClick={() => openFromIcon("mycomputer")}
        />
        <div className="flex gap-3">
          <DesktopIcon
            label="About Me"
            icon={
              <User className="w-10 h-10 text-yellow-200 fill-yellow-600 stroke-[1.5]" />
            }
            onClick={() => openFromIcon("about")}
          />
          <DesktopIcon
            label="Calender"
            icon={
              <Calendar className="w-10 h-10 text-green-200 fill-green-600 stroke-[1.5]" />
            }
            onClick={() => window.open("https://calendly.com/hello-trymosaic/30min", "_blank")}
          />
        </div>
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
        <div className="flex gap-3">
          <div className="w-[88px]"></div>
          <DesktopIcon
            label="Why This Exists"
            icon={
              <Terminal className="w-10 h-10 text-gray-200 fill-black stroke-[1.5]" />
            }
            onClick={() => openFromIcon("why")}
          />
        </div>
      </div>

      {/* Desktop Icons - Contact (Separated) */}
      <div className="absolute bottom-24 left-4 flex flex-col gap-3 z-0">
        <DesktopIcon
          label="Contact"
          icon={
            <Mail className="w-10 h-10 text-white fill-win-blue stroke-[1.5]" />
          }
          onClick={() => openFromIcon("contact")}
        />
      </div>

      {/* Desktop Icons - Right */}
      <div className="absolute top-4 right-4 flex flex-col gap-3 z-0">
        <DesktopIcon
          label="Recycle Bin"
          icon={
            <Trash2 className="w-10 h-10 text-red-300 fill-red-600 stroke-[1.5]" />
          }
          onClick={() => openFromIcon("recyclebin")}
        />
        <DesktopIcon
          label="My Photos"
          icon={
            <Image className="w-10 h-10 text-white fill-white/20 stroke-[1.5]" />
          }
          onClick={() => openFromIcon("photos")}
        />
        <DesktopIcon
          label="Text Pad.txt"
          icon={
            <FileText className="w-10 h-10 text-gray-300 fill-gray-400 stroke-[1.5]" />
          }
          onClick={() => openFromIcon("textpad")}
        />
      </div>

      {/* Desktop Icons - Bottom Right */}
      <div className="absolute bottom-24 right-4 flex flex-col gap-3 z-0">
        <DesktopIcon
          label="Stuff I Featured In"
          icon={
            <HardDrive className="w-10 h-10 text-purple-200 fill-purple-600 stroke-[1.5]" />
          }
          onClick={() => openFromIcon("featured")}
        />
      </div>

      {/* Easter Egg - Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
        <DesktopIcon
          label="mosaic.png"
          icon={
            <img src="/mosaic-logo.png" alt="mosaic.png" className="w-10 h-10 object-contain" />
          }
          onClick={() => openFromIcon("mosaic")}
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
                  <span>About Me</span>
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
                  <Briefcase className="w-3 h-3 inline mr-1" />
                  Projects
                </div>
                <button
                  onClick={() =>
                    window.open("https://neurotraits.trymosaic.co", "_blank")
                  }
                  className="w-full text-left px-6 py-2 text-xs hover:bg-win-blue hover:text-white border-b border-gray-100"
                  data-testid="mycomputer-neurotraits"
                >
                  NeuroTraits
                </button>
                <button
                  onClick={() =>
                    window.open("https://focus.trymosaic.co", "_blank")
                  }
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
          title="About Me"
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
              <img
                src="/photos/photo3.jpg"
                alt="Ryan Hoare"
                className="w-16 h-16 border border-black shadow-inner flex-shrink-0 object-cover"
              />
              <div>
                <h3 className="text-lg font-bold font-sans m-0">Ryan Hoare</h3>
                <p className="text-sm mt-1 italic">
                  Builder by nature. Infrastructure by inclination.
                </p>
              </div>
            </div>
            <h4 className="font-bold mb-2">About</h4>
            <p className="mb-4">
              I build systems that help organisations deal with reality rather
              than pretend it is simpler than it is.
            </p>
            <p className="mb-4">
              Most of my work sits at the junction of software,product, and
              human behaviour. I focus on the parts that are usually hand-waved
              away: edge cases, accountability, compliance, trust, and what
              happens when a process meets a tired person on a bad day.
            </p>
            <p className="mb-4">
              I'm the founder of TryMosaic, a platform that turns reasonable
              adjustments from an awkward conversation into dependable
              infrastructure. The work is grounded in lived experience, and
              shaped by time spent inside large institutions where good
              intentions routinely fail without systems to support them.
            </p>
            <p className="mb-4">
              I'm sceptical of novelty for its own sake. I care about things
              that work quietly, scale without drama, and stand up to scrutiny.
              My default move is to reduce complexity, make responsibility
              explicit, and design for the person who has to use the system when
              they are already under pressure.
            </p>
            <p className="mb-4">
              I write in plain English because clarity is a form of respect. I
              build software the same way.
            </p>
            <p>I'm based in Bristol, and I'm a parent to a wonderful child.</p>
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
                <PlayIcon className="w-4 h-4" /> What am I working on?
              </h4>
              <p className="text-xs text-gray-800">
                I build small tools and platforms at the intersection of
                neurodiversity, work, and humane technology. Some are
                experiments, some are practical utilities, and some grow into
                proper products. This page is a living index of those projects.
                It includes{" "}
                <a
                  href="https://trymosaic.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800 underline"
                >
                  TryMosaic
                </a>{" "}
                a workplace adjustments platform built to help organisations
                handle reasonable adjustments clearly, consistently, and with
                less friction for everyone involved. Alongside that are smaller
                tools, prototypes, and side projects that explore focus,
                self-understanding, and better ways of working.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="border border-win-gray-dark p-2 bg-white">
                <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                  <HardDrive className="w-4 h-4" /> TryMosaic
                </h4>
                <p className="text-xs text-gray-800">
                  TryMosaic is a software platform I’m building to help
                  employers handle reasonable adjustments properly. It gives
                  employees a clear way to describe what they need, helps
                  managers respond consistently, and gives HR an auditable
                  record aligned with UK equality law you can find it{" "}
                  <a
                    href="https://trymosaic.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-800 underline"
                  >
                    here
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
                    className="text-blue-800 underline"
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
                    className="text-blue-800 underline"
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
                    className="text-blue-800 underline"
                  >
                    here
                  </a>{" "}
                  to find out more.
                </p>
              </div>
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
              I spend my working life building systems that are meant to support
              people. Too often, the tools we use do the opposite. They add
              friction, noise, and obligation where there should be clarity.
            </p>
            <p className="mb-4">
              This site is intentionally simple. It loads quickly. It explains
              itself. It gets out of the way.
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

      {openWindows.photos && (
        <WindowFrame
          id="photos"
          title="My Photos"
          initialPosition={{ x: 60, y: 60 }}
          isActive={activeWindow === "photos"}
          onFocus={() => bringToFront("photos")}
          onClose={() => closeWindow("photos")}
          onMinimize={() => minimizeWindow("photos")}
          width="600px"
          height="500px"
          className={minimizedWindows.photos ? "hidden" : ""}
        >
          <PhotosWindow />
        </WindowFrame>
      )}

      {openWindows.music && (
        <WindowFrame
          id="music"
          title="music.png"
          initialPosition={{ x: 50, y: 50 }}
          isActive={activeWindow === "music"}
          onFocus={() => bringToFront("music")}
          onClose={() => closeWindow("music")}
          onMinimize={() => minimizeWindow("music")}
          width="400px"
          height="400px"
          className={minimizedWindows.music ? "hidden" : ""}
        >
          <div className="w-full h-full bg-win-teal flex items-center justify-center p-4">
            <img src="/mosaic-logo.png" alt="Mosaic Logo" className="w-full h-full object-contain" />
          </div>
        </WindowFrame>
      )}

      {openWindows.featured && (
        <WindowFrame
          id="featured"
          title="Stuff I Featured In"
          initialPosition={{ x: 70, y: 70 }}
          isActive={activeWindow === "featured"}
          onFocus={() => bringToFront("featured")}
          onClose={() => closeWindow("featured")}
          onMinimize={() => minimizeWindow("featured")}
          width="500px"
          height="300px"
          className={minimizedWindows.featured ? "hidden" : ""}
        >
          <div className="flex flex-col h-full bg-white">
            <div className="bg-win-gray px-3 py-2 border-b border-win-gray-dark font-bold text-sm">
              Folder
            </div>
            <div className="flex-1 overflow-auto">
              <div className="space-y-0">
                <button
                  onClick={() =>
                    window.open(
                      "https://technation.io/creo-startups-to-watch/",
                      "_blank"
                    )
                  }
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-win-blue hover:text-white border-b border-gray-100"
                  data-testid="featured-technation"
                >
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span>TechNation - Creo Startups to Watch</span>
                </button>
                <button
                  onClick={() =>
                    window.open(
                      "https://info.microsoft.com/EM-InnAI-WHTPP-FY26-12Dec-12-The-Future-Proof-AI-Framework-SRGCM15729_LP01-Registration---Form-in-Body.html",
                      "_blank"
                    )
                  }
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-win-blue hover:text-white border-b border-gray-100"
                  data-testid="featured-microsoft"
                >
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span>Microsoft - Future-Proof AI Framework</span>
                </button>
              </div>
            </div>
          </div>
        </WindowFrame>
      )}

      {openWindows.recyclebin && (
        <WindowFrame
          id="recyclebin"
          title="Recycle Bin"
          initialPosition={{ x: 100, y: 100 }}
          isActive={activeWindow === "recyclebin"}
          onFocus={() => bringToFront("recyclebin")}
          onClose={() => closeWindow("recyclebin")}
          onMinimize={() => minimizeWindow("recyclebin")}
          width="500px"
          height="400px"
          className={minimizedWindows.recyclebin ? "hidden" : ""}
        >
          <div className="flex flex-col h-full bg-white">
            <div className="flex-1 overflow-auto">
              {/* Recently Deleted */}
              <div className="border-b-2 border-gray-300">
                <div className="bg-win-gray px-3 py-2 font-bold text-xs">Recently Deleted</div>
                <div className="space-y-0">
                  {["usepassport_v2(final)(2).xls", "ai_summary_APPROVED_FINAL.docx", "manager_followup_notes.txt", "export_for_hr_latest_v4.csv", "adjustments_agreed_in_meeting.docx"].map((file) => (
                    <button
                      key={file}
                      onClick={() => setOpenedBinFile({ type: 'recent', name: file })}
                      className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-win-blue hover:text-white border-b border-gray-100"
                    >
                      <FileText className="w-4 h-4 flex-shrink-0" />
                      <span>{file}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Archive */}
              <div>
                <div className="bg-win-gray px-3 py-2 font-bold text-xs">Archive (cannot be recovered)</div>
                <div className="space-y-0">
                  {["ai-coach-for-employees.docx", "personalized-ai-coach-version-1.md", "pip.doc", "ai-slop.tsx", "morningroutinebuilder.py"].map((file) => (
                    <button
                      key={file}
                      onClick={() => setOpenedBinFile({ type: 'archive', name: file })}
                      className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-win-blue hover:text-white border-b border-gray-100"
                    >
                      <FileText className="w-4 h-4 flex-shrink-0" />
                      <span>{file}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </WindowFrame>
      )}

      {openWindows.mosaic && (
        <WindowFrame
          id="mosaic"
          title="mosaic.png"
          initialPosition={{ x: 50, y: 50 }}
          isActive={activeWindow === "mosaic"}
          onFocus={() => bringToFront("mosaic")}
          onClose={() => closeWindow("mosaic")}
          onMinimize={() => minimizeWindow("mosaic")}
          width="400px"
          height="400px"
          className={minimizedWindows.mosaic ? "hidden" : ""}
        >
          <div className="w-full h-full bg-win-teal flex items-center justify-center p-4">
            <img src="/mosaic-logo.png" alt="Mosaic Logo" className="w-full h-full object-contain" />
          </div>
        </WindowFrame>
      )}

      {openedBinFile && (
        <WindowFrame
          id={`binfile-${openedBinFile.name}`}
          title={openedBinFile.name}
          initialPosition={{ x: 150, y: 150 }}
          isActive={true}
          onFocus={() => {}}
          onClose={() => setOpenedBinFile(null)}
          onMinimize={() => {}}
          width="400px"
          height="200px"
        >
          <div className="flex flex-col h-full bg-white p-4 justify-center">
            {openedBinFile.type === 'recent' ? (
              <>
                <div className="text-xs text-gray-700 mb-4">
                  {openedBinFile.name === "usepassport_v2(final)(2).xls" && "Ownership unclear. Multiple versions in circulation."}
                  {openedBinFile.name === "ai_summary_APPROVED_FINAL.docx" && "Decisions referenced but not recorded."}
                  {openedBinFile.name === "manager_followup_notes.txt" && "Informal agreement. No audit trail."}
                  {openedBinFile.name === "export_for_hr_latest_v4.csv" && "Manual workaround adopted."}
                  {openedBinFile.name === "adjustments_agreed_in_meeting.docx" && "Ownership unclear. Multiple versions in circulation."}
                </div>
                <button
                  onClick={() => setOpenedBinFile(null)}
                  className="self-start px-3 py-1 border-2 border-t-white border-l-white border-b-black border-r-black bg-win-gray text-xs hover:bg-win-gray-light active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <div className="text-xs font-bold mb-2">Archived</div>
                <div className="text-xs text-gray-700 mb-4">
                  {openedBinFile.name === "ai-coach-for-employees.docx" && "Coaching requires trust, context, and accountability."}
                  {openedBinFile.name === "personalized-ai-coach-version-1.md" && "Personalisation implied authority without consent."}
                  {openedBinFile.name === "pip.doc" && "Process followed. Care absent."}
                  {openedBinFile.name === "ai-slop.tsx" && "Output increased activity without increasing understanding."}
                  {openedBinFile.name === "morningroutinebuilder.py" && "Optimised behaviour without asking why."}
                </div>
                <button
                  onClick={() => setOpenedBinFile(null)}
                  className="self-start px-3 py-1 border-2 border-t-white border-l-white border-b-black border-r-black bg-win-gray text-xs hover:bg-win-gray-light active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </WindowFrame>
      )}

      {/* Start Menu */}
      {startMenuOpen && (
        <div className="absolute bottom-[28px] left-1 flex z-[110]">
          {/* Main Menu */}
          <div className="bg-win-gray border-2 border-t-white border-l-white border-b-black border-r-black shadow-[1px_1px_0_black,-1px_-1px_0_white]">
            <div className="py-1 w-32">
              <button 
                onClick={() => setExpandedMenu(expandedMenu === "programs" ? null : "programs")}
                className="w-full text-left px-2 py-1 text-xs flex items-center justify-between hover:bg-win-blue hover:text-white"
              >
                <span>Programs</span>
                <span>▶</span>
              </button>

              <button 
                onClick={() => setExpandedMenu(expandedMenu === "documents" ? null : "documents")}
                className="w-full text-left px-2 py-1 text-xs flex items-center justify-between hover:bg-win-blue hover:text-white"
              >
                <span>Documents</span>
                <span>▶</span>
              </button>

              <div className="h-px bg-win-gray-dark my-1 mx-1 border-t border-win-white"></div>

              <button
                onClick={() => {
                  bringToFront("about");
                  setStartMenuOpen(false);
                }}
                className="w-full text-left px-2 py-1 text-xs hover:bg-win-blue hover:text-white block"
              >
                About Me
              </button>

              <div className="h-px bg-win-gray-dark my-1 mx-1 border-t border-win-white"></div>

              <button
                onClick={() => setIsShutDown(true)}
                className="w-full text-left px-2 py-1 text-xs hover:bg-win-blue hover:text-white block"
              >
                Shut Down
              </button>
            </div>
          </div>

          {/* Programs Submenu */}
          {expandedMenu === "programs" && (
            <div className="bg-white border-2 border-t-white border-l-white border-b-black border-r-black shadow-[1px_1px_0_black,-1px_-1px_0_white] ml-0">
              <div className="py-1 w-40">
                <button
                  onClick={() => {
                    window.open("https://neurotraits.trymosaic.co", "_blank");
                    setStartMenuOpen(false);
                  }}
                  className="w-full text-left px-2 py-1 text-xs hover:bg-win-blue hover:text-white block"
                  data-testid="startmenu-neurotraits"
                >
                  NeuroTraits
                </button>
                <button
                  onClick={() => {
                    window.open("https://focus.trymosaic.co", "_blank");
                    setStartMenuOpen(false);
                  }}
                  className="w-full text-left px-2 py-1 text-xs hover:bg-win-blue hover:text-white block"
                  data-testid="startmenu-mosaic-focus"
                >
                  Mosaic Focus
                </button>
                <button
                  onClick={() => {
                    window.open("https://trymosaic.co", "_blank");
                    setStartMenuOpen(false);
                  }}
                  className="w-full text-left px-2 py-1 text-xs hover:bg-win-blue hover:text-white block"
                  data-testid="startmenu-mosaic"
                >
                  Mosaic
                </button>
              </div>
            </div>
          )}

          {/* Documents Submenu */}
          {expandedMenu === "documents" && (
            <div className="bg-white border-2 border-t-white border-l-white border-b-black border-r-black shadow-[1px_1px_0_black,-1px_-1px_0_white] ml-0">
              <div className="py-1 w-40">
                <button
                  onClick={() => {
                    bringToFront("docs");
                    setStartMenuOpen(false);
                  }}
                  className="w-full text-left px-2 py-1 text-xs hover:bg-win-blue hover:text-white block"
                  data-testid="startmenu-essays"
                >
                  Essays
                </button>
                <button
                  onClick={() => {
                    bringToFront("textpad");
                    setStartMenuOpen(false);
                  }}
                  className="w-full text-left px-2 py-1 text-xs hover:bg-win-blue hover:text-white block"
                  data-testid="startmenu-textpad"
                >
                  Text Pad
                </button>
                <button
                  onClick={() => {
                    bringToFront("featured");
                    setStartMenuOpen(false);
                  }}
                  className="w-full text-left px-2 py-1 text-xs hover:bg-win-blue hover:text-white block"
                  data-testid="startmenu-featured"
                >
                  Stuff I Featured In
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Shutdown Screen */}
      {isShutDown && (
        <div className="absolute inset-0 z-[200] bg-black flex items-center justify-center" style={{ animation: 'fadeIn 0.5s ease-in' }}>
          <p className="text-white text-center text-sm">It is now safe to turn off your computer.</p>
        </div>
      )}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 w-full h-[28px] bg-win-gray border-t border-win-white flex items-center px-1 z-[100] shadow-[0_-1px_0_#808080]">
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="flex items-center gap-1 px-1 h-[22px] border-2 border-t-white border-l-white border-b-black border-r-black bg-win-gray hover:bg-win-gray-light active:border-t-black active:border-l-black active:border-b-white active:border-r-white font-bold text-sm shadow-[1px_1px_0_black]"
        >
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
                  {id === "photos" && <Image className="w-3 h-3" />}
                  {id === "why" && <Terminal className="w-3 h-3" />}
                  {id === "contact" && <Mail className="w-3 h-3" />}
                  {id === "music" && <Image className="w-3 h-3" />}
                  {id === "featured" && <HardDrive className="w-3 h-3" />}
                  <span className="capitalize truncate">
                    {id === "mycomputer"
                      ? "My Computer"
                      : id === "why"
                        ? "Why This Exists.txt"
                        : id === "docs"
                          ? "Essays"
                          : id === "textpad"
                            ? "Text Pad.txt"
                            : id === "photos"
                              ? "My Photos"
                              : id === "mosaic"
                                ? "mosaic.png"
                                : id === "featured"
                                  ? "Stuff I Featured In"
                                  : id}
                  </span>
                </button>
              ),
          )}
        </div>

        <div className="ml-auto border-2 border-t-gray-500 border-l-gray-500 border-b-white border-r-white px-2 py-0.5 text-xs bg-win-gray-light flex items-center gap-2 shadow-[1px_1px_0_white]">
          <div className="w-3 h-3">🔊</div>
          <span>{currentTime}</span>
        </div>
      </div>
    </div>
  );
}
