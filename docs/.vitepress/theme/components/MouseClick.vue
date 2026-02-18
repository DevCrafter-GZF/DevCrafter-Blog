<template>
  <canvas ref="canvas" style="position: fixed; left: 0; top: 0; pointer-events: none; z-index: 999999"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { animate, createTimeline, random } from "animejs";
const canvas = ref(null);

onMounted(() => {
  const canvasEl = canvas.value;
  const ctx = canvasEl.getContext("2d");
  let numberOfParticules = 20;
  let pointerX = 0;
  let pointerY = 0;
  const tap =
    "ontouchstart" in globalThis || navigator.msMaxTouchPoints
      ? "touchstart"
      : "mousedown";
  const colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];

  // 设置画布大小以适应窗口
  function setCanvasSize () {
    canvasEl.width = globalThis.innerWidth * 2;
    canvasEl.height = globalThis.innerHeight * 2;
    canvasEl.style.width = globalThis.innerWidth + "px";
    canvasEl.style.height = globalThis.innerHeight + "px";
    canvasEl.getContext("2d").scale(2, 2);
  }

  // 更新鼠标或触摸点的坐标
  function updateCoords (e) {
    pointerX = e.clientX || e.touches[0].clientX;
    pointerY = e.clientY || e.touches[0].clientY;
  }

  // 设置粒子的运动方向
  function setParticuleDirection (p) {
    const angle = (random(0, 360) * Math.PI) / 180;
    const value = random(20, 90);
    const radius = [-1, 1][random(0, 1)] * value;
    return {
      x: p.x + radius * Math.cos(angle),
      y: p.y + radius * Math.sin(angle),
    };
  }

  // 创建粒子对象
  function createParticule (x, y) {
    const p = {};
    p.x = x;
    p.y = y;
    p.color = colors[random(0, colors.length - 1)];
    p.radius = random(8, 16);
    p.endPos = setParticuleDirection(p);
    p.draw = function () {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = p.color;
      ctx.fill();
    };
    return p;
  }

  // 创建圆形对象
  function createCircle (x, y) {
    const p = {};
    p.x = x;
    p.y = y;
    p.color = "#FFF";
    p.radius = 0.1;
    p.alpha = 0.5;
    p.lineWidth = 6;
    p.draw = function () {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.lineWidth = p.lineWidth;
      ctx.strokeStyle = p.color;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };
    return p;
  }

  // 渲染粒子
  function renderParticule (anim) {
    for (let i = 0; i < anim.animatables.length; i++) {
      anim.animatables[i].target.draw();
    }
  }

  // 动画粒子
  function animateParticules (x, y) {
    const circle = createCircle(x, y);
    const particules = [];
    for (let i = 0; i < numberOfParticules; i++) {
      particules.push(createParticule(x, y));
    }
    const tl = createTimeline();
    tl.add(particules, {
      x: function (p) {
        return p.endPos.x;
      },
      y: function (p) {
        return p.endPos.y;
      },
      radius: 0.1,
      duration: random(1200, 1800),
      ease: "outExpo",
      onUpdate: renderParticule,
    });
    tl.add(circle, {
      radius: random(80, 160),
      lineWidth: 0,
      alpha: {
        to: 0,
        ease: "linear",
        duration: random(600, 800),
      },
      duration: random(1200, 1800),
      ease: "outExpo",
      onUpdate: renderParticule,
    }, 0);
  }

  // 创建随机圆形动画
  function createRandomCircleAnimation (x, y) {
    const randomSize = random(50, 90);
    const randomColor = colors[random(0, colors.length - 1)];

    const circle = {
      x: x,
      y: y,
      radius: 0,
      color: randomColor,
      alpha: 1,
      draw: function () {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      },
    };

    animate(circle, {
      radius: randomSize,
      alpha: 0,
      duration: 1000,
      ease: "outExpo",
      onUpdate: function () {
        circle.draw();
      },
    });
  }

  // 渲染动画
  let render;
  const startRender = () => {
    render = animate({
      keyframes: [
        { duration: Infinity }
      ],
      onUpdate: function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      },
    });
  };

  const handleTap = function (e) {
    if (!render) startRender();
    updateCoords(e);
    animateParticules(pointerX, pointerY);
    createRandomCircleAnimation(pointerX, pointerY); // 添加随机圆形动画
  };

  document.addEventListener(
    tap,
    handleTap,
    false
  );

  setCanvasSize();
  globalThis.addEventListener("resize", setCanvasSize, false);
});

onUnmounted(() => {
  globalThis.removeEventListener("resize", setCanvasSize);
  document.removeEventListener(tap, handleTap);
});
</script>