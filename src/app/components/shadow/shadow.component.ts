import { Component } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-shadow',
  standalone: true,
  imports: [],
  templateUrl: './shadow.component.html',
  styleUrl: './shadow.component.css',
})
export class ShadowComponent {
  width = window.innerWidth;
  height = window.innerHeight;
  ngOnInit(): void {
    const camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      1,
      1000
    );

    const scene = new THREE.Scene();
    camera.position.set(15, 10, 15);

    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(gridHelper);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(this.width, this.height);
    // Shadow
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 0); //default; light shining from top
    light.castShadow = true; // default false
    scene.add(light);

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default

    const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial();
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true; //default is false
    sphere.receiveShadow = false; //default
    sphere.position.set(0, 5, 0);
    // scene.add(sphere);

    const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);

    const helper = new THREE.CameraHelper(light.shadow.camera);
    scene.add(helper);

    const controls = new OrbitControls(camera, document.body);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    const rgbeLoader = new RGBELoader();

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    rgbeLoader.load('../../../assets/spruit_sunrise_1k.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

    loader.load('../../../assets/model.gltf', (gltf) => {
      const mesh = gltf.scene;

      mesh.traverse(child => {
        child.castShadow = true;
        child.receiveShadow = true;
      });
      mesh.position.set(0, 5, 0);
      mesh.scale.set(3, 3, 3);
      scene.add(mesh);
    });

    function animation(time: number) {
      renderer.render(scene, camera);
    }
  }
}

/* Tipo de material: O MeshBasicMaterial padrão não recebe sombras.
 Você precisará usar um material como MeshStandardMaterial ou 
 MeshPhongMaterial que suporta sombras. */

/*  Para adicionar sombra em mesh GLTFLoader: 
 mesh.traverse(child => {
   child.castShadow = true;
   child.receiveShadow = true;
 }); */