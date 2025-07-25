import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { PredictionResult } from "@/types/PredictionResult";
import { PriceChart } from "./PriceChart";

interface PredictionResultsProps {
    result: {
        predicted_price_EGP: number;
    };
}

export function PredictionResults({ result }: PredictionResultsProps) {
    const formatPrice = (price: number) => {
        return `${price.toLocaleString("en-EG")} EGP`;
    };

    const predictedPrice = result.predicted_price_EGP;
    const priceRange = predictedPrice * 0.1;

    const lowerBound = formatPrice(predictedPrice - priceRange);
    const upperBound = formatPrice(predictedPrice + priceRange);

    return (
        <div className="space-y-6 w-full max-w-4xl mx-auto">
            <Card className=" w-full max-w-4xl mx-auto bg-white dark:bg-[#1b1b29] backdrop-blur-lg border-t-4 border-t-realestate-purple dark: border-t-realestate-purple text-gray-900 dark:text-white p-6 rounded-2xl shadow-lg">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-2xl">
                                Predicted Price
                            </CardTitle>
                            <CardDescription>
                                Based on similar properties and market trends
                            </CardDescription>
                        </div>
                        <Badge className="bg-realestate-purple hover:bg-realestate-purple/90 px-3 py-1 text-white">
                            <Sparkles className="h-4 w-4 mr-1" /> AI Prediction
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="text-center">
                        <h3 className="text-4xl font-bold text-realestate-purple">
                            <p className="text-4xl font-bold  my-4">
                                <span className="text-5xl">
                                    {predictedPrice.toLocaleString("en-EG")}
                                </span>
                                <span className="ml-1 text-lg text-muted-foreground">
                                    EGP
                                </span>
                            </p>
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Price range: {lowerBound} - {upperBound}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                                Prediction Confidence
                            </span>
                            <span className="text-sm font-medium">+90%</span>
                        </div>
                        <Progress value={90} className="h-2" />
                        <p className="text-xs text-gray-500">
                            This prediction is based on training data for the
                            XGBoost model.
                        </p>
                        <div className="mb-6">
            {/* <PriceChart result={result} /> */}
          </div>
          
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
