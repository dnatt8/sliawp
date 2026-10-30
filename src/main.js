import * as THREE from 'three';
import './style.css';
import { laberintoMapa, tamanio_bloque } from './laberinto.js';


document.querySelector('#app').innerHTML = `
<h1> hola </h1>
`
const scene = new THREE.Scene();
scene.background= new THREE.color(0xff0000)
