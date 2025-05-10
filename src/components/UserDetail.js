// components/UserDetail.js
"use client";

import React from "react";

const UserDetail = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1f2a48] p-6 rounded-lg shadow-lg w-full max-w-lg text-white relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-400 hover:text-red-300"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-purple-300 mb-4">{user.name}</h2>
        <div className="space-y-2 text-gray-300">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Website:</strong> {user.website}
          </p>
          <p>
            <strong>Company:</strong> {user.company?.name}
          </p>
          <div className="mt-4 space-y-2">
            <p>
              <strong>Address:</strong> {user.address?.street},{" "}
              {user.address?.suite}, {user.address?.city},{" "}
              {user.address?.zipcode}
            </p>
            <div className="w-full h-64 rounded-md overflow-hidden mt-2 border border-gray-700">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBGcUWDk9nUN4sF3dVA4qCvgXin0j5RvqU&center=${user.address?.geo.lat},${user.address?.geo.lng}&zoom=14`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
