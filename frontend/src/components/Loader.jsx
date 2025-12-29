import { LoaderIcon } from "lucide-react"

const LoaderPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoaderIcon className="size-10 animate-spin" />
    </div>
  )
}

export default LoaderPage
