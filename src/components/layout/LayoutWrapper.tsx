"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";

interface LayoutWrapperProps {
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function LayoutWrapper({ children, footer }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      {footer}
    </>
  );
}
