const Product = require('../../models/Product');
const User = require('../../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { decryptData, encryptData } = require('../../utils/cryptoUtil');
const AdminAuthService = require('../../services/AdminAuthService');

const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      short_description,
      description,
      price,
      compare_price,
      cost_price,
      sale_price,
      discount,
      // New retail pricing fields (optional)
      retailPrice,
      // Corporate pricing fields (optional)
      corporatePricing,
      sku,
      quantity,
      stock_status,
      type,
      unit,
      weight,
      requires_shipping,
      available_from,
      available_to,
      categories,
      tags,
      images,
      product_thumbnail_id,
      product_galleries_id,
      size_chart_image_id,
      meta_title,
      meta_description,
      product_meta_image_id,
      is_free_shipping,
      tax_id,
      estimated_delivery_text,
      return_policy_text,
      is_featured,
      is_popular,
      is_trending,
      is_return,
      status,
      // New fields from updated model
      variations,
      related_products,
      cross_sell_products,
      is_random_related_products,
      safe_checkout,
      secure_checkout,
      social_share,
      encourage_order,
      encourage_view,
      is_corporate_only
    } = req.body;

    // Required fields check
    if (!name || !description || !price || !categories || !categories.length) {
      return res.status(400).json({
        message: 'Missing required fields: name, description, price, or categories'
      });
    }

    const product = new Product({
      name,
      short_description,
      description,

      // Legacy Pricing (required for backward compatibility)
      price: parseFloat(price),
      compare_price,
      cost_price,
      sale_price,
      discount,

      // New Retail Pricing (optional, will default to legacy price)
      retailPrice: retailPrice ? {
        mrp: retailPrice.mrp || parseFloat(price),
        sellingPrice: retailPrice.sellingPrice || parseFloat(price),
        discount: retailPrice.discount || 0,
        currency: retailPrice.currency || 'INR'
      } : {
        mrp: parseFloat(price),
        sellingPrice: parseFloat(price),
        discount: 0,
        currency: 'INR'
      },

      // Corporate Pricing (optional)
      corporatePricing: corporatePricing ? {
        enabled: corporatePricing.enabled || false,
        minimumOrderQuantity: corporatePricing.minimumOrderQuantity || 1,
        priceTiers: corporatePricing.priceTiers || [],
        customQuoteThreshold: corporatePricing.customQuoteThreshold
      } : {
        enabled: false,
        minimumOrderQuantity: 1,
        priceTiers: []
      },

      // Inventory
      sku,
      quantity,
      stock_status,
      type: type || 'simple',
      unit,
      weight,
      requires_shipping,
      available_from,
      available_to,

      // Categories & Tags
      categories,
      tags,

      // Images
      images,
      product_thumbnail_id,
      product_galleries_id,
      size_chart_image_id,

      // SEO
      meta_title: meta_title || name,
      meta_description,
      product_meta_image_id,

      // Shipping & Tax
      is_free_shipping,
      tax_id,
      estimated_delivery_text,
      return_policy_text,

      // Flags
      is_featured,
      is_popular,
      is_trending,
      is_return,
      status,

      // New fields from updated model
      variations,
      related_products,
      cross_sell_products,
      is_random_related_products,
      safe_checkout,
      secure_checkout,
      social_share,
      encourage_order,
      encourage_view,
      is_corporate_only,
      createdBy: req.user?.id || req.adminUser?.id // Set admin who created the product
    });

    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: savedProduct,
      product: savedProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating product',
      error: error.message
    });
  }
});

const adminLogin = asyncHandler(async (req, res) => {
  console.log('🚀 [Admin Controller] Admin login request received');
  console.log('📦 Raw request body:', JSON.stringify(req.body));
  
  try {
    let loginData;
    
    // Check if data is encrypted
    if (req.body.encryptedData) {
      console.log('🔐 Encrypted data detected, decrypting...');
      try {
        loginData = decryptData(req.body.encryptedData);
        console.log('🔓 Data decrypted successfully:', loginData);
      } catch (decryptError) {
        console.error('❌ Decryption error:', decryptError);
        return res.status(400).json({
          success: false,
          error: 'Invalid encrypted data'
        });
      }
    } else {
      // Handle unencrypted data (for debugging)
      console.log('📄 Unencrypted data received');
      loginData = req.body;
    }
    
    // Use AdminAuthService for login processing
    const result = await AdminAuthService.adminLogin(loginData);
    
    // Prepare response data
    const responseData = {
      success: true,
      message: 'Admin login successful',
      data: result
    };
    
    // Try to encrypt response
    let encryptedResponseData;
    try {
      encryptedResponseData = encryptData(responseData);
      console.log('🔒 Response encrypted successfully');
      
      // Return encrypted response
      return res.status(200).json({
        success: true,
        encryptedData: encryptedResponseData
      });
    } catch (encryptError) {
      console.error('❌ Response encryption failed:', encryptError);
      // Return unencrypted response if encryption fails
      return res.status(200).json(responseData);
    }
    
  } catch (error) {
    console.error('❌ [Admin Controller] Admin login error:', error.message);
    
    // Determine status code based on error
    let statusCode = 500;
    if (error.message.includes('Invalid credentials')) {
      statusCode = 401;
    } else if (error.message.includes('required') || error.message.includes('Invalid user type')) {
      statusCode = 400;
    }
    
    return res.status(statusCode).json({
      success: false,
      error: error.message || 'Login failed. Please try again.'
    });
  }
});
module.exports = {
  createProduct,
  adminLogin,
};