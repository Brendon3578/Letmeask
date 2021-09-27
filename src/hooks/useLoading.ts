import { useState, useEffect } from "react"

export function useLoading() {

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const loadingTimer = setTimeout(() => setLoading(false), 2500);

    return () => (clearTimeout(loadingTimer))
  }, [])

  return { loading }
}