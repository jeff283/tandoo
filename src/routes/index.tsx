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
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </div>
  )
}
