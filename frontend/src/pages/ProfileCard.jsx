const WorkerCard = ({ user }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-80 hover:shadow-2xl transition">
      
      <div className="flex justify-center">
        <img
          src={user.image}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
              />
          </div>

      <h2 className="text-center text-xl font-bold mt-4">
        {user.name}
      </h2>

      <p className="text-center text-gray-500">
        {user.ability}
      </p>

      <div className="flex justify-center items-center mt-3">
        <span className="text-yellow-400 text-lg">★★★★★</span>
        <span className="ml-2 text-gray-600 text-sm">
          ({user.rating})
        </span>
      </div>

      <p className="text-center text-gray-500 text-sm mt-1">
        {user.reviews} Reviews
      </p>

      <div className="mt-4 text-center">
        <p className="text-gray-700 text-sm">📞 {user.phone}</p>
        <p className="text-gray-700 text-sm">✉️ {user.email}</p>
      </div>

      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-green-600">
          ₹{user.price} / hour
        </p>
      </div>

      <button className="mt-5 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        Hire Now
      </button>
    </div>
  );
};