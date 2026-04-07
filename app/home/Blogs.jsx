"use client";

import React from "react";
import { toast } from "react-toastify";
import { easeInOut, motion, scale } from "framer-motion";

function Blogs() {
  function handleCardClick(cardNumber) {
    toast.success(`Card ${cardNumber} clicked!`);
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center bg-blue-300">Blogs</h1>
      <div className="flex flex-wrap gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2, ease: easeInOut }}
          className="flex-1 min-w-[calc(25%-1rem)] bg-white rounded-lg shadow-md p-4 "
          onClick={() => handleCardClick(1)}
        >
          <motion.img
            whileHover={{ rotate: 360 }}
            src="https://images.pexels.com/photos/19825351/pexels-photo-19825351.jpeg"
            alt="Card 1"
            className="w-full h-40 object-cover rounded mb-3"
          />

          <h3 className="font-semibold text-lg mb-2">Card 1</h3>
          <p className="text-gray-600 text-sm">
            This is the first card with content.
          </p>
        </motion.div>
        <motion.div
          className="flex-1 min-w-[calc(25%-1rem)] bg-white rounded-lg shadow-md p-4 "
          onClick={() => handleCardClick(2)}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="https://images.pexels.com/photos/19825351/pexels-photo-19825351.jpeg"
            alt="Card 2"
            className="w-full h-40 object-cover rounded mb-3"
          />
          <h3 className="font-semibold text-lg mb-2">Card 2</h3>
          <p className="text-gray-600 text-sm">
            This is the second card with content.
          </p>
        </motion.div>
        <motion.div
          className="flex-1 min-w-[calc(25%-1rem)] bg-white rounded-lg shadow-md p-4 "
          onClick={() => handleCardClick(3)}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="https://images.pexels.com/photos/19825351/pexels-photo-19825351.jpeg"
            alt="Card 3"
            className="w-full h-40 object-cover rounded mb-3"
          />
          <h3 className="font-semibold text-lg mb-2">Card 3</h3>
          <p className="text-gray-600 text-sm">
            This is the third card with content.
          </p>
        </motion.div>
        <motion.div
          className="flex-1 min-w-[calc(25%-1rem)] bg-white rounded-lg shadow-md p-4 "
          onClick={() => handleCardClick(4)}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="https://images.pexels.com/photos/19825351/pexels-photo-19825351.jpeg"
            alt="Card 4"
            className="w-full h-40 object-cover rounded mb-3"
          />
          <h3 className="font-semibold text-lg mb-2">Card 4</h3>
          <p className="text-gray-600 text-sm">
            This is the fourth card with content.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Blogs;
