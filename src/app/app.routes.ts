import { Routes } from '@angular/router';
import { EcommerceComponent } from './pages/dashboard/ecommerce/ecommerce.component';
import { NotFoundComponent } from './pages/other-page/not-found/not-found.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { SignInComponent } from './pages/auth-pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth-pages/sign-up/sign-up.component';
import { StudentListComponent } from './pages/students/student-list/student-list.component';
import { StudentDetailComponent } from './pages/students/student-detail/student-detail.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: EcommerceComponent,
        pathMatch: 'full',
        title: 'Dashboard | Tutor Management System',
      },
      {
        path: 'students',
        component: StudentListComponent,
        title: 'Students | Tutor Management System',
      },
      {
        path: 'students/:id',
        component: StudentDetailComponent,
        title: 'Student Details | Tutor Management System',
      },
      {
        path: 'subjects',
        component: SubjectsComponent,
        title: 'Subjects | Tutor Management System',
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        title: 'Payments | Tutor Management System',
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'Settings | Tutor Management System',
      },
    ],
  },
  {
    path: 'signin',
    component: SignInComponent,
    title: 'Sign In | Tutor Management System',
  },
  {
    path: 'signup',
    component: SignUpComponent,
    title: 'Sign Up | Tutor Management System',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found | Tutor Management System',
  },
];
