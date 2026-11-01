import { useState } from 'react';

interface PostFormProps {
  onPostCreated: (content: string) => Promise<boolean>;
}

export function PostForm({ onPostCreated }: PostFormProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    const success = await onPostCreated(content);
    setLoading(false);

    if (success) {
      setContent('');
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="무슨 생각을 하고 계신가요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          style={{ width: '100%', boxSizing: 'border-box' }}
          disabled={loading}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
          <button type="submit" disabled={loading || !content.trim()}>
            {loading ? '게시 중...' : '게시'}
          </button>
        </div>
      </form>
    </section>
  );
}
