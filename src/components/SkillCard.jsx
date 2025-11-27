import React, { useState } from 'react';
import { Star, MapPin, Globe, ExternalLink, Plus, Check } from 'lucide-react';

export default function SkillCard({ item, isEnrolled = false }) {
  const [enrolled, setEnrolled] = useState(isEnrolled);
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    if (enrolled) return;
    setLoading(true);
    const token = localStorage.getItem('sf_token');

    try {
      const res = await fetch('http://localhost:3000/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ platformId: item.id })
      });

      if (res.ok) {
        setEnrolled(true);
      } else {
        const data = await res.json();
        if (data.error === 'Already enrolled in this course') {
          setEnrolled(true);
        } else {
          alert(data.error || 'Failed to enroll');
        }
      }
    } catch (err) {
      console.error(err);
      alert('Failed to enroll');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark-card rounded-xl border border-slate-700 overflow-hidden hover:border-dark-accent transition-all hover:shadow-lg hover:shadow-blue-900/20 group flex flex-col h-full">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-dark-accent transition-colors line-clamp-2">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              {item.type === 'online' ? (
                <span className="flex items-center gap-1 text-emerald-400">
                  <Globe className="w-3 h-3" /> Online
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-400">
                  <MapPin className="w-3 h-3" /> Offline
                </span>
              )}
              <span>•</span>
              <span className="capitalize">{item.categories[0]}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg shrink-0">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-white">{item.rating}</span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {item.topCourse && (
            <div className="text-sm">
              <span className="text-slate-500">Top Course:</span>
              <p className="text-slate-300 font-medium line-clamp-1">{item.topCourse}</p>
            </div>
          )}

          {item.location && (
            <div className="text-sm">
              <span className="text-slate-500">Location:</span>
              <p className="text-slate-300 font-medium">{item.location.city}</p>
            </div>
          )}

          <div className="text-sm">
            <span className="text-slate-500">Languages:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {item.languages.slice(0, 3).map(lang => (
                <span key={lang} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-xs">
                  {lang}
                </span>
              ))}
              {item.languages.length > 3 && (
                <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-xs">+{item.languages.length - 3}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 mt-auto flex gap-3">
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-dark-accent text-slate-300 hover:text-white hover:bg-slate-800 py-2 rounded-lg text-sm font-medium transition-all"
          >
            Visit <ExternalLink className="w-4 h-4" />
          </a>
        )}

        <button
          onClick={handleEnroll}
          disabled={enrolled || loading}
          className={`flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${enrolled
            ? 'bg-emerald-500/10 text-emerald-400 cursor-default'
            : 'bg-dark-accent hover:bg-violet-600 text-white'
            }`}
        >
          {loading ? (
            '...'
          ) : enrolled ? (
            <>
              <Check className="w-4 h-4" /> Enrolled
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" /> Enroll
            </>
          )}
        </button>
      </div>
    </div>
  );
}
