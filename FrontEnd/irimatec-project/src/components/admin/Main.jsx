import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  DocumentTextIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Main = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    status: "active",
    image: null,
  });
  const [editingItem, setEditingItem] = useState(null);

  // Charger les projets depuis Laravel
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:3000/api/projets");
      setContent(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Supprimer un projet
const handleDelete = async (id) => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://127.0.0.1:3000/api/projets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContent((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  }
};

  // Ouvrir modal ajout
  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      title: "",
      description: "",
      location: "",
      status: "active",
      image: null,
    });
    setShowModal(true);
  };

  // Ouvrir modal édition
  const openEditModal = (item) => {
    setModalMode("edit");
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      location: item.location || "",
      status: item.status,
      image: null,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      location: "",
      status: "active",
      image: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // Ajouter ou modifier projet
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("status", formData.status);

    if (formData.image) {
      data.append("image", formData.image);
    }

    if (modalMode === "add") {
      // Ajouter un projet
      await axios.post(
        "http://127.0.0.1:3000/api/projets",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      // Modifier un projet
      await axios.put(
        `http://127.0.0.1:3000/api/projets/${editingItem.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }

    fetchProjects();
    closeModal();

  } catch (error) {

  if (error.response) {
    alert(error.response.data.message || "Une erreur est survenue.");
  } else {
    alert("Impossible de contacter le serveur.");
  }

  console.error(error);

}
};

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6">
      
        <button
          onClick={openAddModal}
          className="ml-4 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Nouveau projet
        </button>
      </div>

      {/* Grid projets */}
      <div className="px-8 pb-8">
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow group"
              >
                <div className="relative">
                  {item.image ? (
                   <img
  src={`http://localhost:3000/uploads/${item.image}`}
  alt={item.title}
  className="w-full h-48 object-cover rounded-t-xl"
  onError={() => console.log("Erreur image")}
  onLoad={() => console.log("Image OK")}
/>
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-t-xl"></div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>

                  {item.location && (
                    <div className="flex items-center text-xs text-gray-500 mb-4">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                      {item.location}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      {new Date(item.created_at).toLocaleDateString("fr-FR")}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal ajout/édition */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {modalMode === "add" ? "Ajouter un projet" : "Modifier le projet"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Entrez le titre du projet"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Statut *
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="active">Actif</option>
                    <option value="completed">Terminé</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Localisation (optionnel)
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ex: Région de Rabat"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical"
                  placeholder="Décrivez le projet..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image (optionnel)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
                >
                  <DocumentTextIcon className="w-5 h-5 mr-2" />
                  {modalMode === "add" ? "Créer" : "Mettre à jour"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
