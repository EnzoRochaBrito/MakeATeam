import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "**",
        redirectTo: "open"
    },
    {
        path: "open",
        loadComponent: () => import('./page/open-projects/open-projects.component').then(m => m.OpenProjectsComponent)
    }
];
