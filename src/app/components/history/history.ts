import { Component, OnInit } from "@angular/core";
import { Create } from "../../service/lesson/create";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './history.html',
  styleUrls: ['./history.css']
})
// history.component.ts
export class HistoryComponent implements OnInit {
  userHistory: any[] = [];

  constructor(private promptService: Create) {}

  ngOnInit() {
    this.promptService.getUsersHistory().subscribe({
      next: (res) => {
      console.log('--- תשובה גולמית מהשרת ---', res); // כאן נראה הכל
  
  // בדיקה חכמה: אם יש res.data נשתמש בו, אם לא ננסה את res עצמו
      if (res && res.data) {
        this.userHistory = res.data;
      } else if (Array.isArray(res)) {
        this.userHistory = res; // אולי השרת מחזיר ישר מערך?
      } else {
        this.userHistory = res.prompts || []; // אולי זה תחת שם אחר?
      }
  },
  });
  }
}