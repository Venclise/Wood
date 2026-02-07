
export const dynamic = "force-dynamic";


import { LoignForm } from "@/components/loginform"
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-1">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Suspense fallback={null}>
      <LoignForm />
    </Suspense>
          </div>
        </div>
      </div>

    </div>
  )
}
