import { pgTable, uuid, text, boolean, timestamp } from 'drizzle-orm/pg-core'
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from 'drizzle-zod'

export const todos = pgTable('todos', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  isComplete: boolean().notNull().default(false),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

export const TodoSelectSchema = createSelectSchema(todos)
export const TodoInsertSchema = createInsertSchema(todos)
export const TodoUpdateSchema = createUpdateSchema(todos)
export type Todo = typeof todos.$inferSelect
export type NewTodo = typeof todos.$inferInsert
