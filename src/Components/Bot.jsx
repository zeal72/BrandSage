import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaPaperPlane, FaUser, FaTimes, FaRegClock } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronUp, FiMessageSquare } from 'react-icons/fi';

const ChatBot = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [inputMessage, setInputMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!inputMessage.trim()) return;

		// Add user message
		setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);
		setInputMessage('');

		// Simulate bot response
		setIsLoading(true);
		setTimeout(() => {
			setMessages(prev => [...prev, {
				text: "Thank you for your message! I'm processing your request...",
				isBot: true
			}]);
			setIsLoading(false);
		}, 1500);
	};

	return (
		<div className="fixed bottom-8 right-8 z-50">
			{/* Floating Action Button */}
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
				{isOpen ? <FaTimes size={24} /> : <FiMessageSquare size={24} />}
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.5 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.5 }}
						className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-xl shadow-xl flex flex-col"
					>
						{/* Chat Header */}
						<div className="bg-indigo-600 text-white p-4 rounded-t-xl flex items-center space-x-3">
							<FaRobot className="text-2xl" />
							<div>
								<h3 className="font-semibold">BrandSage AI</h3>
								<p className="text-xs opacity-80">Powered by GPT-4</p>
							</div>
						</div>

						{/* Messages Container */}
						<div className="flex-1 p-4 h-96 overflow-y-auto space-y-4">
							{messages.map((msg, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: msg.isBot ? 20 : -20 }}
									animate={{ opacity: 1, x: 0 }}
									className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
								>
									<div className={`max-w-xs p-3 rounded-2xl ${msg.isBot ? 'bg-gray-100' : 'bg-indigo-600 text-white'}`}>
										<div className="flex items-start space-x-2">
											{msg.isBot ? (
												<FaRobot className="flex-shrink-0 mt-1" />
											) : (
												<FaUser className="flex-shrink-0 mt-1" />
											)}
											<p className="text-sm">{msg.text}</p>
										</div>
									</div>
								</motion.div>
							))}

							{isLoading && (
								<div className="flex items-center space-x-2 text-gray-500">
									<div className="animate-bounce">•</div>
									<div className="animate-bounce delay-100">•</div>
									<div className="animate-bounce delay-200">•</div>
								</div>
							)}

							<div ref={messagesEndRef} />
						</div>

						{/* Input Area */}
						<form onSubmit={handleSubmit} className="p-4 border-t">
							<div className="flex space-x-2">
								<input
									type="text"
									value={inputMessage}
									onChange={(e) => setInputMessage(e.target.value)}
									placeholder="Type your message..."
									className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
									autoFocus
								/>
								<button
									type="submit"
									disabled={!inputMessage.trim()}
									className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
								>
									<FaPaperPlane />
								</button>
							</div>
							<p className="text-xs text-gray-500 mt-2 flex items-center">
								<FiChevronUp className="mr-1" />
								Press Enter to send
							</p>
						</form>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ChatBot;