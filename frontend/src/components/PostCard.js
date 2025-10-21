import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';

const PostCard = ({ post, onDelete }) => {
  const { isAdmin } = useAuth();

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(post.id);
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="card-content">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <Link 
              to={`/posts/${post.id}`}
              className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
            >
              {post.title}
            </Link>
            <p className="text-gray-600 mt-2 line-clamp-3">
              {post.description}
            </p>
          </div>
          
          {isAdmin() && (
            <div className="flex space-x-2 ml-4">
              <Link
                to={`/edit-post/${post.id}`}
                className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Edit className="w-4 h-4" />
              </Link>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Published {formatDistanceToNow(new Date(), { addSuffix: true })}</span>
            </div>
            {post.comments && (
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                <span>{post.comments.length} comments</span>
              </div>
            )}
          </div>
          
          <Link
            to={`/posts/${post.id}`}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
