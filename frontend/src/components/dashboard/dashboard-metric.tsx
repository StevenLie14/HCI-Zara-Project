import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardMetrics() {
  const metrics = [
    {
      title: "Total Sales",
      value: "XXXX",
      change: "+XX% since last month",
      positive: true,
    },
    {
      title: "Orders",
      value: "XXXX",
      change: "+XX% since last month",
      positive: true,
    },
    {
      title: "Revenue",
      value: "XXXX",
      change: "+XX% since last month",
      positive: true,
    },
    {
      title: "Customers",
      value: "XXXX",
      change: "+XX% since last month",
      positive: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className={`text-xs ${metric.positive ? "text-green-600" : "text-red-600"}`}>{metric.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
