import { Suspense } from "react";
import StaticComponent from "./StaticComponent";
import DynamicComponent from "./DynamicComponent";
import Fallback from "./Fallback";

export const experimental_ppr = true;

export default function Page() {
  return (
    <>
      <StaticComponent />
      <Suspense fallback={<Fallback />}>
        <DynamicComponent />
      </Suspense>
    </>
  );
}
