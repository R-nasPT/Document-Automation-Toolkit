"use client"
import { Scanner } from '@yudiel/react-qr-scanner';

export default function page() {
  return (
    <Scanner onScan={(result) => console.log(result)} />
  )
}
