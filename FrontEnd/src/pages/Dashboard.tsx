import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    ScatterChart,
    Scatter,
    ZAxis,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const data = {
    avgPricePerM2: 15000,
    avgSizePerBedroom: 43,
    avgPricePerBedroom: 632000,
    bedroomsPer100M2: 2,
    customersTotalSpend: 1000000,
    relationBetweenBathroomsAndBedrooms: [
        { x: 1, y: 1, z: 120 },
        { x: 1, y: 2, z: 150 },
        { x: 2, y: 2, z: 200 },
        { x: 2, y: 3, z: 250 },
        { x: 3, y: 3, z: 300 },
        { x: 3, y: 4, z: 350 },
    ],
    avgPricePerBedroomByCity: [
        { name: "New Cairo", value: 970000 },
        { name: "Heliopolis", value: 820000 },
        { name: "Mohandessin", value: 760000 },
        { name: "Maadi", value: 740000 },
        { name: "Dokki", value: 670000 },
        { name: "Smouha", value: 670000 },
        { name: "Nasr City", value: 650000 },
        { name: "Sidi Gaber", value: 630000 },
        { name: "Loran", value: 630000 },
        { name: "Sheikh Zayed", value: 580000 },
        { name: "6th of October", value: 500000 },
        { name: "Zaytoun", value: 500000 },
        { name: "Moharam Bek", value: 500000 },
        { name: "Asafra", value: 450000 },
        { name: "Haram", value: 410000 },
    ],
    avgPricePerBedroomByGovernoratePie: [
        { name: "Cairo", value: 38.83 },
        { name: "Giza", value: 30.82 },
        { name: "Alexandria", value: 30.35 },
    ],
    avgPriceByGovernorateBar: [
        { name: "Cairo", value: 3911720 },
        { name: "Giza", value: 3105310 },
        { name: "Alexandria", value: 3058170 },
    ],
};

const Dashboard = () => {
    const {
        avgPricePerM2,
        avgSizePerBedroom,
        avgPricePerBedroom,
        bedroomsPer100M2,
        customersTotalSpend,
        relationBetweenBathroomsAndBedrooms,
        avgPricePerBedroomByCity: avgPricePerBedroomByCityData,
        avgPricePerBedroomByGovernoratePie: avgPricePerBedroomByGovernoratePieData,
        avgPriceByGovernorateBar: avgPriceByGovernorateBarData
    } = data;

    return (
        <div className="min-h-screen bg-background text-foreground p-4">
            <h1 className="text-3xl font-bold mb-4">
                Real Estate Price Prediction Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                <Card>
                    <CardHeader>
                        <CardTitle>AVG Price Per m²</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {avgPricePerM2.toLocaleString()}K
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>AVG Size Per Bedroom</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {avgSizePerBedroom.toFixed(2)}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>AVG Price Per Bedroom</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {avgPricePerBedroom.toLocaleString()}K
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle># of Bedrooms per 100 m²</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {bedroomsPer100M2.toFixed(2)}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Customers' total spend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {customersTotalSpend.toLocaleString()}M
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>
                            Relation between Bathrooms and Bedrooms by Size_m2
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart>
                                <CartesianGrid />
                                <XAxis
                                    type="number"
                                    dataKey="x"
                                    name="bathrooms"
                                />
                                <YAxis
                                    type="number"
                                    dataKey="y"
                                    name="bedrooms"
                                />
                                <ZAxis
                                    type="number"
                                    dataKey="z"
                                    range={[100, 1000]}
                                    name="size"
                                />
                                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                                <Scatter
                                    name="A school"
                                    data={relationBetweenBathroomsAndBedrooms}
                                    fill="#8884d8"
                                />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Avg_Price Per Bedroom by city</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                layout="vertical"
                                data={avgPricePerBedroomByCityData}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            AVG Price Per Bedroom by governorate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={avgPricePerBedroomByGovernoratePieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {avgPricePerBedroomByGovernoratePieData.map(
                                        (entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        )
                                    )}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>AVG Price by governorate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={avgPriceByGovernorateBarData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Dashboard;