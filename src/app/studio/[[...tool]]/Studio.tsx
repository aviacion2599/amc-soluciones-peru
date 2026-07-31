'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export function Studio() {
  return (
    <div className="absolute inset-0 z-[999999] bg-white">
      <NextStudio config={config} />
    </div>
  )
}
