import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SERVER_URL } from '@/config/config';
import type { ITikTokProfile } from '@/types/social';

export function SocialScore() {
  const [handle, setHandle] = useState('');
  const [result, setResult] = useState<ITikTokProfile | null>(null);

  const fetchScore = async () => {
    const res = await fetch(`${SERVER_URL}/api/social/rank/${handle}`);
    if (res.ok) {
      const data = await res.json();
      setResult(data.profile);
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700 max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-white">Check TikTok Score</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input value={handle} onChange={e => setHandle(e.target.value)} placeholder="TikTok handle" className="bg-slate-700 border-slate-600 text-white" />
          <Button onClick={fetchScore}>Search</Button>
        </div>
        {result && (
          <div className="text-white">@{result.unique_id} score: {result.rank_score.toFixed(2)}</div>
        )}
      </CardContent>
    </Card>
  );
}
