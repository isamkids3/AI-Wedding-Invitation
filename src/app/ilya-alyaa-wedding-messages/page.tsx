import type { Metadata } from "next"
import WeddingMessagesShowcase from "@/components/WeddingMessagesShowcase"
import { WEDDING } from "@/lib/constants"

export const metadata: Metadata = {
  title: `Wedding Messages — ${WEDDING.fullTitle}`,
  description: `Showcase of wedding messages for ${WEDDING.fullTitle}.`,
}

export interface MessageItem {
  name: string
  msg: string
}

function getMessages(): MessageItem[] {
  const rawMessages = process.env.WEDDING_MESSAGES || process.env.NEXT_PUBLIC_WEDDING_MESSAGES
  if (!rawMessages) return []
  try {
    const sanitized = rawMessages.replace(/[\x00-\x1F]/g, (char) => {
      if (char === "\n") return "\\n"
      if (char === "\r") return "\\r"
      if (char === "\t") return "\\t"
      return ""
    })
    const parsed = JSON.parse(sanitized)
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item) => item && typeof item.name === "string" && typeof item.msg === "string"
      )
    }
  } catch (e) {
    console.error("Failed to parse WEDDING_MESSAGES JSON:", e)
  }
  return []
}

export default function WeddingMessagesPage() {
  const messages = getMessages()
  return <WeddingMessagesShowcase initialMessages={messages} />
}
