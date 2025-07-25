
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PredictionResult } from "./PredictionForm";

export function PriceChart({ result }: { result: PredictionResult }) {
  // Format price for display
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Generate price trend data (simulated)
  const generatePriceTrendData = () => {
    const currentYear = new Date().getFullYear();
    const basePrice = result.predictedPrice * 0.8; // Starting at 80% of current prediction
    
    return Array.from({ length: 6 }, (_, i) => {
      const year = currentYear - 5 + i;
      // Add some randomness and general upward trend
      const growthFactor = 1 + (i * 0.05) + (Math.random() * 0.03);
      return {
        year,
        price: basePrice * growthFactor,
      };
    });
  };

  // Generate feature importance data
  const generateFeatureImportanceData = () => {
    return [
      { feature: "Location", importance: 35 + Math.random() * 5 },
      { feature: "Size", importance: 25 + Math.random() * 5 },
      { feature: "Bedrooms", importance: 15 + Math.random() * 3 },
      { feature: "Bathrooms", importance: 10 + Math.random() * 3 },
      { feature: "Age", importance: 8 + Math.random() * 2 },
      { feature: "Amenities", importance: 7 + Math.random() * 3 },
    ];
  };

  // Generate price range data
  const generatePriceRangeData = () => {
    const low = result.predictedPrice - result.priceRange;
    const high = result.predictedPrice + result.priceRange;
    
    return [
      { name: "Low", value: low },
      { name: "Predicted", value: result.predictedPrice },
      { name: "High", value: high },
    ];
  };

  const priceTrendData = generatePriceTrendData();
  const featureImportanceData = generateFeatureImportanceData();
  const priceRangeData = generatePriceRangeData();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Price Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trend">
          <TabsList className="mb-4">
            <TabsTrigger value="trend">Historical Trend</TabsTrigger>
            <TabsTrigger value="features">Feature Importance</TabsTrigger>
            <TabsTrigger value="range">Price Range</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trend" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={priceTrendData}
                margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="year" />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000)}k`}
                />
                <Tooltip formatter={(value) => formatPrice(Number(value))} />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#8B5CF6" 
                  fill="url(#colorPrice)" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="features" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={featureImportanceData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={true} vertical={false} />
                <XAxis type="number" unit="%" />
                <YAxis type="category" dataKey="feature" width={80} />
                <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                <Legend />
                <Bar 
                  dataKey="importance" 
                  name="Impact on Price" 
                  fill="#8B5CF6" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="range" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={priceRangeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis 
                  domain={[
                    Math.floor(priceRangeData[0].value * 0.95 / 10000) * 10000, 
                    Math.ceil(priceRangeData[2].value * 1.05 / 10000) * 10000
                  ]}
                  tickFormatter={(value) => `$${(value / 1000)}k`}
                />
                <Tooltip formatter={(value) => formatPrice(Number(value))} />
                <Bar 
                  dataKey="value" 
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
