import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Eye, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NewsArticle } from '../types';
import { format } from 'date-fns';

interface NewsCardProps {
  article: NewsArticle;
  index?: number;
  featured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, index = 0, featured = false }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut'
      }
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Academics': 'bg-blue-100 text-blue-800',
      'Research': 'bg-green-100 text-green-800',
      'Events': 'bg-yellow-100 text-yellow-800',
      'Placements': 'bg-purple-100 text-purple-800',
      'Clubs & Culture': 'bg-red-100 text-red-800',
      'Sports': 'bg-cyan-100 text-cyan-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
        featured ? 'lg:flex' : ''
      }`}
    >
      <div className={`relative ${featured ? 'lg:w-1/2' : ''}`}>
        <img
          src={article.image}
          alt={article.title}
          className={`w-full object-cover ${featured ? 'h-64 lg:h-full' : 'h-48'}`}
        />
        <div className="absolute top-4 left-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
            {article.category}
          </span>
        </div>
        {article.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className={`p-6 ${featured ? 'lg:w-1/2 flex flex-col justify-center' : ''}`}>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(article.publishDate), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{article.readTime} min read</span>
          </div>
        </div>

        <h3 className={`font-bold text-gray-800 mb-3 line-clamp-2 ${featured ? 'text-2xl' : 'text-lg'}`}>
          <Link
            to={`/article/${article.id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {article.title}
          </Link>
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{article.author}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Eye className="h-4 w-4" />
            <span className="text-sm">{article.views.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;