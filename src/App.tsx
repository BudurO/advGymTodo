import "./App.css";
import { AddTodoForm } from "./components/AddTodoForm";
import { TodoBoard } from "./components/TodoBoard";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos, addTodo, moveTodo, toggleCompleted, deleteTodo } = useTodos();
  const completedCount = todos.filter((t) => t.isCompleted).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-10">
      <header className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 pt-8 pb-6 text-center">
        <h1 className="bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          advGymTodo
        </h1>
        <p className="text-sm font-medium text-pink-400">
          Plan your training week — drag tasks onto a day
        </p>
        {todos.length > 0 && (
          <p className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">
            {completedCount} / {todos.length} completed
          </p>
        )}
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
        <AddTodoForm onAdd={addTodo} />
        <TodoBoard
          todos={todos}
          onMove={moveTodo}
          onToggle={toggleCompleted}
          onDelete={deleteTodo}
        />
      </main>
    </div>
  );
}

export default App;
