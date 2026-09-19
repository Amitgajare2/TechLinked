"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  giveLike,
  getComments,
  postComment,
} from "@/src/API/User/Post/postAPI";

interface ErrorResponse {
  message?: string;
}

export const postKeys = {
  all: ["posts"] as const,

  lists: () => [...postKeys.all, "list"] as const,

  details: () => [...postKeys.all, "detail"] as const,

  detail: (postId: string) =>
    [...postKeys.details(), postId] as const,
};

// Post Hooks

export const useGetPosts = () => {
  return useQuery({
    queryKey: postKeys.all,
    queryFn: getPosts,
    retry: 1,
  });
};

export const useGetPost = (postId: string) => {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => getPost(postId),
    enabled: !!postId,
    retry: 1,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      toast.success("Post created!");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || "Failed to create post";
      toast.error(message);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      toast.success("Post updated!");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || "Failed to update post";
      toast.error(message);
    },
  });
};
 
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      toast.success("Post deleted");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || "Failed to delete post";
      toast.error(message);
    },
  });
};


  // Like Hooks

export const useHandleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: giveLike,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || "try again later";
      toast.error(message);
    },
  });
};





export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComment,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      queryClient.invalidateQueries({
        queryKey: [...postKeys.detail(variables.postId), "comments"],
      });
      toast.success("Comment added!");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message = error.response?.data?.message || "Failed to create post";
      toast.error(message);
    },
  });
};

export const useGetComments = (postId:string) => {
  return useQuery({
    queryKey: [...postKeys.detail(postId), "comments"],
    queryFn: () => getComments(postId),
    enabled: !!postId,
    retry: 1,
  });
};


