import { api } from "@/src/lib/axios";

export interface PostUser {
  id: string;
  FirstName: string;
  LastName: string;
  profilePhoto: string | null;
}

export interface Post {
  id: string;
  imageUrl: string;
  caption: string | null;
  createdAt: string;
  updatedAt: string;
  user: PostUser;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: PostUser;
}

// Token is attached automatically by the axios requeste

export const getPosts = async (): Promise<Post[]> => {
  const res = await api.get("/posts");
  return res.data.data;
};

export const getPost = async (id: string): Promise<Post> => {
  const res = await api.get(`/posts/${id}`);
  return res.data.data;
};

export const getComments = async (postId: string): Promise<Comment[]> => {
  const res = await api.get(`/posts/${postId}/comments`);
  return res.data.data;
};

export const postComment = async ({
  postId,
  content,
}: {
  postId: string;
  content: string;
}): Promise<Comment> => {
  const res = await api.post(`/posts/${postId}/comments`, { content });
  return res.data.data;
};

export const createPost = async (formData: FormData): Promise<Post> => {
  const res = await api.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const updatePost = async ({
  id,
  caption,
}: {
  id: string;
  caption: string;
}): Promise<Post> => {
  const res = await api.patch(`/posts/${id}`, { caption });
  return res.data.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await api.delete(`/posts/${id}`);
};

export const giveLike = async(id:string)=>{
  const res = await api.post(`/posts/${id}/like`);
  return res.data;
}






