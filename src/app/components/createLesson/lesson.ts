import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { Create } from '../../service/lesson/create'; // וודאי שהקובץ הזה קיים בנתיב הזה
import { Router } from '@angular/router';
import { AuthService } from '../../service/user/auth.service';

@Component({
  selector: 'app-lesson',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lesson.html',
  styleUrl: './lesson.css',
})
export class CreateLessonComponent implements OnInit {
  loginForm: FormGroup;
  categories: any[] = [];
  subCategories: any[] = [];
  userId: any;

  constructor(
    private fb: FormBuilder,
    private createService: Create, 
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      categoryId: ['', Validators.required],
      subCategoryId: ['', Validators.required],
      additionalText: ['', Validators.required]
    });
  }

  ngOnInit() {
    const user = this.authService.getUserData();
    
    // בדיקה שהמשתמש קיים לפני שניגשים ל-ID שלו
    if (user) {
      this.userId = user.id ; 
      console.log('המזהה של המשתמש המחובר:', this.userId);
    } else {
      console.warn('לא נמצא משתמש מחובר');
    }

    this.createService.showCategories({}).subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log('הנתונים שהגיעו מהשרת:', data);
      },
      error: (err: any) => console.error('שגיאה בטעינת קטגוריות', err)
    });
  }

  onCategoryChange() {
    const selectedId = this.loginForm.get('categoryId')?.value;
    const selectedCat = this.categories.find(c => c.id == selectedId);

    this.subCategories = selectedCat ? selectedCat.learningHistory : [];

    this.loginForm.patchValue({ subCategoryId: '' }); 
}

  


  sendPrompt() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      const categoryName = this.categories.find(c => c.id == formValues.categoryId)?.name;
      const subCategoryName = this.subCategories.find(s => s.id == formValues.subCategoryId)?.name;

      const dataToSend = {
        category: categoryName,
        subCategory: subCategoryName,
        promptText: formValues.additionalText
      };

      this.createService.sendPrompt(dataToSend).subscribe({
        next: (res: any) => {
          this.router.navigate(['/response']);
        },
        error: (err: any) => {
          alert('קרתה שגיאה ביצירת שיעור');
          console.error('שגיאה:', err);
        }
      });
    }
  }
}