import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="fixed overflow-hidden w-screen h-screen top-0 left-0 bg-background z-50 flex items-center justify-center">
      <Spinner className="w-10 h-10" />
    </div>
  )
}
