import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from './utils/supabase';
import { Header } from './components/Header';
import { LoginModal } from './components/LoginModal';
import { PostForm } from './components/PostForm';
import { PostList } from './components/PostList';
import type { Post } from './components/PostList';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadInitialData() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!ignore && !error && data) {
        setPosts(data);
      }
    }

    loadInitialData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, []);

  const handleCreatePost = async (content: string) => {
    if (!user) return false;

    const { data, error } = await supabase
      .from('posts')
      .insert({
        content,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      alert(`글 저장 실패: ${error.message}`);
      return false;
    }

    if (data) {
      setPosts((prevPosts) => [data, ...prevPosts]);
      return true;
    }

    return false;
  };

  const handleLogin = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(`로그인 실패: ${error.message}`);
      return false;
    } else {
      setUser(data.user);
      return true;
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <Header
        user={user}
        onLogout={handleLogout}
        onOpenLoginModal={() => !user && setIsLoginModalOpen(true)}
      />

      <hr style={{ margin: '16px 0', borderColor: '#eee' }} />

      {user && (
        <>
          <PostForm onPostCreated={handleCreatePost} />
          <hr style={{ margin: '16px 0', borderColor: '#eee' }} />
        </>
      )}

      <PostList posts={posts} />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;
