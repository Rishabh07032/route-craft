function AIPlanner() {
  return (
    <section className="relative -mt-20 z-20 px-6">
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center mb-8">
          AI Trip Planner
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <input
  className="
    text-black
    placeholder:text-gray-500
    border
    rounded-lg
  "
/>

<input
  type="number"
  placeholder="Budget (₹)"
  className="border p-4 rounded-xl text-black placeholder:text-gray-500"
/>

<input
  type="number"
  placeholder="Days"
  className="border p-4 rounded-xl text-black placeholder:text-gray-500"
/>
          <button
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl p-4 font-semibold hover:scale-105 transition"
          >
            Generate Plan
          </button>

        </div>

      </div>
    </section>
  );
}

export default AIPlanner;