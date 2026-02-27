'use client';

import React, { useMemo, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { supabase } from '@/lib/supabaseClient';

type Category = 'All' | 'Engineering' | 'Design' | 'Project Management' | 'Sales & BD';

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  category: Category;
  tags: string[];
  summary: string;
  salary?: string;
  department?: string;
}

const jobs: Job[] = [
  {
    id: 'senior-frontend-engineer',
    title: 'Senior Frontend Engineer',
    location: 'Pune / Remote',
    type: 'Full-time',
    experience: '4-7 years',
    category: 'Engineering',
    tags: ['React', 'Next.js', 'TypeScript'],
    summary: 'Own frontend architecture for web applications and mentor junior engineers.',
    department: 'Engineering',
    salary: 'Competitive + Benefits',
  },
  {
    id: 'fullstack-engineer',
    title: 'Full Stack Engineer',
    location: 'Pune / Remote',
    type: 'Full-time',
    experience: '3-6 years',
    category: 'Engineering',
    tags: ['Node.js', 'React', 'APIs'],
    summary: 'Work across the stack on greenfield builds and modernization projects.',
    department: 'Engineering',
    salary: 'Competitive + Benefits',
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    location: 'Hybrid - Pune',
    type: 'Full-time',
    experience: '3-5 years',
    category: 'Design',
    tags: ['Figma', 'Design Systems', 'UI/UX'],
    summary: 'Translate requirements into user journeys, wireframes, and polished interfaces.',
    department: 'Design',
    salary: 'Competitive + Benefits',
  },
  {
    id: 'project-manager',
    title: 'Technical Project Manager',
    location: 'Hybrid - Pune',
    type: 'Full-time',
    experience: '5-8 years',
    category: 'Project Management',
    tags: ['Agile', 'Client Communication', 'Delivery'],
    summary: 'Own delivery for multiple squads and manage stakeholders effectively.',
    department: 'Delivery',
    salary: 'Competitive + Benefits',
  },
  {
    id: 'business-development-manager',
    title: 'Business Development Manager',
    location: 'Mumbai / Pune',
    type: 'Full-time',
    experience: '4-7 years',
    category: 'Sales & BD',
    tags: ['B2B Sales', 'IT Services', 'Consultative Selling'],
    summary: 'Identify and close opportunities with startups and enterprises.',
    department: 'Sales',
    salary: 'Competitive + Benefits',
  },
];

const categories: Category[] = ['All', 'Engineering', 'Design', 'Project Management', 'Sales & BD'];
type Status = 'idle' | 'submitting' | 'success' | 'error';

interface JobApplicationFormProps {
  jobTitle: string;
  onClose: () => void;
}

