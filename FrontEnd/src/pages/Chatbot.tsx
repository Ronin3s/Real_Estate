import { useState } from "react";
import { Bot, SendHorizontal, Loader2, MessageSquareText } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatbotCard() {
    const [sessionId] = useState(() => crypto.randomUUID());
    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState([
        { sender: "bot", text: "Hi! How can I help you today? 😊" },
    ]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;
        const userMsg = message.trim();
        setConversation((prev) => [...prev, { sender: "user", text: userMsg }]);
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch("http://127.0.0.1:8000/chatbot/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    session_id: sessionId,
                    message: userMsg,
                }),
            });
            const data = await res.json();
            setConversation((prev) => [
                ...prev,
                { sender: "bot", text: data.reply },
            ]);
        } catch (error) {
            setConversation((prev) => [
                ...prev,
                { sender: "bot", text: "❌ Failed to fetch response." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto mt-20 bg-white dark:bg-[#1b1b29] text-gray-900 dark:text-white border border-t-4 border-t-realestate-purple rounded-2xl shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-realestate-purple" /> AI
                    Chatbot
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-white/60">
                    Ask questions about property prices, deals, market averages,
                    and more.
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
                <div className="flex flex-col gap-3 p-2">
                    {conversation.map((msg, i) => (
                        <div
                            key={i}
                            className={`max-w-[85%] px-4 py-2 rounded-xl whitespace-pre-line text-sm ${
                                msg.sender === "user"
                                    ? "bg-purple-500 text-white self-end"
                                    : "bg-white dark:bg-white/10 text-gray-900 dark:text-white self-start border border-gray-300 dark:border-white/10"
                            }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 pt-2 border-t dark:border-white/10">
                    <Input
                        type="text"
                        placeholder="Ask me anything..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleEnter}
                        className="bg-white dark:bg-white/10 placeholder-white/50 text-gray-900 dark:text-white"
                    />
                    <Button
                        onClick={sendMessage}
                        disabled={loading || !message.trim()}
                        className="bg-realestate-purple hover:bg-purple-600"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin w-4 h-4" />
                        ) : (
                            <SendHorizontal className="w-4 h-4" />
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
