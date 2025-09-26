<template>
  <backBtn></backBtn>

  <div>3D1</div>
  <div id="webgl" style="margin-top: 200px; margin-left: 100px"></div>
</template>

<script setup>
// 引入three.js
import * as THREE from "three";
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import backBtn from '../commponent/backBtn.vue'
import { ref, onMounted } from "vue";

onMounted(() => {
  create3D1();
});

const create3D1 = () => {
  // 创建3D场景对象Scene
  const scene = new THREE.Scene();

  //创建一个长方体几何对象Geometry
  const geometry = new THREE.BoxGeometry(100, 100, 100);

  //创建一个材质对象Material
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000, //0xff0000设置材质颜色为红色
  });

  // 两个参数分别为几何体geometry、材质material
  const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh

  //设置网格模型在三维空间中的位置坐标，默认是坐标原点
  mesh.position.set(0, 0, 0);

  const axesHelper = new THREE.AxesHelper(150);
  scene.add(axesHelper);
  scene.add(mesh);

  // 定义相机输出画布的尺寸(单位:像素px)
  const width = 800; //宽度
  const height = 500; //高度
  // 实例化一个透视投影相机对象
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);

  //相机在Three.js三维坐标系中的位置
  // 根据需要设置相机位置具体值
  camera.position.set(200, 200, 200);
  camera.lookAt(mesh.position); //指向mesh对应的位置

  // 创建渲染器对象
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
  //   renderer.render(scene, camera); //执行渲染操作
  document.getElementById("webgl").appendChild(renderer.domElement);
  const clock = new THREE.Clock();
  // 渲染函数
  function render() {
    const spt = clock.getDelta() * 1000; //毫秒
    // console.log("两帧渲染时间间隔(毫秒)", spt);
    // console.log("帧率FPS", 1000 / spt);
    renderer.render(scene, camera); //执行渲染操作
    mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
    requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  }
  render();
  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener("change", function () {
    renderer.render(scene, camera); //执行渲染操作
  }); //监听鼠标、键盘事件
};
</script>

<style scoped>
</style>