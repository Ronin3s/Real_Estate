import { useState } from "react";
import {
    MapPin,
    BedDouble,
    Bath,
    Building2,
    Building,
    Scale,
    House,
    Search,
    RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

export default function CompareForm() {
    const emptyProperty = {
        Governorate: "Cairo",
        City: "Nasr City",
        Bedrooms: 2,
        Bathrooms: 1,
        Size_m2: 100,
        Status: "For Sale",
        Floor: 3,
        Furnished: false,
    };

    const [property1, setProperty1] = useState({ ...emptyProperty });
    const [property2, setProperty2] = useState({ ...emptyProperty });
    const [result, setResult] = useState(null);

    const handleCompare = async () => {
        const payload = {
            property1: {
                ...property1,
                Furnished: property1.Furnished ? "Yes" : "No",
            },
            property2: {
                ...property2,
                Furnished: property2.Furnished ? "Yes" : "No",
            },
        };

        const res = await fetch(
            "http://127.0.0.1:8000/compare/compare-by-features",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            }
        );
        const data = await res.json();
        setResult(data);
    };

    const renderPropertyInputs = (property, setProperty, label) => (
        <div className="space-y-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-realestate-purple" />
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-purple-400" />{" "}
                        Governorate
                    </Label>
                    <select
                        value={property.Governorate}
                        onChange={(e) =>
                            setProperty({
                                ...property,
                                Governorate: e.target.value,
                            })
                        }
                        className="w-full bg-white dark:bg-white/10 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 rounded-md px-4 py-2"
                    >
                        <option
                            className="bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-white"
                            value="Cairo"
                        >
                            Cairo
                        </option>
                        <option
                            className="bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-white"
                            value="Giza"
                        >
                            Giza
                        </option>
                        <option
                            className="bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-white"
                            value="Alexandria"
                        >
                            Alexandria
                        </option>
                    </select>
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center gap-2">City</Label>
                    <input
                        type="text"
                        value={property.City}
                        onChange={(e) =>
                            setProperty({ ...property, City: e.target.value })
                        }
                        className="w-full bg-white dark:bg-white/10 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 rounded-md px-4 py-2"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                        <BedDouble className="h-4 w-4 text-purple-400" />{" "}
                        Bedrooms: {property.Bedrooms}
                    </Label>
                    <Slider
                        min={1}
                        max={9}
                        step={1}
                        value={[property.Bedrooms]}
                        onValueChange={([val]) =>
                            setProperty({ ...property, Bedrooms: val })
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                        <Bath className="h-4 w-4 text-purple-400" /> Bathrooms:{" "}
                        {property.Bathrooms}
                    </Label>
                    <Slider
                        min={1}
                        max={6}
                        step={1}
                        value={[property.Bathrooms]}
                        onValueChange={([val]) =>
                            setProperty({ ...property, Bathrooms: val })
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-purple-400" /> Size
                        (m²): {property.Size_m2}
                    </Label>
                    <Slider
                        min={30}
                        max={500}
                        step={10}
                        value={[property.Size_m2]}
                        onValueChange={([val]) =>
                            setProperty({ ...property, Size_m2: val })
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-purple-400" /> Floor:{" "}
                        {property.Floor}
                    </Label>
                    <Slider
                        min={0}
                        max={20}
                        step={1}
                        value={[property.Floor]}
                        onValueChange={([val]) =>
                            setProperty({ ...property, Floor: val })
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label>Status</Label>
                    <select
                        value={property.Status}
                        onChange={(e) =>
                            setProperty({ ...property, Status: e.target.value })
                        }
                        className="w-full bg-white dark:bg-white/10 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 rounded-md px-4 py-2"
                    >
                        <option
                            className="bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-white"
                            value="For Sale"
                        >
                            For Sale
                        </option>
                        <option
                            className="bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-white"
                            value="Sold"
                        >
                            Sold
                        </option>
                        <option
                            className="bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-white"
                            value="Sold"
                        >
                            Reserved
                        </option>
                    </select>
                </div>

                <div className="flex items-center gap-2 col-span-2">
                    <Switch
                        id="furnished"
                        checked={property.Furnished}
                        onCheckedChange={() =>
                            setProperty({
                                ...property,
                                Furnished: !property.Furnished,
                            })
                        }
                    />
                    <Label htmlFor="furnished">Furnished</Label>
                </div>
            </CardContent>
        </div>
    );

    const propertyFeatureData =
        result?.property1 && result?.property2
            ? [
                  {
                      name: "Property 1",
                      Bedrooms: result.property1.Bedrooms,
                      Bathrooms: result.property1.Bathrooms,
                  },
                  {
                      name: "Property 2",
                      Bedrooms: result.property2.Bedrooms,
                      Bathrooms: result.property2.Bathrooms,
                  },
              ]
            : [];

    return (
        <Card className="w-full max-w-6xl mx-auto  bg-white dark:bg-[#1b1b29] p-6 mt-20 rounded-2xl shadow-lg border border-t-4 border-t-realestate-purple">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-realestate-purple" /> Compare
                    Two Properties
                </CardTitle>
                <CardDescription>
                    Enter details of two properties to compare their predicted
                    prices and get a smart recommendation.
                </CardDescription>
            </CardHeader>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCompare();
                }}
                className="space-y-10"
            >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-start">
                    {renderPropertyInputs(
                        property1,
                        setProperty1,
                        "Property 1"
                    )}

                    {/* VS Separator */}
                    <div className="hidden md:flex flex-col items-center justify-center self-center">
                        <div className="w-px h-24 bg-gray-300 dark:bg-white/30"></div>
                        <div className="my-2 text-lg font-bold text-realestate-purple ">
                            VS
                        </div>
                        <div className="w-px h-24 bg-gray-300 dark:bg-white/30"></div>
                    </div>

                    {renderPropertyInputs(
                        property2,
                        setProperty2,
                        "Property 2"
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full bg-realestate-purple text-white dark:hover:text-gray-900"
                >
                    Compare Properties
                </Button>
            </form>

            {result && result.property1 && result.property2 && (
                <CardContent className="mt-10 space-y-10">
                    <h3 className="text-2xl font-semibold text-realestate-purple text-center">
                        Comparison Results
                    </h3>

                    {/* Property Cards */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Property 1 */}
                        <Card className="bg-white dark:bg-[#2a2a3d] border border-purple-300 dark:border-purple-700 shadow-md p-4">
                            <CardTitle className="text-realestate-purple text-lg mb-2 flex items-center gap-2">
                                <House className="h-5 w-5" /> Property 1
                            </CardTitle>
                            <div className="space-y-1 dark:text-white text-sm">
                                <p>
                                    <strong>Location:</strong>{" "}
                                    {result.property1.Governorate},{" "}
                                    {result.property1.City}
                                </p>
                                <p>
                                    <strong>Price:</strong>{" "}
                                    {result.property1.Predicted_Price_EGP.toLocaleString()}{" "}
                                    EGP
                                </p>
                                <p>
                                    <strong>Size:</strong>{" "}
                                    {result.property1.Size_m2} m²
                                </p>
                                <p>
                                    <strong>Floor:</strong>{" "}
                                    {result.property1.Floor}
                                </p>
                                <p>
                                    <strong>Bedrooms:</strong>{" "}
                                    {result.property1.Bedrooms}
                                </p>
                                <p>
                                    <strong>Bathrooms:</strong>{" "}
                                    {result.property1.Bathrooms}
                                </p>
                                <p>
                                    <strong>Furnished:</strong>{" "}
                                    {result.property1.Furnished}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {result.property1.Status}
                                </p>
                            </div>
                        </Card>

                        {/* Property 2 */}
                        <Card className="bg-white dark:bg-[#2a2a3d] border border-purple-300 dark:border-purple-700 shadow-md p-4">
                            <CardTitle className="text-realestate-purple text-lg mb-2 flex items-center gap-2">
                                <House className="h-5 w-5" /> Property 2
                            </CardTitle>
                            <div className="space-y-1 dark:text-white text-sm">
                                <p>
                                    <strong>Location:</strong>{" "}
                                    {result.property2.Governorate},{" "}
                                    {result.property2.City}
                                </p>
                                <p>
                                    <strong>Price:</strong>{" "}
                                    {result.property2.Predicted_Price_EGP.toLocaleString()}{" "}
                                    EGP
                                </p>
                                <p>
                                    <strong>Size:</strong>{" "}
                                    {result.property2.Size_m2} m²
                                </p>
                                <p>
                                    <strong>Floor:</strong>{" "}
                                    {result.property2.Floor}
                                </p>
                                <p>
                                    <strong>Bedrooms:</strong>{" "}
                                    {result.property2.Bedrooms}
                                </p>
                                <p>
                                    <strong>Bathrooms:</strong>{" "}
                                    {result.property2.Bathrooms}
                                </p>
                                <p>
                                    <strong>Furnished:</strong>{" "}
                                    {result.property2.Furnished}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {result.property2.Status}
                                </p>
                            </div>
                        </Card>
                    </div>

                    {/* Difference Section */}
                    <Card className="bg-purple-50 dark:bg-[#3b2f54] border-l-4 border-realestate-purple p-6 shadow-md">
                        <CardTitle className="text-realestate-purple text-lg mb-4 flex items-center gap-2">
                            <Search className="h-5 w-5" /> Differences
                        </CardTitle>
                        <div className="grid md:grid-cols-2 gap-4 dark:text-white text-sm">
                            <p>
                                <strong>Price Difference:</strong>{" "}
                                {result.Difference.Price_Difference_EGP.toLocaleString()}{" "}
                                EGP ({result.Difference["Difference_%"]}%)
                            </p>
                            <p>
                                <strong>Bedrooms Diff:</strong>{" "}
                                {result.Difference.Bedrooms_Diff}
                            </p>
                            <p>
                                <strong>Bathrooms Diff:</strong>{" "}
                                {result.Difference.Bathrooms_Diff}
                            </p>
                            <p>
                                <strong>Size Diff:</strong>{" "}
                                {result.Difference.Size_m2_Diff} m²
                            </p>
                            <p>
                                <strong>Floor Diff:</strong>{" "}
                                {result.Difference.Floor_Diff}
                            </p>
                        </div>
                    </Card>

                    {/* Recommendation */}
                    <div className="text-center mt-6">
                        <p className="text-green-600 dark:text-green-400 font-bold text-2xl">
                            {result.Recommendation}
                        </p>
                    </div>

                    {/* Charts */}
                    <div className="grid md:grid-cols-2 gap-10">
                        <div>
                            <h4 className="text-lg font-semibold text-center mb-4 text-realestate-purple">
                                Price Comparison
                            </h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={[
                                        {
                                            name: "Property 1",
                                            price:
                                                result?.property1
                                                    ?.Predicted_Price_EGP || 0,
                                        },
                                        {
                                            name: "Property 2",
                                            price:
                                                result?.property2
                                                    ?.Predicted_Price_EGP || 0,
                                        },
                                    ]}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" stroke="#aaa" />
                                    <YAxis
                                        tickFormatter={(val) =>
                                            `${(val / 1000).toFixed(0)}k`
                                        }
                                    />
                                    <Tooltip
                                        formatter={(value) =>
                                            `${Number(
                                                value
                                            ).toLocaleString()} EGP`
                                        }
                                    />
                                    <Bar
                                        dataKey="price"
                                        fill="#7c3aed"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-center mb-4 text-realestate-purple">
                                Bedrooms & Bathrooms Comparison
                            </h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={[
                                        {
                                            name: "Property 1",
                                            Bedrooms:
                                                result?.property1?.Bedrooms ||
                                                0,
                                            Bathrooms:
                                                result?.property1?.Bathrooms ||
                                                0,
                                        },
                                        {
                                            name: "Property 2",
                                            Bedrooms:
                                                result?.property2?.Bedrooms ||
                                                0,
                                            Bathrooms:
                                                result?.property2?.Bathrooms ||
                                                0,
                                        },
                                    ]}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" stroke="#aaa" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="Bedrooms"
                                        fill="#a78bfa"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="Bathrooms"
                                        fill="#7c3aed"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <Button
                            onClick={() => {
                                setResult(null); // تخفي النتائج
                                setProperty1({ ...emptyProperty }); // تعيد تعيين المدخلات
                                setProperty2({ ...emptyProperty });
                            }}
                            className=" bg-realestate-purple text-white dark:hover:text-gray-900"
                        >
                            <RotateCcw />
                            Compare Again
                        </Button>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}
