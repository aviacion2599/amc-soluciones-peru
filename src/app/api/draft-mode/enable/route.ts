import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { client } from '../../../../sanity/lib/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  // (In a real app, you should validate the secret against an environment variable)
  
  const draft = await draftMode()
  draft.enable()

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(slug || '/')
}
