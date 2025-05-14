import React, { useState, useEffect } from 'react';
import '../App.css';

const AddPantryItem = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    item: '',
    quantity: '',
    category: '',
    expiration: ''
  });
  const [showForm, setShowForm] = useState(false);

  const [editItem, setEditItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/pantry');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/pantry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ item: '', quantity: '', category: '', expiration: '' });
        setShowForm(false);
        fetchItems();
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleEditChange = (e) => {
    setEditItem({
      ...editItem,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3001/pantry/${editItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editItem)
      });
      setShowEditModal(false);
      fetchItems();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3001/pantry/${editItem._id}`, {
        method: 'DELETE'
      });
      setShowEditModal(false);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="pantry-container">
      <div className="header">
        <h1>My Pantry</h1>
        <button className="add-button" onClick={() => setShowForm(true)}>
          + Add Item
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="form-overlay">
          <form onSubmit={handleSubmit} className="add-form">
            <input type="text" name="item" placeholder="Item Name" value={formData.item} onChange={handleInputChange} required />
            <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleInputChange} required />
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} required />
            <input type="date" name="expiration" value={formData.expiration} onChange={handleInputChange} required />
            <div className="form-buttons">
              <button type="submit">Add</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="form-overlay">
          <form onSubmit={handleEditSubmit} className="add-form">
            <h3>Edit Item</h3>
            <input type="text" name="item" value={editItem.item} onChange={handleEditChange} required />
            <input type="number" name="quantity" value={editItem.quantity} onChange={handleEditChange} required />
            <input type="text" name="category" value={editItem.category} onChange={handleEditChange} required />
            <input type="date" name="expiration" value={editItem.expiration?.slice(0, 10)} onChange={handleEditChange} required />
            <div className="form-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={handleDelete}>Delete</button>
              <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* List Display */}
      <div className="items-list">
        <div className="list-header">
          <span>Item</span>
          <span>Quantity</span>
          <span>Category</span>
          <span>Expiration</span>
          <span>Actions</span>
        </div>
        {items.map((item, index) => (
          <div key={index} className="pantry-list-item">
            <span>{item.item}</span>
            <span>{item.quantity}</span>
            <span>{item.category}</span>
            <span>{new Date(item.expiration).toLocaleDateString()}</span>
            <span>
              <button className="edit-button" onClick={() => {
                setEditItem(item);
                setShowEditModal(true);
              }}>✏️</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddPantryItem;
