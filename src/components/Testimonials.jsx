function Testimonials() {

  const reviews = [
    {
      name: "Rahul Sharma",
      place: "Delhi",
      review:
        "RouteCraft planned my Sikkim trip perfectly. The itinerary saved me hours of planning.",
    },
    {
      name: "Priya Verma",
      place: "Mumbai",
      review:
        "The AI recommendations were surprisingly accurate. Loved the clean interface.",
    },
    {
      name: "Aman Singh",
      place: "Bangalore",
      review:
        "One of the best travel planners I've used. Simple, fast and beautiful.",
    },
  ];

  return (
    <section className="bg-[#050816] py-24">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-black text-center text-white">
          What Travelers Say
        </h2>

        <p className="text-center text-slate-400 mt-5 mb-16">
          Loved by travelers across India.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((item, index) => (

            <div
              key={index}
              className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:-translate-y-2 transition-all duration-300"
            >

              <div className="text-yellow-400 text-xl">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-slate-300 mt-6 leading-8">
                "{item.review}"
              </p>

              <div className="mt-8">

                <h4 className="text-white font-semibold">
                  {item.name}
                </h4>

                <p className="text-slate-500 text-sm">
                  {item.place}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;