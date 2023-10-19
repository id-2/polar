import SubscriptionTierEditPage from '@/components/Subscriptions/SubscriptionTierEditPage'
import { getServerSideAPI } from '@/utils/api'
import { Platforms, ResponseError } from '@polar-sh/sdk'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata(
  {
    params,
  }: {
    params: { organization: string; tier: string }
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: `${params.organization}`, // " | Polar is added by the template"
  }
}

export default async function Page({
  params,
}: {
  params: { organization: string; tier: string }
}) {
  const api = getServerSideAPI()
  const organization = await api.organizations.lookup({
    organizationName: params.organization,
    platform: Platforms.GITHUB,
  })
  try {
    const subscriptionTier = await api.subscriptions.lookupSubscriptionTier({
      subscriptionTierId: params.tier,
    })

    return (
      <SubscriptionTierEditPage
        subscriptionTier={subscriptionTier}
        organization={organization}
      />
    )
  } catch (e) {
    if (e instanceof ResponseError && e.response.status === 404) {
      notFound()
    }
  }
}