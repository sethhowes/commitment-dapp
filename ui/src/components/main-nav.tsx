"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";

export function NavBar() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="flex flex-row gap-4">
        <Link
          href="/"
          className={cn(
            "text-muted-foreground hover:text-foreground transition-colors",
            pathname == "/" && "text-foreground"
          )
          }
        >
          Commit
        </Link>
        <Link
          href="/upcoming"
          className={cn(
            "text-muted-foreground hover:text-foreground transition-colors",
            pathname == "/upcoming" && "text-foreground"
          )
          }        >
          Upcoming
        </Link>
        <Link
          href="/past"
          className={cn(
            "text-muted-foreground hover:text-foreground transition-colors",
            pathname == "/past" && "text-foreground"
          )
          }
        >
          Past
        </Link>
        <Link
          href="/withdraw"
          className={cn(
            "text-muted-foreground hover:text-foreground transition-colors",
            pathname == "/withdraw" && "text-foreground"
          )
          }
        >
          Withdraw
        </Link>
      </nav>
      <div className="flex ml-auto gap-4">
        <ModeToggle />
        <ConnectButton />
      </div>
    </header>
  );
}
