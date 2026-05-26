export default function SkillBadge({ label, accent = 'cyan' }: { label: string; accent?: 'cyan' | 'orange' }) {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] font-mono ${
        accent === 'orange'
          ? 'border-[color:var(--border-orange)] text-[color:var(--accent-orange)] bg-[rgba(255,90,0,0.06)]'
          : 'border-[color:var(--border-cyan)] text-[color:var(--accent-cyan)] bg-[rgba(20,199,192,0.05)]'
      }`}
    >
      {label}
    </span>
  );
}
