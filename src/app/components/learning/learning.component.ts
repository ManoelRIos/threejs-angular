import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [],
  templateUrl: './learning.component.html',
  styleUrl: './learning.component.css',
})
export class LearningComponent {
  width = window.innerWidth;
  height = window.innerHeight;
  ngOnInit(): void {
    const camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      1,
      1000
    );
    camera.position.set(4, 5, 11);
    camera.lookAt(0, 0, 0);
    const scene = new THREE.Scene();

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshNormalMaterial();
    const torus = new THREE.Mesh(geometry, material);
    torus.position.y = 13;

    scene.add(torus);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    const lightHelper = new THREE.PointLightHelper(pointLight);
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(lightHelper, gridHelper);

    const controls = new OrbitControls(camera, document.body);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(this.width, this.height);
    renderer.setAnimationLoop(animation);
    document.getElementById('teste')?.appendChild(renderer.domElement);

    /*     const loader = new GLTFLoader();
    loader.load('../assets/penguin.gltf', (gltf) => {
      console.log(gltf);
      const mesh = gltf.scene;
      mesh.position.set(0, 1.05, -1)      
      scene.add(mesh);
      renderer.render(gltf.scenes[0], camera);
    }); */

    function addStars() {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);
      const [x, y, z] = Array(3)
        .fill(1)
        .map(() => THREE.MathUtils.randFloatSpread(100));
      star.position.set(x, y, z);
      scene.add(star);
    }

    Array(300).fill(1).forEach(addStars);
    const spaceTexture = new THREE.TextureLoader().load('../assets/space.jpg');
    // scene.background = spaceTexture;    

    const moonTexture = new THREE.TextureLoader().load('../assets/moon.jpg');
    const moon3dTexture = new THREE.TextureLoader().load('../assets/texture-moon.jpg')
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: moon3dTexture
      })
    );
    scene.add(moon);

    // animation
    function animation(time: number) {
      moon.rotation.x += 0.0001;
      moon.rotation.y += 0.0005;
      moon.rotation.z += 0.001;

      renderer.render(scene, camera);
    }
  }
}
