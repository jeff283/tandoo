import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import TodoForm from '@/components/todo-form'
import { ArrowLeftIcon } from 'lucide-react'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { db } from '@/db'
import { todos } from '@/db/schema'
import { eq } from 'drizzle-orm'

const loaderFn = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const todo = await db
      .select()
      .from(todos)
      .where(eq(todos.id, data.id))
      .limit(1)

    if (todo.length === 0 || !todo[0]) {
      throw notFound()
    }
    return todo[0]
  })

export const Route = createFileRoute('/todos/$id/edit/')({
  component: RouteComponent,
  loader: ({ params }) => loaderFn({ data: { id: params.id } }),
})

function RouteComponent() {
  const todo = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-[#FFF8E7] p-3 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base md:text-lg font-bold border-3 sm:border-4 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all rounded-none"
        >
          <ArrowLeftIcon className="size-4 sm:size-5" strokeWidth={2.7} />
          <span>Back</span>
        </Link>

        <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="p-3 sm:p-4 md:p-6 border-b-4 border-black bg-cyan-300">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black mb-1 sm:mb-2">
              Edit Todo
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-bold">
              Update your task details
            </p>
          </div>
          <div className="p-3 sm:p-4 md:p-6">
            <TodoForm mode="update" todo={todo} />
          </div>
        </div>
      </div>
    </div>
  )
}
