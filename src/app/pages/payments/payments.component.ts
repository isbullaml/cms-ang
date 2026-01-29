import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.component.html',
})
export class PaymentsComponent {
  payments = [
    { id: '1', student: 'Emma Thompson', description: 'January Tuition - Mathematics', amount: 250, date: '2025-01-01', status: 'paid', method: 'Credit Card' },
    { id: '2', student: 'Emma Thompson', description: 'January Tuition - Physics', amount: 200, date: '2025-01-01', status: 'paid', method: 'Bank Transfer' },
    { id: '3', student: 'Emma Thompson', description: 'January Tuition - English', amount: 180, date: '2025-01-01', status: 'pending', method: '' },
    { id: '4', student: 'Liam Garcia', description: 'January Tuition - Chemistry', amount: 280, date: '2025-01-01', status: 'paid', method: 'Credit Card' },
    { id: '5', student: 'Liam Garcia', description: 'January Tuition - Calculus', amount: 250, date: '2025-01-01', status: 'overdue', method: '' },
    { id: '6', student: 'Sophia Patel', description: 'Registration Fee', amount: 100, date: '2025-01-10', status: 'paid', method: 'Cash' },
    { id: '7', student: 'Sophia Patel', description: 'January Tuition - Mathematics (Prorated)', amount: 175, date: '2025-01-10', status: 'pending', method: '' },
    { id: '8', student: 'Olivia Kim', description: 'January Tuition - Piano', amount: 300, date: '2025-01-01', status: 'paid', method: 'Credit Card' },
    { id: '9', student: 'Olivia Kim', description: 'January Tuition - Mathematics', amount: 250, date: '2025-01-01', status: 'paid', method: 'Credit Card' },
    { id: '10', student: 'Ethan Brown', description: 'January Tuition - SAT Prep', amount: 400, date: '2025-01-01', status: 'overdue', method: '' },
    { id: '11', student: 'Ethan Brown', description: 'December Tuition - SAT Prep', amount: 400, date: '2024-12-01', status: 'overdue', method: '' },
  ];

  getStatusClasses(status: string): string {
    switch (status) {
      case 'paid': return 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400';
      case 'pending': return 'bg-warning-50 text-warning-700 dark:bg-warning-500/10 dark:text-warning-400';
      case 'overdue': return 'bg-error-50 text-error-700 dark:bg-error-500/10 dark:text-error-400';
      case 'refunded': return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
      default: return '';
    }
  }

  get totalRevenue(): number {
    return this.payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  }

  get totalPending(): number {
    return this.payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  }

  get totalOverdue(): number {
    return this.payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);
  }
}
