import TodoForm from '@/components/todo-form'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'

export const Route = createFileRoute('/todos/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-lg font-bold border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all rounded-none"
        >
          <ArrowLeftIcon className="size-5" strokeWidth={2.7} />
          <span>Back</span>
        </Link>

        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="p-6 border-b-4 border-black bg-cyan-300">
            <h1 className="text-3xl font-black mb-2">Add New Todo</h1>
            <p className="text-lg font-bold">
              Create a new task to add to your todo list
            </p>
          </div>
          <div className="p-6">
            <TodoForm />
          </div>
        </div>
      </div>
    </div>
  )
}
