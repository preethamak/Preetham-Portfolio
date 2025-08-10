import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useComments, SiteComment } from '@/hooks/useComments';

const formatTime = (ts: number) => new Date(ts).toLocaleString();

const CommentsSection: React.FC = () => {
  const { getComments } = useComments();
  const [comments, setComments] = useState<SiteComment[]>([]);

  const load = () => setComments(getComments());

  useEffect(() => {
    load();
    const onUpdate = () => load();
    window.addEventListener('comments-updated', onUpdate as EventListener);
    return () => window.removeEventListener('comments-updated', onUpdate as EventListener);
  }, []);

  if (!comments.length) return null; // Hidden if empty

  return (
    <section id="comments" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-gradient">Visitor Comments</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comments.map((c) => (
            <Card key={c.id} className="backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{c.name}</span>
                  <span className="text-xs opacity-60">{formatTime(c.timestamp)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90 whitespace-pre-wrap">{c.message}</p>
                <p className="text-xs mt-3 opacity-60">{c.email}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;
