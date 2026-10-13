
export const ROLES = [
  { value: 'user', label: 'User' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Admin' },
];

export const roleHome = (role) => {
  const normalizedRole = role?.trim().toLowerCase();

  const routes = {
    user: '/dashboard',
    manager: '/manager',
    admin: '/admin',
  };

  return routes[normalizedRole] || '/unauthorized';
};
