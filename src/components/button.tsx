"use client"

interface ButtonProps {
  label: string
  onClick: () => void
  variant?: "default" | "operation" | "function" | "equals"
  className?: string
}

export default function Button({ label, onClick, variant = "default", className = "" }: ButtonProps) {
  const baseStyles =
    "w-full py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow-md"

  const variantStyles = {
    default: "bg-gray-100 hover:bg-gray-200 text-gray-900 active:bg-gray-300 border border-gray-300",
    operation: "bg-blue-500 hover:bg-blue-600 text-white active:bg-blue-700 border border-blue-600",
    function: "bg-gray-200 hover:bg-gray-300 text-gray-900 active:bg-gray-400 border border-gray-400",
    equals: "bg-green-500 hover:bg-green-600 text-white active:bg-green-700 border border-green-600",
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles[variant]} ${className}`} aria-label={label}>
      {label}
    </button>
  )
}
