const StatCard = ({ number, label }:any) => (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
      <h3 className="text-3xl font-bold text-blue-300 mb-2">{number}</h3>
      <p className="text-white/80">{label}</p>
    </div>
  );
  
  export default StatCard;