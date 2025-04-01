import { useState } from "react";

const AddItem = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    item: "",
    quantity: "",
    type: "",
    expiration: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/pantry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("Item added successfully!");
        setShowForm(false);
        setFormData({ item: "", quantity: "", type: "", expiration: "" });
      } else {
        alert("Failed to add item.");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Error adding item.");
    }
  };

  return (
    <div className="p-4">
      <button
        className="bg-red-400 text-white px-4 py-2 rounded"
        onClick={() => setShowForm(!showForm)}
      >
        + Add Item
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
          <input type="text" name="item" placeholder="Item" value={formData.item} onChange={handleChange} className="block w-full p-2 border rounded" required />
          <input type="text" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className="block w-full p-2 border rounded" required />
          <input type="text" name="type" placeholder="Type" value={formData.type} onChange={handleChange} className="block w-full p-2 border rounded" required />
          <input type="date" name="expiration" value={formData.expiration} onChange={handleChange} className="block w-full p-2 border rounded" required />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
      )}
    </div>
  );
};

export default AddItem;
