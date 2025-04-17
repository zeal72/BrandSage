import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaPaperPlane, FaUser, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronUp, FiWifi, FiWifiOff } from 'react-icons/fi';

const ChatBot = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [inputMessage, setInputMessage] = useState('');
	const [messages, setMessages] = useState([
		{
			isBot: true,
			text: "Hello! I'm BrandSage. I can help you develop memorable brand strategies.\n# Key Services\n- Brand Positioning\n- Visual Identity\n- Market Analysis\n\nWhat would you like to discuss today?"
		}
	]);
	const [isLoading, setIsLoading] = useState(false);
	const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
	const messagesEndRef = useRef(null);
	const textareaRef = useRef(null);

	// Responsive height handling
	useEffect(() => {
		const updateNetworkStatus = () => {
			setNetworkStatus(navigator.onLine);
			if (!navigator.onLine) {
				setMessages(prev => [...prev, {
					isBot: true,
					text: "Connection lost. Reconnecting...",
					isOffline: true
				}]);
			}
		};

		window.addEventListener('online', updateNetworkStatus);
		window.addEventListener('offline', updateNetworkStatus);
		return () => {
			window.removeEventListener('online', updateNetworkStatus);
			window.removeEventListener('offline', updateNetworkStatus);
		};
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!inputMessage.trim()) return;

		// Add user message
		setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);
		setInputMessage('');

		// Auto-reset textarea height
		if (textareaRef.current) textareaRef.current.style.height = 'auto';

		setIsLoading(true);

		// Simulated API call with error handling
		try {
			const response = await new Promise(resolve =>
				setTimeout(() => resolve({
					text: "Thank you for your message! Here's a detailed response:\n1. First point\n2. Second point\n3. Third point"
				}), 1500)
			);

			setMessages(prev => [...prev, {
				isBot: true,
				text: response.text
			}]);
		} catch (error) {
			setMessages(prev => [...prev, {
				isBot: true,
				text: "Error processing request. Please try again.",
				isError: true
			}]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				{isOpen ? (
					<FaTimes className="w-6 h-6" />
				) : (
					<FaRobot className="w-6 h-6 animate-pulse" />
				)}
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						className="absolute bottom-20 right-0 w-[95vw] max-w-md bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700/30 backdrop-blur-lg"
					>
						{/* Chat Header */}
						<div className="p-4 border-b border-gray-700/30 flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<motion.div animate={{ rotate: [0, 15, -15, 0] }}
									transition={{ repeat: Infinity, duration: 4 }}>
									<FaRobot className="text-2xl text-cyan-400" />
								</motion.div>
								<div>
									<h3 className="text-lg font-semibold text-cyan-400">BrandSage AI</h3>
									<div className="flex items-center space-x-2 text-sm">
										<div className={`flex items-center ${networkStatus ? 'text-green-400' : 'text-red-400'}`}>
											{networkStatus ? <FiWifi /> : <FiWifiOff />}
										</div>
										<span className="text-gray-400 text-xs">v2.4.1</span>
									</div>
								</div>
							</div>
						</div>

						{/* Messages Container */}
						<div className="p-4 h-[60dvh] overflow-y-auto space-y-4">
							{messages.map((msg, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: msg.isBot ? 20 : -20 }}
									animate={{ opacity: 1, y: 0 }}
									className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
								>
									<div className={`max-w-[85%] p-4 rounded-2xl backdrop-blur-lg ${msg.isBot ?
											(msg.isError || !networkStatus ?
												'bg-red-900/20 border-red-600/30' :
												'bg-gray-800/60 border-gray-600/30') :
											'bg-gradient-to-br from-blue-600 to-purple-600'
										} border`}>
										<div className="flex items-start space-x-3">
											{msg.isBot ? (
												<FaRobot className={`flex-shrink-0 mt-1 ${msg.isError ? 'text-red-400' : 'text-cyan-400'}`} />
											) : (
												<FaUser className="flex-shrink-0 mt-1 text-purple-300" />
											)}
											<div className={`space-y-2 ${msg.isBot ?
													(msg.isError ? 'text-red-100' : 'text-gray-100') :
													'text-white'
												}`}>
												{msg.text.split('\n').map((line, i) => {
													if (line.startsWith('# ')) return (
														<h3 key={i} className="text-lg font-semibold text-cyan-400">
															{line.replace('# ', '')}
														</h3>
													);
													if (/^[*-] /.test(line)) return (
														<ul key={i} className="list-disc list-inside ml-4">
															{line.split('•').slice(1).map((item, j) => (
																<li key={j}>{item.trim()}</li>
															))}
														</ul>
													);
													return <p key={i} className="text-sm">{line}</p>;
												})}
											</div>
										</div>
									</div>
								</motion.div>
							))}

							{isLoading && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="flex justify-center space-x-2 text-cyan-400"
								>
									<span className="animate-pulse">Analyzing brand strategy</span>
									<div className="flex space-x-1">
										<span className="animate-bounce">.</span>
										<span className="animate-bounce delay-100">.</span>
										<span className="animate-bounce delay-200">.</span>
									</div>
								</motion.div>
							)}
							<div ref={messagesEndRef} />
						</div>

						{/* Input Area */}
						<form onSubmit={handleSubmit} className="p-4 border-t border-gray-700/30">
							<div className="flex space-x-3 items-end">
								<textarea
									ref={textareaRef}
									value={inputMessage}
									onChange={(e) => {
										setInputMessage(e.target.value);
										e.target.style.height = 'auto';
										e.target.style.height = `${e.target.scrollHeight}px`;
									}}
									onKeyDown={(e) => {
										if (e.key === 'Enter' && !e.shiftKey) {
											e.preventDefault();
											handleSubmit(e);
										}
									}}
									rows={1}
									placeholder="Describe your brand vision..."
									className="flex-1 p-3 resize-none max-h-32 bg-gray-900/40 border border-gray-600/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-400/50 text-gray-100 placeholder-gray-400 text-sm transition-all"
								/>
								<button
									type="submit"
									disabled={!inputMessage.trim()}
									className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl hover:scale-105 disabled:opacity-50 disabled:scale-100 transition-all"
								>
									<FaPaperPlane className="text-lg text-white" />
								</button>
							</div>
							<p className="text-xs text-gray-400 mt-2 flex items-center">
								<FiChevronUp className="mr-1 text-cyan-400" />
								Shift + Enter for new line
							</p>
						</form>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ChatBot;