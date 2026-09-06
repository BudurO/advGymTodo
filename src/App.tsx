import "./App.css";
import { AddTodoForm } from "./components/AddTodoForm";
import { AuthForm } from "./components/AuthForm";
import { TodoBoard } from "./components/TodoBoard";
import { useAuth } from "./hooks/useAuth";
import { useTodos } from "./hooks/useTodos";
import { isSupabaseConfigured } from "./services/supabaseClient";

function App() {
  const { session, loading, signIn, signUp, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-10">
      <header className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 pt-8 pb-6 text-center">
        <h1 className="bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          advGymTodo
        </h1>
        <p className="text-sm font-medium text-pink-400">
          Plan your training week — drag tasks onto a day
        </p>
        {session && (
          <div className="flex items-center gap-2 text-xs text-pink-400">
            <span>{session.user.email}</span>
            <button
              onClick={signOut}
              className="rounded-full border border-pink-300 px-3 py-1 font-semibold text-pink-600 transition hover:bg-pink-100"
            >
              Sign out
            </button>
          </div>
        )}
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
        {!isSupabaseConfigured ? (
          <p className="mx-auto max-w-md rounded-2xl border border-amber-300 bg-amber-50 p-4 text-center text-sm text-amber-700">
            Supabase is not configured yet — paste your project URL and anon
            key into <code>src/services/supabaseClient.ts</code>.
          </p>
        ) : loading ? (
          <p className="text-center text-sm text-pink-400">Loading…</p>
        ) : !session ? (
          <AuthForm onSignIn={signIn} onSignUp={signUp} />
        ) : (
          <TodoApp userId={session.user.id} />
        )}
      </main>
    </div>
  );
}

function TodoApp({ userId }: { userId: string }) {
  const { todos, loading, error, addTodo, moveTodo, toggleCompleted, deleteTodo } =
    useTodos(userId);
  const completedCount = todos.filter((t) => t.isCompleted).length;

  if (loading) {
    return <p className="text-center text-sm text-pink-400">Loading your tasks…</p>;
  }

  return (
    <>
      {error && (
        <p className="mx-auto rounded-xl bg-red-50 px-4 py-2 text-center text-xs font-medium text-red-600">
          Sync error: {error}
        </p>
      )}
      {todos.length > 0 && (
        <p className="mx-auto rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">
          {completedCount} / {todos.length} completed
        </p>
      )}
      <AddTodoForm onAdd={addTodo} />
      <TodoBoard
        todos={todos}
        onMove={moveTodo}
        onToggle={toggleCompleted}
        onDelete={deleteTodo}
      />
    </>
  );
}

export default App;
