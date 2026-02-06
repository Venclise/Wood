"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Spinner } from "./ui/spinner"
import { Eye, EyeClosed } from "lucide-react"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
  const [inputType,setInputType] = useState(false)

  

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
setLoading(true)

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
setLoading(false)

      return
    }

    const res = await fetch("/api/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      toast.success("Account created successfully")
      setLoading(false)
      router.push("/login")
    } else {
      toast.error(data.message || "Signup failed")
      setLoading(false)

    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSignup}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm">
            Fill in the form below to create your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
     
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div  className="relative">

          <Input
            id="password"
            
            type={inputType === false ? "password" : "text"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
            />
          <div className="absolute top-2 right-3" onClick={() => setInputType((prev) => !prev )}>
            {inputType ?    <Eye className="w-5 h-5"/> :    <EyeClosed className="w-5 h-5"/>}
       
          </div>
            </div>
        </Field>

        <Field>

          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
               <div  className="relative">

          <Input
            id="confirm-password"
           type={inputType === false ? "password" : "text"}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
             <div className="absolute top-2 right-3" onClick={() => setInputType((prev) => !prev )}>
            {inputType ?    <Eye className="w-5 h-5"/> :    <EyeClosed className="w-5 h-5"/>}
       
          </div>
            </div>
        </Field>

        <Field>
             <Button
            type="submit"
            disabled={loading}
            className="bg-[#915745] hover:bg-[#6c4438] cursor-pointer"
          >
            {loading && <Spinner />}
            {loading ? "Loading" : "Create Account"}
           
          </Button>
        </Field>

        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <a href="/login" className="underline">
              Log in
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
