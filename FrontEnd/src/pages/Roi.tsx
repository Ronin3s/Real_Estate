import { useState } from "react";
import {
    MapPin,
    BedDouble,
    Bath,
    Building2,
    Calculator,
    MapPinHouse,
    Building,
    Wallet,
    Percent,
    CalendarDays,
    BadgeDollarSign,
    TrendingUp,
    Gauge,
    Timer,
    Info,
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
import { motion } from "framer-motion";

const ROICalculatorPage: React.FC = () => {
    // Form states
    const [governorate, setGovernorate] = useState("Cairo");
    const [city, setCity] = useState("Nasr City");
    const [bedrooms, setBedrooms] = useState(2);
    const [bathrooms, setBathrooms] = useState(1);
    const [size, setSize] = useState(100);
    const [floor, setFloor] = useState(3);
    const [furnished, setFurnished] = useState(false);
    const [expectedRent, setExpectedRent] = useState(10000);
    const [targetMonths, setTargetMonths] = useState(12);

    // Result state
    const [roiResult, setRoiResult] = useState(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            governorate,
            city,
            bedrooms,
            bathrooms,
            size_m2: size,
            floor,
            furnished: furnished ? "Yes" : "No",
            expected_rent: expectedRent,
            target_months: targetMonths,
        };

        try {
            const res = await fetch("http://127.0.0.1:8000/roi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            setRoiResult(data);
        } catch (err) {
            console.error("Error fetching ROI:", err);
        }
    };

    return (
        <div className="mt-20 p-6 md:p-10">
            <h2 className="text-3xl dark:text-zinc-300 font-bold mb-4 text-center">
                ROI Calculator
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-center mb-8">
                Quickly estimate the return on investment for your property. Our
                calculator helps you understand the financial upside of your
                real estate decisions.
            </p>

            <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-[#1b1b29] backdrop-blur-lg border border-t-4 border-t-realestate-purple text-gray-900 dark:text-white p-6 rounded-2xl shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-realestate-purple" />{" "}
                        Return on Investment
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-white/60">
                        Fill out the form below to estimate the ROI for your
                        property.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Governorate */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-purple-400" />{" "}
                                    Governorate
                                </Label>
                                <select
                                    className="w-full bg-white dark:bg-white/10 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 rounded-md px-4 py-2"
                                    value={governorate}
                                    onChange={(e) =>
                                        setGovernorate(e.target.value)
                                    }
                                >
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
                                    <option
                                        className="bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-white"
                                        value="Dakahlia"
                                    >
                                        Dakahlia
                                    </option>
                                </select>
                            </div>

                            {/* City */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <MapPinHouse className="h-4 w-4 text-purple-400" />{" "}
                                    City
                                </Label>
                                <input
                                    type="text"
                                    className="w-full bg-white dark:bg-white/10 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 rounded-md px-4 py-2"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            {/* Bedrooms */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <BedDouble className="h-4 w-4 text-purple-400" />{" "}
                                    Bedrooms: {bedrooms}
                                </Label>
                                <Slider
                                    min={1}
                                    max={9}
                                    step={1}
                                    value={[bedrooms]}
                                    onValueChange={([val]) => setBedrooms(val)}
                                />
                            </div>

                            {/* Bathrooms */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Bath className="h-4 w-4 text-purple-400" />{" "}
                                    Bathrooms: {bathrooms}
                                </Label>
                                <Slider
                                    
                                    min={1}
                                    max={6}
                                    step={1}
                                    value={[bathrooms]}
                                    onValueChange={([val]) => setBathrooms(val)}
                                />
                            </div>

                            {/* Size */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
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
                                <Label className="flex items-center gap-2">
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
                                    onCheckedChange={() =>
                                        setFurnished(!furnished)
                                    }
                                />
                                <Label htmlFor="furnished">Furnished</Label>
                            </div>

                            {/* Expected Rent */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 mt-2 mb-4">
                                    <Wallet className="h-4 w-4 text-purple-400" />{" "}
                                    Expected Monthly Rent: {expectedRent} EGP
                                </Label>
                                <Slider
                                    min={1000}
                                    max={100000}
                                    step={1000}
                                    value={[expectedRent]}
                                    onValueChange={([val]) =>
                                        setExpectedRent(val)
                                    }
                                />
                            </div>

                            {/* Target Months */}
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2 mt-2 mb-4">
                                    <CalendarDays className="h-4 w-4 text-purple-400" />{" "}
                                    Target Months: {targetMonths}
                                </Label>
                                <Slider
                                    min={1}
                                    max={120}
                                    step={1}
                                    value={[targetMonths]}
                                    onValueChange={([val]) =>
                                        setTargetMonths(val)
                                    }
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-realestate-purple text-white dark:hover:text-gray-900"
                        >
                            Calculate ROI
                        </Button>
                    </form>

                    {roiResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }} // يبدأ من أسفل وبشفافية
                            animate={{ opacity: 1, y: 0 }} // يظهر تدريجياً ويرتفع
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className={`mt-8 rounded-xl p-6 border-l-8 shadow-md transition-all bg-white dark:bg-[#1b1b29] ${
                                roiResult.roi_rating.includes("High")
                                    ? "border-green-500"
                                    : roiResult.roi_rating.includes("Moderate")
                                    ? "border-yellow-400"
                                    : "border-red-500"
                            }`}
                        >
                            <h3 className="text-2xl font-bold text-realestate-purple mb-4 flex items-center gap-2">
                                <Gauge className="h-6 w-6" />
                                ROI Analysis
                            </h3>

                            <p className="flex items-center gap-2 text-gray-800 dark:text-white mb-2">
                                <BadgeDollarSign className="w-5 h-5 text-purple-500" />
                                <span className="font-medium">
                                    Predicted Price:
                                </span>{" "}
                                <span className="ml-auto">
                                    {roiResult.predicted_property_price_egp.toLocaleString()}{" "}
                                    EGP
                                </span>
                            </p>

                            <p className="flex items-center gap-2 text-gray-800 dark:text-white mb-2">
                                <TrendingUp className="w-5 h-5 text-purple-500" />
                                <span className="font-medium">
                                    ROI Percentage:
                                </span>{" "}
                                <span className="ml-auto">
                                    {roiResult.roi_percentage}%
                                </span>
                            </p>

                            <p className="flex items-center gap-2 text-gray-800 dark:text-white mb-2">
                                <Gauge className="w-5 h-5 text-purple-500" />
                                <span className="font-medium">
                                    ROI Rating:
                                </span>{" "}
                                <span
                                    className={`ml-auto font-semibold ${
                                        roiResult.roi_rating.includes("High")
                                            ? "text-green-600 dark:text-green-400"
                                            : roiResult.roi_rating.includes(
                                                  "Moderate"
                                              )
                                            ? "text-yellow-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {roiResult.roi_rating}
                                </span>
                            </p>

                            <p className="flex items-center gap-2 text-gray-800 dark:text-white mb-2">
                                <Timer className="w-5 h-5 text-purple-500" />
                                <span className="font-medium">
                                    Break Even:
                                </span>{" "}
                                <span className="ml-auto">
                                    {roiResult.break_even_months !== null
                                        ? `${roiResult.break_even_months} months`
                                        : "N/A"}
                                </span>
                            </p>

                            <div className="bg-purple-50 dark:bg-purple-900/30 mt-4 p-4 rounded-md">
                                <p className="flex items-start gap-2 text-sm text-gray-700 dark:text-white">
                                    <Info className="w-5 h-5 text-purple-600 mt-0.5" />
                                    <span className="font-medium">
                                        {roiResult.personalized_tip}
                                    </span>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ROICalculatorPage;
