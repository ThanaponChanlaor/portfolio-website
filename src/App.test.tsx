import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { projects } from './data/projects';
import { Contact } from './sections/Contact';

test('renders the hero name and section navigation', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /thanapon chanla-or/i })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: 'Projects' })[0]).toHaveAttribute('href', '#projects');
});

test('filters projects by role', () => {
  render(<App />);
  const cards = () => document.querySelectorAll('[data-flip-id]');
  expect(cards()).toHaveLength(projects.length);

  userEvent.click(screen.getByRole('button', { name: 'PO' }));
  expect(cards()).toHaveLength(projects.filter((p) => p.roles.includes('po')).length);
});

test('shows an error when the contact request fails', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 }) as jest.Mock;
  // Rendered on its own because the section is currently disabled in App.
  render(<Contact />);

  userEvent.type(screen.getByLabelText('Name'), 'Ada');
  userEvent.type(screen.getByLabelText('Email'), 'ada@example.com');
  userEvent.type(screen.getByLabelText('Message'), 'Hello');
  userEvent.click(screen.getByRole('button', { name: 'Send message' }));

  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/couldn't send/i));
});
