import React, { useState, useEffect } from 'react';
import SkillCard from './SkillCard';
import { BookOpen } from 'lucide-react';

export default function MyLearning() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('sf_token');
    fetch('http://localhost:3000/api/enrollments', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setEnrollments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch enrollments", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-slate-400 py-12">Loading your courses...</div>;
  }

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-dark-accent" />
          My Learning
        </h2>

        {enrollments.length === 0 ? (
          <div className="text-center py-12 bg-dark-card rounded-xl border border-slate-700">
            <p className="text-slate-400 text-lg">You haven't enrolled in any courses yet.</p>
            <p className="text-slate-500 mt-2">Explore the dashboard to find skills to learn!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map(enrollment => (
              <SkillCard
                key={enrollment.id}
                item={enrollment.platform}
                isEnrolled={true}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
