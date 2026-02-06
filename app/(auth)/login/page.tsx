import { GalleryVerticalEnd } from "lucide-react"

import { SignupForm } from "@/components/signup-form"
import { LoignForm } from "@/components/loginform"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-1">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoignForm />
          </div>
        </div>
      </div>

    </div>
  )
}
