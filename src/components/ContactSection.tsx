import React, { useState } from 'react';
import { CONFIG } from '../data/config';
import { NeonTitle } from './NeonTitle';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const [status, setStatus] = useState<{ msg: string; isError: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rules = {
    name: (v: string) => v.trim().length >= 2,
    email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    subject: (v: string) => v.trim().length >= 2,
    message: (v: string) => v.trim().length >= 10
  };

  const isFieldValid = (field: keyof typeof formData) => rules[field](formData[field]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    const validName = isFieldValid('name');
    const validEmail = isFieldValid('email');
    const validSubject = isFieldValid('subject');
    const validMessage = isFieldValid('message');

    if (!validName || !validEmail || !validSubject || !validMessage) {
      setStatus({ msg: 'Fix the highlighted fields and send again.', isError: true });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      if (CONFIG.formEndpoint) {
        const res = await fetch(CONFIG.formEndpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error('Failed to send');
        setStatus({ msg: `Thanks, ${formData.name.trim()}. Your message was sent.`, isError: false });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTouched({ name: false, email: false, subject: false, message: false });
      } else {
        const mailtoLink = `mailto:${CONFIG.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
          formData.message + '\n\n' + formData.name + ' (' + formData.email + ')'
        )}`;
        window.location.href = mailtoLink;
        setStatus({
          msg: `Your email client should open with the message ready. If it doesn’t, write directly to ${CONFIG.email}.`,
          isError: false
        });
      }
    } catch {
      setStatus({
        msg: `The message didn't send. Try again, or write directly to ${CONFIG.email}.`,
        isError: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="home-section">
      <NeonTitle title="Contact" />
      <div className="wrap contact-grid">
        <form className="form" onSubmit={handleSubmit} noValidate>
          {/* Name Field */}
          <div className={`field rv in ${touched.name && !isFieldValid('name') ? 'bad' : ''}`} style={{ '--d': '.05s' } as React.CSSProperties}>
            <label className="sr" htmlFor="f-name">Your Name</label>
            <input
              id="f-name"
              name="name"
              type="text"
              placeholder="Your Name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              aria-describedby="err-name"
              aria-invalid={touched.name && !isFieldValid('name')}
              required
              maxLength={100}
            />
            <p className="err" id="err-name">Enter at least 2 characters for your name.</p>
          </div>

          {/* Email Field */}
          <div className={`field rv in ${touched.email && !isFieldValid('email') ? 'bad' : ''}`} style={{ '--d': '.13s' } as React.CSSProperties}>
            <label className="sr" htmlFor="f-email">Your Email</label>
            <input
              id="f-email"
              name="email"
              type="email"
              placeholder="Your Email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              aria-describedby="err-email"
              aria-invalid={touched.email && !isFieldValid('email')}
              required
              maxLength={254}
            />
            <p className="err" id="err-email">Enter a valid email address, like name@example.com.</p>
          </div>

          {/* Subject Field */}
          <div className={`field rv in ${touched.subject && !isFieldValid('subject') ? 'bad' : ''}`} style={{ '--d': '.21s' } as React.CSSProperties}>
            <label className="sr" htmlFor="f-subject">Subject</label>
            <input
              id="f-subject"
              name="subject"
              type="text"
              placeholder="Subject"
              autoComplete="off"
              value={formData.subject}
              onChange={handleChange}
              onBlur={() => handleBlur('subject')}
              aria-describedby="err-subject"
              aria-invalid={touched.subject && !isFieldValid('subject')}
              required
              maxLength={160}
            />
            <p className="err" id="err-subject">Add a subject with at least 2 characters.</p>
          </div>

          {/* Message Field */}
          <div className={`field rv in ${touched.message && !isFieldValid('message') ? 'bad' : ''}`} style={{ '--d': '.29s' } as React.CSSProperties}>
            <label className="sr" htmlFor="f-message">Your message</label>
            <textarea
              id="f-message"
              name="message"
              placeholder="Write your message here"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              onBlur={() => handleBlur('message')}
              aria-describedby="err-message"
              aria-invalid={touched.message && !isFieldValid('message')}
              required
              maxLength={5000}
            />
            <p className="err" id="err-message">Write at least 10 characters.</p>
          </div>

          <button
            className={`send rv in ${isSubmitting ? 'busy' : ''}`}
            style={{ '--d': '.37s' } as React.CSSProperties}
            type="submit"
            disabled={isSubmitting}
          >
            <span className="send-label">{isSubmitting ? 'Sending' : 'Send Message'}</span>
          </button>

          <p
            className={`status ${status?.isError ? 'bad' : ''}`}
            id="status"
            role="status"
            aria-live="polite"
          >
            {status?.msg}
          </p>
        </form>

        {/* Google Map */}
        <div className="map rv in" style={{ '--d': '.15s' } as React.CSSProperties} id="map">
          <span className="nb" aria-hidden="true"><i /></span>
          <iframe
            id="map-frame"
            title={`Google Map showing ${CONFIG.location}`}
            src="https://www.google.com/maps?q=National+Technical+Training+Institute+NTTI+Phnom+Penh+Cambodia&hl=en&z=16&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            className="open"
            id="maps-link"
            href={CONFIG.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Maps
            <span className="sr"> (opens in a new tab)</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
            </svg>
          </a>
          <span className="place">{CONFIG.location}</span>
        </div>
      </div>
    </div>
  );
};
