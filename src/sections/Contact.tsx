import { useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Section } from '../components/ui/Section';
import { profile } from '../data/profile';
import { sendContact } from '../lib/api';
import type { ContactPayload } from '../lib/api';
import { gsap, MOTION_OK, prefersMotion, useGSAP } from '../lib/gsap';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const emptyForm: ContactPayload = { name: '', email: '', message: '' };

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [form, setForm] = useState<ContactPayload>(emptyForm);
  const [status, setStatus] = useState<Status>('idle');

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const scrollTrigger = { trigger: ref.current, start: 'top 70%', once: true };
        gsap.from('[data-contact-copy] > *', {
          y: 30,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger,
        });
        gsap.from('[data-contact-form]', {
          x: 80,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger,
        });
      });
    },
    { scope: ref },
  );

  const celebrate = contextSafe(() => {
    if (!prefersMotion()) return;
    gsap.fromTo(
      '[data-submit]',
      { rotate: -4 },
      { rotate: 4, duration: 0.08, repeat: 5, yoyo: true, ease: 'sine.inOut', clearProps: 'rotate' },
    );
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendContact(form);
      setStatus('sent');
      setForm(emptyForm);
      celebrate();
    } catch {
      setStatus('error');
    }
  };

  return (
    <Section id="contact" background="blush" ref={ref}>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div data-contact-copy>
          <p className="mb-2 text-sm font-bold text-coral-dark">05 — Contact</p>
          <h2 className="text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
            Let's ship
            <br />
            the next one.
          </h2>
          {/* <p className="mt-6 text-sm">
            Based in {profile.location}. Messages go to the Go API and land in PostgreSQL.
          </p> */}
          <a href={`mailto:${profile.email}`} className="mt-4 block font-semibold underline">
            {profile.email}
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block font-semibold underline"
          >
            {profile.linkedinLabel}
          </a>
        </div>

        <Card inkShadow className="p-6" data-contact-form>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <label className="text-xs font-bold">
              Name
              <input name="name" required value={form.name} onChange={onChange} className="field mt-1" />
            </label>
            <label className="text-xs font-bold">
              Email
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={onChange}
                className="field mt-1"
              />
            </label>
            <label className="text-xs font-bold">
              Message
              <textarea
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={onChange}
                className="field mt-1 resize-y"
              />
            </label>

            <Button type="submit" disabled={status === 'sending'} className="w-full" data-submit>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </Button>

            <p role="status" className="min-h-[1.25rem] text-center text-sm font-semibold">
              {status === 'sent' && 'Thanks! Your message is on its way.'}
              {status === 'error' && `Couldn't send right now. Email me at ${profile.email}.`}
            </p>
          </form>
        </Card>
      </div>
    </Section>
  );
}
