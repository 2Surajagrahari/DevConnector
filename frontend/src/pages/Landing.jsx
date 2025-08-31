import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CodeBracketIcon, RocketLaunchIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { HeartIcon, ChatBubbleLeftIcon, ArrowPathRoundedSquareIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const Landing = () => {
    const { isAuthenticated } = useAuth();

    const FeatureCard = ({ icon: Icon, title, description }) => (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section */}
            <div className="text-center py-20 px-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Where Developers
                    <span className="block mt-2">Connect & Share</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                    Build your portfolio, share posts, get help, and connect with developers from around the world.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {!isAuthenticated ? (
                        <>
                            <Link
                                to="/register"
                                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Get Started
                            </Link>
                            <Link
                                to="/profiles"
                                className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                Browse Developers
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/dashboard"
                            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Go to Dashboard
                        </Link>
                    )}
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={CodeBracketIcon}
                        title="Build Your Portfolio"
                        description="Showcase your projects, skills, and experience to the world in a beautiful profile."
                    />
                    <FeatureCard
                        icon={ChatBubbleLeftRightIcon}
                        title="Join the Conversation"
                        description="Share your thoughts, ask questions, and engage with posts from other developers."
                    />
                    <FeatureCard
                        icon={RocketLaunchIcon}
                        title="Grow Your Network"
                        description="Connect with developers, collaborate on projects, and find new opportunities."
                    />
                </div>
            </div>

            {/* Mockup Preview Section */}
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">See what's happening</h2>
                <p className="text-gray-600 mb-12">Join thousands of developers sharing code and ideas.</p>

                <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    {/* Mock Post Card */}
                    <div className="bg-white rounded-xl border border-gray-200 max-w-md mx-auto">
                        {/* Post Header */}
                        <div className="flex items-center p-4">
                            <img
                                className="h-10 w-10 rounded-full object-cover border border-gray-300"
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                                alt="User avatar"
                            />
                            <div className="ml-3 flex-1">
                                <p className="font-semibold text-sm">Alex Chen</p>
                                <p className="text-gray-500 text-xs">Senior React Developer · 2h ago</p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <span className="text-xl">···</span>
                            </button>
                        </div>

                        {/* Post Content */}
                        <div className="px-4 pb-3">
                            <p className="text-gray-800">
                                Just implemented real-time chat with Socket.io and React! 🚀 So excited about how smooth the messaging feels.
                                #webdev #reactjs #socketio
                            </p>
                        </div>

                        {/* Code Snippet Preview */}
                        <div className="bg-gray-800 text-gray-100 p-4 mx-4 rounded-lg mb-3">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-400">socketHandler.js</span>
                                <button className="text-gray-400 hover:text-gray-200 text-sm">
                                    Copy code
                                </button>
                            </div>
                            <pre className="text-sm overflow-x-auto">
                                <code className="text-green-400">
                                    {`// Socket connection setup
const socket = io(API_URL);
socket.on('message', (data) => {
  setMessages(prev => [...prev, data]);
});`}
                                </code>
                            </pre>
                        </div>

                        {/* Post Stats */}
                        <div className="px-4 py-2 border-t border-gray-100">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <HeartSolid className="h-4 w-4 text-red-500" />
                                    <span>42 likes</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <ChatBubbleLeftIcon className="h-4 w-4" />
                                    <span>8 comments</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <ArrowPathRoundedSquareIcon className="h-4 w-4" />
                                    <span>3 shares</span>
                                </div>
                            </div>
                        </div>

                        {/* Post Actions */}
                        <div className="px-4 py-3 border-t border-gray-100 flex justify-around">
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                                <HeartIcon className="h-5 w-5" />
                                <span className="text-sm">Like</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                                <ChatBubbleLeftIcon className="h-5 w-5" />
                                <span className="text-sm">Comment</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                                <ArrowPathRoundedSquareIcon className="h-5 w-5" />
                                <span className="text-sm">Share</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors">
                                <PaperAirplaneIcon className="h-5 w-5" />
                                <span className="text-sm">Send</span>
                            </button>
                        </div>

                        {/* Comment Preview */}
                        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                            <div className="flex items-start space-x-3">
                                <img
                                    className="h-8 w-8 rounded-full object-cover"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                                    alt="Commenter avatar"
                                />
                                <div className="flex-1">
                                    <p className="text-sm">
                                        <span className="font-semibold">Sarah Johnson</span>: This is awesome! Could you share the repo? 🚀
                                    </p>
                                    <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                                        <span>1h ago</span>
                                        <button className="hover:text-gray-700">Like</button>
                                        <button className="hover:text-gray-700">Reply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
};

export default Landing;
