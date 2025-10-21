interface DisplayProps {
  value: string
  history: string
  isError?: boolean
}

export default function Display({ value, history, isError = false }: DisplayProps) {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white p-4 sm:p-6 border-b border-gray-200">
      <div className="text-right">
        {history && <div className="text-gray-500 text-xs sm:text-sm mb-2 h-5 font-medium">{history}</div>}
        <div
          className={`text-4xl sm:text-5xl lg:text-6xl font-light break-words leading-tight transition-colors ${
            isError ? "text-red-600" : "text-gray-900"
          }`}
        >
          {value}
        </div>
      </div>
    </div>
  )
}
