import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Lottie from "lottie-react";
import ArrowDown from "../assets/Dinitha/arrow-dwon.json"; 
import Smile from "../assets/Dinitha/smile.json";


const TripPlanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([{ 
    sender: 'ai', 
    text: `Welcome to Ceylon Companion! How can I assist you today? 😊` 
  }]);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatMessage = (text) => {
    return text
      .split('\n')
      .map(line => {
        if (line.startsWith('* ')) {
          const bulletText = line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          return `<li>${bulletText}</li>`;
        }
        return line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
      })
      .join('<br />');
  };

  const sendMessage = async () => {
    if (!userInput) return;

    const newMessage = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, newMessage]);
    setUserInput('');
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { message: userInput });
      const botMessage = {
        sender: 'ai',
        text: formatMessage(response.data.response) 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = { sender: 'ai', text: formatMessage('Error: Unable to get a response!') };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    setShowScrollDown(scrollTop + clientHeight < scrollHeight);
  };

  return (
    <div className="relative">
      <button
  onClick={toggleChat}
  className="fixed bottom-6 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 flex items-center space-x-2"
>
  <Lottie animationData={Smile} loop={true} className='w-8' />
  <span className="text-lg font-semibold">Chat with me</span>
</button>


      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 shadow-lg flex flex-col bg-blue-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Ceylon Companion</h2>
            

            <button onClick={toggleChat} className="text-gray-600">X</button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto max-h-80" onScroll={handleScroll}>
            {messages.map((msg, index) => (
              <div key={index} className={`my-2 p-2 rounded ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-white text-gray-800 self-start'}`}>
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            ))}
            {isTyping && <div className="my-2 p-2 italic text-gray-500">Ceylon Companion is typing...</div>}
            <div ref={messagesEndRef} />
          </div>
          {showScrollDown && (
            <button 
              onClick={() => messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })}
              className="self-center p-2 transition duration-200 transform hover:scale-110"
            >
              <Lottie animationData={ArrowDown} loop={true} className="h-8 w-8" />
            </button>
          )}
          <div className="flex p-2 border-t">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={sendMessage}
              className={`ml-2 ${userInput ? 'bg-blue-500' : 'bg-gray-300 cursor-not-allowed'} text-white rounded p-2`}
              disabled={!userInput}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripPlanner;
