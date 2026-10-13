export default function AuthCard({ title, children, footer }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md items-center px-4 py-8">
      <div className="w-full rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-slate-900">{title}</h1>
        {children}
        {footer && <p className="mt-6 text-center text-sm text-slate-600">{footer}</p>}
      </div>
    </div>
  );
}

export const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-100';

export const buttonClass =
  'w-full rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60';

export const labelClass = 'mb-1.5 block text-sm font-semibold text-slate-800';
