import * as THREE from 'three';
import './style.css';
import { laberintoMapa, tamanio_bloque } from './laberinto.js';


//escena, cam
const scene = new THREE.Scene();
scene.background= new THREE.Color(0xe7f6ff);
const camara = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

//inicio de cam
camara.position.set(1*tamanio_bloque, tamanio_bloque/2, 1.5*tamanio_bloque);
camara.rotation.y= Math.PI;
//renderizador
const renderer= new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

//light
const light= new THREE.PointLight(0xffffff, 2,15);
camara.add(light);
scene.add(camara);

//geometrias y materials
const paredGeo= new THREE.BoxGeometry(tamanio_bloque,tamanio_bloque,tamanio_bloque);
const paredMat= new THREE.MeshBasicMaterial({color: 0x8b0000});

laberintoMapa.forEach((fila,z) => {
   fila.forEach((val,x) => {
      if (val==1){
        const pared= new THREE.Mesh(paredGeo,paredMat);
        pared.position.set(x*tamanio_bloque,tamanio_bloque/2,z*tamanio_bloque);
        scene.add(pared);
      }
   });

});

//nav automatica
let velocidad= 0.015;
let rotacionObjetivo=camara.rotation.y;
let girando= false;

function animate() {
    requestAnimationFrame(animate);

    if (!girando) {
        camara.translateZ(-velocidad);
        const dir= new THREE.Vector3();
        camara.getWorldDirection(dir);
        //proyectamos un punto hacia el frente
        const frontPointX= camara.position.x + dir.x * (tamanio_bloque*0.6);
        const frontPointZ= camara.position.z + dir.z * (tamanio_bloque*0.6);
        //pasarlo pto a coord matriz laberinto
        const frenteX= Math.floor(frontPointX/tamanio_bloque);
        const frenteZ= Math.floor(frontPointZ/tamanio_bloque);

        if (laberintoMapa[frenteZ] && laberintoMapa[frenteZ][frenteX] == 1){ //si tiene pared, giro
            girando= true;
            const sentido= (Math.random() < 0.5 ? -1 : 1) * (Math.PI / 2); //giro random d 90 grados
            rotacionObjetivo= camara.rotation.y + sentido*(Math.PI/2);
        }
    } else {
        const diffAngulo= rotacionObjetivo - camara.rotation.y;
        //giro smooth
        if (Math.abs(diffAngulo)<0.05){
            camara.rotation.y= rotacionObjetivo;
            girando=false;
        } else {
            camara.rotation.y+= Math.sign(diffAngulo)*0.015;
        }
    }
    renderer.render(scene,camara);
}

animate();

