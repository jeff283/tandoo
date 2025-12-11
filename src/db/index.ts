import { config } from 'dotenv'

import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from './schema.ts'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'

config()

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL!,
// })
// export const db = drizzle(pool, { schema })

export function getDb() {
  const dbUrl = process.env.DATABASE_URL

  if (!dbUrl) {
    throw new Error('DATABASE_URL is not defined')
  }

  const pool = new Pool({
    connectionString: dbUrl,
  })
  return drizzle(pool, { schema })
}

// Drop-in export: lazy proxy so old `import { db }` keeps working
export const db: NodePgDatabase<typeof schema> = new Proxy(
  {} as NodePgDatabase<typeof schema>,
  {
    get(_, prop, receiver) {
      const instance = getDb()
      return Reflect.get(instance, prop, receiver)
    },
  },
)
