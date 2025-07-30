import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Star } from 'lucide-react';
import Hero from '../components/Hero';
import BreakingNews from '../components/BreakingNews';
import CategoryGrid from '../components/CategoryGrid';
import NewsCard from '../components/NewsCard';
import { newsArticles } from '../data/mockData';

const HomePage: React.FC = () => {
  const recentNews = newsArticles.slice(0, 6);
  const popularNews = [...newsArticles].sort((a, b) => b.views - a.views).slice(0, 4);
  const editorsPicks = newsArticles.filter(article => article.featured).slice(0, 3);

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Breaking News Ticker */}
      <BreakingNews />
      
      {/* Hero Section */}
      <Hero />

      {/* Categories Grid */}
      <CategoryGrid />

      {/* Recent News Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">Recent News</h2>
            </div>
            <Link
              to="/news"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentNews.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Most Popular Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-800">Most Popular</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {popularNews.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index} featured={index === 0} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Editor's Picks Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-8">
            <Star className="h-8 w-8 text-yellow-600" />
            <h2 className="text-3xl font-bold text-gray-800">Editor's Picks</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {editorsPicks.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;