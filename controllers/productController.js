const Product = require('../models/Product');  


const addProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;  
    
    
    const product = new Product({
      name,
      price,
      stock
    });

    
    await product.save();
    res.status(201).json({ message: 'Product added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
};


const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); 
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

module.exports = { addProduct, getProducts };
