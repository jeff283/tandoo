import type { todos } from '@/db/schema'
import type { InferSelectModel } from 'drizzle-orm'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PencilIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'

type Todo = InferSelectModel<typeof todos>

interface TodoItemProps {
  todo: Todo
  onToggleComplete: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}: TodoItemProps) {
  const [isActive, setIsActive] = useState(false)
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

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleComplete(todo.id)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit(todo.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(todo.id)
  }

  const handleTodoClick = () => {
    setIsActive(!isActive)
  }

  return (
    <div
      onClick={handleTodoClick}
      className={`group relative border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer ${
        todo.isComplete ? 'bg-green-400' : 'bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div
            onClick={handleToggleComplete}
            className={`w-8 h-8 border-4 border-black shrink-0 mt-1 cursor-pointer ${
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
              className={`text-3xl font-black ${
                todo.isComplete ? 'line-through opacity-70' : ''
              }`}
            >
              {todo.name}
            </p>
            <div className="mt-3 flex gap-3 text-xs">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="border-2 border-black bg-white px-2 py-0.5 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Created: {getRelativeTimeString(createdDate)}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{formatLongDate(createdDate)}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="border-2 border-black bg-white px-2 py-0.5 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Updated: {getRelativeTimeString(updatedDate)}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{formatLongDate(updatedDate)}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
        <div
          className={`absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        >
          <button
            onClick={handleEdit}
            className="p-2 border-4 border-black bg-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            aria-label="Edit todo"
          >
            <PencilIcon className="size-5" strokeWidth={2.5} />
          </button>
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
