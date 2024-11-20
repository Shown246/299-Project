import React, { Component } from 'react';
const AboutUs = () => {
  return (
    <div className="bg-white text-gray-900">
      <div className="container mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <img src=" " alt="About Us" className="w-full rounded-lg shadow-lg object-cover" />
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
            <p className="text-lg mb-4">
              Hello World
            </p>
            <p className="text-lg mb-4">
              This is SwiftHire
            </p>
            <p className="text-lg mb-4">
              For CSE299.1
            </p>
            <p className="text-lg font-bold">Sincerely,</p>
            <p className="text-lg">Makers of SwiftHire</p>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <img src="Client\public\assets\Shihab.jpg" alt="Team Member" className="w-32 h-32 rounded-full mb-4 shadow-lg object-cover" />
              <h3 className="text-xl font-semibold">Md. Shihab Tawsif Shown</h3>
              <p className="text-gray-600">221 1939 042 </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img src="Client\public\assets\Rayeed.jpg" alt="Team Member" className="w-32 h-32 rounded-full mb-4 shadow-lg object-cover" />
              <h3 className="text-xl font-semibold">Rayeed Aabir Ahsan</h3>
              <p className="text-gray-600">221 2905 642</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img src="Client\public\assets\Mafin.jpg" alt="Team Member" className="w-32 h-32 rounded-full mb-4 shadow-lg object-cover" />
              <h3 className="text-xl font-semibold">Md. Shoumik Hossain </h3>
              <p className="text-gray-600">221 1848 642</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
