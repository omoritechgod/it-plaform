import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play, CheckCircle, Clock, Trophy, Target, Zap, Star } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  completed: boolean;
  locked: boolean;
  lessons: number;
  type: 'video' | 'reading' | 'practice';
}

export const LearningHub: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState('frontend');
  const [streakCount, setStreakCount] = useState(7);

  const tracks = [
    { id: 'frontend', name: 'Frontend Development', icon: '⚛️' },
    { id: 'backend', name: 'Backend Development', icon: '🔧' },
    { id: 'design', name: 'UI/UX Design', icon: '🎨' },
    { id: 'mobile', name: 'Mobile Development', icon: '📱' },
  ];

  const modules: Module[] = [
    {
      id: '1',
      title: 'HTML & CSS Fundamentals',
      description: 'Master the building blocks of web development',
      duration: '4 hours',
      level: 'beginner',
      progress: 100,
      completed: true,
      locked: false,
      lessons: 12,
      type: 'video',
    },
    {
      id: '2',
      title: 'JavaScript Essentials',
      description: 'Learn modern JavaScript programming concepts',
      duration: '6 hours',
      level: 'beginner',
      progress: 75,
      completed: false,
      locked: false,
      lessons: 18,
      type: 'video',
    },
    {
      id: '3',
      title: 'React Fundamentals',
      description: 'Build dynamic user interfaces with React',
      duration: '8 hours',
      level: 'intermediate',
      progress: 30,
      completed: false,
      locked: false,
      lessons: 24,
      type: 'video',
    },
    {
      id: '4',
      title: 'Advanced React Patterns',
      description: 'Master advanced React concepts and patterns',
      duration: '10 hours',
      level: 'advanced',
      progress: 0,
      completed: false,
      locked: true,
      lessons: 20,
      type: 'video',
    },
    {
      id: '5',
      title: 'State Management with Redux',
      description: 'Learn to manage complex application state',
      duration: '6 hours',
      level: 'intermediate',
      progress: 0,
      completed: false,
      locked: true,
      lessons: 15,
      type: 'practice',
    },
  ];

  const achievements = [
    { title: 'First Module Complete', icon: '🎯', earned: true },
    { title: '7-Day Streak', icon: '🔥', earned: true },
    { title: 'JavaScript Master', icon: '⚡', earned: false },
    { title: 'React Developer', icon: '⚛️', earned: false },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-green-600 bg-green-50';
      case 'intermediate': return 'text-yellow-600 bg-yellow-50';
      case 'advanced': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'reading': return <BookOpen className="w-4 h-4" />;
      case 'practice': return <Target className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Learning Hub</h1>
          <p className="text-gray-600 mt-2">Continue your learning journey</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-lg">
            <Zap className="w-5 h-5 text-orange-600" />
            <span className="font-semibold text-orange-600">{streakCount} day streak!</span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Modules Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {modules.filter(m => m.completed).length}/{modules.length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hours Learned</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900">{streakCount} days</p>
            </div>
            <Zap className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-gray-900">
                {achievements.filter(a => a.earned).length}
              </p>
            </div>
            <Trophy className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Learning Tracks */}
      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Learning Tracks</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {tracks.map((track) => (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={`
                p-4 text-left border-2 rounded-lg transition-all duration-200
                ${selectedTrack === track.id
                  ? 'border-[#007bff] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="text-2xl mb-2">{track.icon}</div>
              <p className="font-medium text-gray-900">{track.name}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Course Modules</h3>
            <div className="space-y-4">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`
                    p-4 border rounded-lg transition-all duration-200
                    ${module.locked 
                      ? 'border-gray-200 bg-gray-50 opacity-60' 
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`
                          w-10 h-10 rounded-lg flex items-center justify-center
                          ${module.completed 
                            ? 'bg-green-100 text-green-600' 
                            : module.locked
                            ? 'bg-gray-100 text-gray-400'
                            : 'bg-blue-100 text-blue-600'
                          }
                        `}>
                          {module.completed ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            getTypeIcon(module.type)
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{module.title}</h4>
                          <p className="text-sm text-gray-600">{module.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span>{module.lessons} lessons</span>
                        <span>•</span>
                        <span>{module.duration}</span>
                        <span>•</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(module.level)}`}>
                          {module.level}
                        </span>
                      </div>

                      {!module.locked && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{module.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-[#0f266c] to-[#007bff] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${module.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="ml-4">
                      {module.locked ? (
                        <div className="text-gray-400 text-sm">Locked</div>
                      ) : module.completed ? (
                        <Button variant="outline" size="sm">Review</Button>
                      ) : (
                        <Button size="sm">
                          {module.progress > 0 ? 'Continue' : 'Start'}
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center space-x-3 p-3 rounded-lg
                    ${achievement.earned 
                      ? 'bg-yellow-50 border border-yellow-200' 
                      : 'bg-gray-50 border border-gray-200'
                    }
                  `}
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <p className={`font-medium ${
                      achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                    }`}>
                      {achievement.title}
                    </p>
                    {achievement.earned && (
                      <div className="flex items-center space-x-1 text-xs text-yellow-600">
                        <Star className="w-3 h-3" />
                        <span>Earned</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Study Streak */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Streak</h3>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">{streakCount}</p>
              <p className="text-gray-600 mb-4">days in a row</p>
              <Button 
                onClick={() => setStreakCount(streakCount + 1)}
                className="w-full"
              >
                Mark Today Complete
              </Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Take Skill Test
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Practice Projects
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Trophy className="w-4 h-4 mr-2" />
                View Certificates
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};