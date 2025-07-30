import { NewsArticle, Category } from '../types';

export const users = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'admin@university.edu',
    role: 'super-admin' as const,
    permissions: ['all'],
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
    isActive: true,
    lastLogin: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Academic Admin',
    email: 'academic@university.edu',
    role: 'academic-admin' as const,
    department: 'Academic Affairs',
    permissions: ['academic', 'results', 'exams'],
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
    isActive: true,
    lastLogin: '2024-01-14T15:30:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Event Admin',
    email: 'events@university.edu',
    role: 'event-admin' as const,
    department: 'Student Affairs',
    permissions: ['events', 'registrations'],
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
    isActive: true,
    lastLogin: '2024-01-14T12:00:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Club Admin',
    email: 'clubs@university.edu',
    role: 'club-admin' as const,
    department: 'Student Activities',
    permissions: ['clubs', 'memberships'],
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    isActive: true,
    lastLogin: '2024-01-13T09:45:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const categories: Category[] = [
  { id: '1', name: 'Academics', slug: 'academics', color: '#3B82F6', count: 45, description: 'Academic news and updates', adminId: '2' },
  { id: '2', name: 'Research', slug: 'research', color: '#10B981', count: 32, description: 'Research achievements and publications', adminId: '2' },
  { id: '3', name: 'Events', slug: 'events', color: '#F59E0B', count: 28, description: 'University events and activities', adminId: '3' },
  { id: '4', name: 'Placements', slug: 'placements', color: '#8B5CF6', count: 15, description: 'Placement drives and opportunities', adminId: '1' },
  { id: '5', name: 'Clubs & Culture', slug: 'clubs-culture', color: '#EF4444', count: 22, description: 'Club activities and cultural events', adminId: '4' },
  { id: '6', name: 'Sports', slug: 'sports', color: '#06B6D4', count: 18, description: 'Sports events and achievements', adminId: '3' }
];

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'University Announces New Research Center for Artificial Intelligence',
    content: 'The university has announced the establishment of a state-of-the-art research center dedicated to artificial intelligence and machine learning. This new facility will house cutting-edge equipment and provide opportunities for both undergraduate and graduate students to engage in groundbreaking research.',
    excerpt: 'New AI research center to foster innovation and provide advanced learning opportunities for students.',
    author: 'Dr. Sarah Johnson',
    category: 'Research',
    tags: ['AI', 'Research', 'Technology', 'Innovation'],
    publishDate: '2024-01-15T10:00:00Z',
    views: 1245,
    featured: true,
    image: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg',
    readTime: 5,
    status: 'published' as const,
    createdBy: '2',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Record-Breaking Placement Season: 95% Students Placed',
    content: 'This year marks a milestone achievement with 95% of graduating students securing placements in top-tier companies. The placement cell worked tirelessly to bring renowned organizations to campus.',
    excerpt: 'Exceptional placement results showcase the quality of education and industry readiness of our students.',
    author: 'Prof. Michael Chen',
    category: 'Placements',
    tags: ['Placements', 'Career', 'Success', 'Students'],
    publishDate: '2024-01-14T14:30:00Z',
    views: 2150,
    featured: true,
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg',
    readTime: 4,
    status: 'published' as const,
    createdBy: '1',
    updatedAt: '2024-01-14T15:00:00Z'
  },
  {
    id: '3',
    title: 'Annual Cultural Festival "Spectrum 2024" Begins Tomorrow',
    content: 'The much-awaited annual cultural festival Spectrum 2024 kicks off tomorrow with three days of music, dance, theater, and art exhibitions. Students from various colleges will participate in this grand celebration.',
    excerpt: 'Three-day cultural extravaganza featuring performances, competitions, and exhibitions.',
    author: 'Lisa Rodriguez',
    category: 'Events',
    tags: ['Culture', 'Festival', 'Arts', 'Students'],
    publishDate: '2024-01-13T16:15:00Z',
    views: 892,
    featured: true,
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
    readTime: 3,
    status: 'published' as const,
    createdBy: '3',
    updatedAt: '2024-01-13T16:45:00Z'
  },
  {
    id: '4',
    title: 'New Curriculum Updates for Engineering Programs',
    content: 'The engineering department has introduced significant updates to the curriculum, incorporating latest industry trends and emerging technologies to better prepare students for the evolving job market.',
    excerpt: 'Engineering curriculum gets a modern makeover with industry-relevant updates.',
    author: 'Dr. Robert Kim',
    category: 'Academics',
    tags: ['Curriculum', 'Engineering', 'Education', 'Innovation'],
    publishDate: '2024-01-12T09:45:00Z',
    views: 756,
    featured: false,
    image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg',
    readTime: 6,
    status: 'published' as const,
    createdBy: '2',
    updatedAt: '2024-01-12T10:15:00Z'
  },
  {
    id: '5',
    title: 'Students Win National Robotics Competition',
    content: 'Our robotics team has secured first place in the National Robotics Championship, beating 150+ teams from across the country. The winning project focused on autonomous navigation systems.',
    excerpt: 'Robotics team brings home national championship trophy with innovative project.',
    author: 'Tech News Desk',
    category: 'Academics',
    tags: ['Robotics', 'Competition', 'Technology', 'Achievement'],
    publishDate: '2024-01-11T11:20:00Z',
    views: 1340,
    featured: false,
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg',
    readTime: 4,
    status: 'published' as const,
    createdBy: '2',
    updatedAt: '2024-01-11T11:50:00Z'
  },
  {
    id: '6',
    title: 'Campus Sustainability Initiative Reduces Carbon Footprint by 30%',
    content: 'The university\'s comprehensive sustainability program has achieved remarkable results, reducing the campus carbon footprint by 30% through renewable energy adoption and waste reduction programs.',
    excerpt: 'Green initiatives show impressive environmental impact with significant carbon reduction.',
    author: 'Environmental Committee',
    category: 'Research',
    tags: ['Sustainability', 'Environment', 'Green', 'Innovation'],
    publishDate: '2024-01-10T13:00:00Z',
    views: 623,
    featured: false,
    image: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg',
    readTime: 5,
    status: 'published' as const,
    createdBy: '2',
    updatedAt: '2024-01-10T13:30:00Z'
  }
];

