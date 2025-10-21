import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { postsAPI } from '../services/api';
import { toast } from 'react-toastify';
import { Save, ArrowLeft, Trash2 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch post data
  const { data: postData, isLoading: isPostLoading, error } = useQuery(
    ['post', id],
    () => postsAPI.getById(id),
    {
      onSuccess: (data) => {
        reset(data.data);
      },
    }
  );

  const updatePostMutation = useMutation(
    (data) => postsAPI.update(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        queryClient.invalidateQueries(['post', id]);
        toast.success('Post updated successfully!');
        navigate(`/posts/${id}`);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update post');
      },
    }
  );

  const deletePostMutation = useMutation(
    () => postsAPI.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        toast.success('Post deleted successfully!');
        navigate('/');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to delete post');
      },
    }
  );

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await updatePostMutation.mutateAsync(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      deletePostMutation.mutate();
    }
  };

  if (isPostLoading) {
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
          Error loading post
        </div>
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Go Home
        </button>
      </div>
    );
  }

  const post = postData?.data;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline btn-sm mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
            <p className="text-gray-600 mt-2">
              Update your post content and settings
            </p>
          </div>
          <button
            onClick={handleDelete}
            disabled={deletePostMutation.isLoading}
            className="btn btn-danger"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Post
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card">
          <div className="card-content">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Post Title *
                </label>
                <input
                  {...register('title', {
                    required: 'Title is required',
                    minLength: {
                      value: 2,
                      message: 'Title must be at least 2 characters',
                    },
                  })}
                  type="text"
                  className="input"
                  placeholder="Enter a compelling title for your post"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  {...register('description', {
                    required: 'Description is required',
                    minLength: {
                      value: 10,
                      message: 'Description must be at least 10 characters',
                    },
                  })}
                  rows={3}
                  className="input"
                  placeholder="Write a brief description of your post"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  {...register('content', {
                    required: 'Content is required',
                  })}
                  rows={12}
                  className="input"
                  placeholder="Write your post content here..."
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.content.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {isLoading ? 'Updating...' : 'Update Post'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
