import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Tables } from '@/types/supabase'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const personsQuery = supabase.from('persons').select()

  const { data, error } = await personsQuery
  if (error) throw error
  const persons: Tables<'persons'>[] = data

  return (
    <ul>
      {persons?.map(({ id, first_name, last_name }) => (
        <li key={id}>
          {id}: {first_name}
          {last_name}
        </li>
      ))}
    </ul>
  )
}
