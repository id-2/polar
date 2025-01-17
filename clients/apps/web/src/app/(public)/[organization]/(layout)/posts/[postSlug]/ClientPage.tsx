'use client'

import LongformPost from '@/components/Feed/LongformPost'
import { useAuth } from '@/hooks/auth'
import { ArrowBackOutlined } from '@mui/icons-material'
import { Article } from '@polar-sh/sdk'
import Link from 'next/link'
import { api } from 'polarkit/api'
import { Button } from 'polarkit/components/ui/atoms'
import { useUserSubscriptions } from 'polarkit/hooks'
import { useEffect } from 'react'

const postViewKey = 'posts_viewed'

export default function Page({ article }: { article: Article }) {
  useEffect(() => {
    // Track view
    const views = JSON.parse(localStorage.getItem(postViewKey) ?? '{}')

    // already viewed by user, skip tracking
    if (views[article.id]) {
      return
    }

    views[article.id] = '1'
    localStorage.setItem(postViewKey, JSON.stringify(views))

    // record page view
    api.articles.viewed({ id: article.id })
  }, [article])

  const { currentUser } = useAuth()

  const userSubs = useUserSubscriptions(
    currentUser?.id,
    article.organization.name,
    true,
    30,
    article.organization.platform,
  )

  const isSubscriber =
    (userSubs.data?.items && userSubs.data.items?.length > 0) ?? false

  return (
    <div className="dark:md:bg-polar-900 dark:md:border-polar-800 relative flex w-full flex-col items-center rounded-3xl md:bg-white md:p-12 md:shadow-xl dark:md:border">
      <Link
        className="absolute left-16 top-16 hidden flex-shrink md:block"
        href={`/${article.organization.name}`}
      >
        <Button
          size="sm"
          variant="secondary"
          className="group flex h-8 w-8 flex-col items-center justify-center rounded-full border"
        >
          <ArrowBackOutlined fontSize="inherit" />
        </Button>
      </Link>
      <LongformPost
        article={article}
        isSubscriber={isSubscriber}
        showPaywalledContent={true} // Can safely be true. If the user doesn't have permissions to see the paywalled content it will already be stripped out.
        animation={false}
      />
    </div>
  )
}
