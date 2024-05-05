"use client"

import { AppProgressBar as ProgressBar } from "next-nprogress-bar"

export function ProgressBarProvider() {
  return (
    <ProgressBar
      height="4px"
      color="#16a34a"
      options={{ showSpinner: false }}
      shallowRouting
    />
  )
}
