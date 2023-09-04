import Pledge from '@/components/Pledge/Pledge'
import PageNotFound from '@/components/Shared/PageNotFound'
import { Metadata, ResolvingMetadata } from 'next'
import { api } from 'polarkit'

export async function generateMetadata(
  {
    params,
  }: {
    params: { organization: string; repo: string; number: string }
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const issue = await api.issues.lookup({
    externalUrl: `https://github.com/${params.organization}/${params.repo}/issues/${params.number}`,
  })

  if (!issue) {
    return {}
  }

  return {
    title: `Fund: ${issue.title}`, // " | Polar is added by the template"
    openGraph: {
      title: `Fund: ${issue.title}`,
      description: `${issue.repository.organization.name} seeks funding for ${issue.title} Polar`,
      images: [
        {
          url: `https://polar.sh/og?org=${issue.repository.organization.name}&repo=${issue.repository.name}&number=${issue.number}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      images: [
        {
          url: `https://polar.sh/og?org=${issue.repository.organization.name}&repo=${issue.repository.name}&number=${issue.number}`,
          width: 1200,
          height: 630,
          alt: `${issue.repository.organization.name} seeks funding for ${issue.title} on Polar`,
        },
      ],
      card: 'summary_large_image',
      title: `${issue.repository.organization.name} seeks funding for ${issue.title}`,
      description: `${issue.repository.organization.name} seeks funding for ${issue.title} on Polar`,
    },
  }
}

export default async function Page({
  params,
}: {
  params: { organization: string; repo: string; number: string }
}) {
  const issue = await api.issues.lookup({
    externalUrl: `https://github.com/${params.organization}/${params.repo}/issues/${params.number}`,
  })

  if (!issue) {
    return <PageNotFound />
  }

  return (
    <>
      <Pledge issue={issue} asOrg={undefined} gotoURL={undefined} />
    </>
  )
}