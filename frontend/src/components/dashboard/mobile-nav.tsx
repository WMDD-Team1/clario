export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-[#2a2a2a] rounded-3xl p-4 shadow-lg">
        <div className="flex items-center justify-around">
          <button className="w-14 h-14 bg-gray-600 rounded-2xl hover:bg-gray-500 transition-colors" aria-label="Home" />
          <button
            className="w-14 h-14 bg-gray-600 rounded-2xl hover:bg-gray-500 transition-colors"
            aria-label="Money Flow"
          />
          <button className="w-14 h-14 bg-gray-600 rounded-2xl hover:bg-gray-500 transition-colors" aria-label="Work" />
          <button
            className="w-14 h-14 bg-gray-600 rounded-2xl hover:bg-gray-500 transition-colors"
            aria-label="Settings"
          />
        </div>
      </div>
    </nav>
  )
}
