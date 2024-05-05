import * as React from "react"
import { X } from "lucide-react"
import { Input } from "./input"

interface KeywordsInputProps {
  initialKeywords?: string[]
  onKeywordsChange: (keywords: string[]) => void
}

export const KeywordsInput: React.FC<KeywordsInputProps> = ({
  initialKeywords = [],
  onKeywordsChange,
}) => {
  const [keywords, setKeywords] = React.useState<string[]>(initialKeywords)
  const [inputValue, setInputValue] = React.useState<string>("")

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (event.key === "Enter" || event.key === ",") &&
      inputValue.trim() !== ""
    ) {
      event.preventDefault()
      const newKeywords = [...keywords, inputValue.trim()]
      setKeywords(newKeywords)
      onKeywordsChange(newKeywords)
      setInputValue("")
    } else if (event.key === "Backspace" && inputValue === "") {
      event.preventDefault()
      const newKeywords = keywords.slice(0, -1)
      setKeywords(newKeywords)
      onKeywordsChange(newKeywords)
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const paste = event.clipboardData.getData("text")
    const keywordsToAdd = paste
      .split(/[\n\t,]+/)
      .map((keyword) => keyword.trim())
      .filter(Boolean)
    if (keywordsToAdd.length) {
      const newKeywords = [...keywords, ...keywordsToAdd]
      setKeywords(newKeywords)
      onKeywordsChange(newKeywords)
      setInputValue("")
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (inputValue.trim() !== "" && event.relatedTarget?.tagName !== "BUTTON") {
      const newKeywords = [...keywords, inputValue.trim()]
      setKeywords(newKeywords)
      onKeywordsChange(newKeywords)
      setInputValue("")
    }
  }

  const removeKeyword = (indexToRemove: number) => {
    const newKeywords = keywords.filter((_, index) => index !== indexToRemove)
    setKeywords(newKeywords)
    onKeywordsChange(newKeywords)
  }

  return (
    <div className="flex w-full flex-wrap items-center">
      <div
        className="flex w-full flex-wrap overflow-y-auto"
        style={{ maxHeight: "300px" }}
      >
        {keywords.map((keyword, index) => (
          <button
            key={index}
            type="button"
            onClick={() => removeKeyword(index)}
            className="m-1 flex items-center rounded-full bg-primary px-2 py-1 text-xs text-white"
          >
            {keyword}
            <X size={14} className="ml-2 cursor-pointer" />
          </button>
        ))}
        <Input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={(e) => handleBlur(e)}
          placeholder="Type keyword and press Enter..."
        />
      </div>
    </div>
  )
}
