export type Role = 'super_admin' | 'admin' | 'editor' | 'recruiter' | 'sales_ops' | 'viewer';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'won' | 'lost' | 'spam';
export type ApplicationStatus = 'new' | 'screening' | 'interview' | 'shortlisted' | 'hired' | 'rejected' | 'archived';
export type JobStatus = 'draft' | 'published' | 'paused' | 'closed';
export type CmsPageSlug = 'homepage' | 'services' | 'technologies' | 'careers' | 'contact' | 'header' | 'footer';

export interface AdminSessionPayload {
  userId: string;
  email: string;
  role: Role;
  displayName: string;
  exp: number;
}