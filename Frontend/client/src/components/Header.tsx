import { Link, useLocation } from "wouter";
import CircularText from "./CircularText";
import ThemeToggle from "./ThemeToggle";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

const navTabs = [
  { label: "Home", path: "/" },
  { label: "Book Schedule", path: "/book-schedule" },
  { label: "Connect with Us", path: "/connect" },
  { label: "Awareness", path: "/awareness" },
];

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-card/95 via-background/95 to-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex w-1/4 items-center justify-start">
          <Link href="/" data-testid="link-home">
            <CircularText
              text="SAVE*YOUR*AFRICAN*FUTURE*"
              spinDuration={20}
              onHover="speedUp"
            />
          </Link>
        </div>

        <nav className="flex w-1/2 items-center justify-center gap-1 rounded-md bg-gradient-to-r from-muted/50 to-muted/30 p-1">
          {navTabs.map((tab) => {
            const isActive = location === tab.path;
            return (
              <Link key={tab.path} href={tab.path} data-testid={`link-${tab.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="hover-elevate active-elevate-2 transition-all"
                >
                  {tab.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="flex w-1/4 items-center justify-end gap-2">
          <ThemeToggle />
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" data-testid="button-sign-in">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="default" size="sm" data-testid="button-sign-up">
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9"
                }
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
