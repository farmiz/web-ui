const Loader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center h-full flex-col gap-4">
      <div className="loader h-7 w-8 border-4 rounded-full border-x-[#000] border-y-transparent spin-in-6 animate-spin duration-500"></div>
      <h3>Loading...</h3>
    </div>
  )
}

export default Loader