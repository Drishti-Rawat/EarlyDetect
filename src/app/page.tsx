

'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Shield, SearchCheck, Brain, HeartPulse, XCircle, Stethoscope, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/shared/Header';
import CancerTypeCard from '@/components/shared/CancerTypeCard';
import FeatureCard from '@/components/shared/FeatureCard';
import StatCard from '@/components/shared/StatCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };
    const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();

  const cancerTypes = [
    {
      name: 'Lung Cancer',
      icon: Stethoscope,
      path: '/detect-lungcancer',
      description: 'Early detection of lung cancer through advanced imaging analysis'
    },
    {
      name: 'Skin Cancer',
      icon: User,
      path: '/detect-skincancer',
      description: 'Analyze skin lesions and moles for potential melanoma indicators'
    },
    {
      name: 'General Cancer',
      icon: Brain,
      path: '/detect-cancer',
      description: 'Comprehensive cancer screening and risk assessment'
    },
  ];

  const handleCancerTypeSelect = (path: string) => {
    setIsDialogOpen(false);
    router.push(path);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900">
      {/* bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 */}
      

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              {...fadeInUp}
            >
              <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                Advanced Cancer Detection
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Through AI
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-300 mb-8"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Empowering healthcare professionals with cutting-edge AI technology for early cancer detection and improved patient outcomes.
            </motion.p>
            <motion.div 
              className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4"
              {...fadeInUp}
              transition={{ delay: 0.4 }}
            >
               <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-400 text-white rounded-full px-8 py-6">
          Start Detection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Select Cancer Type for Detection
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {cancerTypes.map((cancer) => (
            <motion.div
              key={cancer.path}
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg border border-gray-800 hover:border-blue-500 cursor-pointer bg-gray-800/50"
              onClick={() => handleCancerTypeSelect(cancer.path)}
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <cancer.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white">{cancer.name}</h3>
                  <p className="text-gray-400 text-sm">{cancer.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
              <Button variant="outline" className="border-white/20  rounded-full px-8 py-6 text-lg">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>


        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 md:px-7"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, staggerChildren: 0.1 }}
        >
          <StatCard number="99.8%" label="Detection Accuracy" />
          <StatCard number="50K+" label="Cases Analyzed" />
          <StatCard number="12" label="Cancer Types" />
          <StatCard number="24/7" label="AI Availability" />
        </motion.div>
      </section>
      <section className='md:px-7'>
      {/* Cancer Types Grid */}
      <section className="container mx-auto px-4 py-20" id="cancer-types">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-12 text-center relative inline-block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Supported Cancer Types
          <div className="absolute -bottom-2 sm:bottom-0 right-0 w-44 h-3 sm:h-3 bg-blue-400/20 -skew-x-6"></div>
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <CancerTypeCard 
            title="Lung Cancer"
            accuracy="98.5%"
            cases="15,000+"
            icon={HeartPulse}
            link="/detect-lungcancer"
          />
          <CancerTypeCard 
            title="General Cancer"
            accuracy="97.8%"
            cases="8,000+"
            icon={Brain}
            link="/detect-cancer"
          />
          <CancerTypeCard 
            title="Skin Cancer"
            accuracy="99.2%"
            cases="25,000+"
            icon={XCircle}
            link="/detect-skincancer"
          />
        </motion.div>
      </section>

      {/* Features with stagger animation */}
      <section className="container mx-auto px-4 py-20" id="features">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-12 text-center relative inline-block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Key Features
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <FeatureCard
            icon={Shield}
            title="Advanced AI Analysis"
            description="State-of-the-art neural networks trained on millions of medical images"
          />
          <FeatureCard
            icon={SearchCheck}
            title="Multi-Cancer Detection"
            description="Comprehensive screening across different cancer types"
          />
          <FeatureCard
            icon={Activity}
            title="Real-time Results"
            description="Get instant analysis and detailed reports"
          />
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-12 lg:p-16 text-center border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-white/80 mb-12 max-w-2xl mx-auto text-lg">
              Join thousands of healthcare professionals using our platform to improve cancer detection accuracy.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-6 text-lg">
              Begin Detection Process <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
      </section>
    </div>
  );
}