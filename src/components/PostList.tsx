import { useEffect, useState, useCallback } from "react";
import PostCard from "./PostCard";
import PostForm from "./PostForm";

// Types
type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const POSTS_PER_PAGE = 20;

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fetchedSkips, setFetchedSkips] = useState<Set<number>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const fetchPosts = useCallback(async () => {
    const skip = page * POSTS_PER_PAGE;
    if (loading || !hasMore || fetchedSkips.has(skip)) return;

    setLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/posts?limit=${POSTS_PER_PAGE}&skip=${skip}`);
      const data = await res.json();

      setFetchedSkips(prev => {
        const updated = new Set(prev);
        updated.add(skip);
        return updated;
      });

      if (data.posts.length < POSTS_PER_PAGE) setHasMore(false);

      setPosts(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const uniquePosts = data.posts.filter((p: Post) => !existingIds.has(p.id));
        return [...prev, ...uniquePosts];
      });

      setPage(prev => prev + 1);
    } catch (error) {
      console.error("Failed to fetch posts from API:", error);
    }
    setLoading(false);
  }, [page, hasMore, loading, fetchedSkips]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200;

      if (nearBottom && !loading && hasMore) {
        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchPosts, hasMore, loading]);

  const handleAddPost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handleEdit = (targetPost: Post) => {
    setEditingPost(targetPost);
    setShowModal(true);
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(prev => prev.map(p => (p.id === updatedPost.id ? updatedPost : p)));
  };

  return (
  <div className="container main-container">
  <div className="header">
    <h1 className="title">Posts</h1>
    <button
      onClick={() => {
        setEditingPost(null);
        setShowModal(true);
      }}
      className="add-post-button"
    >
      Add post
    </button>
  </div>

  {posts.map((post) => (
    <PostCard key={post.id} post={post} onEdit={handleEdit} />
  ))}

  {loading && (
    <p className="text-center text-sm text-gray-500">Loading more posts...</p>
  )}
  {!hasMore && (
    <p className="text-center text-sm text-gray-400 mt-4">No more posts to show!</p>
  )}

  {showModal && (
    <PostForm
      onClose={() => setShowModal(false)}
      onAdd={handleAddPost}
      onUpdate={handleUpdatePost}
      editingPost={editingPost}
    />
  )}
</div>

  );
}
