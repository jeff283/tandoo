import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { PlusIcon } from 'lucide-react'

import { db } from '@/db'
import { Header } from '@/components/Header'
import { TodoItem } from '@/components/TodoItem'

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

  const completedTodos = todos.filter((todo) => todo.isComplete).length
  const totalTodos = todos.length

  return (
    <div className="min-h-screen bg-[#FFF8E7] p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <div className="flex items-center justify-between mb-6">
          <div className="text-lg px-4 py-2 font-bold border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
            {completedTodos} / {totalTodos} completed
          </div>
          <button
            className="px-6 py-3 text-lg font-bold border-4 border-black bg-lime-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all rounded-none active:shadow-none active:translate-x-1.5 active:translate-y-1.5 flex items-center gap-2"
            onClick={() => {
              console.log('Add new todo')
            }}
          >
            <PlusIcon className="h-5 w-5" />
            Add Todo
          </button>
        </div>
        <div className="space-y-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={(id) => {
                console.log('Todo Clicked: ', id)
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
