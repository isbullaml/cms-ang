import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from '../../../shared/services/student.service';
import { Student } from '../../../models/student.model';
import { StudentFormComponent } from '../student-form/student-form.component';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, StudentFormComponent],
  templateUrl: './student-detail.component.html',
})
export class StudentDetailComponent implements OnInit, OnDestroy {
  student: Student | null = null;
  activeTab: 'details' | 'sessions' | 'payment' | 'notes' | 'attachments' = 'details';
  showEditDialog = false;
  newNoteContent = '';

  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subscription.add(
        this.studentService.getStudentById(id).subscribe(student => {
          if (student) {
            this.student = student;
          } else {
            this.router.navigate(['/students']);
          }
        })
      );
      // Also subscribe to changes
      this.subscription.add(
        this.studentService.getStudents().subscribe(students => {
          const updated = students.find(s => s.id === id);
          if (updated) {
            this.student = updated;
          }
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goBack() {
    this.router.navigate(['/students']);
  }

  openEditDialog() {
    this.showEditDialog = true;
  }

  onEditClose() {
    this.showEditDialog = false;
  }

  onEditSave(data: Partial<Student>) {
    if (this.student) {
      this.studentService.updateStudent(this.student.id, data);
    }
    this.showEditDialog = false;
  }

  togglePortal() {
    if (this.student) {
      this.studentService.togglePortal(this.student.id);
    }
  }

  addNote() {
    if (this.student && this.newNoteContent.trim()) {
      this.studentService.addNote(this.student.id, this.newNoteContent.trim(), 'Admin', 'Admin');
      this.newNoteContent = '';
    }
  }

  toggleNotePin(noteId: string) {
    if (this.student) {
      this.studentService.toggleNotePin(this.student.id, noteId);
    }
  }

  getStatusClasses(status: string): string {
    switch (status) {
      case 'active': return 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400';
      case 'inactive': return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
      case 'suspended': return 'bg-error-50 text-error-700 dark:bg-error-500/10 dark:text-error-400';
      default: return '';
    }
  }

  getSessionStatusClasses(status: string): string {
    switch (status) {
      case 'completed': return 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400';
      case 'scheduled': return 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400';
      case 'cancelled': return 'bg-error-50 text-error-700 dark:bg-error-500/10 dark:text-error-400';
      case 'no-show': return 'bg-warning-50 text-warning-700 dark:bg-warning-500/10 dark:text-warning-400';
      default: return '';
    }
  }

  getPaymentStatusClasses(status: string): string {
    switch (status) {
      case 'paid': return 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400';
      case 'pending': return 'bg-warning-50 text-warning-700 dark:bg-warning-500/10 dark:text-warning-400';
      case 'overdue': return 'bg-error-50 text-error-700 dark:bg-error-500/10 dark:text-error-400';
      case 'refunded': return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
      default: return '';
    }
  }

  getSubjectStatusClasses(status: string): string {
    switch (status) {
      case 'active': return 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400';
      case 'paused': return 'bg-warning-50 text-warning-700 dark:bg-warning-500/10 dark:text-warning-400';
      case 'completed': return 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400';
      default: return '';
    }
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return 'bg-success-500';
    if (progress >= 50) return 'bg-brand-500';
    if (progress >= 25) return 'bg-warning-500';
    return 'bg-error-500';
  }

  getFileIcon(type: string): string {
    if (type.includes('pdf')) return 'pi-file-pdf';
    if (type.includes('doc')) return 'pi-file-word';
    if (type.includes('image') || type.includes('png') || type.includes('jpg')) return 'pi-image';
    if (type.includes('video')) return 'pi-video';
    return 'pi-file';
  }

  getFileIconColor(type: string): string {
    if (type.includes('pdf')) return 'text-error-500';
    if (type.includes('doc')) return 'text-brand-500';
    if (type.includes('image') || type.includes('png') || type.includes('jpg')) return 'text-success-500';
    if (type.includes('video')) return 'text-warning-500';
    return 'text-gray-500';
  }

  getCategoryBadgeClasses(category: string): string {
    switch (category) {
      case 'report': return 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400';
      case 'document': return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
      case 'certificate': return 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-400';
      default: return 'bg-warning-50 text-warning-600 dark:bg-warning-500/10 dark:text-warning-400';
    }
  }

  getInitials(): string {
    if (!this.student) return '';
    return (this.student.firstName[0] + this.student.lastName[0]).toUpperCase();
  }

  get totalPaid(): number {
    if (!this.student) return 0;
    return this.student.payments
      .filter(p => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0);
  }

  get totalPending(): number {
    if (!this.student) return 0;
    return this.student.payments
      .filter(p => p.status === 'pending' || p.status === 'overdue')
      .reduce((sum, p) => sum + p.amount, 0);
  }

  get sortedNotes() {
    if (!this.student) return [];
    return [...this.student.notes].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }
}
