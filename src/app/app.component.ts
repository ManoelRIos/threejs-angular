import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { LearningComponent } from './components/learning/learning.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LearningComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  width = window.innerWidth;
  height = window.innerHeight;
  title = 'threejs';

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

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    const lightHelper = new THREE.PointLightHelper(pointLight);
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(lightHelper, gridHelper);

    //Adiciona controle de camera
    const controls = new OrbitControls(camera, document.body);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(this.width, this.height);
    renderer.setAnimationLoop(animation);
    // document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    const loader = new GLTFLoader();
    loader.load('../assets/magic_laboratory.glb', (gltf) => {
      console.log(gltf);
      const mesh = gltf.scene;    
      const mixer= new THREE.AnimationMixer(gltf.scene);
      mesh.animations.forEach((clip) => {mixer.clipAction(clip).play(); });
      mesh.position.set(0, 0, 0);           
      scene.add(mesh);

   
      // renderer.render(gltf.scene, camera);
    });
    function animation(time: number) {
      renderer.render(scene, camera);
    }
  }
}
