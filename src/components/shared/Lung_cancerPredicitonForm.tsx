"use client";

import React, { useState , useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Progress } from "@/components/ui/progress";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";



import {
  AlertCircle,
  Loader2,
  User2,
  Calendar,
  Cigarette,
  BrainCircuit,
  HeartPulse,
  Stethoscope,
  Activity,
  Wine,
  LucideAngry,
  CheckCircle, Info, XCircle,
  X,
} from "lucide-react";
import axios from "axios";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

const LungCancerFormSchema = z.object({
  gender: z.string().min(1, { message: "Please select gender" }),
  age: z.number().min(5).max(100),
  smoking: z.string().min(1, { message: "Please select smoking status" }),
  yellow_fingers: z.string().min(1, { message: "Please select an option" }),
  anxiety: z.string().min(1, { message: "Please select anxiety level" }),
  peer_pressure: z.string().min(1, { message: "Please select an option" }),
  chronic_disease: z.string().min(1, { message: "Please select an option" }),
  fatigue: z.string().min(1, { message: "Please select fatigue level" }),
  allergy: z.string().min(1, { message: "Please select allergy status" }),
  wheezing: z.string().min(1, { message: "Please select an option" }),
  alcohol: z.string().min(1, { message: "Please select alcohol consumption" }),
  coughing: z.string().min(1, { message: "Please select an option" }),
  shortness_of_breath: z.string().min(1, { message: "Please select an option" }),
  swallowing_difficulty: z.string().min(1, { message: "Please select an option" }),
  chest_pain: z.string().min(1, { message: "Please select an option" }),
});

const LungCancerPredictionForm = () => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof LungCancerFormSchema>>({
    resolver: zodResolver(LungCancerFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof LungCancerFormSchema>) => {
    setError(null);
    setPrediction(null);
    setIsLoading(true);
    setIsDialogOpen(true); // Open dialog before making API call
    
    try {
      const response = await axios.post('/api/lung_cancer', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status) {
        setPrediction(response.data.data.prediction);
      } else {
        throw new Error(response.data.data || 'Failed to process prediction');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.data || error.message);
      } else {
        setError('Failed to process prediction');
      }
      console.error("Error making prediction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className="overflow-hidden">
      <div className="max-w-4xl mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10">
        {error && (
          <Alert className="mb-8 bg-red-500/20 border-red-500/30 rounded-2xl backdrop-blur-sm">
            <AlertCircle className="text-red-400 h-6 w-6" />
            <AlertTitle className="text-2xl font-bold text-white mb-2">Error</AlertTitle>
            <AlertDescription className="text-gray-200">{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Gender and Age */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-300 font-medium flex items-center gap-2">
                      <User2 className="h-4 w-4" />
                      Gender
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-300 font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Age
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your age"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="bg-white/5 border-white/10 text-white rounded-xl"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Smoking and Yellow Fingers */}
              <FormField
                control={form.control}
                name="smoking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-green-300 font-medium flex items-center gap-2">
                      <Cigarette className="h-4 w-4" />
                      Smoking Status
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select smoking status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">No</SelectItem>
                        <SelectItem value="2">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yellow_fingers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-yellow-300 font-medium flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Yellow Fingers
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">No</SelectItem>
                        <SelectItem value="2">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Anxiety and Peer Pressure */}
              <FormField
                control={form.control}
                name="anxiety"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-red-300 font-medium flex items-center gap-2">
                      <BrainCircuit className="h-4 w-4" />
                      Anxiety Level
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select anxiety level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Low</SelectItem>
                        <SelectItem value="2">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="peer_pressure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-indigo-300 font-medium flex items-center gap-2">
                      <User2 className="h-4 w-4" />
                      Peer Pressure
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">No</SelectItem>
                        <SelectItem value="2">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Chronic Disease and Fatigue */}
              <FormField
                control={form.control}
                name="chronic_disease"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-pink-300 font-medium flex items-center gap-2">
                      <HeartPulse className="h-4 w-4" />
                      Chronic Disease
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">No</SelectItem>
                        <SelectItem value="2">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fatigue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-orange-300 font-medium flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Fatigue Level
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select fatigue level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Low</SelectItem>
                        <SelectItem value="2">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Allergy and Wheezing */}
              <FormField
                control={form.control}
                name="allergy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-teal-300 font-medium flex items-center gap-2">
                      <Stethoscope className="h-4 w-4" />
                      Allergy
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select allergy status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">No</SelectItem>
                        <SelectItem value="2">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

<FormField
                control={form.control}
                name="wheezing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cyan-300 font-medium flex items-center gap-2">
                      <HeartPulse className="h-4 w-4" />
                      Wheezing
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">No</SelectItem>
                        <SelectItem value="2">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Alcohol and Coughing */}
              <FormField
                control={form.control}
                name="alcohol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-300 font-medium flex items-center gap-2">
                      <Wine className="h-4 w-4" />
                      Alcohol Consumption
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select alcohol consumption" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">No</SelectItem>
                        <SelectItem value="2">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coughing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-red-300 font-medium flex items-center gap-2">
                      <Stethoscope className="h-4 w-4" />
                      Coughing
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">No</SelectItem>
                        <SelectItem value="2">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Shortness of Breath and Swallowing Difficulty */}
              <FormField
                control={form.control}
                name="shortness_of_breath"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-300 font-medium flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Shortness of Breath
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">No</SelectItem>
                        <SelectItem value="2">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="swallowing_difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-green-300 font-medium flex items-center gap-2">
                      <HeartPulse className="h-4 w-4" />
                      Swallowing Difficulty
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">No</SelectItem>
                        <SelectItem value="2">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Chest Pain */}
              <FormField
                control={form.control}
                name="chest_pain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-pink-300 font-medium flex items-center gap-2">
                      <HeartPulse className="h-4 w-4" />
                      Chest Pain
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">No</SelectItem>
                        <SelectItem value="2">Yes</SelectItem>
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
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={24} />
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  <span>Predict Lung Cancer Risk</span>
                </div>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>

<PredictionDialog 
isOpen={isDialogOpen}
predictionResponse={prediction}
onClose={() => setIsDialogOpen(false)}
/>
</>
  );
};

