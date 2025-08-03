import { BrainCircuit, Database, LineChart, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const cardData = [
    {
        icon: <Database className="h-6 w-6 text-purple-500" />,
        title: "Data Collection",
        description:
            "We analyze millions of property listings, historical sales data, and market trends to build a comprehensive dataset and accurate price prediction.",
    },
    {
        icon: <BrainCircuit className="h-6 w-6 text-purple-500" />,
        title: "ML Training",
        description:
            "Our advanced algorithms learn patterns between property features and sale prices, adapting to different markets and conditions.",
    },
    {
        icon: <LineChart className="h-6 w-6 text-purple-500" />,
        title: "Price Prediction",
        description:
            "Your property details are processed through our model to generate an accurate price prediction with confidence scores.",
    },
    {
        icon: <RefreshCw className="h-6 w-6 text-purple-500" />,
        title: "Continuous Learning",
        description:
            "Our system constantly improves as new data becomes available, ensuring the most up-to-date and accurate predictions possible.",
    },
];

export function HowItWorks() {
    return (
        <div
            id="how-it-works"
            className="py-20 bg-muted dark:bg-background transition-colors"
        >
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 h-full"
                >
                    <h2 className="text-3xl font-bold mb-4 text-foreground">
                        How Our AI Price Prediction Works
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        PropertyPredict uses advanced machine learning algorithms
                        trained on millions of real estate transactions to
                        provide accurate price predictions for your property.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cardData.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <motion.div
                                whileHover={{ scale: 1.03, y: -8 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                            >
                                <Card
                                    className="h-full border border-border bg-white/10 dark:bg-white/5 backdrop-blur-sm transition-shadow duration-300
                                                hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                                >
                                    <CardContent className="pt-6 h-full">
                                        <div className="rounded-full bg-purple-500/10 w-12 h-12 flex items-center justify-center mb-4">
                                            {card.icon}
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 text-foreground">
                                            {card.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {card.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                        Our predictions have achieved 93% accuracy when compared
                        to actual sale prices, making  PropertyPredict one of the
                        most reliable tools in the market.
                    </p>
                    <div className="inline-flex items-center justify-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-lg shadow-sm border border-white/20">
                        <Stat label="Accuracy" value="93%" />
                        <Separator />
                        <Stat label="Predictions" value="250K+" />
                        <Separator />
                        <Stat label="Data Points" value="1M+" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-purple-500">{value}</span>
            <span className="text-xs text-muted-foreground">{label}</span>
        </div>
    );
}

function Separator() {
    return <div className="h-8 w-px bg-white/20" />;
}
