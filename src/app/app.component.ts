import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'formularioSimple';

  documentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.documentForm = this.fb.group({
      primerApellido: ['', Validators.required],
      primerNombre: ['', Validators.required]
    });
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const formControlName = input.getAttribute('formControlName');
    console.log(`${formControlName}:`, input.value);
  }

  downloadJson(data: any, filename: string): void {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  onSubmit(): void {
    if (this.documentForm.valid) {
      const formData = this.documentForm.value;
      this.downloadJson(formData, 'form-data.json');
    } else {
      console.error('Formulario inválido');
    }
  }
}
