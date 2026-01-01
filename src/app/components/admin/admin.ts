import { Component, OnInit } from '@angular/core';
import { Create } from '../../service/lesson/create';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit{
    allUserHistory: any[] = [];

    constructor(private promptService: Create) {}

     ngOnInit() {
  this.promptService.getAllUsersWithHistory().subscribe({
    next: (res: any) => {
      console.log('המידע שהתקבל מהשרת:', res);
      this.allUserHistory = res.data ; 
      
    },
    error: (err) => {
      console.error('שגיאה בטעינת נתונים:', err);
    }
  });
}
}


