import { Component } from '@angular/core';

@Component({
  selector: 'app-entreprise',
  standalone: true,
  imports: [],
  templateUrl: './entreprise.component.html',
  styleUrl: './entreprise.component.css'
})
export class EntrepriseComponent {
  constructor() { }
  comments: any[] = [
    { username: "user1", content: "This is the first comment." },
    { username: "user2", content: "Nice work on this!" },
    { username: "user3", content: "I have a question about the topic." },
    { username: "user4", content: "Great explanation!" },
    { username: "user5", content: "Thanks for sharing." }
  ];

}
