import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Eye, 
  Clock, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';
import { newsArticles } from '../data/mockData';
import { format } from 'date-fns';
import NewsCard from '../components/NewsCard';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = newsArticles.find(a => a.id === id);
  
  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <Link
            to="/news"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to News
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = newsArticles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${article.title}`;

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
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/news"
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to News</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(article.publishDate), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>{article.views.toLocaleString()} views</span>
              </div>
            </div>

            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {article.excerpt}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Article Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
      >
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />
      </motion.div>

      {/* Article Content */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            <div className="text-gray-700 leading-relaxed space-y-6">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
              
              {/* Sample extended content */}
              <p className="text-lg leading-relaxed">
                This initiative represents a significant step forward in our commitment to academic excellence and innovation. The university administration has worked closely with industry partners to ensure that our programs remain at the forefront of technological advancement.
              </p>
              
              <p className="text-lg leading-relaxed">
                Students and faculty members alike have expressed enthusiasm about these developments, recognizing the potential for enhanced learning opportunities and research capabilities. The implementation of these changes will be gradual, allowing for proper adaptation and feedback incorporation.
              </p>
              
              <p className="text-lg leading-relaxed">
                Moving forward, the university plans to continue monitoring the effectiveness of these initiatives and make adjustments as necessary to ensure optimal outcomes for all stakeholders involved.
              </p>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 pt-8 border-t"
          >
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Share Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 pt-8 border-t"
          >
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">Share this article:</span>
              <div className="flex space-x-3">
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle, index) => (
                <NewsCard
                  key={relatedArticle.id}
                  article={relatedArticle}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;