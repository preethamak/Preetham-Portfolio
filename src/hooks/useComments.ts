import { useCallback } from 'react';

export interface SiteComment {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
}

const STORAGE_KEY = 'portfolio-comments';

const read = (): SiteComment[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SiteComment[]) : [];
  } catch {
    return [];
  }
};

const write = (comments: SiteComment[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  window.dispatchEvent(new CustomEvent('comments-updated'));
};

export const useComments = () => {
  const getComments = useCallback(() => read(), []);

  const addComment = useCallback((data: Omit<SiteComment, 'id' | 'timestamp'>) => {
    const comments = read();
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;
    const comment: SiteComment = { id, timestamp: Date.now(), ...data };
    write([comment, ...comments]);
    return id;
  }, []);

  const deleteComment = useCallback((id: string) => {
    const comments = read().filter(c => c.id !== id);
    write(comments);
  }, []);

  const clearComments = useCallback(() => {
    write([]);
  }, []);

  return { getComments, addComment, deleteComment, clearComments };
};
