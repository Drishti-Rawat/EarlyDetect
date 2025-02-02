
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Activity } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <motion.header
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className={`fixed w-full z-50 transition-all duration-300 ${
//         isScrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
//       }`}
//     >
//       <nav className="container mx-auto px-4 py-4">
//         <div className="flex justify-between items-center">
//         <Link href="/" className='cursor-pointer'>
//           <motion.div 
//             className="flex items-center space-x-2"
//             whileHover={{ scale: 1.05 }}
//           >
          
//             <Activity className="w-8 h-8 text-blue-400" />
//             <span className="text-2xl font-bold text-white">
//               Early
//               <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//                 Detect
//               </span>
//             </span>
//           </motion.div>
//             </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {['Features', 'Cancer Types', 'How It Works'].map((item) => (
//               <motion.div
//                 key={item}
//                 whileHover={{ scale: 1.05 }}
//                 className="relative group"
//               >
//                 <Link 
//                   href={`#${item.toLowerCase().replace(' ', '-')}`}
//                   className="text-gray-300 hover:text-white transition-colors"
//                 >
//                   {item}
//                 </Link>
//                 <motion.div
//                   className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
//                 />
//               </motion.div>
//             ))}
//             <motion.div whileHover={{ scale: 1.05 }}>
//               <Button className="bg-blue-500 hover:bg-blue-400 text-white rounded-full px-6">
//                 Start Detection
//               </Button>
//             </motion.div>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <Button
//               variant="ghost"
//               className="text-white"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 {isMobileMenuOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <motion.div
//           initial={false}
//           animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
//           className="md:hidden overflow-hidden"
//         >
//           <div className="py-4 space-y-4">
//             {['Features', 'Cancer Types', 'How It Works'].map((item) => (
//               <Link
//                 key={item}
//                 href={`#${item.toLowerCase().replace(' ', '-')}`}
//                 className="block text-gray-300 hover:text-white transition-colors px-4 py-2"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {item}
//               </Link>
//             ))}
//             <div className="px-4">
//               <Button className="w-full bg-blue-500 hover:bg-blue-400 text-white rounded-full">
//                 Start Detection
//               </Button>
//             </div>
//           </div>
//         </motion.div>
//       </nav>
//     </motion.header>
//   );
// };

// export default Header;

'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity,  User, Brain, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathname = usePathname();
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Logo = () => (
    <Link href="/" className="cursor-pointer">
      <motion.div 
        className="flex items-center space-x-2"
        whileHover={{ scale: 1.05 }}
      >
        <Activity className="w-8 h-8 text-blue-400" />
        <span className="text-2xl font-bold text-white">
          Early
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Detect
          </span>
        </span>
      </motion.div>
    </Link>
  );

  const DetectionDialog = () => (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-400 text-white rounded-full px-6">
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
  );

  if (pathname === '/detect-cancer' || pathname === '/detect-lungcancer' || pathname === '/detect-skincancer')  {
    return (
      <header className="fixed w-full z-50 bg-gray-900/95 backdrop-blur-lg shadow-lg">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          
          <DetectionDialog />
       
        </nav>
      </header>
    );
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Features', 'Cancer Types', 'How It Works'].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <Link 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item}
                </Link>
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
                />
              </motion.div>
            ))}
            <DetectionDialog />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {['Features', 'Cancer Types', 'How It Works'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block text-gray-300 hover:text-white transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="px-4">
              <DetectionDialog />
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Header;