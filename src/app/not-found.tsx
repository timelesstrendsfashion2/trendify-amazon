import Link from "next/link"
import Image from "next/image"
import notfound from "@/../public/not-found.svg"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col items-center justify-center p-4">
      <Image
        src={notfound}
        draggable={false}
        alt="Not Found"
        className="object-contain"
      />
      <Link href={"/"}>
        <Button>Go Home</Button>
      </Link>
    </div>
  )
}
