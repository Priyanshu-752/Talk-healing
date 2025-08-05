// store.ts
"use client";

import { makeAutoObservable, runInAction } from "mobx";
import { fetchTopics, fetchPosts, fetchCommunities, createPost } from "./endpoints";
import { PostInputType } from "./schema";

export class ForumStore {
  topics: TopicType[] = [];
  posts: PostType[] = [];
  communities: CommunityType[] = [];
  loading: boolean = false;
  error: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  async loadTopics() {
    this.loading = true;
    try {
      const data = await fetchTopics();
      runInAction(() => {
        this.topics = data;
        this.loading = false;
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e.message || "Failed to load topics";
        this.loading = false;
      });
    }
  }

  async loadPosts() {
    this.loading = true;
    try {
      const data = await fetchPosts();
      runInAction(() => {
        this.posts = data;
        this.loading = false;
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e.message || "Failed to load posts";
        this.loading = false;
      });
    }
  }

  async loadCommunities() {
    this.loading = true;
    try {
      const data = await fetchCommunities();
      runInAction(() => {
        this.communities = data;
        this.loading = false;
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e.message || "Failed to load communities";
        this.loading = false;
      });
    }
  }

  async addPost(input: PostInputType) {
    this.loading = true;
    try {
      const newPost = await createPost(input);
      runInAction(() => {
        this.posts.unshift(newPost);
        this.loading = false;
      });
      return newPost;
    } catch (e: any) {
      runInAction(() => {
        this.error = e.message || "Failed to create post";
        this.loading = false;
      });
      throw e;
    }
  }
}

// Types for convenience
export type TopicType = {
  id: string;
  title: string;
  description?: string;
};

export type PostType = {
  id: string;
  author: string;
  content: string;
  created_at: string;
  topicId: string;
};

export type CommunityType = {
  id: string;
  name: string;
  description?: string;
  membersCount?: number;
};

export const forumStore = new ForumStore();
