import * as THREE from 'three';

/**
 * ============================================================
 * TEKSTUR PROSEDURAL
 * Semua tekstur dibuat saat runtime memakai Canvas 2D, sehingga proyek
 * tidak bergantung pada file gambar eksternal (aman untuk preview offline).
 * ============================================================
 */

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D tidak tersedia');
  return { canvas, ctx };
}

function finalize(canvas: HTMLCanvasElement, repeat = 1) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(repeat, 1);
  texture.anisotropy = 4;
  return texture;
}

/** Tekstur planet bergaris (banded) dengan bintik badai acak. */
export function createPlanetTexture(colors: string[], seed = 7): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(1024, 512);
  const random = (index: number) => {
    const value = Math.sin(seed * 9301 + index * 49297) * 233280;
    return value - Math.floor(value);
  };

  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Pita horizontal
  const bands = 34;
  for (let i = 0; i < bands; i += 1) {
    const y = (i / bands) * canvas.height;
    const height = canvas.height / bands + 6;
    const color = colors[Math.floor(random(i) * colors.length) % colors.length];
    ctx.globalAlpha = 0.28 + random(i + 100) * 0.5;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= canvas.width; x += 16) {
      ctx.lineTo(x, y + Math.sin((x / canvas.width) * Math.PI * 4 + i) * 6);
    }
    ctx.lineTo(canvas.width, y + height);
    ctx.lineTo(0, y + height);
    ctx.closePath();
    ctx.fill();
  }

  // Bintik badai / kawah
  ctx.globalAlpha = 1;
  const spots = 26;
  for (let i = 0; i < spots; i += 1) {
    const x = random(i + 300) * canvas.width;
    const y = 40 + random(i + 700) * (canvas.height - 80);
    const radius = 8 + random(i + 900) * 46;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    const tint = colors[Math.floor(random(i + 500) * colors.length) % colors.length];
    gradient.addColorStop(0, `${tint}cc`);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(x, y, radius * 1.6, radius * 0.7, random(i + 200) * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  // Grain halus
  for (let i = 0; i < 4000; i += 1) {
    ctx.fillStyle = `rgba(255,255,255,${random(i + 1200) * 0.05})`;
    ctx.fillRect(random(i + 1500) * canvas.width, random(i + 1800) * canvas.height, 1.4, 1.4);
  }

  return finalize(canvas, 2);
}

/** Tekstur Matahari: fotosfer bergelombang dengan granulasi terang. */
export function createSunTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(1024, 512);
  ctx.fillStyle = '#ff9b21';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 2600; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 4 + Math.random() * 26;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    const bright = Math.random() > 0.45;
    gradient.addColorStop(0, bright ? 'rgba(255,247,190,0.85)' : 'rgba(214,80,10,0.55)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  return finalize(canvas, 1);
}

/** Sprite cahaya radial (glow) untuk matahari, bintang, dan photon ring. */
export function createGlowTexture(color = '#ffd27f'): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(256, 256);
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(255,255,255,0.95)');
  gradient.addColorStop(0.18, color);
  gradient.addColorStop(0.45, `${color}66`);
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Tekstur cincin planet (Saturnus, Uranus, Neptunus, Jupiter). */
export function createRingTexture(color = '#e8d3a3'): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(1024, 64);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < canvas.width; x += 1) {
    const t = x / canvas.width;
    // Celah Cassini & variasi kepadatan
    const gap =
      (t > 0.42 && t < 0.47) || (t > 0.68 && t < 0.70) || (t > 0.9 && t < 0.92) ? 0.06 : 1;
    const alpha = (0.25 + 0.7 * Math.abs(Math.sin(t * Math.PI * 3.4))) * gap;
    ctx.fillStyle = color;
    ctx.globalAlpha = Math.max(alpha, 0.05);
    ctx.fillRect(x, 0, 1, canvas.height);
  }

  ctx.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Awan nebula lembut untuk latar hero (dua warna dicampur). */
export function createNebulaTexture(colorA: string, colorB: string): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(512, 512);
  ctx.clearRect(0, 0, 512, 512);

  const blobs = 26;
  for (let i = 0; i < blobs; i += 1) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const radius = 60 + Math.random() * 190;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, i % 2 === 0 ? `${colorA}55` : `${colorB}44`);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Piringan akresi "disk view": cincin panas dengan Doppler beaming
 * (sisi kiri lebih terang karena mendekati pengamat).
 */
export function createAccretionDiskTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(1024, 1024);
  const center = 512;

  // Lapisan luar dingin
  const outer = ctx.createRadialGradient(center, center, 0, center, center, center);
  outer.addColorStop(0.0, 'rgba(0,0,0,1)');
  outer.addColorStop(0.16, 'rgba(0,0,0,1)');
  outer.addColorStop(0.22, 'rgba(255,140,40,0.35)');
  outer.addColorStop(0.3, 'rgba(255,196,90,0.55)');
  outer.addColorStop(0.36, 'rgba(255,236,190,0.75)');
  outer.addColorStop(0.44, 'rgba(255,170,70,0.42)');
  outer.addColorStop(0.62, 'rgba(180,60,20,0.18)');
  outer.addColorStop(1.0, 'rgba(0,0,0,0)');
  ctx.fillStyle = outer;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Doppler beaming: sisi kiri lebih terang
  const doppler = ctx.createLinearGradient(0, 0, canvas.width, 0);
  doppler.addColorStop(0, 'rgba(255,255,255,0.34)');
  doppler.addColorStop(0.42, 'rgba(255,255,255,0.06)');
  doppler.addColorStop(1, 'rgba(0,0,0,0.28)');
  ctx.globalCompositeOperation = 'overlay';
  ctx.fillStyle = doppler;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Goresan turbulensi pada piringan
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 520; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 118 + Math.random() * 190;
    const x = center + Math.cos(angle) * radius;
    const y = center + Math.sin(angle) * radius;
    ctx.strokeStyle =
      Math.random() > 0.6 ? 'rgba(255,240,210,0.5)' : 'rgba(255,150,50,0.32)';
    ctx.lineWidth = 0.6 + Math.random() * 2.2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(center, center, radius, angle, angle + 0.06 + Math.random() * 0.12);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Piringan akresi lubang hitam: goresan radial panas (oranye → putih). */
export function createAccretionTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = makeCanvas(1024, 256);
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 900; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const length = 30 + Math.random() * 220;
    const heat = Math.random();
    ctx.strokeStyle =
      heat > 0.75
        ? 'rgba(255,245,220,0.85)'
        : heat > 0.45
          ? 'rgba(255,170,60,0.6)'
          : 'rgba(255,90,20,0.4)';
    ctx.lineWidth = 1 + Math.random() * 2.6;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length, y + (Math.random() - 0.5) * 6);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.set(2, 1);
  return texture;
}
