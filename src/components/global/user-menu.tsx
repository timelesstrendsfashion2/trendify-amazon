"use client"

import Link from "next/link"
import { User } from "next-auth"
import { signOut } from "next-auth/react"
import { USER_ROLE } from "@prisma/client"
import { LayoutDashboard, LogOut, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type UserMenuProps = {
  user: User & {
    id: string
    email: string
    role: USER_ROLE
  }
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size="icon" aria-label={user.email}>
          <UserIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel className="p-0">
          {user.name ?? user.email}
        </DropdownMenuLabel>
        {user.name && (
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
        )}
        <DropdownMenuSeparator />

        {user.role === "ADMIN" && (
          <Link href={"/admin"}>
            <DropdownMenuItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
          </Link>
        )}

        <DropdownMenuItem onSelect={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
