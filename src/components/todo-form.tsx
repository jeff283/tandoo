import { FormEvent, useRef, useState } from 'react'
import { Input } from './ui/input'
import { CheckIcon, Loader2Icon, PlusIcon } from 'lucide-react'
// import { createServerFn, useServerFn } from '@tanstack/react-start'
// import z from 'zod'
// import { db } from '@/db'
// import { todos } from '@/db/schema'
// import { redirect } from '@tanstack/react-router'
// import { eq } from 'drizzle-orm'

interface TodoFormProps {
  mode?: 'add' | 'update'
  initialValue?: string
}

export default function TodoForm({
  mode = 'add',
  initialValue = '',
}: TodoFormProps) {
  const nameRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
  }

  const isAddMode = mode === 'add'
  const buttonText = isAddMode ? 'Add Todo' : 'Update Todo'
  const loadingText = isAddMode ? 'Adding...' : 'Updating...'
  const Icon = isAddMode ? PlusIcon : CheckIcon

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="todo-input" className="block text-sm font-bold mb-2">
          Todo Task
        </label>
        <Input
          id="todo-input"
          autoFocus
          ref={nameRef}
          placeholder="Enter your todo..."
          className="w-full px-4 py-3 text-lg font-semibold border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all bg-white focus:outline-none focus:ring-0"
          aria-label="Todo task"
          defaultValue={initialValue}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full px-6 py-3 text-lg font-black border-4 border-black rounded-none
          transition-all duration-150
          ${
            isLoading
              ? 'bg-gray-300 cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              : isAddMode
                ? 'bg-yellow-300 hover:bg-yellow-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1'
                : 'bg-green-300 hover:bg-green-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1'
          }
        `}
      >
        <div className="flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <Loader2Icon className="size-5 animate-spin" strokeWidth={3} />
              <span>{loadingText}</span>
            </>
          ) : (
            <>
              <Icon className="size-5" strokeWidth={3} />
              <span>{buttonText}</span>
            </>
          )}
        </div>
      </button>
    </form>
  )
}
