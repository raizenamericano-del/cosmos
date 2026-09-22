import type { TravelPlan } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

/**
 * Menggambar "boarding pass antarbintang" ke <canvas> lalu mengembalikan data URL PNG.
 * Dipakai oleh tombol unduh di Interstellar Travel Simulator.
 */
export function drawBoardingPass(canvas: HTMLCanvasElement, plan: TravelPlan): string {
  const width = 1000;
  const height = 620;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D tidak tersedia');

  // Latar gradien kosmik
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#0a0e1a');
  gradient.addColorStop(0.55, '#141a35');
  gradient.addColorStop(1, '#241243');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Bintang latar
  for (let i = 0; i < 240; i += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 1.5;
    ctx.fillStyle = `rgba(255,255,255,${0.15 + Math.random() * 0.55})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Garis aksen
  const accent = ctx.createLinearGradient(0, 0, width, 0);
  accent.addColorStop(0, '#8b5cf6');
  accent.addColorStop(0.5, '#6366f1');
  accent.addColorStop(1, '#22d3ee');
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, width, 8);

  // Bingkai
  ctx.strokeStyle = 'rgba(148,163,184,0.35)';
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 34, width - 56, height - 96);

  // Header
  ctx.fillStyle = '#a5f3fc';
  ctx.font = 'bold 22px Helvetica, Arial, sans-serif';
  ctx.fillText('COSMOS ACADEMY', 56, 84);
  ctx.fillStyle = 'rgba(226,232,240,0.7)';
  ctx.font = '14px Helvetica, Arial, sans-serif';
  ctx.fillText('INTERSTELLAR BOARDING PASS  ·  FIKSI ILMIAH 🛸', 56, 110);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 18px Helvetica, Arial, sans-serif';
  ctx.fillText(plan.boardingCode, width - 56, 92);
  ctx.fillStyle = 'rgba(226,232,240,0.6)';
  ctx.font = '12px Helvetica, Arial, sans-serif';
  ctx.fillText(`Risiko anomali ${plan.anomalyRisk}% (${plan.riskLabel})`, width - 56, 114);
  ctx.textAlign = 'left';

  // Rute
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 40px Helvetica, Arial, sans-serif';
  ctx.fillText(plan.origin.name.toUpperCase(), 56, 200);

  ctx.fillStyle = '#22d3ee';
  ctx.font = '30px Helvetica, Arial, sans-serif';
  ctx.fillText('→', 56 + ctx.measureText(plan.origin.name.toUpperCase()).width + 110, 196);

  const destinationX = 56 + ctx.measureText(plan.origin.name.toUpperCase()).width + 170;
  ctx.fillStyle = '#c4b5fd';
  ctx.fillText(plan.destination.name.toUpperCase(), destinationX, 200);

  // Garis putus-putus
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = 'rgba(148,163,184,0.4)';
  ctx.beginPath();
  ctx.moveTo(56, 232);
  ctx.lineTo(width - 56, 232);
  ctx.stroke();
  ctx.setLineDash([]);

  // Data grid
  const rows: [string, string][] = [
    ['Mesin', plan.engineLabel],
    ['Jarak tempuh', `${formatNumber(plan.distanceLy, 2)} tahun cahaya`],
    ['Estimasi perjalanan', plan.durationLabel],
    ['Kebutuhan dilithium', `${formatNumber(plan.fuelUnits)} unit`],
    ['Sistem asal', plan.origin.system],
    ['Sistem tujuan', plan.destination.system]
  ];

  const columnWidth = (width - 112) / 2;
  rows.forEach((row, index) => {
    const column = index % 2;
    const rowIndex = Math.floor(index / 2);
    const x = 56 + column * columnWidth;
    const y = 280 + rowIndex * 62;

    ctx.fillStyle = 'rgba(148,163,184,0.75)';
    ctx.font = '12px Helvetica, Arial, sans-serif';
    ctx.fillText(row[0].toUpperCase(), x, y);

    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'bold 20px Helvetica, Arial, sans-serif';
    ctx.fillText(row[1].slice(0, 34), x, y + 26);
  });

  // Pola "kode" unik (bukan QR asli, hanya visual)
  const codeSeed = plan.boardingCode.split('').map((char) => char.charCodeAt(0));
  const blockSize = 12;
  const startX = width - 220;
  const startY = height - 200;
  for (let row = 0; row < 10; row += 1) {
    for (let column = 0; column < 10; column += 1) {
      const seed = codeSeed[(row * 10 + column) % codeSeed.length] ?? 0;
      const filled = (seed + row * 7 + column * 13) % 3 !== 0;
      ctx.fillStyle = filled ? '#e2e8f0' : 'rgba(226,232,240,0.12)';
      ctx.fillRect(startX + column * blockSize, startY + row * blockSize, blockSize - 2, blockSize - 2);
    }
  }

  // Footer
  ctx.fillStyle = 'rgba(226,232,240,0.55)';
  ctx.font = '12px Helvetica, Arial, sans-serif';
  ctx.fillText(
    'Dokumen fiksi untuk keperluan edukasi. Tidak berlaku pada rute nyata mana pun.',
    56,
    height - 32
  );

  return canvas.toDataURL('image/png');
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
