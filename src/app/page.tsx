// app/page.tsx
import { Suspense } from "react";
import Fallback from "./ui/Fallback";
import StaticComponent from "./ui/StaticComponent";

export const experimental_ppr = true;

export default function Page() {
  return (
    <>
      <h2>Hello</h2>
      <Suspense fallback={<Fallback />}>
        <StaticComponent />
      </Suspense>
    </>
  );
}
