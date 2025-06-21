import { Pencil } from "lucide-react";

// Post type definition
type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

// Props for PostCard component
interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
}

// Component to display an individual post
export default function PostCard({ post, onEdit }: PostCardProps) {
  return (
    <div className="post-card">
      <button
        onClick={() => onEdit(post)}
        className="edit-button"
        aria-label="Edit post"
      >
        <Pencil size={16} />
      </button>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}



