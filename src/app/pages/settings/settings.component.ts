import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  settings = {
    institutionName: 'Bright Minds Tutoring',
    email: 'admin@brightminds.edu',
    phone: '+1 (555) 000-1234',
    timezone: 'America/New_York',
    currency: 'USD',
    sessionDuration: 60,
    enablePortalByDefault: false,
    emailNotifications: true,
    smsNotifications: false,
    autoReminders: true,
    reminderHours: 24,
  };

  activeSection: 'general' | 'notifications' | 'roles' = 'general';

  roles = [
    { name: 'Admin', description: 'Full access to all features and settings', users: 2, color: 'bg-error-50 text-error-600 dark:bg-error-500/10 dark:text-error-400' },
    { name: 'Tutor', description: 'Manage own students, sessions, and content', users: 5, color: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400' },
    { name: 'Student', description: 'View schedules, materials, and own progress', users: 6, color: 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-400' },
    { name: 'Parent', description: 'View child progress, payments, and communicate', users: 5, color: 'bg-warning-50 text-warning-600 dark:bg-warning-500/10 dark:text-warning-400' },
  ];
}
