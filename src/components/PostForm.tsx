import { useState, useEffect } from "react";

// Post type definition
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Props for the PostForm component
interface PostFormProps {
  onClose: () => void;
  onAdd: (post: Post) => void;
  onUpdate?: (post: Post) => void;
  editingPost?: Post | null;
}

// Component for adding/editing a post
export default function PostForm({
  onClose,
  onAdd,
  onUpdate,
  editingPost,
}: PostFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill fields in edit mode
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [editingPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setSubmitting(true);

    try {
      if (editingPost && onUpdate) {
        const updatedPost = { ...editingPost, title, body };

        await fetch(`https://dummyjson.com/posts/${editingPost.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, body }),
        });

        onUpdate(updatedPost);
      } else {
        const res = await fetch("https://dummyjson.com/posts/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, body, userId: 1 }),
        });

        const newPost = await res.json();
        onAdd(newPost);
      }

      onClose();
    } catch (err) {
      console.error("Post submission failed", err);
    }

    setSubmitting(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "24px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "10px" }}>
          {editingPost ? "Edit Post" : "Add New Post"}
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          style={{ width: "100%", padding: "8px", marginBottom: "16px" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
          }}
        >
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" disabled={submitting}>
            {submitting
              ? editingPost
                ? "Updating..."
                : "Adding..."
              : editingPost
              ? "Update"
              : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}





