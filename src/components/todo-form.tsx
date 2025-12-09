import { FormEvent, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { CheckIcon, Loader2Icon, PlusIcon } from 'lucide-react'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { db } from '@/db'
import { todos, TodoInsertSchema } from '@/db/schema'
import { redirect } from '@tanstack/react-router'
// import z from 'zod'
// import { eq } from 'drizzle-orm'

const addTodoFn = createServerFn({ method: 'POST' })
  .inputValidator(TodoInsertSchema)
  .handler(async ({ data }) => {
    await db.insert(todos).values(data)
    throw redirect({ to: '/' })
  })

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

  const handleAddTodo = useServerFn(addTodoFn)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const name = nameRef.current?.value.trim()
    if (!name) return

    try {
      setIsLoading(true)
      if (mode === 'add') {
        await handleAddTodo({ data: { name } })
      }
    } catch (error) {
      console.error('Error submitting the form:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const isAddMode = mode === 'add'
  const buttonText = isAddMode ? 'Add Todo' : 'Update Todo'
  const loadingText = isAddMode ? 'Adding...' : 'Updating...'
  const Icon = isAddMode ? PlusIcon : CheckIcon

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div>
        <label
          htmlFor="todo-input"
          className="block text-sm sm:text-base md:text-lg font-black mb-2 sm:mb-3 uppercase tracking-wide"
        >
          Todo Task
        </label>
        <Input
          id="todo-input"
          autoFocus
          ref={nameRef}
          placeholder="Enter your todo..."
          className="w-full h-12 sm:h-14 md:h-16 px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 text-base sm:text-lg md:text-xl font-medium border-4 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all bg-white focus:outline-none focus:ring-0 placeholder:font-semibold placeholder:text-gray-400"
          aria-label="Todo task"
          defaultValue={initialValue}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full px-4 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg font-black border-4 border-black rounded-none
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
              <Loader2Icon className="size-4 sm:size-5" strokeWidth={3} />
              <span>{loadingText}</span>
            </>
          ) : (
            <>
              <Icon className="size-4 sm:size-5" strokeWidth={3} />
              <span>{buttonText}</span>
            </>
          )}
        </div>
      </button>
    </form>
  )
}
