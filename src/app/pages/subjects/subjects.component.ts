import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subjects.component.html',
})
export class SubjectsComponent {
  subjects = [
    { id: '1', name: 'Mathematics', tutors: 2, students: 4, icon: 'pi-calculator', color: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400' },
    { id: '2', name: 'Physics', tutors: 1, students: 1, icon: 'pi-bolt', color: 'bg-warning-50 text-warning-600 dark:bg-warning-500/10 dark:text-warning-400' },
    { id: '3', name: 'Chemistry', tutors: 1, students: 1, icon: 'pi-sitemap', color: 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-400' },
    { id: '4', name: 'English Literature', tutors: 1, students: 1, icon: 'pi-book', color: 'bg-error-50 text-error-600 dark:bg-error-500/10 dark:text-error-400' },
    { id: '5', name: 'Calculus', tutors: 1, students: 1, icon: 'pi-percentage', color: 'bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/10 dark:text-blue-light-400' },
    { id: '6', name: 'Biology', tutors: 1, students: 1, icon: 'pi-heart', color: 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-400' },
    { id: '7', name: 'Spanish', tutors: 1, students: 1, icon: 'pi-comments', color: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400' },
    { id: '8', name: 'Piano', tutors: 1, students: 1, icon: 'pi-volume-up', color: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400' },
    { id: '9', name: 'Art & Design', tutors: 1, students: 1, icon: 'pi-palette', color: 'bg-warning-50 text-warning-600 dark:bg-warning-500/10 dark:text-warning-400' },
    { id: '10', name: 'SAT Prep', tutors: 1, students: 1, icon: 'pi-file-edit', color: 'bg-error-50 text-error-600 dark:bg-error-500/10 dark:text-error-400' },
  ];
}
