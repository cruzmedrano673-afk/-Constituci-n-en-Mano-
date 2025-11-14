
import React, { useState, useCallback } from 'react';
import { SIMULATOR_SCENARIOS } from '../constants';
import { getSimulatorFeedback } from '../services/geminiService';
import { ChatBubbleLeftRightIcon, UserIcon, PaperAirplaneIcon, LoadingSpinner } from '../components/Icons';

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    // A simple markdown renderer for bold and lists
    const renderContent = () => {
        return content.split('\n').map((line, index) => {
            if (line.startsWith('- ')) {
                return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
            }
            if (line.startsWith('**') && line.endsWith('**')) {
                return <strong key={index} className="text-blue-300">{line.substring(2, line.length - 2)}</strong>;
            }
             if (line.startsWith('**')) {
                return <strong key={index} className="text-blue-300">{line.substring(2)}</strong>;
            }
            return <p key={index}>{line}</p>;
        });
    };
    return <div className="prose prose-invert text-gray-300 space-y-2">{renderContent()}</div>;
};

export default function SimulatorView() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{type: 'scenario' | 'user' | 'feedback', content: string}>>([]);

  const handleNextScenario = () => {
    setScenarioIndex((prevIndex) => (prevIndex + 1) % SIMULATOR_SCENARIOS.length);
    setUserResponse('');
    setFeedback('');
    setConversationHistory([]);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userResponse.trim()) return;

    setIsLoading(true);
    setFeedback('');
    
    const currentScenario = SIMULATOR_SCENARIOS[scenarioIndex];
    setConversationHistory([
        ...conversationHistory,
        { type: 'user', content: userResponse }
    ]);

    const aiFeedback = await getSimulatorFeedback(currentScenario, userResponse);
    
    setFeedback(aiFeedback);
    setConversationHistory(prev => [
        ...prev,
        { type: 'feedback', content: aiFeedback }
    ]);
    setUserResponse('');
    setIsLoading(false);
  }, [userResponse, scenarioIndex, conversationHistory]);

  const currentScenario = SIMULATOR_SCENARIOS[scenarioIndex];

  return (
    <div className="flex flex-col h-full animate-fade-in">
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h2 className="font-bold text-lg mb-2 text-gray-200">Simulador de Interacción</h2>
            <p className="text-gray-400">Practica cómo responder a la autoridad. Escribe tu respuesta y recibe una evaluación basada en tus derechos.</p>
        </div>
        
        <div className="flex-grow space-y-4 overflow-y-auto pr-2">
             <div className="flex items-start space-x-3">
                <div className="bg-blue-500 p-2 rounded-full"><ChatBubbleLeftRightIcon className="w-5 h-5 text-white"/></div>
                <div className="bg-gray-700 p-3 rounded-lg rounded-bl-none">
                    <p className="text-white">{currentScenario}</p>
                </div>
            </div>

            {conversationHistory.map((entry, index) => (
                <div key={index} className={`flex items-start space-x-3 ${entry.type === 'user' ? 'justify-end' : ''}`}>
                    {entry.type === 'feedback' && <div className="bg-green-500 p-2 rounded-full"><ChatBubbleLeftRightIcon className="w-5 h-5 text-white"/></div>}
                    <div className={`${
                        entry.type === 'user' ? 'bg-blue-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'
                    } p-3 rounded-lg`}>
                        {entry.type === 'feedback' ? <MarkdownRenderer content={entry.content} /> : <p className="text-white">{entry.content}</p>}
                    </div>
                     {entry.type === 'user' && <div className="bg-gray-600 p-2 rounded-full"><UserIcon className="w-5 h-5 text-white"/></div>}
                </div>
            ))}
            {isLoading && <LoadingSpinner />}
        </div>
      
        <div className="mt-4">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <input
                    type="text"
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    placeholder="Escribe tu respuesta aquí..."
                    className="flex-grow bg-gray-700 border border-gray-600 rounded-full py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 transition-colors disabled:bg-gray-500"
                    disabled={isLoading || !userResponse.trim()}
                >
                    <PaperAirplaneIcon className="w-5 h-5" />
                </button>
            </form>
             <button
                onClick={handleNextScenario}
                className="w-full mt-3 bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-2 px-4 rounded-lg transition-colors"
            >
                Siguiente Escenario
            </button>
        </div>
    </div>
  );
}
