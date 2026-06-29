function DestinationCard({
  name,
  image,
  location,
  rating,
}) {
  return (
    <div
className="
group
relative
overflow-hidden
h-[420px]
sm:h-[460px]
lg:h-[520px]
rounded-3xl
bg-white/5
backdrop-blur-xl
border
border-white/10
shadow-xl
transition-all
duration-500
hover:-translate-y-3
hover:shadow-cyan-500/20
"
>
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="
        h-full
        w-full
        object-cover
        transition-transform
        duration-700
        group-hover:scale-110
        "
      />

      {/* Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

      {/* Rating */}
      <div className="absolute top-4 right-4 md:top-5 md:right-5 bg-white/15 backdrop-blur-xl px-3 py-1.5 md:px-4 md:py-2 rounded-full text-white font-semibold border border-white/20">
        ⭐ {rating}
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 w-full p-5 md:p-7">

        <p className="text-cyan-300 text-sm mb-2 tracking-widest uppercase">
          {location}
        </p>

        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
          {name}
        </h3>

        <p className="text-gray-300 mt-3 text-sm md:text-base leading-6 md:leading-7">
          Discover breathtaking landscapes, local culture,
          unforgettable experiences and luxury stays.
        </p>

        <button
          className="
          mt-7
          px-5 md:px-7
          py-2.5 md:py-3
          text-sm md:text-base
          rounded-full
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          text-white
          font-semibold
          hover:bg-white
          hover:text-black
          transition-all
          duration-300
          "
        >
          Explore →
        </button>

      </div>
    </div>
  );
}

export default DestinationCard;