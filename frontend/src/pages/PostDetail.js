import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { postsAPI, commentsAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { 
  Calendar, 
  User, 
  MessageCircle, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Send
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatDistanceToNow } from 'date-fns';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAdmin } = useAuth();
  const [showCommentForm, setShowCommentForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch post data
  const { data: postData, isLoading: isPostLoading, error } = useQuery(
    ['post', id],
    () => postsAPI.getById(id)
  );

  // Fetch comments
  const { data: commentsData, isLoading: isCommentsLoading } = useQuery(
    ['comments', id],
    () => commentsAPI.getByPostId(id)
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

  const createCommentMutation = useMutation(
    (data) => commentsAPI.create(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', id]);
        toast.success('Comment added successfully!');
        reset();
        setShowCommentForm(false);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to add comment');
      },
    }
  );

  const handleDeletePost = () => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      deletePostMutation.mutate();
    }
  };

  const onSubmitComment = (data) => {
    createCommentMutation.mutate(data);
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
  const comments = commentsData?.data || [];

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
      </div>

      {post && (
        <div className="space-y-8">
          {/* Post Content */}
          <article className="card">
            <div className="card-header">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {post.title}
                  </h1>
                  <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Published {formatDistanceToNow(new Date(), { addSuffix: true })}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      <span>{comments.length} comments</span>
                    </div>
                  </div>
                </div>
                
                {isAdmin() && (
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => navigate(`/edit-post/${post.id}`)}
                      className="btn btn-outline btn-sm"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={handleDeletePost}
                      disabled={deletePostMutation.isLoading}
                      className="btn btn-danger btn-sm"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="card-content">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {post.description}
                </p>
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {post.content}
                </div>
              </div>
            </div>
          </article>

          {/* Comments Section */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-900">
                Comments ({comments.length})
              </h2>
            </div>
            
            <div className="card-content">
              {/* Add Comment Form */}
              {!showCommentForm ? (
                <button
                  onClick={() => setShowCommentForm(true)}
                  className="btn btn-outline w-full mb-6"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Add a Comment
                </button>
              ) : (
                <form onSubmit={handleSubmit(onSubmitComment)} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add a Comment</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name *
                        </label>
                        <input
                          {...register('name', {
                            required: 'Name is required',
                          })}
                          type="text"
                          className="input"
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address',
                            },
                          })}
                          type="email"
                          className="input"
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Comment *
                      </label>
                      <textarea
                        {...register('body', {
                          required: 'Comment is required',
                          minLength: {
                            value: 10,
                            message: 'Comment must be at least 10 characters',
                          },
                        })}
                        rows={4}
                        className="input"
                        placeholder="Share your thoughts..."
                      />
                      {errors.body && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.body.message}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowCommentForm(false)}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={createCommentMutation.isLoading}
                        className="btn btn-primary"
                      >
                        {createCommentMutation.isLoading ? (
                          <LoadingSpinner size="sm" className="mr-2" />
                        ) : (
                          <Send className="w-4 h-4 mr-2" />
                        )}
                        {createCommentMutation.isLoading ? 'Posting...' : 'Post Comment'}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Comments List */}
              {isCommentsLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No comments yet. Be the first to comment!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-gray-900">{comment.name}</h4>
                            <span className="text-sm text-gray-500">
                              {formatDistanceToNow(new Date(), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {comment.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
