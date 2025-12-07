import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'

const todosFn = createServerFn({ method: 'GET' }).handler(async () => {
  const todos = await db.query.todos.findMany()
  return todos
})

export const Route = createFileRoute('/')({
  component: App,
  loader: () => todosFn(),
})

function App() {
  const todos = Route.useLoaderData()
  return (
    <div className="min-h-screen bg-[#FEFEFE] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-7xl font-black mb-8 uppercase tracking-tight border-8 border-black bg-yellow-300 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg]">
          Todo List
        </h1>

        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] ${
                todo.isComplete ? 'bg-green-400' : 'bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={`w-8 h-8 border-4 border-black flex-shrink-0 mt-1 ${
                      todo.isComplete ? 'bg-black' : 'bg-white'
                    }`}
                  >
                    {todo.isComplete && (
                      <div className="text-white text-center font-black text-xl leading-none">
                        ✓
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-2xl font-bold ${
                        todo.isComplete ? 'line-through opacity-70' : ''
                      }`}
                    >
                      {todo.name}
                    </p>
                    <div className="mt-2 flex gap-4 text-sm font-bold">
                      <span className="bg-black text-white px-2 py-1">
                        Created: {new Date(todo.createdAt).toLocaleDateString()}
                      </span>
                      {
                        <span className="bg-black text-white px-2 py-1">
                          Updated:{' '}
                          {new Date(todo.updatedAt).toLocaleDateString()}
                        </span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
