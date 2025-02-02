'use client';
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PredictionformSchema } from "@/lib/validator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { z } from "zod";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  AlertCircle,
  Loader2,
  User2,
  Calendar,
  Activity,
  Cigarette,
  Dna,
  Timer,
  Wine,
  History,
  CheckCircle2,
  XCircle,
  ClipboardCheck,
  HeartPulse,
  Salad,
  Brain,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const PredictionForm = () => {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  const form = useForm<z.infer<typeof PredictionformSchema>>({
    resolver: zodResolver(PredictionformSchema),
    defaultValues: {
      age: undefined,
      bmi: undefined,
      physicalActivity: undefined,
      alcoholIntake: undefined,
    },
  });

  useEffect(() => {
    if (prediction !== null) {
      const timer = setTimeout(() => {
        setProgressValue(prediction === 1 ? 80 : 20);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [prediction]);

  const generalRecommendations = [
    {
      icon: <ClipboardCheck className="h-5 w-5" />,
      title: "Regular Check-ups",
      description: "Schedule annual health screenings and medical check-ups",
    },
    {
      icon: <HeartPulse className="h-5 w-5" />,
      title: "Health Monitoring",
      description: "Keep track of your vital signs and any unusual symptoms",
    },
    {
      icon: <Salad className="h-5 w-5" />,
      title: "Balanced Diet",
      description: "Maintain a diet rich in fruits, vegetables, and whole grains",
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: "Mental Wellness",
      description: "Practice stress management and maintain good mental health",
    },
  ];

  const getPersonalizedRecommendations = (data: z.infer<typeof PredictionformSchema>) => {
    const recommendations = [];
    
    if (data.smoking === "yes") {
      recommendations.push({
        icon: <Cigarette className="h-5 w-5" />,
        title: "Smoking Cessation",
        description: "Consider joining a smoking cessation program to reduce health risks",
      });
    }
    
    if (data.physicalActivity < 5) {
      recommendations.push({
        icon: <Activity className="h-5 w-5" />,
        title: "Physical Activity",
        description: "Aim for at least 5 hours of moderate exercise per week",
      });
    }
    
    if (data.alcoholIntake > 2) {
      recommendations.push({
        icon: <Wine className="h-5 w-5" />,
        title: "Alcohol Moderation",
        description: "Consider reducing alcohol consumption to recommended levels",
      });
    }
    
    if (data.bmi > 25) {
      recommendations.push({
        icon: <Timer className="h-5 w-5" />,
        title: "Weight Management",
        description: "Work with healthcare providers on a healthy weight management plan",
      });
    }
    
    return recommendations;
  };

  const onSubmit = async (data: z.infer<typeof PredictionformSchema>) => {
    setPrediction(null);
    setIsLoading(true);
    setShowDialog(true);
    
    try {
      const features = [
        data.age,
        data.gender === "male" ? 0 : 1,
        data.bmi,
        data.smoking === "yes" ? 1 : 0,
        parseInt(data.geneticRisk),
        data.physicalActivity,
        data.alcoholIntake,
        data.cancerHistory === "yes" ? 1 : 0,
      ];

      const response = await axios.post("/api/predict", {
        features: features,
      });
      setPrediction(response.data.data.prediction[0]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error making prediction:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="max-w-4xl mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10">
    

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-blue-300 font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Age
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your age between 20 and 80"
                        {...field}
                        className="bg-white/5 border-white/10 text-white 
                placeholder:text-blue-200 placeholder:opacity-70
                rounded-xl transition-all duration-200
                focus:border-blue-400/40 focus:ring-0 focus:outline-none
                hover:bg-white/10
                focus-visible:ring-0 focus-visible:ring-offset-0
                focus:shadow-none focus-visible:outline-none
                [&:not(:focus-visible)]:shadow-none"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-purple-300 font-medium flex items-center gap-2">
                      <User2 className="h-4 w-4" />
                      Gender
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="bg-white/5 border-white/10 text-white 
                placeholder:text-blue-200 placeholder:opacity-70
                rounded-xl transition-all duration-200
                focus:border-purple-400 focus:ring-0 focus:outline-none
                hover:bg-white/10
                focus-visible:ring-0 focus-visible:ring-offset-0
                focus:shadow-none focus-visible:outline-none
                [&:not(:focus-visible)]:shadow-none "
                        >
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="bmi"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-green-300 font-medium flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      BMI
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your BMI (between 15 and 40)"
                        {...field}
                        className="bg-white/5 border-white/10 text-white 
                placeholder:text-blue-200 placeholder:opacity-70
                rounded-xl transition-all duration-200
                focus:border-green-400/40 focus:ring-0 focus:outline-none
                hover:bg-white/10
                focus-visible:ring-0 focus-visible:ring-offset-0
                focus:shadow-none focus-visible:outline-none
                [&:not(:focus-visible)]:shadow-none "
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="smoking"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-orange-300 font-medium flex items-center gap-2">
                      <Cigarette className="h-4 w-4" />
                      Smoking
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="bg-white/5 border-white/10 text-white 
                placeholder:text-blue-200 placeholder:opacity-70
                rounded-xl transition-all duration-200
                focus:border-orange-400/30 focus:ring-0 focus:outline-none
                hover:bg-white/10
                focus-visible:ring-0 focus-visible:ring-offset-0
                focus:shadow-none focus-visible:outline-none
                [&:not(:focus-visible)]:shadow-none "
                        >
                          <SelectValue placeholder="Smoking status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="geneticRisk"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-indigo-300 font-medium flex items-center gap-2">
                      <Dna className="h-4 w-4" />
                      Genetic Risk
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="bg-white/5 border-white/10 text-white 
                placeholder:text-blue-200 placeholder:opacity-70
                rounded-xl transition-all duration-200
                focus:border-indigo-400 focus:ring-0 focus:outline-none
                hover:bg-white/10
                focus-visible:ring-0 focus-visible:ring-offset-0
                focus:shadow-none focus-visible:outline-none
                [&:not(:focus-visible)]:shadow-none "
                        >
                          <SelectValue placeholder="Select genetic risk" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Low</SelectItem>
                        <SelectItem value="1">Medium</SelectItem>
                        <SelectItem value="2">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="physicalActivity"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-cyan-300 font-medium flex items-center gap-2">
                      <Timer className="h-4 w-4" />
                      Physical Activity (hours/week)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter hours (0-10)"
                        {...field}
                        className="bg-white/5 border-white/10 text-white 
                placeholder:text-blue-200 placeholder:opacity-70
                rounded-xl transition-all duration-200
                focus:border-cyan-400/40 focus:ring-0 focus:outline-none
                hover:bg-white/10
                focus-visible:ring-0 focus-visible:ring-offset-0
                focus:shadow-none focus-visible:outline-none
                [&:not(:focus-visible)]:shadow-none "
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="alcoholIntake"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-pink-300 font-medium flex items-center gap-2">
                      <Wine className="h-4 w-4" />
                      Alcohol Intake (units/week)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter units (0-5)"
                        {...field}
                        className="bg-white/5 border-white/10 text-white 
                placeholder:text-blue-200 placeholder:opacity-70
                rounded-xl transition-all duration-200
                focus:border-pink-400/40 focus:ring-0 focus:outline-none
                hover:bg-white/10
                focus-visible:ring-0 focus-visible:ring-offset-0
                focus:shadow-none focus-visible:outline-none
                [&:not(:focus-visible)]:shadow-none "
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cancerHistory"
                render={({ field }) => (
                  <FormItem className="group">
                    <FormLabel className="text-red-300 font-medium flex items-center gap-2">
                      <History className="h-4 w-4" />
                      Cancer History
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="bg-white/5 border-white/10 text-white 
                placeholder:text-blue-200 placeholder:opacity-70
                rounded-xl transition-all duration-200
                focus:border-red-400 focus:ring-0 focus:outline-none
                hover:bg-white/10
                focus-visible:ring-0 focus-visible:ring-offset-0
                focus:shadow-none focus-visible:outline-none
                [&:not(:focus-visible)]:shadow-none "
                        >
                          <SelectValue placeholder="Personal history of cancer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={24} />
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Activity className="h-5 w-5" />
                  <span>Predict Risk</span>
                </div>
              )}
            </Button>
          </form>
        </Form>

        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent className="bg-gray-900 border border-gray-800 max-w-3xl mah-h-[90vh]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-8">
                <Loader2 className="animate-spin h-12 w-12 text-blue-500 mb-2" />
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl text-white">
                    Analyzing Your Health Data
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className="text-gray-400 text-center mt-2">
                  Please wait while we process your information and generate personalized recommendations...
                </AlertDialogDescription>
              </div>
            ) : prediction !== null ? (
              <>
                <AlertDialogHeader>
                  <AlertDialogTitle className={`text-2xl flex items-center gap-2 ${prediction === 1 ? "text-red-400" : "text-green-400"}`}>
                    {prediction === 1 ? (
                      <>
                        <XCircle className="h-8 w-8" />
                        High Risk Detected
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-8 w-8" />
                        Low Risk Detected
                      </>
                    )}
                  </AlertDialogTitle>
                </AlertDialogHeader>

                <div className="py-4">
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-green-400">Low Risk</span>
                      <span className="text-red-400">High Risk</span>
                    </div>
                    <Progress 
  value={progressValue} 
  className={`h-3 bg-gray-700 [&>div]:${prediction === 1 ? "bg-red-500" : "bg-green-500"}`}
/>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Personalized Recommendations
                      </h3>
                      <div className="grid gap-3">
                        {getPersonalizedRecommendations(form.getValues()).map((rec, index) => (
                          <div key={index} className="flex items-start gap-3 bg-gray-800/50 p-3 rounded-lg">
                            <div className="mt-1 text-blue-400">{rec.icon}</div>
                            <div>
                              <h4 className="font-medium text-white">{rec.title}</h4>
                              <p className="text-sm text-gray-300">{rec.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <ClipboardCheck className="h-5 w-5" />
                        General Health Guidelines
                      </h3>
                      <div className="grid gap-3">
                        {generalRecommendations.map((rec, index) => (
                          <div key={index} className="flex items-start gap-3 bg-gray-800/50 p-3 rounded-lg">
                            <div className="mt-1 text-blue-400">{rec.icon}</div>
                            <div>
                              <h4 className="font-medium text-white">{rec.title}</h4>
                              <p className="text-sm text-gray-300">{rec.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <AlertDialogFooter>
                  <Button
                    onClick={() => setShowDialog(false)}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  >
                    Close
                  </Button>
                </AlertDialogFooter>
              </>
            ) : null}
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default PredictionForm;
