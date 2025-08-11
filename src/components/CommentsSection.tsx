import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useComments, SiteComment } from '@/hooks/useComments';

const formatTime = (ts: number) => new Date(ts).toLocaleString();

const CommentsSection: React.FC = () => {
  const { getComments, addComment, updateComment } = useComments();
  const [comments, setComments] = useState<SiteComment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const load = () => setComments(getComments());

  useEffect(() => {
    load();
    const onUpdate = () => load();
    const onFocusForm = () => { const el = formRef.current?.querySelector('input[name="name"]') as HTMLInputElement | null; el?.focus(); };
    window.addEventListener('comments-updated', onUpdate as EventListener);
    window.addEventListener('focus-comment-form', onFocusForm as EventListener);
    return () => {
      window.removeEventListener('comments-updated', onUpdate as EventListener);
      window.removeEventListener('focus-comment-form', onFocusForm as EventListener);
    };
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    if (editingId) {
      updateComment(editingId, { name, email, message });
      setEditingId(null);
    } else {
      addComment({ name, email, message });
    }

    setName('');
    setEmail('');
    setMessage('');
  };

  const onEdit = (c: SiteComment) => {
    setEditingId(c.id);
    setName(c.name);
    setEmail(c.email);
    setMessage(c.message);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="comments" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-gradient">Visitor Comments</h2>

        {/* Form */}
        <Card className="mb-8 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-base">
              {editingId ? `Edit Comment #${editingId}` : 'Add a Comment'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form ref={formRef} onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <Input name="name" placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)} />
              </div>
              <div className="sm:col-span-1">
                <Input name="email" type="email" placeholder="Your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <Textarea placeholder="Write your comment..." value={message} onChange={(e)=>setMessage(e.target.value)} className="min-h-[120px]" />
              </div>
              <div className="sm:col-span-2 flex items-center gap-3">
                <Button type="submit" className="bg-gradient-primary">
                  {editingId ? 'Save Changes' : 'Post Comment'}
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={()=>{ setEditingId(null); setName(''); setEmail(''); setMessage(''); }}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Gallery */}
        {comments.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comments.map((c) => (
              <Card key={c.id} className="backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>#{c.id} • {c.name}</span>
                    <span className="text-xs opacity-60">{formatTime(c.timestamp)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm opacity-90 whitespace-pre-wrap">{c.message}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs opacity-60">{c.email}</span>
                    <Button size="sm" variant="ghost" className="text-primary" onClick={()=>onEdit(c)}>Edit</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentsSection;
