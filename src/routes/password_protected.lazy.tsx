import axios, { Axios, AxiosError } from 'axios'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { baseBackendUrl } from '@/services/apis'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/password_protected')({
  component: PasswordProtected,
})

function PasswordProtected() {
  const [alias, setAlias] = useState('')

  useEffect(() => {
    const paramss = new URLSearchParams(window.location.search)

    setAlias(paramss.get('alias') || '')
  }, [])

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1>Please enter the required password</h1>
      <form
        className="flex flex-col items-center gap-2"
        action={baseBackendUrl + alias}
        method="post"
      >
        <Input type="password" name="password" />
        <Button type="submit">Access</Button>
      </form>
    </div>
  )
}
