const validateSupabaseUrl = (url: string) => {
  const regex = /^https:\/\/[a-z0-9]+\.(supabase\.[a-z]+)/
  return regex.test(url)
}

export const isFormValid = ({
  urlProject,
  serviceKey
}: {
  urlProject: string
  serviceKey: string
}) => {
  return serviceKey.trim() !== '' && urlProject.trim() !== '' && validateSupabaseUrl(urlProject)
}
