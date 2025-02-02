import Link from "next/link";
import { motion } from 'framer-motion';

 const CancerTypeCard = ({ title, accuracy, cases,link ,icon: Icon }:any) => (
    <Link href={link}>
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-blue-400 mr-3" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Accuracy</span>
          <span className="text-blue-300">{accuracy}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Cases Analyzed</span>
          <span className="text-blue-300">{cases}</span>
        </div>
      </div>
    </motion.div>
    </Link>
  );

export default CancerTypeCard


