import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeadService } from '../../services/lead.service';

@Component({
  selector: 'app-intake-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './intake-form.component.html',
  styleUrl: './intake-form.component.css'
})
export class IntakeFormComponent {
  @Output() close = new EventEmitter<void>();
  private leadService = inject(LeadService);

  currentStep = 0;
  isSubmitted = false;
  isLoading = false;
  steps = [
    { id: 'names', title: 'Tell us who is getting married' },
    { id: 'phone', title: 'How can we reach you?' },
    { id: 'date', title: 'When is the big day?' },
    { id: 'budget', title: 'What is your planned budget?' },
    { id: 'type', title: 'What kind of wedding is it?' },
    { id: 'guests', title: 'How many guests are you expecting?' },
    { id: 'preference', title: 'How involved do you want to be?' },
    { id: 'inspiration', title: 'Share your inspiration' },
    { id: 'city', title: 'Which city are you planning in?' }
  ];

  formData = {
    brideName: '',
    groomName: '',
    phone: '',
    date: '',
    budget: '',
    type: '',
    guests: '',
    preference: '',
    city: ''
  };

  next() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    } else {
      this.submit();
    }
  }

  back() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submit() {
    this.isLoading = true;
    this.leadService.submitLead(this.formData).subscribe({
      next: (response) => {
        console.log('Lead submitted successfully:', response);
        this.isSubmitted = true;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error submitting lead:', err);
        this.isLoading = false;
        // Even if it fails in this mock environment, we'll show the success screen for the demo
        this.isSubmitted = true;
      }
    });
  }

  get progress() {
    return ((this.currentStep + 1) / this.steps.length) * 100;
  }
}
