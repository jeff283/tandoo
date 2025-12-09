import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { Header } from '@/components/Header'
import { TodoItem } from '@/components/TodoItem'

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty'

import { db } from '@/db'
import { todos as tododb } from '@/db/schema'
import { desc } from 'drizzle-orm'

const todosFn = createServerFn({ method: 'GET' }).handler(async () => {
  return await db.select().from(tododb).orderBy(desc(tododb.updatedAt))
})

export const Route = createFileRoute('/')({
  component: App,
  loader: () => todosFn(),
})

function App() {
  const todos = Route.useLoaderData()
  const [activeTodoId, setActiveTodoId] = useState<string | null>(null)

  const completedTodos = todos.filter((todo) => todo.isComplete).length
  const totalTodos = todos.length

  const handleTodoClick = (id: string) => {
    setActiveTodoId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7] p-3 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="text-sm sm:text-base md:text-lg px-3 sm:px-4 py-2 font-bold border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none text-center sm:text-left">
            {completedTodos} / {totalTodos} completed
          </div>
          <Link to="/todos/new" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-bold border-4 border-black bg-lime-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all rounded-none active:shadow-none active:translate-x-1.5 active:translate-y-1.5 flex items-center justify-center gap-2">
              <PlusIcon
                className="size-5 sm:size-6 md:size-7"
                strokeWidth={2.7}
              />
              <span className="hidden xs:inline">Add Todo</span>
              <span className="xs:hidden">Add</span>
            </button>
          </Link>
        </div>
        {totalTodos === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>No Todos Yet</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created any todos yet. Get started by adding
                your first task.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Link to="/todos/new">
                <button className="px-6 py-3 text-lg font-bold border-4 border-black bg-lime-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all rounded-none active:shadow-none active:translate-x-1.5 active:translate-y-1.5 flex items-center gap-2">
                  <PlusIcon className="size-7" strokeWidth={2.7} />
                  Add Your First Todo
                </button>
              </Link>
            </EmptyContent>
          </Empty>
        ) : (
          <div className="space-y-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isActive={activeTodoId === todo.id}
                onTodoClick={handleTodoClick}
                onToggleComplete={(id) => {
                  console.log('Todo Clicked: ', id)
                }}
                onEdit={(id) => {
                  console.log('Edit Todo: ', id)
                }}
                onDelete={(id) => {
                  console.log('Delete Todo: ', id)
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
