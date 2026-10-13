import { Link } from 'react-router-dom';

function Message({ code, title, text }) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center text-white">
      <p className="text-6xl font-extrabold">{code}</p>
      <h1 className="mt-3 text-xl font-bold">{title}</h1>
      <p className="mt-1 text-green-100">{text}</p>
      <Link to="/" className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-green-800 hover:bg-green-50">
        Go Home
      </Link>
    </div>
  );
}

export const Unauthorized = () => (
  <Message code="403" title="Access denied" text="Aapke role ko is page ka access nahi hai." />
);

export const NotFound = () => (
  <Message code="404" title="Page not found" text="Ye page exist nahi karta." />
);
