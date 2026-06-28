import DestinationCard from "./DestinationCard";

function Destinations() {
  const destinations = [
    {
      name: "Sikkim",
      location: "India",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200",
    },
    {
      name: "Goa",
      location: "India",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200",
    },
    {
      name: "Manali",
      location: "India",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200",
    },
  ];

  return (
    <section className="relative py-28 bg-[#08111F] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center">

          <p className="uppercase tracking-[6px] text-cyan-400 font-semibold">
            EXPLORE INDIA
          </p>

          <h2 className="mt-5 text-5xl md:text-6xl font-black text-white">
            Discover Extraordinary
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Destinations
            </span>
          </h2>

          <p className="mt-8 max-w-3xl mx-auto text-lg text-gray-400 leading-8">
            From the snow-covered Himalayas to tropical beaches and hidden
            valleys, explore India's most breathtaking destinations with
            RouteCraft.
          </p>

        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 mt-20">

          {destinations.map((place, index) => (
            <DestinationCard
              key={index}
              name={place.name}
              image={place.image}
              location={place.location}
              rating={place.rating}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default Destinations;