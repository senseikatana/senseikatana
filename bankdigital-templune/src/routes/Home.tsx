import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  body: string;
}

const API_URL =
  import.meta.env.BUN_PUBLIC_API_URL ?? 'https://jsonplaceholder.typicode.com/posts?_limit=5';

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error(`Error ${res.status} al cargar publicaciones`);
  }
  return res.json();
}

export function Home() {
  const { data, error, isPending } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 60_000,
  });

  return (
    <section className="py-4">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">
          La mejor banca digital <span className="text-primary">.</span>
        </h1>
        <p className="lead text-muted">
          Proyecto con Bun, React 19, React Router y TanStack Query.
        </p>
        <Link to="/dashboard" className="btn btn-primary">
          Ir al Dashboard
        </Link>
      </div>

      <article className="bg-light p-4 rounded">
        <h2 className="h5 mb-3">Últimas publicaciones (TanStack Query)</h2>
        {isPending && <p className="text-muted">Cargando…</p>}
        {error && <p className="text-danger">{(error as Error).message}</p>}
        <ul className="list-group">
          {(data ?? []).map((post) => (
            <li key={post.id} className="list-group-item">
              {post.title}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
