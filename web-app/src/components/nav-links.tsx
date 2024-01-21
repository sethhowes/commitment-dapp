"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Include links for the navigation bar
const links = [
  { name: "Commit", href: "/" },
  { name: "Runs", href: "/runs" },
  { name: "Withdraw", href: "/withdraw" },
];

export default function NavLinks() {
  const pathName = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <p>
            <Link
              key={link.name}
              href={link.href}
              className={clsx("text-gray-400", {
                "text-black font-bold": pathName === link.href,
              })}
            >
              {link.name}
            </Link>
          </p>
        );
      })}
    </>
  );
}
