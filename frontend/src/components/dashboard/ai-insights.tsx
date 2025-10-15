export function AIInsights() {
  const insights = [
    {
      title: "Earning Trend",
      period: "This Month",
      content:
        "Your income grew 18% compared to last month mostly from Project A. You're trending toward a more stable cashflow.",
    },
    {
      title: "Client Dependency",
      period: "This Month",
      content:
        "75% of your total income came from a single client this month — consider diversifying your portfolio.",
    },
    {
      title: "Income Projection",
      period: "Next Month",
      content: "You have $2,800 in confirmed recurring income for the next 30 days.",
    },
    {
      title: "Payment Timeliness",
      period: "Next Month",
      content:
        "Client B usually pays 8 days late — consider updating your contract terms.",
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Insights of Your Work</h3>
      {insights.map((item, idx) => (
        <div key={idx} className="bg-gray-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{item.title}</span>
            <span className="text-xs text-gray-600">{item.period}</span>
          </div>
          <p className="text-sm text-gray-700 mt-3">{item.content}</p>
        </div>
      ))}
    </div>
  )
}
