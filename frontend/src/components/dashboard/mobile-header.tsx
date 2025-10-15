import React from "react"

export function MobileHeader() {
  return (
    <header className="md:hidden flex flex-col items-start px-4 pt-4">
      {/* Top logo bar */}
      <div className="w-full flex justify-between items-center bg-gray-200 rounded-2xl px-5 py-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-white" />
        <span className="text-lg font-semibold">Logo</span>
        <div className="w-10 h-10 rounded-full bg-black" />
      </div>

      {/* Greeting */}
      <h1 className="text-xl font-serif font-semibold text-gray-900">
        Hi Arlette Welcome Back,
      </h1>
    </header>
  )
}
