// pages/ClassifierPage.tsx

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    BadgeDollarSign,
    ListChecks,
    Lightbulb,
    TriangleAlert,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface FormDataType {
    type: string;
    furnished: boolean;
    rent: boolean;
    city: string;
    region: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    level: number;
}

interface ClassifierResult {
    predicted_price_category: string;
    confidence_scores: Record<string, number>;
    alternative_category: string;
    category_description: string;
    recommended_action: string;
    estimated_price_range: string;
    warnings: string[];
    explanation: string;
    top_features_influencing: string[];
}

const ClassifierPage: React.FC = () => {
    const [formData, setFormData] = useState<FormDataType>({
        type: "Apartment",
        furnished: true,
        rent: true,
        city: "Cairo",
        region: "Maadi",
        bedrooms: 2,
        bathrooms: 1,
        area: 100,
        level: 2,
    });

    const [classifierResult, setClassifierResult] =
        useState<ClassifierResult | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                furnished: formData.furnished ? "Furnished" : "Unfurnished",
                rent: formData.rent ? "Yes" : "No",
            };

            const response = await fetch(
                "http://127.0.0.1:8000/classifier/classify",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();
            setClassifierResult(data);
        } catch (error) {
            console.error("Error fetching classification result:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 mt-20">
            <div>
                <h2 className="text-3xl dark:text-zinc-300 font-bold mb-4 text-center">
                    Instantly Categorize Property Values
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-center mb-8">
                    Our advanced algorithm classifies properties into precise
                    price ranges, giving you an immediate understanding of their
                    market segment.
                </p>
            </div>
            <Card className="bg-white text-gray-900 dark:text-white dark:bg-[#1b1b29] border border-purple-500 rounded-2xl shadow-md">
                <CardHeader>
                    <CardTitle className="text-lg text-realestate-purple flex items-center gap-2">
                        <ListChecks className="w-5 h-5" /> Property Price
                        Category Classifier
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label >
                                    Property Type
                                </Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            type: value,
                                        })
                                    }
                                >
                                    <SelectTrigger className="bg-white/10 ">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Apartment">
                                            Apartment
                                        </SelectItem>
                                        <SelectItem value="Villa">
                                            Villa
                                        </SelectItem>
                                        <SelectItem value="Studio">
                                            Studio
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label >City</Label>
                                <Select
                                    value={formData.city}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            city: value,
                                        })
                                    }
                                >
                                    <SelectTrigger className="bg-white/10 ">
                                        <SelectValue placeholder="Select city" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Cairo">
                                            Cairo
                                        </SelectItem>
                                        <SelectItem value="Giza">
                                            Giza
                                        </SelectItem>
                                        <SelectItem value="Alexandria">
                                            Alexandria
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label >Region</Label>
                                <Input
                                    value={formData.region}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            region: e.target.value,
                                        })
                                    }
                                    className="bg-white/10 "
                                />
                            </div>

                            <div>
                                <Label >
                                    Bedrooms: {formData.bedrooms}
                                </Label>
                                <Slider
                                    className="mt-4"
                                    min={0}
                                    max={10}
                                    step={1}
                                    value={[formData.bedrooms]}
                                    onValueChange={([val]) =>
                                        setFormData({
                                            ...formData,
                                            bedrooms: val,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label >
                                    Bathrooms: {formData.bathrooms}
                                </Label>
                                <Slider
                                    className="mt-4"
                                    min={0}
                                    max={10}
                                    step={1}
                                    value={[formData.bathrooms]}
                                    onValueChange={([val]) =>
                                        setFormData({
                                            ...formData,
                                            bathrooms: val,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label >
                                    Area: {formData.area} m²
                                </Label>
                                <Slider
                                    className="mt-4"
                                    min={30}
                                    max={1000}
                                    step={10}
                                    value={[formData.area]}
                                    onValueChange={([val]) =>
                                        setFormData({ ...formData, area: val })
                                    }
                                />
                            </div>

                            <div>
                                <Label >
                                    Floor Level: {formData.level}
                                </Label>
                                <Slider
                                    className="mt-4 mb-4"
                                    min={0}
                                    max={20}
                                    step={1}
                                    value={[formData.level]}
                                    onValueChange={([val]) =>
                                        setFormData({ ...formData, level: val })
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-4 ">
                            <Switch
                                className="mb-4"
                                id="furnished"
                                checked={formData.furnished}
                                onCheckedChange={(val) =>
                                    setFormData({ ...formData, furnished: val })
                                }
                            />
                            <Label
                                htmlFor="furnished"
                                className=" mb-4"
                            >
                                Furnished
                            </Label>

                            <Switch
                                className="mb-4"
                                id="rent"
                                checked={formData.rent}
                                onCheckedChange={(val) =>
                                    setFormData({ ...formData, rent: val })
                                }
                            />
                            <Label htmlFor="rent" className=" mb-4">
                                For Rent
                            </Label>
                        </div>

                        <Button
                            type="submit"
                            className="bg-realestate-purple  w-full mt-4"
                        >
                            Classify
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {classifierResult && (
                <Card className="mt-6 bg-white dark:bg-[#1b1b29] border border-purple-500 rounded-2xl shadow-md">
                    <CardHeader>
                        <CardTitle className="text-realestate-purple flex items-center gap-2">
                            <BadgeDollarSign className="w-5 h-5" /> Prediction
                            Result
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 ">
                        <p>
                            <strong>Predicted Category:</strong>{" "}
                            {classifierResult.predicted_price_category}
                        </p>
                        <p>
                            <strong>Alternative Category:</strong>{" "}
                            {classifierResult.alternative_category}
                        </p>
                        <p>
                            <strong>Estimated Price Range:</strong>{" "}
                            {classifierResult.estimated_price_range}
                        </p>
                        <p>
                            <strong>Description:</strong>{" "}
                            {classifierResult.category_description}
                        </p>
                        <p>
                            <strong>Recommendation:</strong>{" "}
                            {classifierResult.recommended_action}
                        </p>
                        <p>
                            <strong>Confidence Scores:</strong>
                        </p>
                        <ul className="list-disc list-inside ml-4">
                            {Object.entries(
                                classifierResult.confidence_scores
                            ).map(([k, v]) => (
                                <li key={k}>
                                    {k}: {v.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                        <p className="flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-yellow-400" />{" "}
                            {classifierResult.explanation}
                        </p>
                        <p>
                            <strong>Top Features:</strong>{" "}
                            {classifierResult.top_features_influencing.join(
                                ", "
                            )}
                        </p>
                        {classifierResult.warnings.length > 0 && (
                            <div className="mt-2 text-red-400">
                                <p className="flex items-center gap-2">
                                    <TriangleAlert className="w-4 h-4" />{" "}
                                    Warnings:
                                </p>
                                <ul className="list-disc list-inside ml-4">
                                    {classifierResult.warnings.map(
                                        (warning, idx) => (
                                            <li key={idx}>{warning}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ClassifierPage;
