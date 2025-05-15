import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "open",
        loadComponent: () => import('./page/open-projects/open-projects.component').then(m => m.OpenProjectsComponent)
    },
    {
        path: "landing",
        loadComponent: () => import('./page/landing/landing.component').then(m => m.LandingComponent)
    },
    {
        path: "**",
        redirectTo: "landing",
        pathMatch: 'full'
    }
];
