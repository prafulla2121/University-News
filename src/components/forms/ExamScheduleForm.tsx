import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { Calendar, Clock, MapPin, Plus, X, FileText } from 'lucide-react';
import { ExamSchedule } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';

interface ExamScheduleFormProps {
  schedule?: ExamSchedule;
  onSubmit: (schedule: ExamSchedule) => void;
  onCancel: () => void;
}

const ExamScheduleForm: React.FC<ExamScheduleFormProps> = ({ schedule, onSubmit, onCancel }) => {
  const [subjects, setSubjects] = useState(schedule?.subjects || [
    { subjectCode: '', subjectName: '', date: '', time: '', duration: '', venue: '' }
  ]);
  const [instructions, setInstructions] = useState<string[]>(schedule?.instructions || ['']);

  const { register, handleSubmit, formState: { errors } } = useForm<ExamSchedule>({
    defaultValues: schedule || {
      examType: 'final',
      department: '',
      semester: '',
      year: new Date().getFullYear().toString()
    }
  });

  const addSubject = () => {
    setSubjects([...subjects, { subjectCode: '', subjectName: '', date: '', time: '', duration: '', venue: '' }]);
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const updateSubject = (index: number, field: string, value: string) => {
    const updated = [...subjects];
    updated[index] = { ...updated[index], [field]: value };
    setSubjects(updated);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const updateInstruction = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const onFormSubmit = (data: any) => {
    const scheduleData: ExamSchedule = {
      ...data,
      id: schedule?.id || uuidv4(),
      subjects: subjects.filter(sub => sub.subjectCode && sub.subjectName),
      instructions: instructions.filter(inst => inst.trim() !== ''),
      publishDate: schedule?.publishDate || new Date().toISOString(),
      createdBy: schedule?.createdBy || '2',
      updatedAt: new Date().toISOString()
    };
    onSubmit(scheduleData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {schedule ? 'Edit Exam Schedule' : 'Create Exam Schedule'}
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exam Type *
            </label>
            <select
              {...register('examType', { required: 'Exam type is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="mid-term">Mid-term</option>
              <option value="final">Final</option>
              <option value="supplementary">Supplementary</option>
              <option value="improvement">Improvement</option>
            </select>
            {errors.examType && (
              <p className="mt-1 text-sm text-red-600">{errors.examType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department *
            </label>
            <input
              type="text"
              {...register('department', { required: 'Department is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter department"
            />
            {errors.department && (
              <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Semester *
            </label>
            <select
              {...register('semester', { required: 'Semester is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Semester</option>
              <option value="1st">1st Semester</option>
              <option value="2nd">2nd Semester</option>
              <option value="3rd">3rd Semester</option>
              <option value="4th">4th Semester</option>
              <option value="5th">5th Semester</option>
              <option value="6th">6th Semester</option>
              <option value="7th">7th Semester</option>
              <option value="8th">8th Semester</option>
            </select>
            {errors.semester && (
              <p className="mt-1 text-sm text-red-600">{errors.semester.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year *
            </label>
            <input
              type="text"
              {...register('year', { required: 'Year is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter year"
            />
            {errors.year && (
              <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
            )}
          </div>
        </div>

        {/* Subjects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Exam Subjects *
            </label>
            <button
              type="button"
              onClick={addSubject}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Subject</span>
            </button>
          </div>

          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border border-gray-200 rounded-lg">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Subject Code
                  </label>
                  <input
                    type="text"
                    value={subject.subjectCode}
                    onChange={(e) => updateSubject(index, 'subjectCode', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="CS101"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    value={subject.subjectName}
                    onChange={(e) => updateSubject(index, 'subjectName', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Subject name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={subject.date}
                    onChange={(e) => updateSubject(index, 'date', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={subject.time}
                    onChange={(e) => updateSubject(index, 'time', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={subject.duration}
                    onChange={(e) => updateSubject(index, 'duration', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="3 hours"
                  />
                </div>

                <div className="flex items-end">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Venue
                    </label>
                    <input
                      type="text"
                      value={subject.venue}
                      onChange={(e) => updateSubject(index, 'venue', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Hall A"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSubject(index)}
                    className="ml-2 p-2 text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Exam Instructions
            </label>
            <button
              type="button"
              onClick={addInstruction}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Instruction</span>
            </button>
          </div>

          <div className="space-y-2">
            {instructions.map((instruction, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter instruction"
                />
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="p-2 text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {schedule ? 'Update Schedule' : 'Create Schedule'}
          </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ExamScheduleForm;