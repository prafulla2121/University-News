import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (data: any[], filename: string, sheetName: string = 'Sheet1') => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  
  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  // Generate Excel file buffer
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  // Create blob and save file
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${filename}.xlsx`);
};

export const exportEventRegistrations = (registrations: any[], eventTitle: string) => {
  const exportData = registrations.map(reg => ({
    'Participant Name': reg.participantName,
    'Email': reg.email,
    'Phone': reg.phone,
    'Student ID': reg.studentId,
    'Department': reg.department,
    'Year': reg.year,
    'Registration Date': new Date(reg.registrationDate).toLocaleDateString(),
    'Payment Status': reg.paymentStatus,
    'Attendance Status': reg.attendanceStatus,
    'Additional Info': reg.additionalInfo
  }));
  
  exportToExcel(exportData, `${eventTitle}_registrations_${new Date().toISOString().split('T')[0]}`, 'Registrations');
};

export const exportClubMembers = (members: any[], clubName: string) => {
  const exportData = members.map(member => ({
    'Student Name': member.studentName,
    'Student ID': member.studentId,
    'Email': member.email,
    'Phone': member.phone,
    'Department': member.department,
    'Year': member.year,
    'Position': member.position,
    'Join Date': new Date(member.joinDate).toLocaleDateString(),
    'Membership Status': member.membershipStatus,
    'Payment Status': member.paymentStatus
  }));
  
  exportToExcel(exportData, `${clubName}_members_${new Date().toISOString().split('T')[0]}`, 'Members');
};

export const exportAcademicResults = (results: any[], title: string) => {
  const exportData = results.map(result => ({
    'Student ID': result.studentId,
    'Student Name': result.studentName,
    'Department': result.department,
    'Semester': result.semester,
    'Year': result.year,
    'Exam Type': result.examType,
    'CGPA': result.cgpa,
    'SGPA': result.sgpa,
    'Status': result.status,
    'Publish Date': new Date(result.publishDate).toLocaleDateString()
  }));
  
  exportToExcel(exportData, `${title}_${new Date().toISOString().split('T')[0]}`, 'Results');
};