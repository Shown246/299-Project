/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted', form);
  };

  return (
    <div className="bg-white text-gray-900">
      <div className="container90 mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-lg mb-4">
              We'd love to hear from you! Whether you have a question about our services, need assistance or just want to talk, we are here to help.
            </p>
            <p className="text-lg mb-4">
              You can reach us by filling out the form or through the following contact information:
            </p>
            <p className="text-lg mb-4">
              <strong>Email:</strong> support@travelbd.com
            </p>
            <p className="text-lg mb-4">
              <strong>Phone:</strong> +880 1234 567 890
            </p>
            <p className="text-lg">
              <strong>Address:</strong> 123 TravelBD Street, Dhaka, Bangladesh
            </p>
          </div>
          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg shadow-lg">
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-400  rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
