
import SkinCancerDetector from '@/components/shared/SkinCancer'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { AlertTriangle } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-950 to-purple-900 p-6 overflow-hidden">
    <div className="py-20 max-w-6xl mx-auto ">
      <div className='mb-10 space-y-1'>
      <h1 className="text-center  text-4xl md:text-5xl font-bold">
        <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-transparent bg-clip-text">
        Skin Cancer Detection
        </span>
      </h1>
      <p className="text-center text-blue-200/70 ">
    Upload a skin image for analysis
  </p>
      </div>
      
      
      <SkinCancerDetector />
    
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

export default page
