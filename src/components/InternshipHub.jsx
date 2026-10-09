import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Filter, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  Users
} from 'lucide-react';
import { DEPARTMENTS, INTERNSHIPS } from '../data/mockData';
import { sound } from '../utils/audio';

export default function InternshipHub({ 
  selectedDept, 
  setSelectedDept, 
  onLaunchChallenge, 
  atsData 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRemoteOnly, setFilterRemoteOnly] = useState(false);

  const handleDeptSelect = (deptId) => {
    sound.playClick();
    setSelectedDept(deptId);
  };

  const filteredInternships = INTERNSHIPS.filter((item) => {
    // Dept match
    if (selectedDept !== 'all' && item.department !== selectedDept) {
      return false;
    }
    // Search query
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchComp = item.company.toLowerCase().includes(q);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchComp && !matchTags) return false;
    }
    // Remote filter
    if (filterRemoteOnly && !item.location.toLowerCase().includes('remote')) {
      return false;
    }
    return true;
  });

  // Calculate dynamic match % based on scanned resume if available
  const getDynamicMatch = (item) => {
    if (!atsData || !atsData.departmentMatch) return item.matchScore;
    const deptScore = atsData.departmentMatch[item.department];
    if (deptScore) {
      return Math.min(99, Math.max(40, Math.round((deptScore + item.matchScore) / 2)));
    }
    return item.matchScore;
  };

  return (
    <div className="internships-container">
      {/* Hero Section */}
      <div className="section-header">
        <div className="header-badge">
          <Briefcase size={16} />
          <span>PRODUCTION-READY INTERNSHIP DISCOVERY MATRIX</span>
        </div>
        <h1 className="section-title">
          Department-Wise <span className="text-gradient-cyan">Verified Internships</span>
        </h1>
        <p className="section-subtitle">
          Direct recruitment channels with real compensation, zero LeetCode resume filters, and rapid 5-minute contextual verification micro-challenges.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="controls-bar">
        {/* Search Input */}
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search roles, companies (Vercel, Razorpay), or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Remote Checkbox */}
        <label className="filter-checkbox-label">
          <input
            type="checkbox"
            checked={filterRemoteOnly}
            onChange={(e) => {
              sound.playClick();
              setFilterRemoteOnly(e.target.checked);
            }}
          />
          <span>Remote Roles Only</span>
        </label>
      </div>

      {/* Department Tabs */}
      <div className="dept-tabs-wrapper">
        {DEPARTMENTS.map((dept) => {
          const isSelected = selectedDept === dept.id;
          return (
            <button
              key={dept.id}
              className={`dept-tab-btn ${isSelected ? 'active' : ''}`}
              onClick={() => handleDeptSelect(dept.id)}
            >
              <span>{dept.name}</span>
            </button>
          );
        })}
      </div>

      {/* Internship Cards Grid */}
      <div className="internship-cards-grid">
        {filteredInternships.length === 0 ? (
          <div className="empty-state-box">
            <Filter size={36} className="empty-icon" />
            <h3>No internships match your current filters.</h3>
            <p>Try searching for different keywords or select "All Departments".</p>
            <button 
              className="btn-reset-filter"
              onClick={() => {
                setSelectedDept('all');
                setSearchQuery('');
                setFilterRemoteOnly(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredInternships.map((job) => {
            const matchPercent = getDynamicMatch(job);
            return (
              <div key={job.id} className="job-card">
                {/* Card Top Row */}
                <div className="card-top">
                  <div className="company-badge-box">
                    <div className="company-initial">{job.company.charAt(0)}</div>
                    <div>
                      <h4 className="company-name">{job.company}</h4>
                      <div className="job-location">
                        <MapPin size={12} />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="match-pill">
                    <TrendingUp size={13} />
                    <span>{matchPercent}% Match</span>
                  </div>
                </div>

                {/* Job Title */}
                <h3 className="job-title">{job.title}</h3>
                <p className="job-desc">{job.description}</p>

                {/* Key Metrics */}
                <div className="job-metrics-row">
                  <div className="metric-chip">
                    <DollarSign size={14} className="metric-icon green" />
                    <span>{job.stipend}</span>
                  </div>
                  <div className="metric-chip">
                    <Clock size={14} className="metric-icon cyan" />
                    <span>{job.duration}</span>
                  </div>
                  <div className="metric-chip">
                    <Users size={14} className="metric-icon purple" />
                    <span>{job.applicants} applied</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="job-tags-row">
                  {job.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="job-tech-tag">{tag}</span>
                  ))}
                </div>

                {/* Anti-Cheat Micro Task Banner */}
                <div className="anti-cheat-card-banner">
                  <ShieldCheck size={14} className="shield-icon" />
                  <span>5-Min Micro Task Required (No LeetCode)</span>
                </div>

                {/* CTA Footer */}
                <div className="job-card-footer">
                  <button
                    className="btn-start-challenge"
                    onClick={() => {
                      sound.playClick();
                      onLaunchChallenge(job.challengeId);
                    }}
                  >
                    <Zap size={16} />
                    <span>Start 5-Min Assessment</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
