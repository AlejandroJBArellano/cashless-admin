import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: {title: string; url: string; icon: string;}[] = [
    { title: 'Productos', url: '/item', icon: 'fast-food' },
    { title: 'Órdenes', url: '/orders', icon: 'ticket' },
    { title: 'Perfiles', url: '/profile', icon: 'restaurant' },
    { title: 'Usuarios', url: '/user', icon: 'person' },
    { title: 'Cortes de Caja', url: '/corte', icon: 'stats-chart' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
