import { FetchLoader } from "./FetchLoader"

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center h-full flex-col gap-4">
      <FetchLoader />
      <h3>Loading...</h3>
    </div>
  )
}

export default Loader