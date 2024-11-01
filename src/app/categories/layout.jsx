"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import { checkUserRole } from "@/lib/auth";
import Link from "next/link";

export default function Layout({
  header,
  children,
  footer,
  user,
  admin,
  slug,
}) {
  const segmentFooter = useSelectedLayoutSegment("footer");
  const segmentHeader = useSelectedLayoutSegment("header");
  if (segmentFooter === "infor") {
    return <div>Bạn đang ở ! {footer}</div>;
  }
  if (segmentHeader === "menu") {
    return <div>Bạn đang ở ! {header}</div>;
  }

  //const role = checkUserRole();
  return (
    <>
      {/* {role === "admin" ? admin : user} */}
      {header}
      <nav>
        <Link href="/categories/login">Open modal</Link>
      </nav>
      <hr />
      {slug}
      {children}
      <hr />
      {footer}
    </>
  );
}
