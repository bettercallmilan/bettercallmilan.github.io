import { Routes } from '@angular/router';
import { ArticleComponent } from './blog/article.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Milan Jankovic - Developer' },
  { path: 'blog', component: BlogComponent, title: 'Blog - Milan Jankovic' },
  { path: 'blog/3d-printer', component: ArticleComponent, title: 'Learning by making - Milan Jankovic' },
  // The note used to live at the top level; keep old links working.
  { path: '3d-printer', redirectTo: 'blog/3d-printer' },
  { path: '**', redirectTo: '' },
];
