export interface Post {
  id: string;
  content: string;
  created_at: string;
}

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <section>
      <h3>피드</h3>
      {posts.length === 0 ? (
        <p>아직 작성된 글이 없습니다.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map((post) => (
            <li
              key={post.id}
              style={{
                borderBottom: '1px solid #ddd',
                padding: '12px 0',
              }}
            >
              <p style={{ margin: '0 0 6px 0', whiteSpace: 'pre-wrap' }}>
                {post.content}
              </p>
              <small style={{ color: '#888' }}>
                {new Date(post.created_at).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
