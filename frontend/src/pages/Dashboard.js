// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { CheckSquare, Clock, AlertCircle, TrendingUp, Calendar, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../config/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/tasks?limit=5');
      const tasks = response.data.tasks;
      
      setRecentTasks(tasks);
      
      // Calculate stats
      const statsData = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'pending').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length
      };
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'in-progress': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'completed': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Welcome back, {userProfile?.name}!
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Here's an overview of your tasks and activity. Stay organized and productive with your personalized dashboard.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
                <p className="text-slate-600 font-medium">Total Tasks</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <CheckSquare className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-800">{stats.pending}</p>
                <p className="text-slate-600 font-medium">Pending</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-800">{stats.inProgress}</p>
                <p className="text-slate-600 font-medium">In Progress</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-800">{stats.completed}</p>
                <p className="text-slate-600 font-medium">Completed</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <CheckSquare className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-slate-800 to-slate-700">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Calendar className="h-6 w-6 mr-3" />
              Recent Tasks
            </h2>
          </div>
          <div className="p-8">
            {recentTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-4">
                  <AlertCircle className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No tasks yet</h3>
                <p className="text-slate-600">Get started by creating your first task to stay organized.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div key={task._id} className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                          {task.title}
                        </h4>
                        <p className="text-slate-600 mb-4 leading-relaxed">{task.description}</p>
                        <div className="flex items-center flex-wrap gap-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
                            {task.status.replace('-', ' ')}
                          </span>
                          <span className="text-sm text-slate-500 flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            Created by {task.createdBy?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;