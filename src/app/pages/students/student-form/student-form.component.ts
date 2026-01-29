import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-form.component.html',
})
export class StudentFormComponent implements OnInit {
  @Input() student: Student | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Partial<Student>>();

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male' as 'male' | 'female' | 'other',
    address: '',
    grade: '',
    portalEnabled: false,
    hasParent: false,
    parentFirstName: '',
    parentLastName: '',
    parentEmail: '',
    parentPhone: '',
    parentRelationship: 'father' as 'father' | 'mother' | 'guardian' | 'other',
  };

  activeTab: 'student' | 'parent' = 'student';

  ngOnInit() {
    if (this.student) {
      this.formData.firstName = this.student.firstName;
      this.formData.lastName = this.student.lastName;
      this.formData.email = this.student.email;
      this.formData.phone = this.student.phone;
      this.formData.dateOfBirth = this.student.dateOfBirth;
      this.formData.gender = this.student.gender;
      this.formData.address = this.student.address;
      this.formData.grade = this.student.grade || '';
      this.formData.portalEnabled = this.student.portalEnabled;

      if (this.student.parent) {
        this.formData.hasParent = true;
        this.formData.parentFirstName = this.student.parent.firstName;
        this.formData.parentLastName = this.student.parent.lastName;
        this.formData.parentEmail = this.student.parent.email;
        this.formData.parentPhone = this.student.parent.phone;
        this.formData.parentRelationship = this.student.parent.relationship;
      }
    }
  }

  onSave() {
    const data: Partial<Student> = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      email: this.formData.email,
      phone: this.formData.phone,
      dateOfBirth: this.formData.dateOfBirth,
      gender: this.formData.gender,
      address: this.formData.address,
      grade: this.formData.grade,
      portalEnabled: this.formData.portalEnabled,
    };

    if (this.formData.hasParent) {
      data.parent = {
        id: this.student?.parent?.id || 'p' + Date.now(),
        firstName: this.formData.parentFirstName,
        lastName: this.formData.parentLastName,
        email: this.formData.parentEmail,
        phone: this.formData.parentPhone,
        relationship: this.formData.parentRelationship,
      };
    }

    this.save.emit(data);
  }

  onClose() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('dialog-backdrop')) {
      this.onClose();
    }
  }
}
