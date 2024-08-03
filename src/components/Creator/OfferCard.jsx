
import { useNavigate } from "react-router-dom";
const Offercard = ({campaign}) => {
  const baseUrl = import.meta.env.VITE_BASE_URL; 
  const { campaignName ,description, campaignImage,incentives,platform,brandName } =campaign;
  const navigate=useNavigate();
  const getImageUrl = (path) => {
  

    return `${baseUrl}/${path.replace(/\\/g, '/')}`;
  };
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden">
      <img src={getImageUrl(campaignImage)} alt={campaignName} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{campaignName}</h2>
        <p className="text-gray-600">{description}</p>
        <button onClick={()=>navigate('/collab-details',{ state: { campaign } })}>Tap to view more</button>
      </div>
    </div>
  );
};

export default Offercard;
