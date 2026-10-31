import { Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Milan Jankovic - Developer' },
  { path: 'blog', component: BlogComponent, title: 'Blog - Milan Jankovic' },
  { path: '3d-printer', component: ArticleComponent, title: 'Learning by making - Milan Jankovic' },
  { path: '**', redirectTo: '' },
];