export const events = [
  {
    id: '1',
    title: 'Annual Tech Fest 2024',
    description: 'Join us for the biggest technical festival of the year featuring coding competitions, robotics challenges, and tech talks by industry experts.',
    category: 'technical' as const,
    startDate: '2024-03-15T09:00:00Z',
    endDate: '2024-03-17T18:00:00Z',
    registrationDeadline: '2024-03-10T23:59:59Z',
    venue: 'Main Auditorium & Tech Labs',
    maxParticipants: 500,
    registrationFee: 200,
    organizer: 'Computer Science Department',
    contactEmail: 'techfest@university.edu',
    contactPhone: '+91-9876543210',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
    requirements: ['Laptop', 'Student ID', 'Registration Confirmation'],
    prizes: ['₹50,000 for 1st Prize', '₹30,000 for 2nd Prize', '₹20,000 for 3rd Prize'],
    status: 'upcoming' as const,
    registrationOpen: true,
    createdBy: '3',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z'
  },
  {
    id: '2',
    title: 'Cultural Night 2024',
    description: 'Experience the vibrant cultural diversity of our university through dance, music, drama, and art performances.',
    category: 'cultural' as const,
    startDate: '2024-02-20T18:00:00Z',
    endDate: '2024-02-20T22:00:00Z',
    registrationDeadline: '2024-02-15T23:59:59Z',
    venue: 'Open Air Theatre',
    maxParticipants: 1000,
    registrationFee: 100,
    organizer: 'Cultural Committee',
    contactEmail: 'cultural@university.edu',
    contactPhone: '+91-9876543211',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
    requirements: ['Student ID', 'Registration Confirmation'],
    prizes: ['Best Performance Award', 'Audience Choice Award'],
    status: 'upcoming' as const,
    registrationOpen: true,
    createdBy: '3',
    createdAt: '2024-01-08T15:00:00Z',
    updatedAt: '2024-01-12T09:15:00Z'
  }
];

