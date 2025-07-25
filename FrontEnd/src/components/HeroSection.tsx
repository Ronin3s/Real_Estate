import { Building, MapPin, SearchCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spline from "@splinetool/react-spline";
import CountUp from "react-countup";
import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <div className="relative mt-16 h-[92vh] overflow-hidden bg-gradient-to-b from-[#0e0c1f] via-[#1c1038] to-[#110824]">
            {/* Spline 3D Planet - Background */}
            <div className="absolute bottom-[-950px] left-1/2 -translate-x-1/2 z-0 w-[1000px] h-[1000px] pointer-events-none  opacity-90">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay:1 }}
                    className="scale-[2]"
                >
                    <Spline scene="https://prod.spline.design/X1-AMEl2kRubO5nt/scene.splinecode" />
                </motion.div>
            </div>

            {/* Hero content */}
            <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-white text-center">
                <div className="flex flex-col items-center gap-2 mb-4 ml-4">
                    {/* <Building className="h-8 w-8 text-[#8e6fff]" /> */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl  bg-gradient-to-r from-[#8e6fff] to-[#6ed0ff] text-transparent bg-clip-text leading-tight whitespace-normal"
                    >
                        <span className="block leading-tight font-extrabold text-5xl">
                            Machine Learning Predictions
                        </span>
                        <span className="block leading-relaxed font-bold ">
                            for apartment prices in your area
                        </span>
                    </motion.h1>
                    {/* <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#8e6fff] to-[#6ed0ff] text-transparent bg-clip-text">
                        for apartment prices in your area
                    </h2> */}
                </div>

                {/* <h2 className="text-xl md:text-2xl font-medium mb-4 text-white/80 max-w-2xl">
          Machine learning predictions for apartment prices in your area
        </h2> */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-white/50 max-w-xl mb-8 text-xl"
                >
                    Get accurate price estimates based on location, size,
                    amenities, and market trends.
                </motion.p>

                {/* Quick location search */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="mt-4 w-full max-w-md bg-white/10 backdrop-blur-md rounded-lg p-2 flex items-center border border-white/20 shadow-md"
                >
                    <MapPin className="ml-2 h-5 w-5 text-white/70" />
                    <input
                        type="text"
                        placeholder="Enter your city"
                        className="flex-1 bg-transparent border-none focus:outline-none px-3 py-2 text-white placeholder:text-white/50"
                    />
                    <a href="#prediction-form">
                        <Button className="bg-[#8e6fff] hover:bg-[#a794ff] text-white font-semibold shadow">
                            <SearchCheck className="mr-2 h-4 w-4" />
                            Predict
                        </Button>
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-white"
                >
                    {/* 93% Accuracy */}
                    <div>
                        <p className="text-4xl font-bold">
                            <CountUp end={93} duration={2} delay={1.2} suffix="%" />
                        </p>
                        <p className="text-white/70 mt-1">Accuracy</p>
                    </div>

                    {/* 250K+ Predictions */}
                    <div>
                        <p className="text-4xl font-bold">
                            <CountUp end={250} duration={2.5} delay={1.2} suffix="K+" />
                        </p>
                        <p className="text-white/70 mt-1">Predictions</p>
                    </div>

                    {/* 1M+ Data Points */}
                    <div>
                        <p className="text-4xl font-bold">
                            <CountUp
                                end={1}
                                duration={3}
                                suffix="M+"
                                decimals={0}
                            />
                        </p>
                        <p className="text-white/70 mt-1">Data Points</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
