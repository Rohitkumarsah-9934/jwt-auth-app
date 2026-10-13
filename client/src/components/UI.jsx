export function RoleBadge({ role }) {
  const styles = {
    admin: 'bg-purple-100 text-purple-700',
    manager: 'bg-blue-100 text-blue-700',
    user: 'bg-green-100 text-green-700',
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[role] || styles.user}`}>
      {role}
    </span>
  );
}

export function StatCard({ label, value }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-md">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 break-all text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

export function PageShell({ title, subtitle, children }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-1 text-green-100">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function UserTable({ users, emptyText = 'No users found' }) {
  if (!users.length) {
    return <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow-md">{emptyText}</div>;
  }
  return (
    <>
    
      <div className="hidden overflow-hidden rounded-xl bg-white shadow-md sm:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-slate-600">{u.email}</td>
                <td className="px-4 py-3"><RoleBadge role={u.role} /></td>
                <td className="px-4 py-3 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className="space-y-3 sm:hidden">
        {users.map((u) => (
          <div key={u.id} className="rounded-xl bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{u.name}</p>
              <RoleBadge role={u.role} />
            </div>
            <p className="mt-1 break-all text-sm text-slate-600">{u.email}</p>
            <p className="mt-1 text-xs text-slate-400">Joined {new Date(u.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </>
  );
}
