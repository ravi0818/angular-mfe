import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectName } from 'common';

interface ProjectCard {
  title: string;
  description: string;
  technologies: string[];
  progress: number;
}

@Component({
  selector: 'app-home',
  imports: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  store = inject(Store);
  username!: string;
  currentTime: Date = new Date();

  constructor() {
    this.store.select(selectName).subscribe((name: string) => {
      this.username = name;
    });
  }

  projects: ProjectCard[] = [
    {
      title: 'MFE Host App',
      description:
        'A modern MFE (Micro Frontend) architecture built with Angular',
      technologies: [
        'Angular',
        'Typescript',
        'Material UI',
        'Tailwind',
        'NgRx',
        'JWT',
      ],
      progress: 90,
    },
    {
      title: 'Todo App',
      description: 'A simple todo app built with Angular and  Node.js',
      technologies: [
        'Angular',
        'Typescript',
        'Material UI',
        'Tailwind',
        'NgRx',
        'Node.js',
        'Express',
        'MongoDB',
      ],
      progress: 95,
    },
    {
      title: 'Shopping App',
      description: 'A simple shopping app built with Angular and NgRx store',
      technologies: [
        'Angular',
        'Typescript',
        'Material UI',
        'Tailwind',
        'NgRx',
      ],
      progress: 80,
    },
  ];

  stats = [
    { label: 'Projects Completed', value: '3' },
    { label: 'GitHub Commits', value: '35+' },
    { label: 'Technologies', value: '4+' },
    { label: 'Features', value: '10+' },
  ];

  ngOnInit() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 60000);
  }

  getGreeting(): string {
    const hour = this.currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }
}
