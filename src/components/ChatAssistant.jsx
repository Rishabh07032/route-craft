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
  "💰 Budget
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