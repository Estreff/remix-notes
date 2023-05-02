import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react';

import MainNavigation from './components/MainNavigation';

import mainStyles from '~/styles/main.css';

export const meta = () => ({
  charset: 'utf-8',
  title: 'Note Keeper',
  description: 'A better way of keeping track of your notes',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: mainStyles }];
}

export function CatchBoundary() {
  const caughtResponse = useCatch();
  console.log('Caught Response: ', caughtResponse);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>{caughtResponse.statusText}</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>{caughtResponse.statusText}</h1>
          <p>
            {caughtResponse.data?.message ||
              caughtResponse.data ||
              'Something went wrong!!'}
          </p>
          <p>
            Back to <Link to="/">Safety</Link>
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>An error occured!!</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>An Error Occured</h1>
          <p>{error.message}</p>
          <p>
            Back to <Link to="/">Safety</Link>
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
