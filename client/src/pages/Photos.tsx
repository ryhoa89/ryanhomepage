import React from "react";
import { Image as ImageIcon } from "lucide-react";

const photos = [
  { id: 1, name: "Team", src: "/photos/photo1.jpg" },
  { id: 2, name: "Speaking", src: "/photos/photo2.jpg" },
  { id: 3, name: "Headshot", src: "/photos/photo3.jpg" },
  { id: 4, name: "Event", src: "/photos/photo4.jpg" },
  { id: 5, name: "Beach", src: "/photos/photo5.jpg" },
];

export function PhotosWindow() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-3 py-2 text-xs text-gray-600 border-b border-gray-200">
        5 object(s)
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="flex flex-col items-center gap-2 cursor-default hover:bg-win-blue hover:text-white p-2 rounded"
              data-testid={`photos-${photo.id}`}
            >
              <div className="w-16 h-16 bg-gray-100 border border-gray-300 flex items-center justify-center overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-center max-w-[80px] break-words">
                {photo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
