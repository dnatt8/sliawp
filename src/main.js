import * as THREE from 'three';
import './style.css';
import { laberintoMapa, tamanio_bloque } from './laberinto.js';


//escena, cam
const scene = new THREE.Scene();
scene.background= new THREE.color(0xff0000)
const camara = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

//inicio de cam
camara.position.set(1.5*tamanio_bloque, tamanio_bloque/2, 1.5*tamanio_bloque);
//renderizador
const renderer= new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

//geometrias y materials
const paredGeo= new THREE.BoxGeometry(tamanio_bloque,tamanio_bloque,tamanio_bloque);
const paredMat= new THREE.MeshBasicMAterial({color: 0x8b0000});

laberintoMapa.forEach((fila,z) => {
   fila.forEach((val,x) => {
      if (val==1){
        const pared= new THREE.Mesh(paredGeo,paredMat);
        pared.position.set(x*tamanio_bloque,tamanio_bloque/2,z*tamanio_bloque);
        scene.add(pared);
      }
   });

});
