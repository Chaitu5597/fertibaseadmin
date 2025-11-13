import { useParams, useNavigate } from "react-router-dom";

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Temporary mock data (can connect to backend later)
  const product = {
    id,
    name: "NITROBASE (Azospirillum)",
    category: "Nitrogen-Fixing Biofertilizers",
    dosage: ["1 liter per acre"],
    application: ["Foliar spray", "Soil application"],
    crops: ["Rice", "Wheat"],
    desc: "Improves nitrogen uptake and plant growth.",
    image:"",
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {product.name}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Dosage:</strong> {product.dosage.join(", ")}</p>
        <p><strong>Application:</strong> {product.application.join(", ")}</p>
        <p><strong>Crops:</strong> {product.crops.join(", ")}</p>
        <p><strong>Description:</strong> {product.desc}</p>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-5 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
      >
        Back
      </button>
    </div>
  );
}
