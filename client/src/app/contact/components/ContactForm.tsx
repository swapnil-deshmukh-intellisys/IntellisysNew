'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { supabase } from '@/lib/supabaseClient';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const serviceOptions = [
  'Website Development',
  'Mobile App Development',
  'Full Stack Development',
  'Cloud Solutions',
  'Cybersecurity',
  'UI/UX Design',
  'Software Testing',
  'Multiple Services',
  'Not Sure - Need Consultation',
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [requirementFile, setRequirementFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required.';
    } else {
      const digits = formData.phone.replace(/\D/g, '');
      if (digits.length < 7) {
        newErrors.phone = 'Please enter a valid mobile number.';
      }
    }
    if (!formData.service) newErrors.service = 'Please select a service.';
    if (!formData.message.trim()) newErrors.message = 'Please describe your project.';
    else if (formData.message.trim().length < 20) newErrors.message = 'Please provide at least 20 characters.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setRequirementFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    setErrors((prev) => ({ ...prev, submit: '' }));

    try {
      let attachmentPath: string | null = null;

      if (requirementFile) {
        const safeName = requirementFile.name.replace(/[^a-zA-Z0-9.]/g, '_');
        const path = `inquiries/${Date.now()}-${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from('contact-attachments')
          .upload(path, requirementFile);

        if (uploadError) throw uploadError;
        attachmentPath = path;
      }

      const { error: insertError } = await supabase.from('contact_inquiries').insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim() || null,
        service: formData.service,
        message: formData.message.trim(),
        attachment_path: attachmentPath,
      });

      if (insertError) throw insertError;

      setStatus('success');
    } catch (err) {
      console.error('Error submitting contact form to Supabase:', err);
      setStatus('error');
      setErrors((prev) => ({
        ...prev,
        submit:
          'Something went wrong while sending your inquiry. Please try again in a moment.',
      }));
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3.5 bg-background-muted border rounded-xl font-body text-body-base text-foreground placeholder:text-foreground-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${
      errors[field] ? 'border-error bg-red-50' : 'border-border hover:border-primary/30'
    }`;

  if (status === 'success') {
    return (
      <div className="bg-background-card rounded-3xl border border-border shadow-lg-card p-12 text-center">
        <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircleIcon" size={40} className="text-success" />
        </div>
        <h3 className="font-heading font-800 text-display-sm text-foreground mb-3">
          Message Received!
        </h3>
        <p className="font-body text-body-lg text-foreground-secondary mb-6 max-w-md mx-auto">
          Thank you, <strong>{formData.name}</strong>. Our team will review your inquiry and 
          reach out within 24 business hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              setStatus('idle');
              setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
              setRequirementFile(null);
            }}
            className="px-6 py-3 bg-background-muted border border-border text-foreground font-heading font-600 text-body-sm rounded-xl hover:bg-primary-50 hover:border-primary/30 transition-all duration-200"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-card rounded-3xl border border-border shadow-lg-card overflow-hidden">
      {/* Form Header */}
      <div className="p-7 border-b border-border bg-background-elevated">
        <h2 className="font-heading font-800 text-display-sm text-foreground mb-1">
          Tell Us About Your Project
        </h2>
        <p className="font-body text-body-sm text-foreground-secondary">
          Fill out the form below and we'll prepare a custom proposal for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-7 space-y-5" noValidate>
        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block font-heading font-600 text-body-sm text-foreground mb-2">
              Full Name <span className="text-error">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Arjun Mehta"
              value={formData.name}
              onChange={handleChange}
              className={inputClass('name')}
              aria-describedby={errors.name ? 'name-error' : undefined}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p id="name-error" className="mt-1.5 font-body text-caption text-error flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={12} />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block font-heading font-600 text-body-sm text-foreground mb-2">
              Email Address <span className="text-error">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="arjun@company.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass('email')}
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 font-body text-caption text-error flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={12} />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Phone + Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="phone" className="block font-heading font-600 text-body-sm text-foreground mb-2">
              Phone Number <span className="text-error">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-body-sm text-foreground-muted">+91</span>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="91128 17771"
                value={formData.phone}
                onChange={handleChange}
                className={`${inputClass('phone')} pl-14`}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                aria-invalid={!!errors.phone}
              />
            </div>
            {errors.phone && (
              <p id="phone-error" className="mt-1.5 font-body text-caption text-error flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={12} />
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block font-heading font-600 text-body-sm text-foreground mb-2">
              Company / Organization (Optional)
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Acme Technologies Pvt. Ltd."
              value={formData.company}
              onChange={handleChange}
              className={inputClass('company')}
            />
          </div>
        </div>

        {/* Row 3: Service + Requirement Document */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="service" className="block font-heading font-600 text-body-sm text-foreground mb-2">
              Service Needed <span className="text-error">*</span>
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`${inputClass('service')} cursor-pointer`}
              aria-describedby={errors.service ? 'service-error' : undefined}
              aria-invalid={!!errors.service}
            >
              <option value="">Select a service...</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.service && (
              <p id="service-error" className="mt-1.5 font-body text-caption text-error flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={12} />
                {errors.service}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="requirementFile" className="block font-heading font-600 text-body-sm text-foreground mb-2">
              Attach Requirement Document (PDF, Optional)
            </label>
            <input
              id="requirementFile"
              name="requirementFile"
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              className="block w-full text-body-sm text-foreground file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-body-sm file:font-heading file:font-600 file:bg-background-muted file:text-foreground hover:file:bg-background-elevated cursor-pointer"
            />
            <p className="mt-1.5 font-body text-caption text-foreground-muted">
              Optional: upload a detailed requirements PDF (max 1 file).
            </p>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block font-heading font-600 text-body-sm text-foreground mb-2">
            Project Description <span className="text-error">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Describe your project, goals, current challenges, and any specific requirements. The more detail you provide, the more accurate our proposal will be."
            value={formData.message}
            onChange={handleChange}
            className={`${inputClass('message')} resize-none`}
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-invalid={!!errors.message}
          />
          <div className="flex items-center justify-between mt-1.5">
            {errors.message ? (
              <p id="message-error" className="font-body text-caption text-error flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={12} />
                {errors.message}
              </p>
            ) : (
              <span />
            )}
            <span className="font-mono text-caption text-foreground-muted">
              {formData.message.length} chars
            </span>
          </div>
        </div>

        {/* Privacy Note */}
        <p className="font-body text-caption text-foreground-muted">
          By submitting this form, you agree to our{' '}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>. 
          Your information is never shared with third parties. We'll sign an NDA on request.
        </p>

        {/* Submit */}
        {errors.submit && (
          <p className="font-body text-caption text-error flex items-center gap-1 mb-2">
            <Icon name="ExclamationCircleIcon" size={12} />
            {errors.submit}
          </p>
        )}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-primary text-white font-heading font-700 text-body-base rounded-2xl shadow-blue hover:shadow-blue-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {status === 'submitting' ? (
            <>
              <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Sending Your Inquiry...
            </>
          ) : (
            <>
              Send Project Inquiry
              <Icon name="PaperAirplaneIcon" size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
