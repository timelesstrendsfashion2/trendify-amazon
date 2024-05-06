import * as React from "react"
import Link from "next/link"
import { User, Search } from "lucide-react"

import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { getSession } from "@/lib/auth"
import { UserMenu } from "./user-menu"
import { Categories } from "./categories"

export async function Navbar() {
  const session = await getSession()

  return (
    <nav className="fixed top-0 left-0 w-full px-8 h-20 flex items-center justify-between z-30 bg-background border-b">
      <Logo className="md:w-36 sm:w-28 w-24" />

      <React.Suspense>
        <Categories />
      </React.Suspense>

      <div className="flex items-center gap-1">
        <ModeToggle />

        <Link href={"/search"}>
          <Button
            variant={"ghost"}
            size="icon"
            aria-label={"Search"}
            title={"Search"}
          >
            <Search className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </Link>

        {session ? (
          <UserMenu user={session} />
        ) : (
          <Link href={"/sign-in"}>
            <Button
              variant={"ghost"}
              size="icon"
              aria-label={"Login"}
              title={"Login"}
            >
              <User className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </Link>
        )}
      </div>
    </nav>
  )
}
