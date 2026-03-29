
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// GET request
export const fetcher = async (endpoint) => {

  const token = localStorage.getItem("token"); // ✅ get real token

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }), // only add if exists
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch');
  }

  return res.json();
};