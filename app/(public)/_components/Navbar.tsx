"use client";

import { ToggleTheme } from "@/components/theme-toggle";
import { authClient } from "@/lib/auth-client";
import Logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { UserDropdown } from "./UserDropdown";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Courses",
    href: "/courses",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
      <div className="container flex min-h-16 items-center justify-between mx-auto px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 mr-4">
          <Image src={Logo} alt="Logo" className="size-9 rounded-md" />
          <span className="font-bold">TutorLMS</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:justify-between md:ml-12">
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  `relative text-sm font-medium transition-colors hover:text-primary before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300`,
                  item.href === pathname
                    ? "text-primary"
                    : "hover:before:w-full"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex items-center space-x-4">
          <ToggleTheme />

          {isPending ? null : session ? (
            <UserDropdown
              name={session.user.name}
              email={session.user.email}
              image={session.user.image || ""}
            />
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({ variant: "secondary" })}
              >
                Login
              </Link>
              <Link href="/login" className={buttonVariants()}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
