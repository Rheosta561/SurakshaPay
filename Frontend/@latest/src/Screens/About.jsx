import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header Section */}
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6 animate-fade-in">
          About <span className="text-white">SurakshaPay</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Your trusted payment solution for fast, secure, and seamless transactions.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Feature Card 1 */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition hover:scale-105">
          <h2 className="text-2xl font-semibold text-blue-400">Fast & Secure Payments</h2>
          <p className="text-gray-300 mt-3">
            Experience instant and encrypted transactions that ensure your financial security.
          </p>
        </div>

        {/* Feature Card 2 */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition hover:scale-105">
          <h2 className="text-2xl font-semibold text-blue-400">Real-Time Fraud Detection</h2>
          <p className="text-gray-300 mt-3">
            Our AI-driven fraud detection system actively monitors transactions to prevent fraudulent activities.
          </p>
        </div>

        {/* Feature Card 3 */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition hover:scale-105">
          <h2 className="text-2xl font-semibold text-blue-400">Seamless User Experience</h2>
          <p className="text-gray-300 mt-3">
            A smooth, user-friendly interface designed for effortless navigation and quick access.
          </p>
        </div>

        {/* Feature Card 4 */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition hover:scale-105">
          <h2 className="text-2xl font-semibold text-blue-400">Global Payment Support</h2>
          <p className="text-gray-300 mt-3">
            Make transactions across different currencies and payment gateways with ease.
          </p>
        </div>
      </div>

      {/* Security Section */}
      <div className="mt-16 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-400">Your Security, Our Priority</h2>
        <p className="text-gray-300 mt-4">
          At SurakshaPay, we use **end-to-end encryption** and **multi-layered security protocols** to safeguard your transactions.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mt-16 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-400">Our Mission</h2>
        <p className="text-gray-300 mt-4">
          We aim to revolutionize digital transactions by providing a **fast, reliable, and fraud-free** payment experience.
        </p>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <a
          href="/contact"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg text-lg hover:bg-blue-500 transition transform hover:scale-105"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}

export default About;
