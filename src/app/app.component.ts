import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  width = window.innerWidth;
  height = window.innerHeight;
  title = 'threejs';

  ngOnInit(): void {
    const camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );
    camera.position.z = 60;

    const scene = new THREE.Scene();

    const geometry = new THREE.TorusGeometry(10, 3, 100, 16);
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(this.width, this.height);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);    

    const loader = new THREE.ImageLoader();
    loader.load(
      '../assets/Angular.png',
      (image) => {
        console.log(image)
      },
      undefined,
      () => console.error('Error')
    );
    // animation

    function animation(time: number) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render(scene, camera);
    }
  }
}
