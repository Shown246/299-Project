/* eslint-disable react/no-unescaped-entities */

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-900">
      <div className="container mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <img src="https://i.ibb.co/44YSdsK/group-photo.jpg" alt="About Us" className="w-full rounded-lg shadow-lg object-cover" />
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
            <p className="text-lg mb-4">
              Welcome to TravelBD, your number one source for all things related to travel and tourism in Bangladesh. We're dedicated to giving you the very best travel experience, with a focus on reliability, customer service, and uniqueness.
            </p>
            <p className="text-lg mb-4">
              Founded in 2023, TravelBD has come a long way from its beginnings. When we first started out, our passion for exploring Bangladesh drove us to do tons of research, so that TravelBD can offer you the best and most comprehensive travel guide. We now serve travelers all over the world and are thrilled that we're able to turn our passion into our own website.
            </p>
            <p className="text-lg mb-4">
              We hope you enjoy our travel guides as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
            </p>
            <p className="text-lg font-bold">Sincerely,</p>
            <p className="text-lg">The TravelBD Team</p>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <img src="https://i.ibb.co/JskRQ77/ceo.jpg" alt="Team Member" className="w-32 h-32 rounded-full mb-4 shadow-lg object-cover" />
              <h3 className="text-xl font-semibold">Shihab Tawsif</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img src="https://i.ibb.co/CV5tkcv/emp2.jpg" alt="Team Member" className="w-32 h-32 rounded-full mb-4 shadow-lg object-cover" />
              <h3 className="text-xl font-semibold">Jerin Tasnim</h3>
              <p className="text-gray-600">Chief Operating Officer</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img src="https://i.ibb.co/YWmYMYv/emp1.jpg" alt="Team Member" className="w-32 h-32 rounded-full mb-4 shadow-lg object-cover" />
              <h3 className="text-xl font-semibold">Salman Muqtadir</h3>
              <p className="text-gray-600">Chief Marketing Officer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
