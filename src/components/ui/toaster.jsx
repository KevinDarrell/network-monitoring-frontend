"use client"

import { Toaster as Sonner } from "sonner"

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      richColors
      closeButton
    />
  )
}
export function ToasterProvider() {
  return <Toaster position="top-right" richColors closeButton />
}


export default Toaster
