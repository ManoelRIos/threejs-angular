import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';
import { ShadowComponent } from './components/shadow/shadow.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShadowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {  
  title = 'threejs';
}
