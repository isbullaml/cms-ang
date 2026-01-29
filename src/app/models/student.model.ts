export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  relationship: 'father' | 'mother' | 'guardian' | 'other';
}

export interface StudentSubject {
  id: string;
  name: string;
  tutorName: string;
  schedule: string;
  progress: number; // 0-100
  status: 'active' | 'paused' | 'completed';
}

export interface StudentSession {
  id: string;
  subjectName: string;
  tutorName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
}

export interface StudentPayment {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'refunded';
  method?: string;
}

export interface StudentNote {
  id: string;
  date: string;
  author: string;
  authorRole: string;
  content: string;
  pinned: boolean;
}

export interface StudentAttachment {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  category: 'document' | 'report' | 'certificate' | 'other';
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'suspended';
  portalEnabled: boolean;
  avatarUrl?: string;
  grade?: string;
  parent?: Parent;
  subjects: StudentSubject[];
  sessions: StudentSession[];
  payments: StudentPayment[];
  notes: StudentNote[];
  attachments: StudentAttachment[];
}
