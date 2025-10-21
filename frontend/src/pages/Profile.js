import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Calendar, Shield } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-2">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-900">Account Information</h2>
            </div>
            <div className="card-content">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {user?.name || 'User Name'}
                    </h3>
                    <p className="text-gray-600">@{user?.username || 'username'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{user?.name || 'Not provided'}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">@{user?.username || 'Not provided'}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{user?.email || 'Not provided'}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Role Information */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Account Type</h3>
            </div>
            <div className="card-content">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary-600" />
                <span className="font-medium text-gray-900">
                  {user?.roles?.some(role => role.name === 'ADMIN') ? 'Administrator' : 'User'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {user?.roles?.some(role => role.name === 'ADMIN') 
                  ? 'You have administrative privileges and can create, edit, and delete posts.'
                  : 'You can view and comment on posts.'
                }
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="card-content">
              <div className="space-y-3">
                <button
                  onClick={logout}
                  className="btn btn-outline w-full"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Account Stats</h3>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Created</span>
                  <span className="font-medium text-gray-900">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Comments Made</span>
                  <span className="font-medium text-gray-900">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Status</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
