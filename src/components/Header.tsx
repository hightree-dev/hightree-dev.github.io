import type { User } from '@supabase/supabase-js';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onOpenLoginModal: () => void;
}

export function Header({ user, onLogout, onOpenLoginModal }: HeaderProps) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1
        onDoubleClick={onOpenLoginModal}
        style={{ cursor: user ? 'default' : 'pointer', userSelect: 'none' }}
        title={user ? '' : '더블클릭해보세요...'}
      >
        Forest
      </h1>

      {user ? (
        <button
          onClick={onLogout}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            color: '#888',
            fontSize: '0.85rem',
          }}
        >
          로그아웃
        </button>
      ) : (
        <small style={{ color: '#888' }}>생각을 기록하는 숲</small>
      )}
    </header>
  );
}
