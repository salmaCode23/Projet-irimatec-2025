import * as React from 'react';

export default function CardComponent({ image, title, description, end, isAction }) {
  return (
    <div className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col justify-between">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-40 sm:h-48 md:h-56 object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 flex-1">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
          {description}
        </p>
      </div>

      {/* End / Optional Button */}
      {end && (
        <div className="p-4 pt-0">
          {isAction ? (
            <a
              href={end}
              className="inline-flex items-center px-4 py-2 bg-green-700 text-white text-sm font-medium rounded hover:bg-yello-200 transition"
            >
             Voir plus
            </a>
          ) : (
            <p className="text-gray-500 text-sm">{end}</p>
          )}
        </div>
      )}
    </div>
  );
}
