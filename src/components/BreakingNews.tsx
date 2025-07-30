import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { breakingNews } from '../data/mockData';

const BreakingNews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="flex items-center space-x-2 bg-red-700 px-3 py-1 rounded-md mr-4 flex-shrink-0">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-bold">BREAKING</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="text-sm font-medium whitespace-nowrap"
            >
              {breakingNews[currentIndex]}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;