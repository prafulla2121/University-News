import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '../data/mockData';
import { 
  GraduationCap, 
  Microscope, 
  Calendar, 
  Briefcase, 
  Users, 
  Trophy 
} from 'lucide-react';

const CategoryGrid: React.FC = () => {
  const categoryIcons = {
    'Academics': GraduationCap,
    'Research': Microscope,
    'Events': Calendar,
    'Placements': Briefcase,
    'Clubs & Culture': Users,
    'Sports': Trophy
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Explore News Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest happenings across different areas of university life
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => {
            const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons];
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="group"
              >
                <Link
                  to={`/news?category=${category.slug}`}
                  className="block bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4"
                  style={{ borderLeftColor: category.color }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: category.color + '20' }}
                    >
                      <IconComponent 
                        className="h-6 w-6"
                        style={{ color: category.color }}
                      />
                    </div>
                    <span className="text-2xl font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
                      {category.count}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.count} articles available
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryGrid;