// File: SmartDealsPage.tsx

import { useEffect, useState } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { BadgePercent, Star, Loader2, Copy } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

type Deal = {
    Governorate: string;
    City: string;
    Actual_Price_EGP: number;
    Predicted_Price_EGP: number;
    "Difference_%": number;
    Why_This_Deal: string;
    Deal_Score: number;
};

type SmartDealsResponse = {
    smart_deals: Deal[];
};

const SmartDealsPage = () => {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch smart deals from backend on component mount
    useEffect(() => {
        axios
            .get<SmartDealsResponse>(
                "http://localhost:8000/smart-deals/smart-deals"
            )
            .then((res) => {
                setDeals(res.data.smart_deals);
            })
            .catch((err) => console.error("Error fetching smart deals:", err))
            .then(() => setLoading(false));
    }, []);

    // Helper to copy deal summary to clipboard
    const handleCopy = (deal: Deal) => {
        const text = `Smart Deal in ${deal.City}, ${deal.Governorate}:\nActual Price: ${deal.Actual_Price_EGP} EGP\nPredicted: ${deal.Predicted_Price_EGP} EGP\nDifference: ${deal["Difference_%"]}%`;
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="p-6 mt-20 md:p-10">
            <h2 className="text-3xl dark:text-zinc-300 font-bold mb-4 text-center">
                Smart Real Estate Deals
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-center mb-8">
                Uncover exclusive real estate opportunities curated for their
                high potential. We help you identify deals that offer
                exceptional value and strong returns.
            </p>

            {loading ? (
                <div className="text-center text-gray-500 dark:text-gray-300 flex flex-col items-center gap-3">
                    <Loader2 className="animate-spin w-6 h-6" />
                    <p>Loading smart investment opportunities...</p>
                </div>
            ) : deals.length === 0 ? (
                <p className="text-center text-red-500">
                    No deals found at the moment.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {deals.map((deal, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Card className="bg-gradient-to-br from-white to-purple-50 dark:from-[#2a2a3d] dark:to-[#3e3e5e] border border-purple-300 dark:border-purple-700 shadow-lg p-5 flex flex-col justify-between h-full">
                                {/* Card Title */}
                                <CardTitle className="text-realestate-purple text-xl mb-3 flex items-center gap-2">
                                    <BadgePercent className="h-5 w-5" />
                                    Deal #{index + 1}
                                </CardTitle>

                                {/* Card Content */}
                                <CardContent className="space-y-2 text-sm text-gray-700 dark:text-white">
                                    <p>
                                        <strong>Location:</strong>{" "}
                                        {deal.Governorate}, {deal.City}
                                    </p>
                                    <p>
                                        <strong>Actual Price:</strong>{" "}
                                        {deal.Actual_Price_EGP.toLocaleString()}{" "}
                                        EGP
                                    </p>
                                    <p>
                                        <strong>Predicted Price:</strong>{" "}
                                        {deal.Predicted_Price_EGP.toLocaleString()}{" "}
                                        EGP
                                    </p>
                                    <p>
                                        <strong>Difference:</strong>{" "}
                                        {deal["Difference_%"]}%
                                    </p>

                                    {/* Progress bar for visual price difference */}
                                    <div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-green-500 h-2 rounded-full"
                                                style={{
                                                    width: `${deal["Difference_%"]}%`,
                                                }}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Price is {deal["Difference_%"]}%
                                            below prediction
                                        </p>
                                    </div>

                                    {/* Arabic reason and score */}
                                    <p className="text-green-600 dark:text-green-400 font-semibold">
                                        {deal["Why_This_Deal"]}
                                    </p>

                                    <p className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <span className="font-bold text-purple-700 dark:text-purple-300">
                                            {deal["Deal_Score"]}
                                        </span>
                                    </p>

                                    {/* Copy button */}
                                    <button
                                        onClick={() => handleCopy(deal)}
                                        className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-2"
                                    >
                                        <Copy className="w-4 h-4" /> Copy Deal
                                        Info
                                    </button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SmartDealsPage;
