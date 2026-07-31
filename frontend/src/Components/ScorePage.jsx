import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResumeStore } from '../Store/resume.Store';
import { ArrowLeft, Loader2, Sparkles, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

function ScorePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { scoreData, scoreLoading, getScore } = useResumeStore();
  const [checklist, setChecklist] = useState([]);

  useEffect(() => {
    // Only call getScore from backend if we have a real database ID
    if (id && id !== 'upload') {
      getScore(id);
    }
  }, [id, getScore]);

  // Sync checklist when report loads
  useEffect(() => {
    if (scoreData?.report) {
      const items = [
        ...(scoreData.report.criticalFixes || []).map((text) => ({ text, type: 'critical', checked: false })),
        ...(scoreData.report.enhancements || []).map((text) => ({ text, type: 'enhancement', checked: false })),
      ];
      setChecklist(items);
    }
  }, [scoreData]);

  const toggleChecklist = (index) => {
    setChecklist((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, checked: !item.checked } : item))
    );
  };

  if (scoreLoading) {
    return (
      <div className="h-screen w-screen flex flex-col gap-4 items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Loader2 className="size-12 text-blue-600 animate-spin" />
        <p className="text-slate-600 font-medium text-lg animate-pulse">Running ATS audits & generating LLM insights...</p>
      </div>
    );
  }

  if (!scoreData) {
    return (
      <div className="h-screen w-screen flex flex-col gap-4 items-center justify-center bg-slate-50">
        <AlertTriangle className="size-16 text-amber-500" />
        <h2 className="text-2xl font-bold text-slate-800">Score Data Unavailable</h2>
        <button onClick={() => navigate('/build')} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-md hover:bg-blue-700 transition">
          Go to Dashboard
        </button>
      </div>
    );
  }

  const { score, breakdown, report } = scoreData;

  const getScoreColor = (val) => {
    if (val >= 75) return 'text-emerald-500';
    if (val >= 50) return 'text-amber-500';
    return 'text-rose-500';
  };

  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 pt-24 pb-12 px-4 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <button 
            onClick={() => navigate('/build')}
            className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 hover:text-blue-600 rounded-xl shadow-sm hover:shadow border border-slate-100 font-medium transition self-start"
          >
            <ArrowLeft className="size-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 bg-gradient-to-r from-slate-800 to-indigo-900 bg-clip-text text-transparent">
              ATS Review & Report Card
            </h1>
            <Sparkles className="text-yellow-500 fill-yellow-500 size-6" />
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Score Wheel (Left Column) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
              <h2 className="text-lg font-bold text-slate-700 mb-6 uppercase tracking-wider">Overall ATS Score</h2>
              
              <div className="relative flex items-center justify-center">
                <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                  <circle
                    stroke="#F1F5F9"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                  />
                  <circle
                    stroke={score >= 75 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444'}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className={`text-4xl font-black ${getScoreColor(score)}`}>{score}</span>
                  <span className="text-xs font-bold text-slate-400">/ 100</span>
                </div>
              </div>

              <div className="mt-6">
                <span className={`px-4 py-1.5 rounded-full text-sm font-extrabold uppercase tracking-wide bg-slate-50 ${getScoreColor(score)}`}>
                  {score >= 75 ? 'Ready to Apply' : score >= 50 ? 'Needs Tweaks' : 'Critical Fixes Needed'}
                </span>
                <p className="text-slate-500 text-sm mt-4 px-4 leading-relaxed">
                  {report?.summaryAnalysis || "Based on rule validation and local ATS parser results."}
                </p>
              </div>
            </div>

            {/* Local Section Breakdown */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl">
              <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3 border-slate-100">Section Analysis</h3>
              <div className="flex flex-col gap-5">
                {breakdown.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-slate-600">{item.section}</span>
                      <span className="text-slate-800">{item.score} / {item.max}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          (item.score / item.max) >= 0.75 ? 'bg-emerald-500' : (item.score / item.max) >= 0.5 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${(item.score / item.max) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights & Checklist (Right Column) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-indigo-600 size-5" />
                <h3 className="text-xl font-bold text-slate-800">Smart AI Insights</h3>
              </div>

              {/* Critical Fixes */}
              <div className="mb-6">
                <h4 className="flex items-center gap-2 text-rose-600 font-extrabold text-sm uppercase tracking-wide mb-3">
                  <AlertCircle className="size-4" />
                  Critical Improvements (Fix First)
                </h4>
                <ul className="flex flex-col gap-2">
                  {report?.criticalFixes?.map((fix, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-600 text-sm bg-rose-50/50 p-3 rounded-xl border border-rose-100/50">
                      <span className="text-rose-500 font-bold">•</span>
                      {fix}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div>
                <h4 className="flex items-center gap-2 text-indigo-600 font-extrabold text-sm uppercase tracking-wide mb-3">
                  <AlertTriangle className="size-4" />
                  Suggested Enhancements
                </h4>
                <ul className="flex flex-col gap-2">
                  {report?.enhancements?.map((enh, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-600 text-sm bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50">
                      <span className="text-indigo-500 font-bold">•</span>
                      {enh}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Priority Checklist</h3>
              <p className="text-slate-500 text-xs mb-6">Mark items off as you edit and update your resume.</p>
              
              <div className="flex flex-col gap-3">
                {checklist.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => toggleChecklist(idx)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                      item.checked 
                        ? 'bg-slate-50 border-slate-200 opacity-60 line-through text-slate-400' 
                        : item.type === 'critical'
                          ? 'bg-white border-rose-100 hover:border-rose-300 text-slate-700'
                          : 'bg-white border-indigo-100 hover:border-indigo-300 text-slate-700'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      checked={item.checked} 
                      onChange={() => {}}
                      className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm font-medium leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ScorePage;

