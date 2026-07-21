import { fe } from "./fe"

type Success<T> = { success: true; data: T }
type Failure = { success: false; error: string }

export async function tryCatch<T>(
  promise: Promise<T>,
): Promise<Success<T> | Failure> {
  try {
    const data = await promise
    return { success: true, data }
  } catch (error) {
    return { success: false, error: fe(error) }
  }
}

export function syncTryCatch<T>(fn: () => T): Success<T> | Failure {
  try {
    const data = fn()
    return { success: true, data }
  } catch (error) {
    return { success: false, error: fe(error) }
  }
}
