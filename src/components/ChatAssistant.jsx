import { useState } from "react";
import { MessageCircle, X, Trash2 } from "lucide-react";
import axios from "axios";

function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const clearChat = () => {

  setMessages([
    {
      role: "assistant",
      text: "👋 Hi! I'm RouteCraft AI.\n\nI answer only travel-related questions.\n\nAsk me about destinations, budget, best season or packing tips."
    }
  ]);

};
  const suggestions = [
  "🏔 Best Snow Destinations",
  "🏖 Best Beaches",
  "💰 Budget Trips",
  "❤️ Honeymoon Places",
  "🎒 Packing Tips",
];
const sendMessage = async (customMessage = null) => {
  const finalMessage = customMessage || message;

if (!finalMessage.trim()) return;

  const userMessage = {
    role: "user",
    text: finalMessage,
  };

  setMessages((prev) => [...prev, userMessage]);

  const currentMessage = finalMessage;

  setMessage("");

  setTyping(true);

  try {

    const response = await axios.post(
      "http://localhost:5000/chat-assistant",
      {
        message: finalMessage,
      }
    );

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: response.data.reply,
      },
    ]);

  } catch (error) {
    setTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "❌ Sorry, something went wrong.",
      },
    ]);

  } finally {

setTyping(false);
  }

};
  const [message, setMessage] = useState("");
const [messages, setMessages] = useState([
  {
    role: "assistant",
    text: "👋 Hi! I'm RouteCraft AI.\n\nI answer only travel-related questions.\n\nAsk me about destinations, budget, best season or packing tips."
  }
]);
const [loading, setLoading] = useState(false);

  return (
    <>
      {/* Floating Button */}

      {!open && (
  <button
    onClick={() => setOpen(true)}
    className="
      fixed
      bottom-8
      right-8
      w-16
      h-16
      rounded-full
      bg-cyan-500
      hover:bg-cyan-400
      text-white
      shadow-2xl
      flex
      items-center
      justify-center
      z-50
      transition-all
    "
  >
    <MessageCircle size={30} />
  </button>
)}

      {open && (
        <div
          className="
          fixed
          bottom-2
          right-8
          w-[380px]
          h-[650px]
          bg-[#08101d]
          rounded-3xl
          border
          border-cyan-500/20
          shadow-2xl
          flex
          flex-col
          overflow-hidden
          z-40
          "
        >
          {/* Header */}

          <div className="bg-cyan-500 p-5 flex justify-between items-center">

            <div>

              <h2 className="text-xl font-bold text-white">
                🤖 RouteCraft AI
              </h2>

              <p className="text-sm text-white/80">
                Travel Assistant
              </p>

            </div>

          <div className="flex items-center gap-2">

  <button
    onClick={clearChat}
    className="
    p-2
    rounded-full
    hover:bg-white/20
    "
  >
    <Trash2 size={20} className="text-white"/>
  </button>

  <button
    onClick={() => setOpen(false)}
    className="
    p-2
    rounded-full
    hover:bg-white/20
    "
  >
    <X size={22} className="text-white"/>
  </button>

</div>

          </div>

          {/* Chat */}

         {/* Chat */}

{/* Chat */}

<div className="flex-1 p-5 overflow-y-auto">

  {messages.map((msg, index) => (
    
    
    <div
      key={index}
      className={`mb-4 flex ${
        msg.role === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl p-4 whitespace-pre-wrap ${
          msg.role === "user"
            ? "bg-cyan-500 text-white"
            : "bg-white/10 text-white"
        }`}
      >
        {msg.text}
      </div>
      
    </div>
  ))}
  {typing && (
  <div className="flex justify-start mb-4">

    <div className="bg-white/10 rounded-2xl px-5 py-4">

      <div className="flex gap-2">

        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>

        <span
          className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>

        <span
          className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>

      </div>

    </div>

  </div>
)}

</div>
          {/* Input */}
          {messages.length === 1 && (

<div className="px-4 pb-3 flex flex-wrap gap-2">

  {suggestions.map((item,index)=>(

    <button
      key={index}
      onClick={() => sendMessage(item)}
      className="
      text-sm
      px-4
      py-2
      rounded-full
      bg-white/10
      hover:bg-cyan-500
      transition
      "
    >
      {item}
    </button>

  ))}

</div>

)}

          <div className="p-4 border-t border-white/10">

            <input
value={message}
onChange={(e)=>setMessage(e.target.value)}
onKeyDown={(e)=>{
  if(e.key==="Enter"){
    sendMessage();
  }
}}
  placeholder="Ask about travel..."
  className="
  w-full
  bg-white/10
  rounded-xl
  p-4
  text-white
  outline-none
  "
/>
          <button
onClick={sendMessage}
disabled={loading}
className="
mt-3
w-full
bg-cyan-500
hover:bg-cyan-400
rounded-xl
py-3
font-bold
disabled:opacity-50
"
>
{loading ? "Thinking..." : "Send"}
</button>

          </div>


        </div>
      )}
    </>
  );
}

export default ChatAssistant;