// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
  statusCode: number;
}

// Query Parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  featured?: boolean;
  published?: boolean;
  category?: string;
  tag?: string;
}

// Model Types (matching Prisma schema)
export interface Profile {
  id: string;
  name: string;
  title: string;
  headline?: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
  resume?: string;
  availableForWork: boolean;
  yearsOfExperience?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialLink {
  id: string;
  name: string;
  platform: string;
  url: string;
  icon?: string;
  order: number;
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  views: number;
  likes: number;
  readTime?: number;
  author?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  location?: string;
  logo?: string;
  grade?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Newsletter {
  id: string;
  email: string;
  name?: string;
  subscribed: boolean;
  confirmedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  type: 'general' | 'project' | 'collaboration';
  status: 'pending' | 'replied' | 'archived';
  replied: boolean;
  repliedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

