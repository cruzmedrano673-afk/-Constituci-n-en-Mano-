
import React, { useState } from 'react';
import { LEGAL_ARTICLES } from '../constants';
import { Article } from '../types';
import { ChevronDownIcon, LightBulbIcon } from '../components/Icons';

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex justify-between items-center text-left"
      >
        <div>
            <h3 className="font-bold text-lg text-blue-400">{article.title}</h3>
            <p className="text-sm text-gray-400">{article.article}</p>
        </div>
        <ChevronDownIcon className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="p-4 border-t border-gray-700 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-300 mb-1">Texto Legal:</h4>
            <p className="text-gray-400 italic text-sm">"{article.legalText}"</p>
          </div>
          <div className="bg-blue-900/50 p-3 rounded-lg flex items-start space-x-3">
            <LightBulbIcon className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
                 <h4 className="font-semibold text-yellow-300 mb-1">En otras palabras:</h4>
                <p className="text-yellow-200 text-sm">{article.explanation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function RightsView() {
  const categories = [...new Set(LEGAL_ARTICLES.map(a => a.category))];

  return (
    <div className="space-y-6 animate-fade-in">
        {categories.map(category => (
            <div key={category}>
                <h2 className="text-xl font-bold text-gray-300 mb-4 pb-2 border-b-2 border-gray-700">{category}</h2>
                <div className="space-y-4">
                    {LEGAL_ARTICLES.filter(a => a.category === category).map((article, index) => (
                        <ArticleCard key={index} article={article} />
                    ))}
                </div>
            </div>
        ))}
    </div>
  );
}
