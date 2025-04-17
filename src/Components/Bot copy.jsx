import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaPaperPlane, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FiChevronUp, FiWifi, FiWifiOff } from 'react-icons/fi';
import '../App.css';
import React from 'react';

const ChatBot = () => {
	const [inputMessage, setInputMessage] = useState('');
	const [messages, setMessages] = useState([
		{ isBot: true, text: "Hello! I'm BrandSage. I can help you develop memorable brand strategies. What brand idea would you like to discuss today?" }
	]);
	const [isLoading, setIsLoading] = useState(false);
	const [networkStatus, setNetworkStatus] = useState({ isOnline: navigator.onLine, lastChecked: Date.now() });
	const messagesEndRef = useRef(null);
	const textareaRef = useRef(null);
	const controllerRef = useRef(null); // For aborting stale requests

	// Auto scroll
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages, isLoading]);

	// Network status tracking
	useEffect(() => {
		const handleOnline = () => setNetworkStatus({ isOnline: true, lastChecked: Date.now() });
		const handleOffline = () => setNetworkStatus({ isOnline: false, lastChecked: Date.now() });

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);
		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	const handleInputChange = (e) => {
		setInputMessage(e.target.value);
		const ta = textareaRef.current;
		if (ta) {
			ta.style.height = 'auto';
			ta.style.height = `${ta.scrollHeight}px`;
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	const handleSubmit = async () => {
		if (!inputMessage.trim()) return;
		const userText = inputMessage.trim();

		// Add user message
		setMessages(prev => [...prev, { isBot: false, text: userText }]);
		setInputMessage('');
		if (textareaRef.current) textareaRef.current.style.height = 'auto';

		setIsLoading(true);

		const now = Date.now();
		if (now - networkStatus.lastChecked > 5000 && !navigator.onLine) {
			setNetworkStatus({ isOnline: false, lastChecked: now });
			setIsLoading(false);
			setMessages(prev => [...prev, { isBot: true, text: "I can't connect right now. Please check your internet connection.", isOffline: true }]);
			return;
		}

		try {
			const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
			if (!apiKey) throw new Error('No OpenRouter API key configured');

			// Abort previous request if any
			if (controllerRef.current) controllerRef.current.abort();
			const controller = new AbortController();
			controllerRef.current = controller;

			const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
				method: 'POST',
				signal: controller.signal,
				headers: {
					'Authorization': `Bearer ${apiKey}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					model: 'mistralai/mistral-7b-instruct:free',
					messages: [{ role: 'user', content: userText }]
				})
			});

			if (!response.ok) {
				const errText = await response.text();
				throw new Error(errText || 'API request failed');
			}

			const { choices } = await response.json();
			const botReply = choices?.[0]?.message?.content?.trim() || "Sorry, I didn't get that.";
			setMessages(prev => [...prev, { isBot: true, text: botReply }]);
		} catch (err) {
			console.error('API Error:', err);
			if (err.name !== 'AbortError') {
				setMessages(prev => [...prev, { isBot: true, text: "Oops! Something went wrong. Please try again later.", isError: true }]);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col shadow-2xl shadow-blue-500/20 z-50">
			{/* Animated Binary Background */}
			<div className="absolute inset-0 opacity-10 pointer-events-none">
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f_1px,transparent_1px)] bg-[size:32px_32px]">
					<div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent animate-binary-scroll">
						<div className="font-mono text-cyan-400/20 text-xs whitespace-pre-wrap overflow-hidden">
							{Array(100).fill().map((_, i) => Math.random().toString(2).slice(2, 10) + ' ').join(' ')}
						</div>
					</div>
				</div>
			</div>

			{/* Chat Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-4 md:p-6 shadow-2xl shadow-purple-500/30 w-full lg:w-4/5 fixed top-0 left-0 right-0 mx-auto rounded-t-xl flex items-center backdrop-blur-sm border-b border-purple-400/30 z-50"
			>
				<div className="max-w-4xl mx-auto flex items-center space-x-4 w-full justify-between">
					<div className="flex items-center space-x-4">
						<motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
							<FaRobot className="text-3xl text-cyan-400" />
						</motion.div>
						<div>
							<h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">BrandSage AI</h1>
							<p className="text-sm text-purple-300/80 font-mono">v2.3.1 neural core active</p>
						</div>
					</div>
					<div className="flex items-center text-sm">
						{networkStatus.isOnline ? (
							<div className="flex items-center text-green-400" title="Online">
								<FiWifi className="mr-1" />
								<span className="hidden md:inline">Connected</span>
							</div>
						) : (
							<div className="flex items-center text-red-400" title="Offline">
								<FiWifiOff className="mr-1" />
								<span className="hidden md:inline">Offline</span>
							</div>
						)}
					</div>
				</div>
			</motion.div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto p-4 max-w-4xl mx-auto w-full mt-16 mb-20 lg:mt-20 lg:mb-24" style={{ height: 'calc(100vh - 160px)' }}>
				<div className="space-y-6 pt-8">
					{messages.map((msg, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: msg.isBot ? 20 : -20 }}
							animate={{ opacity: 1, x: 0 }}
							className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
						>
							<div className={`max-w-xl p-4 rounded-2xl backdrop-blur-lg ${msg.isBot
								? msg.isOffline || msg.isError
									? 'bg-red-900/20 shadow-lg shadow-red-500/10 border border-red-600/30 mt-3.5'
									: 'bg-gray-800/60 shadow-lg shadow-blue-500/10 border border-gray-600/30 mt-3.5'
								: 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-purple-500/20 border border-purple-400/30 mt-3.5'
								}`}>
								<div className="flex items-start space-x-3">
									{msg.isBot ? (
										<FaRobot className={`flex-shrink-0 mt-2 ${msg.isOffline || msg.isError ? 'text-red-400' : 'text-cyan-400 animate-pulse'}`} />
									) : (
										<FaUser className="flex-shrink-0 mt-2 text-purple-300" />
									)}
									<div className={`text-base leading-relaxed space-y-3 font-mono ${msg.isBot ? msg.isOffline || msg.isError ? 'text-red-100' : 'text-gray-100' : 'text-white'}`}>
										{(() => {
											const elements = [];
											let currentList = null;

											msg.text.split('\n').forEach((line, i) => {
												// Heading
												if (line.startsWith('# ')) {
													if (currentList) {
														elements.push(currentList);
														currentList = null;
													}
													elements.push(<h2 key={`h-${i}`} className="text-lg font-semibold text-cyan-400">{line.replace(/^# /, '')}</h2>);
													return;
												}

												// Bullet list item
												if (/^[-*]\s+/.test(line)) {
													if (!currentList || currentList.type !== 'ul') {
														if (currentList) elements.push(currentList);
														currentList = <ul key={`ul-${i}`} className="list-disc list-inside text-cyan-200 space-y-1">{[]}</ul>;
													}
													currentList = React.cloneElement(
														currentList,
														{},
														[...currentList.props.children, <li key={`ul-item-${i}`}>{line.replace(/^[-*]\s+/, '')}</li>]
													);
													return;
												}

												// Numbered list item
												if (/^\d+\.\s+/.test(line)) {
													if (!currentList || currentList.type !== 'ol') {
														if (currentList) elements.push(currentList);
														currentList = <ol key={`ol-${i}`} className="list-decimal list-inside text-blue-200 space-y-1">{[]}</ol>;
													}
													currentList = React.cloneElement(
														currentList,
														{},
														[...currentList.props.children, <li key={`ol-item-${i}`}>{line.replace(/^\d+\.\s+/, '')}</li>]
													);
													return;
												}

												// End any list and render a paragraph
												if (currentList) {
													elements.push(currentList);
													currentList = null;
												}
												elements.push(<p key={`p-${i}`} className="text-gray-100">{line}</p>);
											});

											if (currentList) elements.push(currentList); // flush remaining list
											return elements;
										})()}

									</div>

								</div>
							</div>
						</motion.div>
					))}

					{isLoading && (
						<div className="flex justify-center space-x-2">
							<div className="flex space-x-1 text-cyan-400 font-mono">
								<span className="animate-pulse">BrandSage is thinking</span>
								<span className="animate-wave">.</span>
								<span className="animate-wave delay-100">.</span>
								<span className="animate-wave delay-200">.</span>
							</div>
						</div>
					)}

					<div ref={messagesEndRef} />
				</div>
			</div>

			{/* Input */}
			<motion.form
				onSubmit={e => { e.preventDefault(); handleSubmit(); }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="bg-gray-800/60 backdrop-blur-lg border-t border-gray-600/30 p-4 shadow-2xl shadow-blue-500/20 w-full lg:w-4/5 fixed bottom-0 left-0 right-0 mx-auto rounded-b-xl z-50"
				exit={{ opacity: 0 }}
			>
				<div className="max-w-4xl mx-auto">
					<div className="flex space-x-4 items-end">
						<textarea
							ref={textareaRef}
							value={inputMessage}
							onChange={handleInputChange}
							onKeyDown={handleKeyDown}
							rows={1}
							placeholder="What's your brand idea? Ask Sage anything..."
							className="flex-1 p-3 resize-none max-h-32 scrollbar-none overflow-y-auto transition-all duration-150 ease-in-out bg-gray-900/40 border border-gray-600/30 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 text-gray-100 placeholder-gray-400 font-mono"
							autoFocus
						/>
						<button
							type="submit"
							disabled={!inputMessage.trim()}
							className="self-end px-4 md:px-6 py-3 bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 rounded-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
						>
							<FaPaperPlane className="text-xl text-white" />
						</button>
					</div>
					<p className="text-sm text-gray-400 mt-2 flex items-center font-mono">
						<FiChevronUp className="mr-1 text-cyan-400" />
						[ENTER] to transmit
					</p>
				</div>
			</motion.form>
		</div>
	);
};

export default ChatBot;
