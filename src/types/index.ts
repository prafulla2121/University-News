export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  publishDate: string;
  views: number;
  featured: boolean;
  image: string;
  readTime: number;
  status: 'draft' | 'published' | 'archived';
  createdBy: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'cultural' | 'sports' | 'technical' | 'workshop' | 'seminar';
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  venue: string;
  maxParticipants: number;
  registrationFee: number;
  organizer: string;
  contactEmail: string;
  contactPhone: string;
  image: string;
  requirements: string[];
  prizes: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  registrationOpen: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  participantName: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  year: string;
  additionalInfo: string;
  registrationDate: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  attendanceStatus: 'registered' | 'attended' | 'absent';
}

export interface AcademicResult {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  semester: string;
  year: string;
  examType: 'mid-term' | 'final' | 'supplementary' | 'improvement';
  subjects: {
    subjectCode: string;
    subjectName: string;
    credits: number;
    grade: string;
    marks: number;
    maxMarks: number;
  }[];
  cgpa: number;
  sgpa: number;
  status: 'pass' | 'fail' | 'pending';
  publishDate: string;
  createdBy: string;
}

export interface ExamSchedule {
  id: string;
  examType: 'mid-term' | 'final' | 'supplementary' | 'improvement';
  department: string;
  semester: string;
  year: string;
  subjects: {
    subjectCode: string;
    subjectName: string;
    date: string;
    time: string;
    duration: string;
    venue: string;
  }[];
  instructions: string[];
  publishDate: string;
  createdBy: string;
  updatedAt: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  category: 'technical' | 'cultural' | 'sports' | 'social' | 'academic';
  faculty: string;
  president: string;
  vicePresident: string;
  secretary: string;
  contactEmail: string;
  meetingSchedule: string;
  membershipFee: number;
  maxMembers: number;
  currentMembers: number;
  image: string;
  achievements: string[];
  upcomingEvents: string[];
  registrationOpen: boolean;
  createdBy: string;
  createdAt: string;
}

export interface ClubMembership {
  id: string;
  clubId: string;
  studentName: string;
  studentId: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  position: 'member' | 'coordinator' | 'head' | 'president' | 'secretary';
  joinDate: string;
  membershipStatus: 'active' | 'inactive' | 'suspended';
  paymentStatus: 'pending' | 'paid';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  count: number;
  description: string;
  adminId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'academic-admin' | 'event-admin' | 'club-admin' | 'news-admin' | 'editor' | 'user';
  department?: string;
  permissions: string[];
  avatar: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  date: string;
  replies?: Comment[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'academic' | 'event' | 'urgent' | 'placement';
  targetAudience: 'all' | 'students' | 'faculty' | 'staff' | 'specific-department';
  department?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  validFrom: string;
  validTo: string;
  createdBy: string;
  createdAt: string;
  isActive: boolean;
}

export interface PlacementDrive {
  id: string;
  companyName: string;
  companyLogo: string;
  jobTitle: string;
  jobDescription: string;
  eligibilityCriteria: {
    departments: string[];
    minCGPA: number;
    passingYear: string;
    backlogs: number;
  };
  packageDetails: {
    ctc: string;
    baseSalary: string;
    location: string[];
  };
  selectionProcess: string[];
  applicationDeadline: string;
  driveDate: string;
  venue: string;
  contactPerson: string;
  contactEmail: string;
  registrationOpen: boolean;
  maxApplications: number;
  currentApplications: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: string;
}

export interface PlacementApplication {
  id: string;
  driveId: string;
  studentName: string;
  studentId: string;
  email: string;
  phone: string;
  department: string;
  cgpa: number;
  backlogs: number;
  resume: string;
  coverLetter: string;
  applicationDate: string;
  status: 'applied' | 'shortlisted' | 'selected' | 'rejected' | 'on-hold';
  interviewDate?: string;
  feedback?: string;
}