import { json, redirect } from 'react-router';
import { Link, useCatch, useLoaderData } from '@remix-run/react';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import NoteList, { links as noteListLinks } from '../components/NoteList';
import { getStoredNotes, storeNotes } from '../data/notes';

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();

  if (!notes || notes.length === 0) {
    console.log('Getting inside here!!');
    throw json(
      { message: 'Could not find any notes.' },
      { status: 404, statusText: 'Not Found' }
    );
  }
  return notes;
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  console.log('Note Date: ', noteData);
  //   Add Validation
  if (noteData.title.trim().length < 5) {
    return { message: 'Invalid Title - must be at least 5 charachters long.' };
  }
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect('/notes');
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export function meta() {
  return {
    title: `All Notes`,
    description: `Manage your notes with ease`,
  };
}

export function CatchBoundary() {
  const caughtResponse = useCatch();
  const message = caughtResponse.data?.message || 'Data not Found.';

  return (
    <main>
      <NewNote />
      <p className="info-message">{message}</p>
    </main>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <main className="error">
      <h1>An error related to your notes has occured!!</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/">Safety</Link>
      </p>
    </main>
  );
}
