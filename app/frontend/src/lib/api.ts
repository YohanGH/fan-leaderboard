import { SERVER_URL } from '@/config/config';

export async function fetchLeaderboard() {
  const res = await fetch(`${SERVER_URL}/api/social/leaderboard`);
  if (!res.ok) throw new Error('Failed to fetch leaderboard');
  return res.json();
}

export async function fetchSocialRank(handle: string) {
  const res = await fetch(`${SERVER_URL}/api/social/rank/${encodeURIComponent(handle)}`);
  if (!res.ok) throw new Error('Failed to fetch rank');
  return res.json();
}

export async function calculateSocialRank(handle: string) {
  const res = await fetch(`${SERVER_URL}/api/social/rank`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ handle }),
  });
  if (!res.ok) throw new Error('Failed to calculate rank');
  return res.json();
}
