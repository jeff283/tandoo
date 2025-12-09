import TodoForm from '@/components/todo-form'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'

export const Route = createFileRoute('/todos/new/')({
  component: RouteComponent,
})

function RouteComponent() {
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
              Add New Todo
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-bold">
              Create a new task to add to your todo list
            </p>
          </div>
          <div className="p-3 sm:p-4 md:p-6">
            <TodoForm />
          </div>
        </div>
      </div>
    </div>
  )
}
