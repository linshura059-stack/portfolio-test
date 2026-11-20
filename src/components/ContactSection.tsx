import { useState } from 'react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';
import { useReveal } from '../hooks/useReveal';
import { NeonTitle } from './NeonTitle';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FieldName = keyof FormValues;

const VALIDATION_RULES: Record<FieldName, (v: string) => boolean> = {
  name: (v) => v.trim().length >= 2,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  subject: (v) => v.trim().length >= 2,
  message: (v) => v.trim().length >= 10,
};

export function ContactSection({
  titleRef,
}: {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<FieldName, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [busy, setBusy] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError: boolean }>({
    text: '',
    isError: false,
  });

  const fNameReveal = useReveal<HTMLDivElement>(0.05);
  const fEmailReveal = useReveal<HTMLDivElement>(0.13);
  const fSubjectReveal = useReveal<HTMLDivElement>(0.21);
  const fMsgReveal = useReveal<HTMLDivElement>(0.29);
  const btnReveal = useReveal<HTMLButtonElement>(0.37);
  const mapReveal = useReveal<HTMLDivElement>(0.15);

  const handleChange = (field: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: !VALIDATION_RULES[field](value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMsg({ text: '', isError: false });

    const nextErrors: Record<FieldName, boolean> = {
      name: !VALIDATION_RULES.name(values.name),
      email: !VALIDATION_RULES.email(values.email),
      subject: !VALIDATION_RULES.subject(values.subject),
      message: !VALIDATION_RULES.message(values.message),
    };
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(nextErrors) as FieldName[]).find((k) => nextErrors[k]);
    if (firstInvalid) {
      const el = document.getElementById(`f-${firstInvalid}`);
      el?.focus();
      setStatusMsg({
        text: 'Fix the highlighted fields and send again.',
        isError: true,
      });
      return;
    }

    setBusy(true);
    try {
      if (PORTFOLIO_CONFIG.formEndpoint) {
        const res = await fetch(PORTFOLIO_CONFIG.formEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error('Request failed');
        setStatusMsg({
          text: `Thanks, ${values.name.trim()}. Your message was sent.`,
          isError: false,
        });
        setValues({ name: '', email: '', subject: '', message: '' });
      } else {
        const mailtoLink = `mailto:${PORTFOLIO_CONFIG.email}?subject=${encodeURIComponent(
          values.subject
        )}&body=${encodeURIComponent(
          `${values.message}\n\n${values.name} (${values.email})`
        )}`;
        const a = document.createElement('a');
        a.href = mailtoLink;
        a.click();
        setStatusMsg({
          text: `Your email app should open with the message ready. Please send it there; if it doesn’t open, email ${PORTFOLIO_CONFIG.email} directly.`,
          isError: false,
        });
      }
    } catch {
      setStatusMsg({
        text: `The message didn’t send. Try again, or write to ${PORTFOLIO_CONFIG.email}.`,
        isError: true,
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div id="contact" className="home-section">
      <NeonTitle ref={titleRef} text="Contact" as="h2" />
      <div className="wrap contact-grid">
        <form className="form" onSubmit={handleSubmit} noValidate>
          <div
            ref={fNameReveal.ref}
            className={`field rv ${fNameReveal.isVisible ? 'in' : ''} ${errors.name ? 'bad' : ''}`}
          >
            <label className="sr-only" htmlFor="f-name">
              Your Name
            </label>
            <input
              id="f-name"
              name="name"
              type="text"
              placeholder="Your Name"
              autoComplete="name"
              aria-describedby="err-name"
              aria-invalid={errors.name}
              required
              maxLength={100}
              value={values.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            {errors.name && (
              <p className="text-[#ff8080] text-sm mt-1.5 mx-0.5" id="err-name">
                Enter at least 2 characters for your name.
              </p>
            )}
          </div>

          <div
            ref={fEmailReveal.ref}
            className={`field rv ${fEmailReveal.isVisible ? 'in' : ''} ${errors.email ? 'bad' : ''}`}
          >
            <label className="sr-only" htmlFor="f-email">
              Your Email
            </label>
            <input
              id="f-email"
              name="email"
              type="email"
              placeholder="Your Email"
              autoComplete="email"
              aria-describedby="err-email"
              aria-invalid={errors.email}
              required
              maxLength={254}
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && (
              <p className="text-[#ff8080] text-sm mt-1.5 mx-0.5" id="err-email">
                Enter a valid email address, like name@example.com.
              </p>
            )}
          </div>

          <div
            ref={fSubjectReveal.ref}
            className={`field rv ${fSubjectReveal.isVisible ? 'in' : ''} ${errors.subject ? 'bad' : ''}`}
          >
            <label className="sr-only" htmlFor="f-subject">
              Subject
            </label>
            <input
              id="f-subject"
              name="subject"
              type="text"
              placeholder="Subject"
              autoComplete="off"
              aria-describedby="err-subject"
              aria-invalid={errors.subject}
              required
              maxLength={160}
              value={values.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
            />
            {errors.subject && (
              <p className="text-[#ff8080] text-sm mt-1.5 mx-0.5" id="err-subject">
                Add a subject with at least 2 characters.
              </p>
            )}
          </div>

          <div
            ref={fMsgReveal.ref}
            className={`field rv ${fMsgReveal.isVisible ? 'in' : ''} ${errors.message ? 'bad' : ''}`}
          >
            <label className="sr-only" htmlFor="f-message">
              Your message
            </label>
            <textarea
              id="f-message"
              name="message"
              placeholder="Write your message here"
              rows={5}
              aria-describedby="err-message"
              aria-invalid={errors.message}
              required
              maxLength={5000}
              value={values.message}
              onChange={(e) => handleChange('message', e.target.value)}
            />
            {errors.message && (
              <p className="text-[#ff8080] text-sm mt-1.5 mx-0.5" id="err-message">
                Write at least 10 characters.
              </p>
            )}
          </div>

          <button
            ref={btnReveal.ref}
            className={`send rv ${btnReveal.isVisible ? 'in' : ''} ${busy ? 'busy' : ''}`}
            type="submit"
            disabled={busy}
          >
            <span>{busy ? 'Sending...' : 'Send Message'}</span>
          </button>

          <p
            className={`min-h-[1.4em] text-[0.95rem] ${
              statusMsg.isError ? 'text-[#ff8080]' : 'text-[#9df5ee]'
            }`}
            role="status"
            aria-live="polite"
          >
            {statusMsg.text}
          </p>
        </form>

        <div ref={mapReveal.ref} className={`map rv ${mapReveal.isVisible ? 'in' : ''}`}>
          <span className="nb" aria-hidden="true">
            <i />
          </span>
          <iframe
            title={`Google Map showing ${PORTFOLIO_CONFIG.location}`}
            src={PORTFOLIO_CONFIG.mapsEmbedUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            className="open"
            href={PORTFOLIO_CONFIG.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Maps
            <span className="sr-only"> (opens in a new tab)</span>
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
          <span className="place">{PORTFOLIO_CONFIG.location}</span>
        </div>
      </div>
    </div>
  );
}
