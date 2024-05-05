"use client"

import * as React from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

export function QureryProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
