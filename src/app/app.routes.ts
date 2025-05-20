import { Routes } from '@angular/router';
import { isLoggedGuard } from './guards/is-logged.guard';

export const routes: Routes = [
    {
        path: "landing",
        loadComponent: () => import('./page/landing/landing.component').then(m => m.LandingComponent)
    },
    {
        path: "register",
        loadComponent: () => import('./page/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: "login",
        loadComponent: () => import('./page/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: "open",
        loadComponent: () => import('./page/open-projects/open-projects.component').then(m => m.OpenProjectsComponent),
        canActivate: [isLoggedGuard]
    },
    {
        path: "create",
        loadComponent: () => import('./page/create-project/create-project.component').then(m => m.CreateProjectComponent),
        canActivate: [isLoggedGuard]
    },
    {
        path: "project/:uid",
        loadComponent: () => import('./page/project/project.component').then(m => m.ProjectComponent),
        canActivate: [isLoggedGuard]
    },
    {
        path: "user/:uid",
        loadComponent: () => import('./page/user/user.component').then(m => m.UserComponent),
        canActivate: [isLoggedGuard]
    },
    {
        path: "my-project",
        loadComponent: () => import('./page/my-project/my-project.component').then(m => m.MyProjectComponent),
        canActivate: [isLoggedGuard]
    },
    {
        path: "**",
        redirectTo: "landing",
        pathMatch: 'full'
    }
];
