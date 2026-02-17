<!--
 * @Author: GZF
 * @Date: 2025-01-19 10:05:35
 * @Description: 首页背景 - 彩带 - 雪花 - 纸屑 - 烟花
-->

<style lang="scss" scoped></style>
<template></template>

<script lang="ts" setup>
import confetti from 'canvas-confetti'
import {inBrowser,useData} from 'vitepress';

const {isDark} = useData();

if (inBrowser) {
  // 随机选择一种效果
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      snowFlake(3,isDark.value?['#ffffff']:['#48A0A5']);
      break;
    case 1:
      stars();
      break;
    case 2:
      colouredRibbon();
      break;
    case 3:
      confettiFireworks(3);
      break;
  }
}

/**
 * 雪花 ❄️
 * @param time {number}  时间：秒
 * @param color {string[]} 颜色
 */
function snowFlake(time: number, color: string[]) {
  let duration = time * 1000;
  let animationEnd = Date.now() + duration;
  let skew = 1;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  (function frame() {
    let timeLeft = animationEnd - Date.now();
    let ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: (Math.random() * skew) - 0.2
      },
      colors: color,
      shapes: ['circle'],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4)
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  }());
}

/**
 * 星星 ✨
 */
function stars() {
  let defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star']
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle']
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}

/**
 * 彩带
 */
function colouredRibbon() {
  confetti({
    particleCount: 100,
    spread: 170,
    origin: {y: 0.6},
  })
}

/**
 * 礼花 🎉
 * @param time {number}  时间：秒
 */
function confettiFireworks(time: number) {
  let end = Date.now() + (time * 1000);
  let colors = ['#bb0000', '#ffffff'];
  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: {x: 0},
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: {x: 1},
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}
</script>
