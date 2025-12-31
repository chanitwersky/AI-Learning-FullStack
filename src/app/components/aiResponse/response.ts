import { Component, OnInit } from '@angular/core';
import { Create } from '../../service/lesson/create'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ai-res',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './response.html',
  styleUrls: ['./response.css']
})
export class AiResComponent implements OnInit {
  answer: string = '';
  isLoading: boolean = true;

  constructor(private createService: Create,private router: Router) {
    
   }

  ngOnInit(): void {
    this.createService.getResponse().subscribe({
      next: (res: any) => {
      console.log('מה הגיע מהשרת?', res);
      
      if (res && res.data) {
        this.answer = res.data; 
      } else {
        this.answer = res; 
      }
      this.isLoading = false;
      },
      error: (err) => {
        console.error('שגיאה בשליפת התשובה', err);
        this.isLoading = false;
      }
    });
  }

      createNewLesson() {
        this.router.navigate(['/createLesson']); 
    }
}