export const eventRegistrations = [
  {
    id: '1',
    eventId: '1',
    participantName: 'John Doe',
    email: 'john.doe@student.university.edu',
    phone: '+91-9876543212',
    studentId: 'CS2021001',
    department: 'Computer Science',
    year: '3rd Year',
    additionalInfo: 'Interested in AI/ML competitions',
    registrationDate: '2024-01-12T10:30:00Z',
    paymentStatus: 'paid' as const,
    attendanceStatus: 'registered' as const
  },
  {
    id: '2',
    eventId: '1',
    participantName: 'Jane Smith',
    email: 'jane.smith@student.university.edu',
    phone: '+91-9876543213',
    studentId: 'CS2021002',
    department: 'Computer Science',
    year: '3rd Year',
    additionalInfo: 'Team leader for robotics challenge',
    registrationDate: '2024-01-13T14:15:00Z',
    paymentStatus: 'paid' as const,
    attendanceStatus: 'registered' as const
  }
];

export const clubs = [
  {
    id: '1',
    name: 'Coding Club',
    description: 'A community of passionate programmers and developers working on exciting projects and participating in coding competitions.',
    category: 'technical' as const,
    faculty: 'Dr. Sarah Johnson',
    president: 'Alex Kumar',
    vicePresident: 'Priya Sharma',
    secretary: 'Rahul Patel',
    contactEmail: 'codingclub@university.edu',
    meetingSchedule: 'Every Friday 4:00 PM',
    membershipFee: 500,
    maxMembers: 100,
    currentMembers: 75,
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
    achievements: ['Won Inter-University Hackathon 2023', 'Published 5 Open Source Projects'],
    upcomingEvents: ['Weekly Coding Contest', 'Git Workshop'],
    registrationOpen: true,
    createdBy: '4',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Drama Society',
    description: 'Express yourself through the art of theater and drama. Join us for workshops, performances, and creative collaborations.',
    category: 'cultural' as const,
    faculty: 'Prof. Michael Chen',
    president: 'Sneha Reddy',
    vicePresident: 'Arjun Singh',
    secretary: 'Kavya Nair',
    contactEmail: 'drama@university.edu',
    meetingSchedule: 'Every Tuesday & Thursday 5:00 PM',
    membershipFee: 300,
    maxMembers: 50,
    currentMembers: 35,
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
    achievements: ['Best Drama Award 2023', '3 Successful Productions'],
    upcomingEvents: ['Shakespeare Workshop', 'Annual Play Auditions'],
    registrationOpen: true,
    createdBy: '4',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const examSchedules = [
  {
    id: '1',
    examType: 'final' as const,
    department: 'Computer Science',
    semester: '6th',
    year: '2024',
    subjects: [
      {
        subjectCode: 'CS601',
        subjectName: 'Machine Learning',
        date: '2024-05-15',
        time: '09:00 AM',
        duration: '3 hours',
        venue: 'Exam Hall A'
      },
      {
        subjectCode: 'CS602',
        subjectName: 'Software Engineering',
        date: '2024-05-17',
        time: '09:00 AM',
        duration: '3 hours',
        venue: 'Exam Hall B'
      }
    ],
    instructions: [
      'Bring your student ID card',
      'No electronic devices allowed',
      'Report 30 minutes before exam time'
    ],
    publishDate: '2024-04-15T10:00:00Z',
    createdBy: '2',
    updatedAt: '2024-04-20T15:30:00Z'
  }
];

export const academicResults = [
  {
    id: '1',
    studentId: 'CS2021001',
    studentName: 'John Doe',
    department: 'Computer Science',
    semester: '5th',
    year: '2023',
    examType: 'final' as const,
    subjects: [
      {
        subjectCode: 'CS501',
        subjectName: 'Database Management Systems',
        credits: 4,
        grade: 'A',
        marks: 85,
        maxMarks: 100
      },
      {
        subjectCode: 'CS502',
        subjectName: 'Computer Networks',
        credits: 4,
        grade: 'A-',
        marks: 78,
        maxMarks: 100
      }
    ],
    cgpa: 8.5,
    sgpa: 8.2,
    status: 'pass' as const,
    publishDate: '2024-01-10T10:00:00Z',
    createdBy: '2'
  }
];

export const breakingNews = [
  'University ranked among top 50 institutions globally',
  'New scholarship program announced for underprivileged students',
  'Campus wifi upgrade completed - 10x faster speeds now available',
  'International collaboration signed with MIT and Oxford'
];