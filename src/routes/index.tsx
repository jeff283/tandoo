import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
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
  return (
    <div className="min-h-screen bg-[#FEFEFE] p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <div className="space-y-4">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  )
}
