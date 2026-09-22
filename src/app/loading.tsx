export default function Loading() {
  return (
    <section className="grid min-h-[70svh] place-items-center">
      <div className="text-center">
        <div className="relative mx-auto h-16 w-16">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-300" />
          <span className="absolute inset-2 animate-pulse rounded-full border border-violet-400/30" />
        </div>
        <p className="mt-6 font-display text-[10px] uppercase tracking-[0.45em] text-cyan-200">
          Menyinkronkan data orbit
        </p>
      </div>
    </section>
  );
}
