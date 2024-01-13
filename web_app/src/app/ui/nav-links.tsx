"use client";

import {
  ClockIcon,
  BanknotesIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Include links for the navigation bar
const links = [
  { name: "Commit", href: "/", icon: CheckCircleIcon },
  { name: "View", href: "/view", icon: ClockIcon },
  { name: "Withdraw", href: "/withdraw", icon: BanknotesIcon },
];

export default function NavLinks() {
  const pathName = usePathname();
  return (
    <div className="space-y-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] text-black items-center justify-center gap-2 rounded-md bg-white hover:text-blue-600 md:justify-start md:p-2 md:flex-none",
              {
                "bg-sky-100, text-blue-500 border-blue-500 border-l-4":
                  pathName === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
