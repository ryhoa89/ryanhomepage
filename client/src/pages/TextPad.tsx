import React from "react";

const entries = [
  {
    date: "19 Dec",
    text: "Most things worth doing require patience that doesn't photograph well.",
  },
  {
    date: "16 Dec",
    text: "Good infrastructure is invisible until it fails. Then it becomes the only thing anyone can see.",
  },
  {
    date: "14 Dec",
    text: "The people who complain about bloat are usually the ones who benefit most from it.",
  },
  {
    date: "12 Dec",
    text: "Accessibility isn't a feature. It's an indicator of how carefully you've thought about the problem.",
  },
  {
    date: "10 Dec",
    text: "The best code I ever wrote was code I deleted.",
  },
  {
    date: "8 Dec",
    text: "Systems don't fail because of bad intentions. They fail because of the gap between what someone planned and what actually happens.",
  },
  {
    date: "6 Dec",
    text: "Simplicity on the surface usually means complexity buried underneath. The question is whether that complexity serves you or controls you.",
  },
  {
    date: "4 Dec",
    text: "Every decision to add something is a decision to maintain it forever.",
  },
  {
    date: "2 Dec",
    text: "The most honest software is software that admits what it cannot do.",
  },
  {
    date: "30 Nov",
    text: "You can tell how a system was built by watching what breaks first.",
  },
];

export function TextPadWindow() {
  return (
    <div className="flex flex-col h-full bg-white font-mono text-sm leading-relaxed text-black">
      <div className="flex-1 overflow-auto p-4 whitespace-pre-wrap break-words text-xs">
        {entries.map((entry, index) => (
          <div key={index} data-testid={`textpad-entry-${index}`}>
            <span className="font-bold">{entry.date}</span>
            <span className="ml-2">{entry.text}</span>
            {index < entries.length - 1 && <div className="h-2"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
