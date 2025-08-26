import { useState } from "react";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Message Sent!",
      text: "We will get back to you soon!",
      icon: "success",
      confirmButtonColor: "#0D6EFD",
    });
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      phone: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-700">Contact Us</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-2xl space-y-6 border border-blue-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <textarea
          name="message"
          rows="5"
          placeholder="Write your message..."
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
