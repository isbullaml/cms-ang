import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from '../../../shared/services/student.service';
import { Student } from '../../../models/student.model';
import { StudentFormComponent } from '../student-form/student-form.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, StudentFormComponent],
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit, OnDestroy {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchQuery = '';
  statusFilter = 'all';
  portalFilter = 'all';
  viewMode: 'grid' | 'list' = 'grid';
  showFormDialog = false;
  editingStudent: Student | null = null;

  private subscription = new Subscription();

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.studentService.getStudents().subscribe(students => {
        this.students = students;
        this.applyFilters();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilters() {
    let result = [...this.students];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(s =>
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        (s.grade && s.grade.toLowerCase().includes(q))
      );
    }

    if (this.statusFilter !== 'all') {
      result = result.filter(s => s.status === this.statusFilter);
    }

    if (this.portalFilter !== 'all') {
      const portalEnabled = this.portalFilter === 'enabled';
      result = result.filter(s => s.portalEnabled === portalEnabled);
    }

    this.filteredStudents = result;
  }

  onSearchChange() {
    this.applyFilters();
  }

  onStatusFilterChange() {
    this.applyFilters();
  }

  onPortalFilterChange() {
    this.applyFilters();
  }

  openAddDialog() {
    this.editingStudent = null;
    this.showFormDialog = true;
  }

  openEditDialog(student: Student, event: Event) {
    event.stopPropagation();
    this.editingStudent = student;
    this.showFormDialog = true;
  }

  onFormClose() {
    this.showFormDialog = false;
    this.editingStudent = null;
  }

  onFormSave(data: Partial<Student>) {
    if (this.editingStudent) {
      this.studentService.updateStudent(this.editingStudent.id, data);
    } else {
      this.studentService.addStudent(data);
    }
    this.showFormDialog = false;
    this.editingStudent = null;
  }

  navigateToStudent(student: Student) {
    this.router.navigate(['/students', student.id]);
  }

  togglePortal(student: Student, event: Event) {
    event.stopPropagation();
    this.studentService.togglePortal(student.id);
  }

  deleteStudent(student: Student, event: Event) {
    event.stopPropagation();
    this.studentService.deleteStudent(student.id);
  }

  getStatusClasses(status: string): string {
    switch (status) {
      case 'active': return 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400';
      case 'inactive': return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
      case 'suspended': return 'bg-error-50 text-error-700 dark:bg-error-500/10 dark:text-error-400';
      default: return '';
    }
  }

  getInitials(student: Student): string {
    return (student.firstName[0] + student.lastName[0]).toUpperCase();
  }

  getAvatarColor(student: Student): string {
    const colors = [
      'bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400',
      'bg-success-100 text-success-600 dark:bg-success-500/20 dark:text-success-400',
      'bg-warning-100 text-warning-600 dark:bg-warning-500/20 dark:text-warning-400',
      'bg-error-100 text-error-600 dark:bg-error-500/20 dark:text-error-400',
      'bg-blue-light-100 text-blue-light-600 dark:bg-blue-light-500/20 dark:text-blue-light-400',
    ];
    const index = parseInt(student.id) % colors.length;
    return colors[index];
  }

  get activeCount(): number {
    return this.students.filter(s => s.status === 'active').length;
  }

  get totalSubjects(): number {
    return this.students.reduce((sum, s) => sum + s.subjects.filter(sub => sub.status === 'active').length, 0);
  }

  get portalEnabledCount(): number {
    return this.students.filter(s => s.portalEnabled).length;
  }
}
