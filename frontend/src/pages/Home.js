import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { postsAPI } from '../services/api';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { Search, Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('desc');

  const { data, isLoading, error, refetch } = useQuery(
    ['posts', currentPage, searchTerm, sortBy, sortDir],
    () => postsAPI.getAll({
      pageNo: currentPage,
      pageSize: 10,
      sortBy,
      sortDir,
    }),
    {
      keepPreviousData: true,
    }
  );

  const handleDeletePost = async (postId) => {
    try {
      await postsAPI.delete(postId);
      refetch();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortDir('desc');
    }
    setCurrentPage(0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg font-medium mb-4">
          Error loading posts
        </div>
        <button
          onClick={() => refetch()}
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  const posts = data?.data?.content || [];
  const totalPages = data?.data?.totalPages || 0;
  const totalElements = data?.data?.totalElements || 0;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Blog Posts
            </h1>
            <p className="text-gray-600">
              {totalElements} {totalElements === 1 ? 'post' : 'posts'} found
            </p>
          </div>
          
          {isAdmin() && (
            <Link
              to="/create-post"
              className="btn btn-primary btn-lg mt-4 md:mt-0"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Post
            </Link>
          )}
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="input"
            >
              <option value="id">Date</option>
              <option value="title">Title</option>
            </select>
            <button
              onClick={() => handleSortChange(sortBy)}
              className="btn btn-outline btn-sm"
            >
              {sortDir === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            No posts found
          </div>
          {isAdmin() && (
            <Link to="/create-post" className="btn btn-primary">
              Create your first post
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDeletePost}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
