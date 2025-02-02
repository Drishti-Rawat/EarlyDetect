
import LungCancerPredictionForm from '@/components/shared/Lung_cancerPredicitonForm'
import PredictionForm from '@/components/shared/PredictionForm'
import { TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Tooltip } from '@radix-ui/react-tooltip'
import { AlertTriangle } from 'lucide-react'
import React from 'react'

const lungcancer = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 p-6 overflow-hidden">
    <div className="py-20 max-w-6xl mx-auto ">
      <h1 className="text-center mb-10 text-4xl md:text-5xl font-bold">
        <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-transparent bg-clip-text">
        Lung Health Risk Evaluation
        </span>
      </h1>
      <LungCancerPredictionForm />
    </div>
    <div className="flex  mt-4 max-w-7xl mx-auto ">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center gap-2 text-blue-200/70 hover:text-blue-200 transition-colors cursor-help">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="sm:text-sm text-[10px] ">This is a demonstration project only. The predictions should not be considered as medical advice. Please consult healthcare professionals for actual medical diagnoses.</span>
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </div>
  </section>
  )
}

export default lungcancer






