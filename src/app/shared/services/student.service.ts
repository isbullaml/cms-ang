import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Student } from '../../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [
    {
      id: '1',
      firstName: 'Emma',
      lastName: 'Thompson',
      email: 'emma.t@email.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '2010-03-15',
      gender: 'female',
      address: '42 Oak Avenue, Springfield, IL 62704',
      enrollmentDate: '2024-09-01',
      status: 'active',
      portalEnabled: true,
      grade: '8th Grade',
      parent: {
        id: 'p1',
        firstName: 'Robert',
        lastName: 'Thompson',
        email: 'robert.t@email.com',
        phone: '+1 (555) 123-4500',
        relationship: 'father'
      },
      subjects: [
        { id: 's1', name: 'Mathematics', tutorName: 'Dr. Sarah Chen', schedule: 'Mon & Wed 4:00 PM', progress: 78, status: 'active' },
        { id: 's2', name: 'Physics', tutorName: 'Mr. James Wilson', schedule: 'Tue & Thu 5:00 PM', progress: 65, status: 'active' },
        { id: 's3', name: 'English Literature', tutorName: 'Ms. Patricia Lee', schedule: 'Fri 3:00 PM', progress: 92, status: 'active' }
      ],
      sessions: [
        { id: 'ss1', subjectName: 'Mathematics', tutorName: 'Dr. Sarah Chen', date: '2025-01-28', startTime: '4:00 PM', endTime: '5:00 PM', status: 'completed', notes: 'Covered quadratic equations' },
        { id: 'ss2', subjectName: 'Physics', tutorName: 'Mr. James Wilson', date: '2025-01-29', startTime: '5:00 PM', endTime: '6:00 PM', status: 'scheduled' },
        { id: 'ss3', subjectName: 'Mathematics', tutorName: 'Dr. Sarah Chen', date: '2025-01-30', startTime: '4:00 PM', endTime: '5:00 PM', status: 'scheduled' },
        { id: 'ss4', subjectName: 'English Literature', tutorName: 'Ms. Patricia Lee', date: '2025-01-24', startTime: '3:00 PM', endTime: '4:00 PM', status: 'completed', notes: 'Essay writing workshop' },
        { id: 'ss5', subjectName: 'Physics', tutorName: 'Mr. James Wilson', date: '2025-01-22', startTime: '5:00 PM', endTime: '6:00 PM', status: 'cancelled' }
      ],
      payments: [
        { id: 'pay1', date: '2025-01-01', description: 'January Tuition - Mathematics', amount: 250, status: 'paid', method: 'Credit Card' },
        { id: 'pay2', date: '2025-01-01', description: 'January Tuition - Physics', amount: 200, status: 'paid', method: 'Bank Transfer' },
        { id: 'pay3', date: '2025-01-01', description: 'January Tuition - English', amount: 180, status: 'pending' },
        { id: 'pay4', date: '2024-12-01', description: 'December Tuition - Mathematics', amount: 250, status: 'paid', method: 'Credit Card' },
        { id: 'pay5', date: '2024-12-01', description: 'December Tuition - Physics', amount: 200, status: 'paid', method: 'Credit Card' }
      ],
      notes: [
        { id: 'n1', date: '2025-01-28', author: 'Dr. Sarah Chen', authorRole: 'Tutor', content: 'Emma is making excellent progress in algebra. She grasped quadratic equations quickly and is ready for more advanced topics.', pinned: true },
        { id: 'n2', date: '2025-01-25', author: 'Mr. James Wilson', authorRole: 'Tutor', content: 'Needs more practice with Newton\'s laws. Recommend additional homework exercises.', pinned: false },
        { id: 'n3', date: '2025-01-20', author: 'Admin', authorRole: 'Admin', content: 'Parent requested schedule adjustment for February. Follow up needed.', pinned: true }
      ],
      attachments: [
        { id: 'a1', name: 'Math_Progress_Report_Jan.pdf', type: 'application/pdf', size: '2.4 MB', uploadedBy: 'Dr. Sarah Chen', uploadedDate: '2025-01-28', category: 'report' },
        { id: 'a2', name: 'Enrollment_Form.pdf', type: 'application/pdf', size: '1.1 MB', uploadedBy: 'Admin', uploadedDate: '2024-09-01', category: 'document' },
        { id: 'a3', name: 'Physics_Homework_Week4.docx', type: 'application/docx', size: '540 KB', uploadedBy: 'Mr. James Wilson', uploadedDate: '2025-01-26', category: 'document' }
      ]
    },
    {
      id: '2',
      firstName: 'Liam',
      lastName: 'Garcia',
      email: 'liam.g@email.com',
      phone: '+1 (555) 234-5678',
      dateOfBirth: '2008-07-22',
      gender: 'male',
      address: '118 Maple Street, Austin, TX 73301',
      enrollmentDate: '2024-06-15',
      status: 'active',
      portalEnabled: true,
      grade: '10th Grade',
      parent: {
        id: 'p2',
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria.g@email.com',
        phone: '+1 (555) 234-5600',
        relationship: 'mother'
      },
      subjects: [
        { id: 's4', name: 'Chemistry', tutorName: 'Dr. Alan Harper', schedule: 'Mon & Wed 3:00 PM', progress: 82, status: 'active' },
        { id: 's5', name: 'Calculus', tutorName: 'Dr. Sarah Chen', schedule: 'Tue & Thu 4:00 PM', progress: 70, status: 'active' }
      ],
      sessions: [
        { id: 'ss6', subjectName: 'Chemistry', tutorName: 'Dr. Alan Harper', date: '2025-01-29', startTime: '3:00 PM', endTime: '4:00 PM', status: 'scheduled' },
        { id: 'ss7', subjectName: 'Calculus', tutorName: 'Dr. Sarah Chen', date: '2025-01-28', startTime: '4:00 PM', endTime: '5:00 PM', status: 'completed', notes: 'Derivatives introduction' }
      ],
      payments: [
        { id: 'pay6', date: '2025-01-01', description: 'January Tuition - Chemistry', amount: 280, status: 'paid', method: 'Credit Card' },
        { id: 'pay7', date: '2025-01-01', description: 'January Tuition - Calculus', amount: 250, status: 'overdue' }
      ],
      notes: [
        { id: 'n4', date: '2025-01-27', author: 'Dr. Alan Harper', authorRole: 'Tutor', content: 'Liam shows strong aptitude for organic chemistry. Consider advanced placement.', pinned: false }
      ],
      attachments: [
        { id: 'a4', name: 'Chemistry_Lab_Report.pdf', type: 'application/pdf', size: '3.2 MB', uploadedBy: 'Liam Garcia', uploadedDate: '2025-01-27', category: 'report' }
      ]
    },
    {
      id: '3',
      firstName: 'Sophia',
      lastName: 'Patel',
      email: 'sophia.p@email.com',
      phone: '+1 (555) 345-6789',
      dateOfBirth: '2012-11-08',
      gender: 'female',
      address: '77 River Road, Portland, OR 97201',
      enrollmentDate: '2025-01-10',
      status: 'active',
      portalEnabled: false,
      grade: '6th Grade',
      parent: {
        id: 'p3',
        firstName: 'Raj',
        lastName: 'Patel',
        email: 'raj.p@email.com',
        phone: '+1 (555) 345-6700',
        relationship: 'father'
      },
      subjects: [
        { id: 's6', name: 'Mathematics', tutorName: 'Dr. Sarah Chen', schedule: 'Mon & Fri 3:30 PM', progress: 45, status: 'active' }
      ],
      sessions: [
        { id: 'ss8', subjectName: 'Mathematics', tutorName: 'Dr. Sarah Chen', date: '2025-01-31', startTime: '3:30 PM', endTime: '4:30 PM', status: 'scheduled' }
      ],
      payments: [
        { id: 'pay8', date: '2025-01-10', description: 'Registration Fee', amount: 100, status: 'paid', method: 'Cash' },
        { id: 'pay9', date: '2025-01-10', description: 'January Tuition - Mathematics (Prorated)', amount: 175, status: 'pending' }
      ],
      notes: [
        { id: 'n5', date: '2025-01-10', author: 'Admin', authorRole: 'Admin', content: 'New enrollment. Initial assessment scheduled for first session.', pinned: true }
      ],
      attachments: []
    },
    {
      id: '4',
      firstName: 'Noah',
      lastName: 'Williams',
      email: 'noah.w@email.com',
      phone: '+1 (555) 456-7890',
      dateOfBirth: '2009-05-30',
      gender: 'male',
      address: '205 Pine Lane, Denver, CO 80201',
      enrollmentDate: '2024-03-20',
      status: 'inactive',
      portalEnabled: true,
      grade: '9th Grade',
      subjects: [
        { id: 's7', name: 'Biology', tutorName: 'Dr. Lisa Monroe', schedule: 'Wed 4:00 PM', progress: 100, status: 'completed' },
        { id: 's8', name: 'Spanish', tutorName: 'Sr. Carlos Ruiz', schedule: 'Sat 10:00 AM', progress: 88, status: 'paused' }
      ],
      sessions: [
        { id: 'ss9', subjectName: 'Biology', tutorName: 'Dr. Lisa Monroe', date: '2024-12-18', startTime: '4:00 PM', endTime: '5:00 PM', status: 'completed', notes: 'Final review session. Course completed.' }
      ],
      payments: [
        { id: 'pay10', date: '2024-12-01', description: 'December Tuition - Biology', amount: 220, status: 'paid', method: 'Bank Transfer' },
        { id: 'pay11', date: '2024-12-01', description: 'December Tuition - Spanish', amount: 200, status: 'paid', method: 'Bank Transfer' }
      ],
      notes: [
        { id: 'n6', date: '2024-12-20', author: 'Admin', authorRole: 'Admin', content: 'Student on break until February. Spanish lessons paused at parent request.', pinned: true }
      ],
      attachments: [
        { id: 'a5', name: 'Biology_Completion_Certificate.pdf', type: 'application/pdf', size: '890 KB', uploadedBy: 'Admin', uploadedDate: '2024-12-20', category: 'certificate' }
      ]
    },
    {
      id: '5',
      firstName: 'Olivia',
      lastName: 'Kim',
      email: 'olivia.k@email.com',
      phone: '+1 (555) 567-8901',
      dateOfBirth: '2011-09-14',
      gender: 'female',
      address: '330 Cherry Blvd, Seattle, WA 98101',
      enrollmentDate: '2024-08-01',
      status: 'active',
      portalEnabled: true,
      grade: '7th Grade',
      parent: {
        id: 'p5',
        firstName: 'Hana',
        lastName: 'Kim',
        email: 'hana.k@email.com',
        phone: '+1 (555) 567-8900',
        relationship: 'mother'
      },
      subjects: [
        { id: 's9', name: 'Piano', tutorName: 'Ms. Clara Rossi', schedule: 'Tue & Thu 3:00 PM', progress: 60, status: 'active' },
        { id: 's10', name: 'Mathematics', tutorName: 'Dr. Sarah Chen', schedule: 'Mon 4:00 PM', progress: 85, status: 'active' },
        { id: 's11', name: 'Art & Design', tutorName: 'Mr. David Brooks', schedule: 'Sat 11:00 AM', progress: 72, status: 'active' }
      ],
      sessions: [
        { id: 'ss10', subjectName: 'Piano', tutorName: 'Ms. Clara Rossi', date: '2025-01-30', startTime: '3:00 PM', endTime: '4:00 PM', status: 'scheduled' },
        { id: 'ss11', subjectName: 'Mathematics', tutorName: 'Dr. Sarah Chen', date: '2025-01-27', startTime: '4:00 PM', endTime: '5:00 PM', status: 'completed', notes: 'Great work on fractions review' }
      ],
      payments: [
        { id: 'pay12', date: '2025-01-01', description: 'January Tuition - Piano', amount: 300, status: 'paid', method: 'Credit Card' },
        { id: 'pay13', date: '2025-01-01', description: 'January Tuition - Mathematics', amount: 250, status: 'paid', method: 'Credit Card' },
        { id: 'pay14', date: '2025-01-01', description: 'January Tuition - Art & Design', amount: 200, status: 'paid', method: 'Credit Card' }
      ],
      notes: [],
      attachments: [
        { id: 'a6', name: 'Piano_Recital_Video.mp4', type: 'video/mp4', size: '45.2 MB', uploadedBy: 'Ms. Clara Rossi', uploadedDate: '2025-01-15', category: 'other' }
      ]
    },
    {
      id: '6',
      firstName: 'Ethan',
      lastName: 'Brown',
      email: 'ethan.b@email.com',
      phone: '+1 (555) 678-9012',
      dateOfBirth: '2007-01-25',
      gender: 'male',
      address: '15 Elm Court, Chicago, IL 60601',
      enrollmentDate: '2023-09-01',
      status: 'suspended',
      portalEnabled: false,
      grade: '11th Grade',
      parent: {
        id: 'p6',
        firstName: 'Angela',
        lastName: 'Brown',
        email: 'angela.b@email.com',
        phone: '+1 (555) 678-9000',
        relationship: 'mother'
      },
      subjects: [
        { id: 's12', name: 'SAT Prep', tutorName: 'Dr. Michael Park', schedule: 'Mon, Wed, Fri 5:00 PM', progress: 55, status: 'paused' }
      ],
      sessions: [
        { id: 'ss12', subjectName: 'SAT Prep', tutorName: 'Dr. Michael Park', date: '2025-01-15', startTime: '5:00 PM', endTime: '6:30 PM', status: 'no-show' }
      ],
      payments: [
        { id: 'pay15', date: '2025-01-01', description: 'January Tuition - SAT Prep', amount: 400, status: 'overdue' },
        { id: 'pay16', date: '2024-12-01', description: 'December Tuition - SAT Prep', amount: 400, status: 'overdue' }
      ],
      notes: [
        { id: 'n7', date: '2025-01-20', author: 'Admin', authorRole: 'Admin', content: 'Account suspended due to outstanding payments. Parent contacted on 1/18.', pinned: true },
        { id: 'n8', date: '2025-01-15', author: 'Dr. Michael Park', authorRole: 'Tutor', content: 'Student did not attend today\'s session. No prior notice given.', pinned: false }
      ],
      attachments: []
    }
  ];

  private studentsSubject = new BehaviorSubject<Student[]>(this.students);

  getStudents(): Observable<Student[]> {
    return this.studentsSubject.asObservable();
  }

  getStudentById(id: string): Observable<Student | undefined> {
    return of(this.students.find(s => s.id === id));
  }

  addStudent(student: Partial<Student>): void {
    const newStudent: Student = {
      id: (this.students.length + 1).toString(),
      firstName: student.firstName || '',
      lastName: student.lastName || '',
      email: student.email || '',
      phone: student.phone || '',
      dateOfBirth: student.dateOfBirth || '',
      gender: student.gender || 'other',
      address: student.address || '',
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'active',
      portalEnabled: student.portalEnabled || false,
      grade: student.grade || '',
      parent: student.parent,
      subjects: [],
      sessions: [],
      payments: [],
      notes: [],
      attachments: []
    };
    this.students = [...this.students, newStudent];
    this.studentsSubject.next(this.students);
  }

  updateStudent(id: string, updates: Partial<Student>): void {
    this.students = this.students.map(s =>
      s.id === id ? { ...s, ...updates } : s
    );
    this.studentsSubject.next(this.students);
  }

  deleteStudent(id: string): void {
    this.students = this.students.filter(s => s.id !== id);
    this.studentsSubject.next(this.students);
  }

  togglePortal(id: string): void {
    this.students = this.students.map(s =>
      s.id === id ? { ...s, portalEnabled: !s.portalEnabled } : s
    );
    this.studentsSubject.next(this.students);
  }

  addNote(studentId: string, content: string, author: string, authorRole: string): void {
    this.students = this.students.map(s => {
      if (s.id === studentId) {
        const newNote = {
          id: 'n' + Date.now(),
          date: new Date().toISOString().split('T')[0],
          author,
          authorRole,
          content,
          pinned: false
        };
        return { ...s, notes: [newNote, ...s.notes] };
      }
      return s;
    });
    this.studentsSubject.next(this.students);
  }

  toggleNotePin(studentId: string, noteId: string): void {
    this.students = this.students.map(s => {
      if (s.id === studentId) {
        const notes = s.notes.map(n =>
          n.id === noteId ? { ...n, pinned: !n.pinned } : n
        );
        return { ...s, notes };
      }
      return s;
    });
    this.studentsSubject.next(this.students);
  }
}
