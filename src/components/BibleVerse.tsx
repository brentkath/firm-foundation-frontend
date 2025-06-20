import { useState, useEffect } from 'react';

interface VerseData {
  text: string;
  reference: string;
  version?: string;
}

export default function BibleVerse() {
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/verse`)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => setVerse(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!verse) return <div>Loading…</div>;

  return (
    <div>
      <blockquote>“{verse.text}”</blockquote>
      <cite>— {verse.reference}{verse.version ? ` (${verse.version})` : ''}</cite>
    </div>
  );
}
