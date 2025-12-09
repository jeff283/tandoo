import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const Route = createFileRoute('/todos/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className=" container mx-auto py-6 space-y-2">
      <Link to="/" className="flex">
        <ArrowLeftIcon />
        <span>Back</span>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Add New Todo</CardTitle>
          <CardDescription>
            Create a new task to add to your todo list
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TodoForm />
        </CardContent>
      </Card>
    </div>
  )
}

const TodoForm = () => {
  return <div>Todo Form</div>
}
