const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();
  localStorage.setItem('access_token', data.token);
  return data;
}

export async function register(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const text = await res.text();
  console.log('Register status:', res.status);
  console.log('Register response:', text);

  if (!res.ok) throw new Error('Register failed');
  return JSON.parse(text);
}

export function logout() {
  localStorage.removeItem('access_token');
}

export function isAuthenticated() {
  return typeof window !== 'undefined' && !!localStorage.getItem('access_token');
}