import { FaHeartbeat, FaSearch, FaUserFriends } from "react-icons/fa";
// import useRole from "../Hook/useRole";

export default function FeaturedSection()

{

 
  const features = [

    {
      icon: <FaHeartbeat size={30} className="text-red-500" />,
      title: "Safe Blood Donation",
      description: "We ensure safe and voluntary blood donation from trusted donors.",
    },
    {
      icon: <FaUserFriends size={30} className="text-blue-500" />,
      title: "Verified Donor Profiles",
      description: "All donors are verified and updated regularly for reliability.",
    },
    {
      icon: <FaSearch size={30} className="text-green-600" />,
      title: "Quick Donor Search",
      description: "Find donors near your area in seconds using our smart search.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
        <p className="text-gray-600 mb-12">
          Our mission is to connect lives through safe and fast blood donation services.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
