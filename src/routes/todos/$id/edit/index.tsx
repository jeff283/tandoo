import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/todos/$id/edit/')({
  component: RouteComponent,
  loader: ({ params }) => params.id,
})

function RouteComponent() {
  const id = Route.useLoaderData()

  return <div>Todo Param id: {id}</div>
}
