"use client"

import Button from "./button"

interface ButtonGridProps {
  onNumberClick: (num: string) => void
  onOperationClick: (op: string) => void
  onEqualsClick: () => void
  onPercentageClick: () => void
  onSquareRootClick: () => void
  onNegateClick: () => void
  onBackspaceClick: () => void
  onClearEntryClick: () => void
  onClearClick: () => void
}

export default function ButtonGrid({
  onNumberClick,
  onOperationClick,
  onEqualsClick,
  onPercentageClick,
  onSquareRootClick,
  onNegateClick,
  onBackspaceClick,
  onClearEntryClick,
  onClearClick,
}: ButtonGridProps) {
  return (
    <div className="p-3 sm:p-4 bg-white">
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {/* Row 1: Clear operations */}
        <Button label="C" onClick={onClearClick} variant="function" className="col-span-2" />
        <Button label="CE" onClick={onClearEntryClick} variant="function" />
        <Button label="←" onClick={onBackspaceClick} variant="function" />

        {/* Row 2: Advanced operations */}
        <Button label="√" onClick={onSquareRootClick} variant="operation" />
        <Button label="±" onClick={onNegateClick} variant="operation" />
        <Button label="%" onClick={onPercentageClick} variant="operation" />
        <Button label="÷" onClick={() => onOperationClick("÷")} variant="operation" />

        {/* Row 3: Numbers 7-9 and multiply */}
        <Button label="7" onClick={() => onNumberClick("7")} />
        <Button label="8" onClick={() => onNumberClick("8")} />
        <Button label="9" onClick={() => onNumberClick("9")} />
        <Button label="×" onClick={() => onOperationClick("×")} variant="operation" />

        {/* Row 4: Numbers 4-6 and minus */}
        <Button label="4" onClick={() => onNumberClick("4")} />
        <Button label="5" onClick={() => onNumberClick("5")} />
        <Button label="6" onClick={() => onNumberClick("6")} />
        <Button label="-" onClick={() => onOperationClick("-")} variant="operation" />

        {/* Row 5: Numbers 1-3 and plus */}
        <Button label="1" onClick={() => onNumberClick("1")} />
        <Button label="2" onClick={() => onNumberClick("2")} />
        <Button label="3" onClick={() => onNumberClick("3")} />
        <Button label="+" onClick={() => onOperationClick("+")} variant="operation" />

        {/* Row 6: Zero, decimal, and equals */}
        <Button label="0" onClick={() => onNumberClick("0")} className="col-span-2" />
        <Button label="." onClick={() => onNumberClick(".")} />
        <Button label="=" onClick={onEqualsClick} variant="equals" />
      </div>
    </div>
  )
}
