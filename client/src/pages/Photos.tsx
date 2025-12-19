import React, { useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";

const photos = [
  { id: 1, name: "Team", src: "/photos/photo1.jpg" },
  { id: 2, name: "Speaking", src: "/photos/photo2.jpg" },
  { id: 3, name: "Headshot", src: "/photos/photo3.jpg" },
  { id: 4, name: "Event", src: "/photos/photo4.jpg" },
  { id: 5, name: "Beach", src: "/photos/photo5.jpg" },
];

export function PhotosWindow() {
  const [expandedPhotoId, setExpandedPhotoId] = useState<number | null>(null);
  const expandedPhoto = photos.find((p) => p.id === expandedPhotoId);

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
              className="flex flex-col items-center gap-2 cursor-pointer hover:bg-win-blue hover:text-white p-2 rounded"
              data-testid={`photos-${photo.id}`}
              onClick={() => setExpandedPhotoId(photo.id)}
              onDoubleClick={() => setExpandedPhotoId(photo.id)}
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

      {expandedPhoto && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[200]"
          onClick={() => setExpandedPhotoId(null)}
          data-testid="photo-lightbox"
        >
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpandedPhotoId(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded z-10"
              data-testid="button-close-photo"
              aria-label="Close photo"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={expandedPhoto.src}
              alt={expandedPhoto.name}
              className="max-w-full max-h-[90vh] object-contain"
              data-testid={`photo-expanded-${expandedPhoto.id}`}
            />
            <p className="text-white text-center mt-4">{expandedPhoto.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}
