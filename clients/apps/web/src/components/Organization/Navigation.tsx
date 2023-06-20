import { useRouter } from 'next/router'
import {
  OrganizationPublicRead,
  RepositoryPublicRead,
} from 'polarkit/api/client'
import RepoSelection from './RepoSelection'

const Navigation = ({
  organization,
  repositories,
  repository,
}: {
  organization: OrganizationPublicRead
  repositories: RepositoryPublicRead[]
  repository?: RepositoryPublicRead
}) => {
  const router = useRouter()

  return (
    <div className="flex items-center text-black text-gray-900 dark:text-gray-200">
      <img src={organization.avatar_url} className="h-8 w-8 rounded-full" />
      <div className="ml-4 text-sm ">{organization.name}</div>
      <div className="ml-3 mr-1">/</div>
      <RepoSelection
        organization={organization}
        repositories={repositories}
        value={repository}
        onSelectRepo={(repo) => {
          router.push(`/${organization.name}/${repo}`)
        }}
        onSelectAll={() => {
          router.push(`/${organization.name}`)
        }}
      />
    </div>
  )
}

export default Navigation