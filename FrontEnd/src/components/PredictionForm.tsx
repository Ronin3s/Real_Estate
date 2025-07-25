import { useState } from "react";
import {
    MapPin,
    BedDouble,
    Bath,
    Building2,
    Calculator,
    MapPinHouse,
    Building,
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
import { PredictionResult } from "@/types/PredictionResult";

export function PredictionForm({
    onPredict,
}: {
    onPredict: (result: PredictionResult) => void;
}) {
    const [bedrooms, setBedrooms] = useState(2);
    const [bathrooms, setBathrooms] = useState(1);
    const [size, setSize] = useState(100);
    const [floor, setFloor] = useState(3);
    const [governorate, setGovernorate] = useState("Cairo");
    const [city, setCity] = useState("Nasr City");
    const [furnished, setFurnished] = useState(false);
    const [predictedPrice, setPredictedPrice] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            Bedrooms: bedrooms,
            Bathrooms: bathrooms,
            Size_m2: size,
            Floor: floor,
            Governorate: governorate,
            City: city,
            Furnished: furnished ? 1 : 0,
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/predict/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            setPredictedPrice(data.predicted_price_EGP);
            onPredict(data);
        } catch (error) {
            console.error("❌ Error fetching prediction:", error);
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-[#1b1b29] backdrop-blur-lg border border-t-4 border-t-realestate-purple dark:border-t-realestate-purple  text-gray-900 dark:text-white p-6 rounded-2xl shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-realestate-purple" />
                    Property Details
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-white/60">
                    Enter the details of the property to get an accurate price
                    prediction
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Governorate */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-gray-900 dark:text-white">
                                <MapPin className="h-4 w-4 text-purple-400" />{" "}
                                Governorate
                            </Label>
                            <select
                                className="w-full bg-white dark:bg-white/10 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                value={governorate}
                                onChange={(e) => setGovernorate(e.target.value)}
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

                        {/* City */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-gray-900 dark:text-white">
                                <MapPinHouse className="h-4 w-4 text-purple-400" />{" "}
                                City
                            </Label>
                            <input
                                type="text"
                                placeholder="Address or neighborhood"
                                className="w-full bg-white dark:bg-white/10 text-gray-900 dark:text-white placeholder-white/60 border border-gray-300 dark:border-white/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        {/* Bedrooms */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="bedrooms"
                                className="flex items-center gap-2 text-gray-900 dark:text-white"
                            >
                                <BedDouble className="h-4 w-4 text-purple-400" />{" "}
                                Bedrooms: {bedrooms}
                            </Label>
                            <div className="flex items-center gap-4">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setBedrooms(Math.max(1, bedrooms - 1))
                                    }
                                    className="text-gray-900 dark:text-white border border-gray-300 dark:border-white/30"
                                >
                                    -
                                </Button>
                                <Slider
                                    id="bedrooms"
                                    min={1}
                                    max={9}
                                    step={1}
                                    value={[bedrooms]}
                                    onValueChange={(value) =>
                                        setBedrooms(value[0])
                                    }
                                    className=" flex-1 "
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setBedrooms(Math.min(9, bedrooms + 1))
                                    }
                                    className="text-gray-900 dark:text-white border border-gray-300 dark:border-white/30"
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        {/* Bathrooms */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="bathrooms"
                                className="flex items-center gap-2 text-gray-900 dark:text-white"
                            >
                                <Bath className="h-4 w-4 text-purple-400" />{" "}
                                Bathrooms: {bathrooms}
                            </Label>
                            <div className="flex items-center gap-4">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setBathrooms(Math.max(1, bathrooms - 1))
                                    }
                                    className="text-gray-900 dark:text-white border border-gray-300 dark:border-white/30"
                                >
                                    -
                                </Button>
                                <Slider
                                    id="bathrooms"
                                    min={1}
                                    max={6}
                                    step={1}
                                    value={[bathrooms]}
                                    onValueChange={(value) =>
                                        setBathrooms(value[0])
                                    }
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setBathrooms(Math.min(6, bathrooms + 1))
                                    }
                                    className="text-gray-900 dark:text-white border border-gray-300 dark:border-white/30"
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        {/* Size */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-gray-900 dark:text-white">
                                <Building2 className="h-4 w-4 text-purple-400" />{" "}
                                Size (m²): {size}
                            </Label>
                            <Slider
                                min={30}
                                max={500}
                                step={10}
                                value={[size]}
                                onValueChange={([val]) => setSize(val)}
                            />
                        </div>

                        {/* Floor */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-gray-900 dark:text-white">
                                <Building className="h-4 w-4 text-purple-400" />{" "}
                                Floor: {floor}
                            </Label>
                            <Slider
                                min={0}
                                max={20}
                                step={1}
                                value={[floor]}
                                onValueChange={([val]) => setFloor(val)}
                            />
                        </div>

                        {/* Furnished */}
                        <div className="flex items-center gap-2 col-span-2">
                            <Switch
                                id="furnished"
                                checked={furnished}
                                onCheckedChange={() => setFurnished(!furnished)}
                            />
                            <Label htmlFor="furnished" className="text-gray-900 dark:text-white">
                                Furnished
                            </Label>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-realestate-purple text-white dark:hover:text-gray-900"
                    >
                        Calculate Price Prediction
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
