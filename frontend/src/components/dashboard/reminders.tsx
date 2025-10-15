const reminders = [
  { title: "Rebranding - ACME", subtitle: "Logo Package", client: "ACME INC", date: "10/11/2025" },
  { title: "Content - Clario", subtitle: "Monthly proposal", client: "NorthFace", date: "10/14/2025" },
  { title: "Web Development - Clario", subtitle: "Clients page", client: "Arvo", date: "10/20/2025" },
  { title: "Branding - PropEase", subtitle: "BrandBook", client: "PropEase", date: "10/21/2025" },
  { title: "Web Redesign - Langara", subtitle: "Home Page", client: "Langara", date: "10/23/2025" },
  { title: "UX Research - Pet Care", subtitle: "User Journey Map", client: "Pet Care", date: "10/25/2025" },
]

export function Reminders() {
  return (
    <div className=" p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Reminders</h3>
      <div className="space-y-3">
        {reminders.map((r, idx) => (
          <div key={idx} className="rounded-xl bg-gray-100 p-3">
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-block w-2 h-2 rounded-full bg-gray-600" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-800">{r.title}</p>
                <p className="text-sm text-gray-600">{r.subtitle}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>{r.client}</span>
                  <span className="text-gray-800 font-semibold">{r.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

