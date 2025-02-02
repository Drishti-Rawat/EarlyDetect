import {motion} from "framer-motion";

const FeatureCard = ({ icon: Icon, title, description }:any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 hover:border-blue-400/30 transition-colors"
  >
    <Icon className="w-12 h-12 text-blue-400 mb-4" />
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

export default FeatureCard;