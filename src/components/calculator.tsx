"use client"

import { useState, useEffect } from "react"
import Display from "./display"
import ButtonGrid from "./button-grid"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)
  const [history, setHistory] = useState<string>("")
  const [error, setError] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key

      if (/[0-9]/.test(key)) {
        e.preventDefault()
        handleNumberInput(key)
      } else if (key === ".") {
        e.preventDefault()
        handleNumberInput(".")
      } else if (key === "+") {
        e.preventDefault()
        handleOperation("+")
      } else if (key === "-" && !e.shiftKey) {
        e.preventDefault()
        handleOperation("-")
      } else if (key === "*") {
        e.preventDefault()
        handleOperation("×")
      } else if (key === "/") {
        e.preventDefault()
        handleOperation("÷")
      } else if (key === "Enter" || key === "=") {
        e.preventDefault()
        handleEquals()
      } else if (key === "Backspace") {
        e.preventDefault()
        handleBackspace()
      } else if (key === "Escape") {
        e.preventDefault()
        handleClear()
      } else if (key === "%") {
        e.preventDefault()
        handlePercentage()
      } else if (key === "c" || key === "C") {
        e.preventDefault()
        handleClear()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [display, previousValue, operation, waitingForNewValue, error])

  const handleNumberInput = (num: string) => {
    if (error) {
      setError(false)
      setDisplay(num === "." ? "0." : num)
      setWaitingForNewValue(false)
      return
    }

    if (num === ".") {
      if (display.includes(".")) return
      if (waitingForNewValue) {
        setDisplay("0.")
        setWaitingForNewValue(false)
      } else {
        setDisplay(display + ".")
      }
      return
    }

    const newDisplay = waitingForNewValue ? num : display === "0" ? num : display + num
    setDisplay(newDisplay)
    setWaitingForNewValue(false)
  }

  const handleOperation = (op: string) => {
    if (error) {
      setError(false)
      setDisplay("0")
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(false)
      return
    }

    const currentValue = Number.parseFloat(display)

    if (previousValue !== null && operation && !waitingForNewValue) {
      const result = calculate(previousValue, currentValue, operation)
      if (result === null) {
        setError(true)
        setDisplay("Error")
        return
      }
      setDisplay(String(result))
      setPreviousValue(result)
      setHistory(String(result) + " " + op)
    } else {
      setPreviousValue(currentValue)
      setHistory(display + " " + op)
    }

    setOperation(op)
    setWaitingForNewValue(true)
  }

  const calculate = (prev: number, current: number, op: string): number | null => {
    switch (op) {
      case "+":
        return prev + current
      case "-":
        return prev - current
      case "×":
        return prev * current
      case "÷":
        if (current === 0) {
          setError(true)
          return null
        }
        return prev / current
      default:
        return current
    }
  }

  const handleEquals = () => {
    if (error) {
      handleClear()
      return
    }

    if (operation && previousValue !== null) {
      const currentValue = Number.parseFloat(display)
      const result = calculate(previousValue, currentValue, operation)
      if (result === null) {
        setError(true)
        setDisplay("Error")
        return
      }
        const roundedResult = Math.round(result * 100000) / 100000
        setDisplay(String(roundedResult))
        setPreviousValue(roundedResult)
      setOperation(null)
      setWaitingForNewValue(true)
      setHistory("")
    }
  }

  const handlePercentage = () => {
    if (error) {
      setError(false)
      setDisplay("0")
      return
    }

    const currentValue = Number.parseFloat(display)
    if (previousValue !== null && operation) {
      const percentage = (previousValue * currentValue) / 100
      setDisplay(String(percentage))
    } else {
      setDisplay(String(currentValue / 100))
    }
    setWaitingForNewValue(true)
  }

  const handleSquareRoot = () => {
    if (error) {
      setError(false)
      setDisplay("0")
      return
    }

    const currentValue = Number.parseFloat(display)
    if (currentValue < 0) {
      setError(true)
      setDisplay("Error")
      return
    }
    setDisplay(String(Math.sqrt(currentValue)))
    setWaitingForNewValue(true)
  }

  const handleNegate = () => {
    if (error) {
      setError(false)
      setDisplay("0")
      return
    }

    const currentValue = Number.parseFloat(display)
    setDisplay(String(-currentValue))
  }

  const handleBackspace = () => {
    if (error) {
      setError(false)
      setDisplay("0")
      return
    }

    if (display.length === 1) {
      setDisplay("0")
    } else {
      setDisplay(display.slice(0, -1))
    }
  }

  const handleClearEntry = () => {
    setDisplay("0")
    setWaitingForNewValue(true)
    setError(false)
  }

  const handleClear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
    setHistory("")
    setError(false)
  }

  return (
    <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <Display value={display} history={history} isError={error} />
      <ButtonGrid
        onNumberClick={handleNumberInput}
        onOperationClick={handleOperation}
        onEqualsClick={handleEquals}
        onPercentageClick={handlePercentage}
        onSquareRootClick={handleSquareRoot}
        onNegateClick={handleNegate}
        onBackspaceClick={handleBackspace}
        onClearEntryClick={handleClearEntry}
        onClearClick={handleClear}
      />
    </div>
  )
}
