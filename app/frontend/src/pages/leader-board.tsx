import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SERVER_URL } from '@/config/config';
import type { ITikTokProfile } from '@/types/social';

export function LeaderBoard() {
  const [profiles, setProfiles] = useState<ITikTokProfile[]>([]);

  useEffect(() => {
    fetch(`${SERVER_URL}/api/social/leaderboard`)
      .then(res => res.json())
      .then(data => setProfiles(data.profiles || []))
      .catch(err => console.error('Leaderboard fetch error', err));
  }, []);

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">TikTok Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700">
              <TableHead className="text-slate-400">Rank</TableHead>
              <TableHead className="text-slate-400">Handle</TableHead>
              <TableHead className="text-slate-400">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.map((p, idx) => (
              <TableRow key={p.id} className="border-slate-700">
                <TableCell className="text-slate-300">{idx + 1}</TableCell>
                <TableCell className="text-white">@{p.unique_id}</TableCell>
                <TableCell className="text-white">{p.rank_score.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
