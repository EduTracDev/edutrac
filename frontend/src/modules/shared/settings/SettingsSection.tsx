interface SectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const SettingsSection = ({
  title,
  description,
  children,
}: SectionProps) => (
  <section className="space-y-6 mb-10 pb-10 border-b border-slate-50 last:border-0">
    <div>
      <h3 className="text-lg font-black text-slate-800">{title}</h3>
      <p className="text-xs font-medium text-slate-400 mt-1">{description}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  </section>
);
