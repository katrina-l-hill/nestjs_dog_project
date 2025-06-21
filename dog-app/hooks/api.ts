// lib/api.ts
const BASE_URL = 'http://10.0.2.2:3000';

export const fetchDogs = async () => {
  const res = await fetch(`${BASE_URL}/dogs`);
  if (!res.ok) throw new Error('Failed to fetch dogs');
  return res.json();
};

export const addDog = async (dog: { name: string; breed: string; age: number }) => {
  const res = await fetch(`${BASE_URL}/dogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dog),
  });
  if (!res.ok) throw new Error('Failed to add dog');
  return res.json();
};

export const deleteDog = async (id: number) => {
  const res = await fetch(`${BASE_URL}/dogs/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete dog');
};
