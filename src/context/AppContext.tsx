import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NewsArticle, User, Event, ExamSchedule, Club, AcademicResult } from '../types';
import { newsArticles, users, events, examSchedules, clubs, academicResults } from '../data/mockData';

interface AppContextType {
  articles: NewsArticle[];
  events: Event[];
  examSchedules: ExamSchedule[];
  clubs: Club[];
  academicResults: AcademicResult[];
  user: User | null;
  searchQuery: string;
  selectedCategory: string;
  darkMode: boolean;
  setArticles: (articles: NewsArticle[]) => void;
  setEvents: (events: Event[]) => void;
  setExamSchedules: (schedules: ExamSchedule[]) => void;
  setClugs: (clubs: Club[]) => void;
  setAcademicResults: (results: AcademicResult[]) => void;
  setUser: (user: User | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  toggleDarkMode: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  // CRUD operations
  addArticle: (article: NewsArticle) => void;
  updateArticle: (id: string, article: NewsArticle) => void;
  deleteArticle: (id: string) => void;
  addEvent: (event: Event) => void;
  updateEvent: (id: string, event: Event) => void;
  deleteEvent: (id: string) => void;
  addExamSchedule: (schedule: ExamSchedule) => void;
  updateExamSchedule: (id: string, schedule: ExamSchedule) => void;
  deleteExamSchedule: (id: string) => void;
  addClub: (club: Club) => void;
  updateClub: (id: string, club: Club) => void;
  deleteClub: (id: string) => void;
  addAcademicResult: (result: AcademicResult) => void;
  updateAcademicResult: (id: string, result: AcademicResult) => void;
  deleteAcademicResult: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<NewsArticle[]>(newsArticles);
  const [eventsData, setEvents] = useState<Event[]>(events);
  const [examSchedulesData, setExamSchedules] = useState<ExamSchedule[]>(examSchedules);
  const [clubsData, setClugs] = useState<Club[]>(clubs);
  const [academicResultsData, setAcademicResults] = useState<AcademicResult[]>(academicResults);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    const validUsers = [
      { 
        email: 'admin@university.edu', 
        password: 'admin123', 
        userData: {
          id: '1',
          name: 'Super Admin',
          email: 'admin@university.edu',
          role: 'super-admin' as const,
          permissions: ['all'],
          avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
          isActive: true,
          lastLogin: new Date().toISOString(),
          createdAt: '2024-01-01T00:00:00Z'
        }
      },
      { 
        email: 'academic@university.edu', 
        password: 'academic123', 
        userData: {
          id: '2',
          name: 'Academic Admin',
          email: 'academic@university.edu',
          role: 'academic-admin' as const,
          department: 'Academic Affairs',
          permissions: ['academic', 'results', 'exams'],
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
          isActive: true,
          lastLogin: new Date().toISOString(),
          createdAt: '2024-01-01T00:00:00Z'
        }
      },
      { 
        email: 'events@university.edu', 
        password: 'events123', 
        userData: {
          id: '3',
          name: 'Event Admin',
          email: 'events@university.edu',
          role: 'event-admin' as const,
          department: 'Student Affairs',
          permissions: ['events', 'registrations'],
          avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
          isActive: true,
          lastLogin: new Date().toISOString(),
          createdAt: '2024-01-01T00:00:00Z'
        }
      },
      { 
        email: 'clubs@university.edu', 
        password: 'clubs123', 
        userData: {
          id: '4',
          name: 'Club Admin',
          email: 'clubs@university.edu',
          role: 'club-admin' as const,
          department: 'Student Activities',
          permissions: ['clubs', 'memberships'],
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
          isActive: true,
          lastLogin: new Date().toISOString(),
          createdAt: '2024-01-01T00:00:00Z'
        }
      },
      { 
        email: 'news@university.edu', 
        password: 'news123', 
        userData: {
          id: '5',
          name: 'News Admin',
          email: 'news@university.edu',
          role: 'news-admin' as const,
          department: 'Communications',
          permissions: ['articles', 'news'],
          avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
          isActive: true,
          lastLogin: new Date().toISOString(),
          createdAt: '2024-01-01T00:00:00Z'
        }
      }
    ];

    const validUser = validUsers.find(u => u.email === email && u.password === password);
    if (validUser) {
      setUser(validUser.userData);
      // Update last login time
      validUser.userData.lastLogin = new Date().toISOString();
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Article CRUD operations
  const addArticle = (article: NewsArticle) => {
    setArticles(prev => [article, ...prev]);
  };

  const updateArticle = (id: string, updatedArticle: NewsArticle) => {
    setArticles(prev => prev.map(article => 
      article.id === id ? updatedArticle : article
    ));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id));
  };

  // Event CRUD operations
  const addEvent = (event: Event) => {
    setEvents(prev => [event, ...prev]);
  };

  const updateEvent = (id: string, updatedEvent: Event) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? updatedEvent : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  // Exam Schedule CRUD operations
  const addExamSchedule = (schedule: ExamSchedule) => {
    setExamSchedules(prev => [schedule, ...prev]);
  };

  const updateExamSchedule = (id: string, updatedSchedule: ExamSchedule) => {
    setExamSchedules(prev => prev.map(schedule => 
      schedule.id === id ? updatedSchedule : schedule
    ));
  };

  const deleteExamSchedule = (id: string) => {
    setExamSchedules(prev => prev.filter(schedule => schedule.id !== id));
  };

  // Club CRUD operations
  const addClub = (club: Club) => {
    setClugs(prev => [club, ...prev]);
  };

  const updateClub = (id: string, updatedClub: Club) => {
    setClugs(prev => prev.map(club => 
      club.id === id ? updatedClub : club
    ));
  };

  const deleteClub = (id: string) => {
    setClugs(prev => prev.filter(club => club.id !== id));
  };

  // Academic Result CRUD operations
  const addAcademicResult = (result: AcademicResult) => {
    setAcademicResults(prev => [result, ...prev]);
  };

  const updateAcademicResult = (id: string, updatedResult: AcademicResult) => {
    setAcademicResults(prev => prev.map(result => 
      result.id === id ? updatedResult : result
    ));
  };

  const deleteAcademicResult = (id: string) => {
    setAcademicResults(prev => prev.filter(result => result.id !== id));
  };

  return (
    <AppContext.Provider value={{
      articles,
      events: eventsData,
      examSchedules: examSchedulesData,
      clubs: clubsData,
      academicResults: academicResultsData,
      user,
      searchQuery,
      selectedCategory,
      darkMode,
      setArticles,
      setEvents,
      setExamSchedules,
      setClugs,
      setAcademicResults,
      setUser,
      setSearchQuery,
      setSelectedCategory,
      toggleDarkMode,
      login,
      logout,
      addArticle,
      updateArticle,
      deleteArticle,
      addEvent,
      updateEvent,
      deleteEvent,
      addExamSchedule,
      updateExamSchedule,
      deleteExamSchedule,
      addClub,
      updateClub,
      deleteClub,
      addAcademicResult,
      updateAcademicResult,
      deleteAcademicResult
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};