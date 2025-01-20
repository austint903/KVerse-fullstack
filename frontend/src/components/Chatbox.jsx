import { useState } from "react";
import api from "../api";  

function ChatBox() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;
  
    
    setConversation((prev) => [...prev, { sender: "user", text: message }]);
    setMessage("");
  
    try {
      const response = await api.post("/api/chat/", { message });
      const reply = response.data.reply;
  
      let replyText = "";
  
     
      if (reply && reply.message && typeof reply.message.content === 'string') {
        replyText = reply.message.content;
      } else {
        
        replyText = JSON.stringify(reply, null, 2);
      }
  
      setConversation((prev) => [...prev, { sender: "ai", text: replyText }]);
    } catch (err) {
      console.error(err);
      setConversation((prev) => [...prev, { sender: "ai", text: "Error contacting AI." }]);
    }
  };
  

  return (
    <div>
     <h2 style={{ textAlign: "center" , marginLeft: "auto", marginRight:"auto"}}>Ask the AI</h2>

      <div 
      style={{ 
      border: "2px solid #D496A7", 
      borderRadius:"20px", 
      padding: "10px", 
      maxHeight: "300px", 
      maxWidth:"500px", 
      
      overflowY: "auto", 
      marginLeft:"auto", 
      marginRight:"auto"}}>
        {conversation.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <strong>{msg.sender === "user" ? "You" : "AI"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} 
            style={{
                textAlign: "center",
                marginLeft:"auto",
                marginRight:"auto",
                paddingTop:"20px", 
                
                paddingBottom:"20px"}}>
        <input className="ai-input"
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Ask me anything"
          required 
          style={{border: "2px solid #D3B5B5"}}
        />
        <br/>
        <button className="ai-button" type="submit">Ask</button>
      </form>
    </div>
  );
}

export default ChatBox;
