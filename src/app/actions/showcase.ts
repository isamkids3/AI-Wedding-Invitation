"use server"

export async function verifyShowcasePassword(inputPassword: string) {
  const secret = process.env.SHOWCASE_PASSWORD?.trim().toLowerCase()

  if (!secret) {
    console.error("SHOWCASE_PASSWORD environment variable is not configured.")
    return { success: false, error: "Password access is not configured on the server." }
  }

  const trimmedInput = inputPassword.trim().toLowerCase()

  if (trimmedInput === secret) {
    return { success: true }
  }

  return { success: false, error: "Incorrect password. Please try again." }
}
