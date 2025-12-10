import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PencilIcon, Trash2Icon } from 'lucide-react'
import { Link, redirect } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/react-start'

import { db } from '@/db'
import { todos, type Todo } from '@/db/schema'
import z from 'zod'
import { eq, not } from 'drizzle-orm'

const toggleCompleteFn = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    await db
      .update(todos)
      .set({ isComplete: not(todos.isComplete) })
      .where(eq(todos.id, data.id))

    throw redirect({ to: '/' })
  })

const deleteTodoFn = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    await db.delete(todos).where(eq(todos.id, data.id))
    throw redirect({ to: '/' })
  })
interface TodoItemProps {
  todo: Todo
  isActive: boolean
  onTodoClick: (id: string) => void
}

export function TodoItem({ todo, isActive, onTodoClick }: TodoItemProps) {
  const updateToggleComplete = useServerFn(toggleCompleteFn)
  const deleteTodo = useServerFn(deleteTodoFn)

  const createdDate = new Date(todo.createdAt)
  const updatedDate = new Date(todo.updatedAt)

  const formatLongDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleToggleComplete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await updateToggleComplete({ data: { id: todo.id } })
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await deleteTodo({ data: { id: todo.id } })
  }

  const handleTodoClick = () => {
    onTodoClick(todo.id)
  }

  return (
    <div
      onClick={handleTodoClick}
      className={`group border-4 border-black p-3 sm:p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer ${
        todo.isComplete ? 'bg-green-400' : 'bg-white'
      }`}
    >
      <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
        <div
          onClick={handleToggleComplete}
          className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 border-3 sm:border-4 border-black shrink-0 mt-0.5 sm:mt-1 cursor-pointer ${
            todo.isComplete ? 'bg-black' : 'bg-white'
          }`}
        >
          {todo.isComplete && (
            <div className="text-white text-center font-black text-base sm:text-lg md:text-xl leading-none">
              ✓
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`text-xl sm:text-2xl md:text-3xl font-black wrap-break-words ${
              todo.isComplete ? 'line-through opacity-70' : ''
            }`}
          >
            {todo.name}
          </p>
          {isActive && (
            <div className="mt-2 sm:mt-3 flex gap-2 md:hidden">
              <Link to="/todos/$id/edit" params={{ id: todo.id }}>
                <button
                  className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 border-3 sm:border-4 border-black bg-blue-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-1.5 sm:gap-2 font-bold text-sm sm:text-base"
                  aria-label="Edit todo"
                >
                  <PencilIcon
                    className="size-3.5 sm:size-4"
                    strokeWidth={2.5}
                  />
                  <span>Edit</span>
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 border-3 sm:border-4 border-black bg-red-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-1.5 sm:gap-2 font-bold text-sm sm:text-base"
                aria-label="Delete todo"
              >
                <Trash2Icon className="size-3.5 sm:size-4" strokeWidth={2.5} />
                <span>Delete</span>
              </button>
            </div>
          )}
          <div className="mt-2 sm:mt-3 flex flex-wrap gap-2 sm:gap-3 text-xs">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="border-2 border-black bg-white px-1.5 sm:px-2 py-0.5 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs">
                  Created: {getRelativeTimeString(createdDate)}
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{formatLongDate(createdDate)}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="border-2 border-black bg-white px-1.5 sm:px-2 py-0.5 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs">
                  Updated: {getRelativeTimeString(updatedDate)}
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{formatLongDate(updatedDate)}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div
          className={`hidden md:flex gap-2 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        >
          <Link to="/todos/$id/edit" params={{ id: todo.id }}>
            <button
              className="p-2 border-4 border-black bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
              aria-label="Edit todo"
            >
              <PencilIcon className="size-5" strokeWidth={2.5} />
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="p-2 border-4 border-black bg-red-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            aria-label="Delete todo"
          >
            <Trash2Icon className="size-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}

function getRelativeTimeString(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return 'Yesterday'
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
  }
  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30)
    return months === 1 ? '1 month ago' : `${months} months ago`
  }
  const years = Math.floor(diffInDays / 365)
  return years === 1 ? '1 year ago' : `${years} years ago`
}
