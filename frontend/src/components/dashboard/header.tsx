export function Header() {
  return (
    <header className="top-0 left-0 right-0 h-20 flex items-center justify-between px-4 md:px-6 z-10">
      <div className="flex items-center gap-3 bg-[#ededed] p-3 pr-18 pl-4 rounded-xl">
        <span className="text-xl md:text-2xl font-semibold">Logo</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative flex items-center gap-4">
            
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full h-12 pl-4 pr-12 bg-gray-100 rounded-full text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              </div>
            </div>
          </div>
        </div>
        <div className="w-12 h-12 rounded-full bg-gray-300" />
      </div>
    </header>
  )
}