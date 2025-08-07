import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF3E96"];

const avgPricePerM2 = 14601;

const topGovernorates = [
  { name: "Giza", value: 334862 },
  { name: "Cairo", value: 332655 },
  { name: "Alexandria", value: 332483 },
];

const topCities = [
  { name: "6th of October", value: 67442 },
  { name: "Dokki", value: 67225 },
  { name: "Heliopolis", value: 66834 },
  { name: "Haram", value: 66810 },
  { name: "Sheikh Zayed", value: 66776 },
];

const avgPriceByGovernorate = [
  { name: "Cairo", price: 3911717 },
  { name: "Giza", price: 3105307 },
  { name: "Alexandria", price: 3058174 },
];

const furnishedDistribution = [
  { name: "Yes", value: 500208 },
  { name: "No", value: 499792 },
];

const propertyStatusDistribution = [
  { name: "For Sale", value: 333533 },
  { name: "Reserved", value: 333326 },
  { name: "Sold", value: 333141 },
];

const governorateStats = [
  { name: "Cairo", price: 3911717, size: 229.85, listings: 332655, bedrooms: 3.2 },
  { name: "Giza", price: 3105307, size: 230.05, listings: 334862, bedrooms: 3.0 },
  { name: "Alexandria", price: 3058174, size: 230.01, listings: 332483, bedrooms: 2.9 },
  // You can add more governorates here if needed
];

export default function Dashboard() {
  return (
    <div className="pt-20 px-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Average Price per m²</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {avgPricePerM2.toLocaleString()} EGP
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Governorates by Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topGovernorates}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Cities by Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topCities}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Price by Governorate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={avgPriceByGovernorate}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Furnished vs Unfurnished</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={furnishedDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {furnishedDistribution.map((entry, index) => (
                    <Cell key={`furn-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={propertyStatusDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {propertyStatusDistribution.map((entry, index) => (
                    <Cell key={`status-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Governorate Insights</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {governorateStats.map((gov) => (
          <Card key={gov.name}>
            <CardHeader>
              <CardTitle>{gov.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Avg. Price:</strong> {gov.price.toLocaleString()} EGP</p>
              <p><strong>Avg. Size:</strong> {gov.size} m²</p>
              <p><strong>Avg. Bedrooms:</strong> {gov.bedrooms}</p>
              <p><strong>Listings:</strong> {gov.listings.toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
