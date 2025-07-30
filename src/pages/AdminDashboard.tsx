import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import {
  Users,
  Calendar,
  FileText,
  Award,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  BookOpen,
  GraduationCap,
  Trophy,
  Newspaper
} from 'lucide-react';
import EventForm from '../components/forms/EventForm';
import ArticleForm from '../components/forms/ArticleForm';
import ExamScheduleForm from '../components/forms/ExamScheduleForm';
import { exportToExcel } from '../utils/excelExport';

export default function AdminDashboard() {
  const { 
    user, 
    events, 
    articles, 
    examSchedules, 
    clubs, 
    addEvent, 
    addArticle, 
    addExamSchedule,
    updateEvent,
    updateArticle,
    updateExamSchedule,
    deleteEvent,
    deleteArticle,
    deleteExamSchedule
  } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [showEventForm, setShowEventForm] = useState(false);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [showExamForm, setShowExamForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [editingExamSchedule, setEditingExamSchedule] = useState(null);

  if (!user || user.role === 'student') {
    return <Navigate to="/login" replace />;
  }

  const hasPermission = (section: string) => {
    if (user.role === 'super_admin') return true;
    if (user.role === 'academic-admin' && ['overview', 'academics', 'exams'].includes(section)) return true;
    if (user.role === 'event-admin' && ['overview', 'events'].includes(section)) return true;
    if (user.role === 'club-admin' && ['overview', 'clubs'].includes(section)) return true;
    if (user.role === 'news-admin' && ['overview', 'articles'].includes(section)) return true;
    return false;
  };

  const handleExportEvents = () => {
    const eventData = events.map(event => ({
      'Event Name': event.title,
      'Start Date': new Date(event.startDate).toLocaleDateString(),
      'End Date': new Date(event.endDate).toLocaleDateString(),
      'Venue': event.venue,
      'Max Participants': event.maxParticipants,
      'Status': event.status,
      'Registration Fee': event.registrationFee || 'Free',
      'Organizer': event.organizer
    }));
    exportToExcel(eventData, 'events_list', 'Events');
  };

  const handleExportArticles = () => {
    const articleData = articles.map(article => ({
      'Title': article.title,
      'Author': article.author,
      'Category': article.category,
      'Status': article.status,
      'Views': article.views,
      'Publish Date': new Date(article.publishDate).toLocaleDateString(),
      'Featured': article.featured ? 'Yes' : 'No'
    }));
    exportToExcel(articleData, 'articles_list', 'Articles');
  };

  const handleExportExamSchedules = () => {
    const examData = examSchedules.flatMap(schedule => 
      schedule.subjects.map(subject => ({
        'Department': schedule.department,
        'Semester': schedule.semester,
        'Year': schedule.year,
        'Exam Type': schedule.examType,
        'Subject Code': subject.subjectCode,
        'Subject Name': subject.subjectName,
        'Date': subject.date,
        'Time': subject.time,
        'Duration': subject.duration,
        'Venue': subject.venue
      }))
    );
    exportToExcel(examData, 'exam_schedules', 'Exam Schedules');
  };

  const handleExportClubs = () => {
    const clubData = clubs.map(club => ({
      'Club Name': club.name,
      'Category': club.category,
      'Faculty': club.faculty,
      'President': club.president,
      'Current Members': club.currentMembers,
      'Max Members': club.maxMembers,
      'Membership Fee': club.membershipFee,
      'Registration Open': club.registrationOpen ? 'Yes' : 'No'
    }));
    exportToExcel(clubData, 'clubs_list', 'Clubs');
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setShowArticleForm(true);
  };

  const handleEditExamSchedule = (schedule) => {
    setEditingExamSchedule(schedule);
    setShowExamForm(true);
  };

  const handleCloseEventForm = () => {
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const handleCloseArticleForm = () => {
    setShowArticleForm(false);
    setEditingArticle(null);
  };

  const handleCloseExamForm = () => {
    setShowExamForm(false);
    setEditingExamSchedule(null);
  };

  const handleEventSubmit = (eventData) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
    handleCloseEventForm();
  };

  const handleArticleSubmit = (articleData) => {
    if (editingArticle) {
      updateArticle(editingArticle.id, articleData);
    } else {
      addArticle(articleData);
    }
    handleCloseArticleForm();
  };

  const handleExamSubmit = (examData) => {
    if (editingExamSchedule) {
      updateExamSchedule(editingExamSchedule.id, examData);
    } else {
      addExamSchedule(examData);
    }
    handleCloseExamForm();
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, permission: true },
    { id: 'events', label: 'Events', icon: Calendar, permission: hasPermission('events') },
    { id: 'articles', label: 'Articles', icon: Newspaper, permission: hasPermission('articles') },
    { id: 'academics', label: 'Academics', icon: BookOpen, permission: hasPermission('academics') },
    { id: 'exams', label: 'Exams', icon: GraduationCap, permission: hasPermission('exams') },
    { id: 'clubs', label: 'Clubs', icon: Trophy, permission: hasPermission('clubs') }
  ].filter(tab => tab.permission);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user.name}</p>
          <div className="mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
              {user.role.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hasPermission('events') && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Events</p>
                    <p className="text-3xl font-bold text-gray-900">{events.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <button
                  onClick={handleExportEvents}
                  className="mt-4 flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Events</span>
                </button>
              </div>
            )}

            {hasPermission('articles') && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Articles</p>
                    <p className="text-3xl font-bold text-gray-900">{articles.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <button
                  onClick={handleExportArticles}
                  className="mt-4 flex items-center space-x-2 text-sm text-green-600 hover:text-green-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Articles</span>
                </button>
              </div>
            )}

            {hasPermission('exams') && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Exam Schedules</p>
                    <p className="text-3xl font-bold text-gray-900">{examSchedules.length}</p>
                  </div>
                  <GraduationCap className="w-8 h-8 text-purple-600" />
                </div>
                <button
                  onClick={handleExportExamSchedules}
                  className="mt-4 flex items-center space-x-2 text-sm text-purple-600 hover:text-purple-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Schedule</span>
                </button>
              </div>
            )}

            {hasPermission('clubs') && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Clubs</p>
                    <p className="text-3xl font-bold text-gray-900">{clubs.length}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-yellow-600" />
                </div>
                <button
                  onClick={handleExportClubs}
                  className="mt-4 flex items-center space-x-2 text-sm text-yellow-600 hover:text-yellow-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Clubs</span>
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'events' && hasPermission('events') && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
              <button
                onClick={() => setShowEventForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Max Participants
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {events.map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{event.title}</div>
                            <div className="text-sm text-gray-500">{event.venue}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(event.startDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {event.maxParticipants}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                            event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleEditEvent(event)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteEvent(event.id)}
                            className="text-red-600 hover:text-red-900" 
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'articles' && hasPermission('articles') && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Article Management</h2>
              <button
                onClick={() => setShowArticleForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Article</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Article
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {articles.map((article) => (
                      <tr key={article.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{article.title}</div>
                            <div className="text-sm text-gray-500">By {article.author}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {article.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(article.publishDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            article.status === 'published' ? 'bg-green-100 text-green-800' :
                            article.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {article.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button 
                            onClick={() => handleEditArticle(article)}
                            className="text-indigo-600 hover:text-indigo-900" 
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteArticle(article.id)}
                            className="text-red-600 hover:text-red-900" 
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exams' && hasPermission('exams') && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Exam Schedule Management</h2>
              <button
                onClick={() => setShowExamForm(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Exam</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Venue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {examSchedules.map((exam) => (
                      <tr key={exam.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{exam.examType} Exam</div>
                            <div className="text-sm text-gray-500">Semester {exam.semester}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900">{exam.subjects.length} subjects</div>
                            <div className="text-sm text-gray-500">Year {exam.year}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Multiple venues
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {exam.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button 
                            onClick={() => handleEditExamSchedule(exam)}
                            className="text-indigo-600 hover:text-indigo-900" 
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteExamSchedule(exam.id)}
                            className="text-red-600 hover:text-red-900" 
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clubs' && hasPermission('clubs') && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Club Management</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs.map((club) => (
                <div key={club.id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{club.name}</h3>
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{club.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Members: {club.currentMembers}</span>
                    <span>Max: {club.maxMembers}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                      Edit
                    </button>
                    <button className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showEventForm && (
        <EventForm
          event={editingEvent}
          onSubmit={handleEventSubmit}
          onCancel={handleCloseEventForm}
        />
      )}

      {showArticleForm && (
        <ArticleForm
          article={editingArticle}
          onSubmit={handleArticleSubmit}
          onCancel={handleCloseArticleForm}
        />
      )}

      {showExamForm && (
        <ExamScheduleForm
          schedule={editingExamSchedule}
          onSubmit={handleExamSubmit}
          onCancel={handleCloseExamForm}
        />
      )}
    </div>
  );
}