function JobApplicationForm({ jobTitle, onClose }: JobApplicationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Name, email, and phone are required.');
      return;
    }

    setStatus('submitting');
    try {
      let attachmentPath: string | null = null;
      if (resumeFile) {
        const path = `applications/${Date.now()}-${resumeFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const { error: uploadError } = await supabase.storage
          .from('contact-attachments')
          .upload(path, resumeFile);
        if (uploadError) throw uploadError;
        attachmentPath = path;
      }

      const { error: insertError } = await supabase.from('job_applications').insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim() || null,
        job_title: jobTitle,
        attachment_path: attachmentPath,
      });
      if (insertError) throw insertError;
      setStatus('success');
    } catch (err) {
      console.error('Error submitting application', err);
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-background-card rounded-xl p-6 text-center border border-border">
        <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckIcon" size={22} className="text-success" />
        </div>
        <h4 className="font-heading font-700 text-heading-md text-foreground mb-2">
          Application sent
        </h4>
        <p className="font-body text-body-sm text-foreground-secondary mb-5">
          Thanks for applying for {jobTitle}. We will contact you soon.
        </p>
        <button
          onClick={onClose}
          className="text-primary hover:text-primary-dark font-body text-body-sm font-600 transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name*"
          className="w-full px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email*"
          className="w-full px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone*"
        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        placeholder="Why are you interested? (optional)"
        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg font-body text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
      />
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
        className="w-full text-[11px] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[11px] file:font-body file:bg-background-muted cursor-pointer"
      />
      {error && <p className="text-error text-[11px]">{error}</p>}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="flex-1 bg-primary hover:bg-primary-dark text-white font-body font-600 text-body-sm px-4 py-2.5 rounded-lg transition-all disabled:opacity-60"
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2.5 border border-border rounded-lg font-body text-body-sm text-foreground-secondary hover:bg-background-muted transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function SendResumeForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredRole, setPreferredRole] = useState('');
  const [message, setMessage] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  const submitResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;

    setStatus('submitting');
    try {
      let attachmentPath: string | null = null;
      if (resumeFile) {
        const path = `applications/${Date.now()}-${resumeFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const { error: uploadError } = await supabase.storage
          .from('contact-attachments')
          .upload(path, resumeFile);
        if (uploadError) throw uploadError;
        attachmentPath = path;
      }

      const { error: insertError } = await supabase.from('job_applications').insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim() || null,
        job_title: preferredRole.trim() || 'General Application',
        attachment_path: attachmentPath,
      });
      if (insertError) throw insertError;

      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setPreferredRole('');
      setMessage('');
      setResumeFile(null);
    } catch (err) {
      console.error('Error sending resume', err);
      setStatus('error');
    }
  };

  return (
    <form id="send-resume" onSubmit={submitResume} className="space-y-3">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name*"
        className="w-full px-3 py-2.5 rounded-lg border border-white/30 bg-white/95 text-foreground text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email*"
        className="w-full px-3 py-2.5 rounded-lg border border-white/30 bg-white/95 text-foreground text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone*"
        className="w-full px-3 py-2.5 rounded-lg border border-white/30 bg-white/95 text-foreground text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <input
        value={preferredRole}
        onChange={(e) => setPreferredRole(e.target.value)}
        placeholder="Preferred role"
        className="w-full px-3 py-2.5 rounded-lg border border-white/30 bg-white/95 text-foreground text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        placeholder="Short note (optional)"
        className="w-full px-3 py-2.5 rounded-lg border border-white/30 bg-white/95 text-foreground text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
      />
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
        className="w-full text-[11px] text-white/75 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-body file:bg-white/20 file:text-white hover:file:bg-white/30 cursor-pointer"
      />

      {status === 'success' && (
        <p className="text-[11px] text-green-200">Resume received. We will contact you soon.</p>
      )}
      {status === 'error' && (
        <p className="text-[11px] text-red-200">Could not submit right now. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white text-foreground font-body font-600 text-body-sm hover:bg-background-muted transition-all disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Resume'}
        {status !== 'submitting' && <Icon name="PaperAirplaneIcon" size={14} />}
      </button>
    </form>
  );
}

export default function OpenPositionsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('All Locations');
  const [draftSearchTerm, setDraftSearchTerm] = useState('');
  const [draftCategory, setDraftCategory] = useState<Category>('All');
  const [draftLocation, setDraftLocation] = useState('All Locations');

  const locations = useMemo(
    () => ['All Locations', ...Array.from(new Set(jobs.map((job) => job.location)))],
    []
  );

  const filteredJobs = useMemo(() => {
    const byCategory =
      activeCategory === 'All' ? jobs : jobs.filter((job) => job.category === activeCategory);
    const byLocation =
      location === 'All Locations'
        ? byCategory
        : byCategory.filter((job) => job.location === location);
    const query = searchTerm.trim().toLowerCase();
    if (!query) return byLocation;
    return byLocation.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.summary.toLowerCase().includes(query) ||
        job.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [activeCategory, location, searchTerm]);

  return (
    <section
      className="pt-0 pb-16 md:pb-24 bg-background relative z-30 overflow-visible"
      id="open-positions"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="container-custom relative">
        <div className="absolute z-40 left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl rounded-xl border border-border bg-background-card p-5 md:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <p className="font-heading text-body-base font-700 text-foreground">Job Search</p>
            <span className="font-body text-[11px] text-foreground-muted underline underline-offset-2">
              {filteredJobs.length} open positions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr_1fr_160px] gap-4">
            <div>
              <label className="block font-body text-[11px] text-foreground-muted mb-1">
                keyword
              </label>
              <input
                type="text"
                value={draftSearchTerm}
                onChange={(e) => setDraftSearchTerm(e.target.value)}
                placeholder="Search title or skills"
                className="w-full bg-transparent border-0 border-b border-border pb-2 px-0 font-body text-body-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-body text-[11px] text-foreground-muted mb-1">
                category
              </label>
              <select
                value={draftCategory}
                onChange={(e) => setDraftCategory(e.target.value as Category)}
                className="w-full bg-transparent border-0 border-b border-border pb-2 px-0 font-body text-body-sm focus:outline-none focus:border-primary"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-body text-[11px] text-foreground-muted mb-1">
                location
              </label>
              <select
                value={draftLocation}
                onChange={(e) => setDraftLocation(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-border pb-2 px-0 font-body text-body-sm focus:outline-none focus:border-primary"
              >
                {locations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchTerm(draftSearchTerm);
                setActiveCategory(draftCategory);
                setLocation(draftLocation);
              }}
              className="h-11 self-end border border-foreground/30 rounded-md font-body text-body-sm font-600 text-foreground hover:bg-background-muted transition-colors"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="pt-28 md:pt-32 grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
          <div>
            {filteredJobs.length === 0 ? (
              <div className="bg-background-card border border-dashed border-border rounded-2xl p-12 text-center">
                <Icon
                  name="BriefcaseIcon"
                  size={48}
                  className="text-foreground-muted mx-auto mb-4"
                />
                <h3 className="font-heading font-700 text-heading-md text-foreground mb-2">
                  No open positions
                </h3>
                <p className="font-body text-body-base text-foreground-secondary mb-4 max-w-md mx-auto">
                  We are not actively hiring in this category right now, but we are always happy to
                  connect.
                </p>
                <a
                  href="mailto:careers@intellisysitsolutions.com"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-body text-body-sm font-600 transition-colors"
                >
                  careers@intellisysitsolutions.com
                  <Icon name="ArrowRightIcon" size={14} />
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <article
                    key={job.id}
                    className="group bg-background-card border border-border rounded-2xl p-5 lg:p-6 hover:border-primary/30 hover:shadow-blue-sm transition-all duration-300"
                  >
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className="inline-flex px-2 py-1 bg-primary/5 rounded-md text-primary text-[10px] font-body font-600 uppercase tracking-wider">
                            {job.department || job.category}
                          </span>
                          <span className="text-[11px] font-body text-foreground-muted">
                            {job.type}
                          </span>
                        </div>
                        <h3 className="font-heading font-700 text-heading-md text-foreground mb-2 group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <p className="font-body text-body-sm text-foreground-secondary mb-4 max-w-3xl">
                          {job.summary}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {job.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-background-muted rounded-md text-foreground-muted text-[10px] font-body"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-[12px] font-body text-foreground-secondary">
                          <span className="flex items-center gap-1">
                            <Icon name="MapPinIcon" size={13} />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="ClockIcon" size={13} />
                            {job.experience}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="CurrencyRupeeIcon" size={13} />
                            {job.salary}
                          </span>
                        </div>
                      </div>
                      <div className="xl:w-44">
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 border border-border rounded-xl text-foreground font-body text-body-sm font-600 hover:bg-primary hover:text-white hover:border-primary transition-all"
                        >
                          Apply Now
                          <Icon name="ArrowRightIcon" size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 space-y-4">
            <div className="rounded-2xl bg-gradient-dark p-5 border border-border-card shadow-dark-card">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white/80 text-[10px] font-body mb-4">
                <Icon name="DocumentArrowUpIcon" size={12} />
                Quick Apply
              </div>
              <h3 className="font-heading font-700 text-heading-sm text-white mb-2">
                Send your resume
              </h3>
              <p className="font-body text-body-sm text-white/70 mb-4">
                Share your profile and we will map it to current or upcoming roles.
              </p>
              <SendResumeForm />
            </div>

            <div className="rounded-2xl bg-background-card border border-border p-5">
              <h4 className="font-heading font-700 text-heading-sm text-foreground mb-4">
                Career Contact
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:careers@intellisysitsolutions.com"
                  className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-background-muted transition-colors"
                >
                  <span className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                    <Icon name="EnvelopeIcon" size={14} className="text-primary" />
                  </span>
                  <span>
                    <p className="font-body text-[11px] text-foreground-muted">Email</p>
                    <p className="font-body text-body-sm text-foreground">
                      careers@intellisysitsolutions.com
                    </p>
                  </span>
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-background-muted transition-colors"
                >
                  <span className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                    <Icon name="PhoneIcon" size={14} className="text-primary" />
                  </span>
                  <span>
                    <p className="font-body text-[11px] text-foreground-muted">Phone</p>
                    <p className="font-body text-body-sm text-foreground">+91 98765 43210</p>
                  </span>
                </a>
                <div className="flex items-start gap-3 rounded-lg p-2.5">
                  <span className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                    <Icon name="BuildingOffice2Icon" size={14} className="text-primary" />
                  </span>
                  <span>
                    <p className="font-body text-[11px] text-foreground-muted">Office</p>
                    <p className="font-body text-body-sm text-foreground">Pune, Maharashtra</p>
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-body text-[11px] text-foreground-muted flex items-center gap-1.5">
                  <Icon name="ClockIcon" size={12} />
                  Typical response time: 2-3 business days
                </p>
              </div>
            </div>
          </aside>
        </div>

        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm">
            <div className="bg-background rounded-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading font-700 text-heading-md text-foreground mb-1">
                      {selectedJob.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] font-body text-foreground-secondary">
                      <span className="flex items-center gap-1">
                        <Icon name="MapPinIcon" size={12} />
                        {selectedJob.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="BriefcaseIcon" size={12} />
                        {selectedJob.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="ClockIcon" size={12} />
                        {selectedJob.experience}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="p-2 hover:bg-background-muted rounded-lg transition-colors"
                  >
                    <Icon name="XMarkIcon" size={20} className="text-foreground-muted" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <JobApplicationForm
                  jobTitle={selectedJob.title}
                  onClose={() => setSelectedJob(null)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
