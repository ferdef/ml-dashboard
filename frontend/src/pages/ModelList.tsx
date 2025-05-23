import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { modelService } from "../services/api";
import type { MLModel } from "../types/MLModel";

const ModelList: React.FC = () => {
  const [models, setModels] = useState<MLModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await modelService.getAll();
        setModels(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching models');
        setLoading(false);
        console.error(err);
      }
    };

    fetchModels();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this model?')) {
      try {
        await modelService.deleteItem(id);
        setModels(models.filter(model => model.id !== id));
      } catch (err) {
        setError('Error deleting models');
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2x1 font-bold">ML Models</h1>
        <Link
          to="/models/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Model
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Version</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Created</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {models.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">No models found</td>
              </tr>
            ) : (
              models.map(model => (
                <tr key={model.id}>
                  <td className="py-2 px-4 border-b">{model.name}</td>
                  <td className="py-2 px-4 border-b">{model.version}</td>
                  <td className="py-2 px-4 border-b">{model.description}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(model.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <Link
                        to={`/models/${model.id}`}
                        className="bg-blue-500 hover:bg-blue-700"
                      >
                        View
                      </Link>
                      <Link
                        to={`/models/${model.id}/edit`}
                        className="bg-blue-500 hover:bg-yellow-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(model.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default ModelList;