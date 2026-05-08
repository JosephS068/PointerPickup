import { Routes } from '@angular/router';
import { Map } from './pages/map/map';
import { Volunteering } from './pages/volunteering/volunteering';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';

export const routes: Routes = [
  { path: 'map', component: Map },
  { path: 'volunteering', component: Volunteering },
  { path: '', component: Home },
  { path: 'about', component: About }
];
