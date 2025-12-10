import {
  HeadContent,
  Scripts,
  createRootRoute,
  Link,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Tandoo',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  notFoundComponent: () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-[#FFF8E7] p-6">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight border-4 sm:border-6 md:border-8 border-black bg-yellow-300 p-4 sm:p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -rotate-2">
          404
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-bold border-4 border-black bg-white px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase">
          Page Not Found
        </p>
        <Link to="/">
          <button className="px-6 py-3 text-lg font-bold border-4 border-black bg-lime-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all rounded-none active:shadow-none active:translate-x-1.5 active:translate-y-1.5 uppercase">
            Go Back Home
          </button>
        </Link>
      </div>
    )
  },
  errorComponent: ({ error, info, reset }) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-[#FFF8E7] p-6">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight border-4 sm:border-6 md:border-8 border-black bg-yellow-300 p-4 sm:p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -rotate-2">
          Error
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-bold border-4 border-black bg-white px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase text-center">
          {error.message}
        </p>
        {info?.componentStack && (
          <div className="max-w-2xl w-full border-4 border-black bg-red-100 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-bold mb-2 uppercase">Component Stack:</p>
            <pre className="text-sm overflow-auto">{info.componentStack}</pre>
          </div>
        )}
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 text-lg font-bold border-4 border-black bg-blue-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all rounded-none active:shadow-none active:translate-x-1.5 active:translate-y-1.5 uppercase"
          >
            Try Again
          </button>
          <Link to="/">
            <button className="px-6 py-3 text-lg font-bold border-4 border-black bg-lime-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all rounded-none active:shadow-none active:translate-x-1.5 active:translate-y-1.5 uppercase">
              Go Back Home
            </button>
          </Link>
        </div>
      </div>
    )
  },

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
