'use client';

import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Fuel, Rocket, ShieldAlert, Timer, Wand2 } from 'lucide-react';
import type { EngineType, TravelNode, TravelPlan } from '@/lib/types';
import { ENGINE_LIST, BOARDING_PASS_NOTE } from '@/lib/travel';
import { TRAVEL_NODES } from '@/lib/data/travel-nodes';
import { Button } from '@/components/ui/button';
import { ContentBadge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/section-heading';
import { useAchievements } from '@/context/achievement-context';
import { useSound } from '@/context/sound-context';
import { downloadDataUrl, drawBoardingPass } from '@/lib/boarding-pass';
import { cn, formatLightYears, formatNumber } from '@/lib/utils';

export function TravelSimulator() {
  const [originId, setOriginId] = useState('sol');
  const [destinationId, setDestinationId] = useState('elyria');
  const [engine, setEngine] = useState<EngineType>('warp');
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const { unlock } = useAchievements();
  const { play } = useSound();

  const origin = TRAVEL_NODES.find((node) => node.id === originId);
  const destination = TRAVEL_NODES.find((node) => node.id === destinationId);

  const grouped = useMemo(
    () => ({
      nyata: TRAVEL_NODES.filter((node) => node.kind === 'nyata'),
      fiksi: TRAVEL_NODES.filter((node) => node.kind === 'fiksi')
    }),
    []
  );

  const runSimulation = async (result: TravelPlan) => {
    setProgress(0);
    setVisibleLogs(0);
    if (progressTimer.current) clearInterval(progressTimer.current);

    const steps = result.routeLog.length;
    let tick = 0;
    progressTimer.current = setInterval(() => {
      tick += 1;
      const next = Math.min((tick / (steps * 6)) * 100, 100);
      setProgress(next);
      setVisibleLogs(Math.min(Math.floor(next / (100 / steps)) + 1, steps));
      if (next >= 100 && progressTimer.current) {
        clearInterval(progressTimer.current);
      }
    }, 240);
  };

  const simulate = async () => {
    setError(null);
    setLoading(true);
    play('click');

    try {
      const response = await fetch('/api/travel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin: originId, destination: destinationId, engine })
      });

      const data = (await response.json()) as { plan?: TravelPlan; error?: string };
      if (!response.ok || !data.plan) {
        setError(data.error ?? 'Navigasi gagal menghitung rute.');
        return;
      }

      setPlan(data.plan);
      unlock('Galactic Cartographer');
      await runSimulation(data.plan);
    } catch {
      setError('Tidak bisa menghubungi komputer navigasi. Periksa koneksi.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPass = () => {
    if (!plan || !canvasRef.current) return;
    const dataUrl = drawBoardingPass(canvasRef.current, plan);
    downloadDataUrl(
      dataUrl,
      `boarding-pass-${plan.origin.name}-${plan.destination.name}`.replace(/[^a-z0-9-]/gi, '-') + '.png'
    );
    play('success');
  };

  const copyCode = async () => {
    if (!plan) return;
    try {
      await navigator.clipboard.writeText(plan.boardingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* --------------------------- FORM RENCANA --------------------------- */}
      <div className="space-y-5">
        <div className="glass-strong rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="font-display text-[10px] uppercase tracking-[0.35em] text-slate-400">
              Rencanakan perjalananmu
            </p>
            <ContentBadge type="fiction" size="sm" />
          </div>

          <div className="mt-5 grid gap-4">
            <label className="block">
              <span className="text-[10px] uppercase tracking-widest text-slate-400">Titik asal</span>
              <select
                value={originId}
                onChange={(event) => setOriginId(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-cosmos-deep px-4 py-3 text-sm text-white focus:border-cyan-400/50 focus:outline-none"
              >
                <optgroup label="🌍 Nyata">
                  {grouped.nyata.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.name} — {node.system}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🛸 Fiksi">
                  {grouped.fiksi.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.name} — {node.system}
                    </option>
                  ))}
                </optgroup>
              </select>
            </label>

            <label className="block">
              <span className="text-[10px] uppercase tracking-widest text-slate-400">Tujuan</span>
              <select
                value={destinationId}
                onChange={(event) => setDestinationId(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-cosmos-deep px-4 py-3 text-sm text-white focus:border-cyan-400/50 focus:outline-none"
              >
                <optgroup label="🌍 Nyata">
                  {grouped.nyata.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.name} — {node.system}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🛸 Fiksi">
                  {grouped.fiksi.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.name} — {node.system}
                    </option>
                  ))}
                </optgroup>
              </select>
            </label>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400">Mesin</span>
              <div className="mt-2 grid gap-2">
                {ENGINE_LIST.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setEngine(item.id)}
                    className={cn(
                      'rounded-2xl border p-4 text-left transition',
                      engine === item.id
                        ? 'border-cyan-400/60 bg-cyan-400/[0.08]'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                    )}
                  >
                    <p className="font-heading text-sm text-white">{item.label}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                      {item.description}
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-widest text-slate-500">
                      {formatNumber(item.speedLyPerHour, 2)} ly/jam · {item.fuelPerLy} unit/ly · risiko +
                      {item.riskBonus}%
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={simulate} disabled={loading || originId === destinationId}>
              <Wand2 size={15} /> {loading ? 'Menghitung rute…' : 'Jalankan simulasi'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setPlan(null);
                setProgress(0);
                setVisibleLogs(0);
              }}
            >
              Reset
            </Button>
          </div>

          {originId === destinationId && (
            <p className="mt-3 text-xs text-amber-200">
              Titik asal dan tujuan tidak boleh sama, Navigator.
            </p>
          )}
          {error && <p className="mt-3 text-xs text-rose-200">{error}</p>}
        </div>

        {/* ------------------------------ PETA GALAKSI ------------------------------ */}
        <div className="glass-strong overflow-hidden rounded-3xl p-5">
          <p className="font-display text-[10px] uppercase tracking-[0.35em] text-slate-400">
            Peta galaksi
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-cosmos-deep">
            <GalaxyMap
              origin={origin}
              destination={destination}
              active={Boolean(plan)}
              progress={progress}
            />
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
            Koordinat peta bersifat artistik (proyeksi 2D dari cakram galaksi). Perhitungan jarak & durasi
            memakai hukum kosinus antar-vektor posisi relatif terhadap Matahari.
          </p>
        </div>
      </div>

      {/* --------------------------- HASIL & BOARDING PASS --------------------------- */}
      <div className="space-y-5">
        <AnimatePresence>
          {plan && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-strong rounded-3xl p-5 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <p className="font-display text-[10px] uppercase tracking-[0.35em] text-cyan-300">
                  Hasil navigasi
                </p>
                <button
                  type="button"
                  onClick={copyCode}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] text-slate-300 transition hover:border-cyan-300/50 hover:text-white"
                >
                  {copied ? 'Kode tersalin ✅' : plan.boardingCode}
                </button>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: <Timer size={14} />,
                    label: 'Estimasi waktu',
                    value: plan.durationLabel
                  },
                  {
                    icon: <Fuel size={14} />,
                    label: 'Dilithium fuel',
                    value: `${formatNumber(plan.fuelUnits)} unit`
                  },
                  {
                    icon: <Rocket size={14} />,
                    label: 'Jarak tempuh',
                    value: formatLightYears(plan.distanceLy)
                  },
                  {
                    icon: <ShieldAlert size={14} />,
                    label: 'Risiko anomali',
                    value: `${plan.anomalyRisk}% (${plan.riskLabel})`
                  }
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-400">
                      {item.icon} {item.label}
                    </p>
                    <p className="mt-2 font-heading text-sm text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <p className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-slate-400">
                  <span>Simulasi perjalanan</span>
                  <span>{Math.round(progress)}%</span>
                </p>
                <ProgressBar value={progress} tone="aurora" />
              </div>

              <div className="mt-4 space-y-2 font-mono text-[11px] leading-relaxed text-emerald-200">
                {plan.routeLog.slice(0, visibleLogs).map((log) => (
                  <motion.p
                    key={log}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border-l border-emerald-400/30 pl-3"
                  >
                    &gt; {log}
                  </motion.p>
                ))}
                {progress >= 100 && (
                  <p className="border-l border-cyan-400/40 pl-3 text-cyan-200">
                    &gt; Tiba di {plan.destination.name}. Selamat datang, penjelajah. 🛸
                  </p>
                )}
              </div>

              <div className="mt-5 rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-4">
                <p className="text-[10px] uppercase tracking-widest text-amber-200">Peringatan rute</p>
                <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-amber-50">
                  {plan.warnings.map((warning) => (
                    <li key={warning}>• {warning}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button onClick={downloadPass} variant="fiction">
                  <Download size={15} /> Unduh boarding pass (PNG)
                </Button>
              </div>
              <p className="mt-3 text-[10px] leading-relaxed text-slate-500">{BOARDING_PASS_NOTE}</p>

              <canvas ref={canvasRef} className="hidden" aria-hidden />
            </motion.div>
          )}
        </AnimatePresence>

        {!plan && (
          <div className="glass rounded-3xl p-6 text-sm leading-relaxed text-slate-300">
            <p className="font-heading text-base text-white">Cara kerja simulator</p>
            <ol className="mt-3 space-y-2">
              <li>1. Pilih titik asal & tujuan — campurkan bintang nyata dengan planet fiksi sesukamu.</li>
              <li>2. Pilih mesin: Warp Drive stabil, Hyperspace cepat tapi berisiko, Lightfold eksperimental.</li>
              <li>3. Jalankan simulasi untuk melihat durasi, kebutuhan dilithium, dan risiko anomali.</li>
              <li>4. Unduh boarding pass PNG untuk kenang-kenangan (murni fiksi 🛸).</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

function GalaxyMap({
  origin,
  destination,
  active,
  progress
}: {
  origin: TravelNode | undefined;
  destination: TravelNode | undefined;
  active: boolean;
  progress: number;
}) {
  if (!origin || !destination) return null;

  const path = `M ${origin.coordinates.x * 10} ${origin.coordinates.y * 6} Q ${
    ((origin.coordinates.x + destination.coordinates.x) / 2) * 10
  } ${Math.min(origin.coordinates.y, destination.coordinates.y) * 6 - 90} ${
    destination.coordinates.x * 10
  } ${destination.coordinates.y * 6}`;

  return (
    <svg viewBox="0 0 1000 600" className="h-[260px] w-full sm:h-[320px]">
      <defs>
        <radialGradient id="map-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0a0e1a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="route" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>

      <rect width="1000" height="600" fill="#04060f" />
      <ellipse cx="500" cy="300" rx="470" ry="250" fill="url(#map-glow)" />

      {/* Grid galaksi */}
      {Array.from({ length: 9 }, (_, index) => (
        <line
          key={`v-${index}`}
          x1={index * 125}
          y1="0"
          x2={index * 125}
          y2="600"
          stroke="rgba(148,163,184,0.08)"
        />
      ))}
      {Array.from({ length: 6 }, (_, index) => (
        <line
          key={`h-${index}`}
          x1="0"
          y1={index * 120}
          x2="1000"
          y2={index * 120}
          stroke="rgba(148,163,184,0.08)"
        />
      ))}

      {/* Semua simpul */}
      {TRAVEL_NODES.map((node) => (
        <g key={node.id}>
          <circle
            cx={node.coordinates.x * 10}
            cy={node.coordinates.y * 6}
            r={node.kind === 'fiksi' ? 4.5 : 3.5}
            fill={node.kind === 'fiksi' ? '#c084fc' : '#7dd3fc'}
            opacity={node.id === origin.id || node.id === destination.id ? 1 : 0.45}
          />
          <text
            x={node.coordinates.x * 10 + 10}
            y={node.coordinates.y * 6 + 4}
            fontSize="13"
            fill="rgba(226,232,240,0.55)"
          >
            {node.name.length > 18 ? `${node.name.slice(0, 16)}…` : node.name}
          </text>
        </g>
      ))}

      {/* Rute */}
      <path d={path} fill="none" stroke="url(#route)" strokeWidth="3" strokeDasharray="8 10">
        {active && (
          <animate
            attributeName="stroke-dashoffset"
            from="180"
            to="0"
            dur="2.4s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* Kapal bergerak */}
      {active && (
        <circle r="7" fill="#f0abfc">
          <animateMotion dur="4.2s" repeatCount="indefinite" path={path} />
        </circle>
      )}

      {/* Penanda */}
      <circle
        cx={origin.coordinates.x * 10}
        cy={origin.coordinates.y * 6}
        r="9"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="2"
      />
      <circle
        cx={destination.coordinates.x * 10}
        cy={destination.coordinates.y * 6}
        r="9"
        fill="none"
        stroke="#c084fc"
        strokeWidth="2"
      />

      {active && (
        <text x="500" y="575" fontSize="14" fill="rgba(226,232,240,0.7)" textAnchor="middle">
          Progres simulasi: {Math.round(progress)}%
        </text>
      )}
    </svg>
  );
}