export default LungCancerPredictionForm;





const PredictionDialog = ({ isOpen, predictionResponse, onClose }:any) => {
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (isOpen && !showResults) {
      setProgress(0);
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setShowResults(true);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const resetDialog = () => {
    setProgress(0);
    setShowResults(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={resetDialog}>
      <AlertDialogContent className="bg-gray-900/95 border-gray-800 max-w-2xl">
        {/* Close button in the top-right corner */}
        <div className="absolute right-4 top-4">
          <AlertDialogCancel className="bg-transparent hover:bg-gray-800 border-0 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </AlertDialogCancel>
        </div>

        {!showResults ? (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <Activity className="w-8 h-8 text-blue-400 animate-pulse" />
              <h2 className="text-2xl font-semibold text-white">Analyzing Risk Factors</h2>
            </div>
            <Progress value={progress} className="h-2 bg-blue-950" />
            <p className="text-center text-gray-400">
              Please wait while we process your health information...
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Result Header */}
            <div className="flex items-center space-x-3">
              {predictionResponse === "YES" ? (
                <AlertCircle className="w-8 h-8 text-red-400" />
              ) : (
                <CheckCircle className="w-8 h-8 text-green-400" />
              )}
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {predictionResponse === "YES" 
                    ? "High Risk Detected" 
                    : "Low Risk Detected"}
                </h2>
                <p className="text-gray-400">
                  {predictionResponse === "YES"
                    ? "Immediate medical consultation recommended"
                    : "Continue maintaining healthy habits"}
                </p>
              </div>
            </div>

            {/* Risk Level */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Risk Level</span>
                <span className={predictionResponse === "YES" 
                  ? "text-red-400" 
                  : "text-green-400"
                }>
                  {predictionResponse === "YES" ? "High" : "Low"}
                </span>
              </div>
              <Progress 
                value={predictionResponse === "YES" ? 80 : 20}
                className={`h-2 ${
                  predictionResponse === "YES" 
                    ? "bg-red-950" 
                    : "bg-green-950"
                }`}
              />
            </div>

            {/* Recommendations */}
            <div className="bg-blue-950/30 p-4 rounded-xl border border-blue-800/30">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-blue-400 mb-2">
                    Recommendations
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-center space-x-2">
                      <HeartPulse className="w-4 h-4" />
                      <span>Schedule regular check-ups with your healthcare provider</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <HeartPulse className="w-4 h-4" />
                      <span>Maintain a healthy lifestyle with regular exercise</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <HeartPulse className="w-4 h-4" />
                      <span>Avoid smoking and exposure to secondhand smoke</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <HeartPulse className="w-4 h-4" />
                      <span>Monitor any persistent respiratory symptoms</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Close button at the bottom */}
            <div className="flex justify-end">
              <Button
                onClick={resetDialog}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

