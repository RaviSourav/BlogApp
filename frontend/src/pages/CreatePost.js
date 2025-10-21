import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { postsAPI } from '../services/api';
import { toast } from 'react-toastify';
import { Save, ArrowLeft } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const CreatePost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createPostMutation = useMutation(postsAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      toast.success('Post created successfully!');
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create post');
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await createPostMutation.mutateAsync(data);
    } finally {
      setIsLoading(false);
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
        <p className="text-gray-600 mt-2">
          Share your thoughts and ideas with the community
        </p>
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
                {isLoading ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
