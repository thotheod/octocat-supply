using System;
using System.Collections.Generic;
using System.Linq;
using OctoCat.Api.Models;
using OctoCat.Api.Data;
using Xunit;

namespace OctoCat.Api.Tests
{
    public class ProductRepositoryTests
    {
        private readonly List<Product> _products;
        private readonly GenericRepository<Product, int> _repository;

        public ProductRepositoryTests()
        {
            // Setup test data
            _products = new List<Product>
            {
                new Product 
                { 
                    ProductId = 1, 
                    SupplierId = 1, 
                    Name = "Widget A", 
                    Description = "High-quality widget", 
                    Price = 12.50m, 
                    Sku = "WID-A-001", 
                    Unit = "piece", 
                    ImgName = "widget-a.jpg", 
                    Discount = 0.05m 
                },
                new Product 
                { 
                    ProductId = 2, 
                    SupplierId = 2, 
                    Name = "Gadget B", 
                    Description = "Premium gadget", 
                    Price = 25.99m, 
                    Sku = "GAD-B-002", 
                    Unit = "box", 
                    ImgName = "gadget-b.jpg", 
                    Discount = null 
                },
                new Product 
                { 
                    ProductId = 3, 
                    SupplierId = 1, 
                    Name = "Tool C", 
                    Description = "Essential tool", 
                    Price = 45.00m, 
                    Sku = "TOO-C-003", 
                    Unit = "set", 
                    ImgName = "tool-c.jpg", 
                    Discount = 0.15m 
                }
            };
            
            _repository = new GenericRepository<Product, int>(_products);
        }

        [Fact]
        public void GetAll_ReturnsAllProducts()
        {
            // Act
            var result = _repository.GetAll();
            
            // Assert
            Assert.Equal(3, result.Count());
            Assert.Contains(result, p => p.ProductId == 1);
            Assert.Contains(result, p => p.ProductId == 2);
            Assert.Contains(result, p => p.ProductId == 3);
        }
        
        [Fact]
        public void GetById_ExistingId_ReturnsProduct()
        {
            // Act
            var result = _repository.GetById(1);
            
            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result.ProductId);
            Assert.Equal("Widget A", result.Name);
            Assert.Equal(12.50m, result.Price);
            Assert.Equal("WID-A-001", result.Sku);
        }
        
        [Fact]
        public void GetById_NonExistingId_ReturnsNull()
        {
            // Act
            var result = _repository.GetById(99);
            
            // Assert
            Assert.Null(result);
        }
        
        [Fact]
        public void Add_NewProduct_AddsToCollection()
        {
            // Arrange
            var newProduct = new Product 
            { 
                ProductId = 4, 
                SupplierId = 3, 
                Name = "New Item", 
                Description = "Brand new item", 
                Price = 9.99m, 
                Sku = "NEW-004", 
                Unit = "piece" 
            };
            
            // Act
            var result = _repository.Add(newProduct);
            
            // Assert
            Assert.Equal(4, _products.Count);
            Assert.Contains(_products, p => p.ProductId == 4);
            Assert.Same(newProduct, result);
            Assert.Equal("New Item", result.Name);
        }
        
        [Fact]
        public void Update_ExistingProduct_UpdatesInCollection()
        {
            // Arrange
            var updatedProduct = new Product 
            { 
                ProductId = 1, 
                SupplierId = 1, 
                Name = "Updated Widget A", 
                Description = "Updated high-quality widget", 
                Price = 15.00m, 
                Sku = "WID-A-001-UPD", 
                Unit = "piece", 
                ImgName = "updated-widget-a.jpg", 
                Discount = 0.10m 
            };
            
            // Act
            var result = _repository.Update(updatedProduct);
            
            // Assert
            Assert.True(result);
            var product = _repository.GetById(1);
            Assert.NotNull(product);
            Assert.Equal("Updated Widget A", product!.Name);
            Assert.Equal("Updated high-quality widget", product.Description);
            Assert.Equal(15.00m, product.Price);
            Assert.Equal("WID-A-001-UPD", product.Sku);
            Assert.Equal(0.10m, product.Discount);
        }
        
        [Fact]
        public void Update_NonExistingProduct_ReturnsFalse()
        {
            // Arrange
            var nonExistingProduct = new Product { ProductId = 99, Name = "Does Not Exist", Price = 1.00m };
            
            // Act
            var result = _repository.Update(nonExistingProduct);
            
            // Assert
            Assert.False(result);
        }
        
        [Fact]
        public void Delete_ExistingProduct_RemovesFromCollection()
        {
            // Act
            var result = _repository.Delete(1);
            
            // Assert
            Assert.True(result);
            Assert.Equal(2, _products.Count);
            Assert.DoesNotContain(_products, p => p.ProductId == 1);
        }
        
        [Fact]
        public void Delete_NonExistingProduct_ReturnsFalse()
        {
            // Act
            var result = _repository.Delete(99);
            
            // Assert
            Assert.False(result);
            Assert.Equal(3, _products.Count);
        }

        [Fact]
        public void Add_ProductWithNullDiscount_AddsSuccessfully()
        {
            // Arrange
            var productWithNullDiscount = new Product 
            { 
                ProductId = 5, 
                SupplierId = 2, 
                Name = "No Discount Product", 
                Price = 20.00m, 
                Sku = "NODISC-005",
                Discount = null
            };
            
            // Act
            var result = _repository.Add(productWithNullDiscount);
            
            // Assert
            Assert.Equal(4, _products.Count);
            Assert.Contains(_products, p => p.ProductId == 5);
            Assert.Null(result.Discount);
        }

        [Fact]
        public void Add_ProductWithZeroPrice_AddsSuccessfully()
        {
            // Arrange
            var freeProduct = new Product 
            { 
                ProductId = 6, 
                SupplierId = 1, 
                Name = "Free Sample", 
                Description = "Free product sample", 
                Price = 0.00m, 
                Sku = "FREE-006",
                Unit = "sample"
            };
            
            // Act
            var result = _repository.Add(freeProduct);
            
            // Assert
            Assert.Equal(4, _products.Count);
            Assert.Contains(_products, p => p.ProductId == 6);
            Assert.Equal(0.00m, result.Price);
        }

        [Fact]
        public void Add_NullProduct_AddsNullToCollection()
        {
            // Act
            var result = _repository.Add(null!);
            
            // Assert
            Assert.Null(result);
            Assert.Equal(4, _products.Count); // Collection now has null added
        }

        [Fact]
        public void Update_NullProduct_ThrowsNullReferenceException()
        {
            // Act & Assert
            Assert.Throws<NullReferenceException>(() => _repository.Update(null!));
        }

        [Fact]
        public void GetById_AfterDelete_ReturnsNull()
        {
            // Arrange
            _repository.Delete(2);
            
            // Act
            var result = _repository.GetById(2);
            
            // Assert
            Assert.Null(result);
        }

        [Fact]
        public void Update_ExistingProduct_PreservesOtherProducts()
        {
            // Arrange
            var updatedProduct = new Product { ProductId = 1, Name = "Updated Widget", Price = 100.00m, Sku = "UPD-001" };
            
            // Act
            var result = _repository.Update(updatedProduct);
            
            // Assert
            Assert.True(result);
            Assert.Equal(3, _products.Count); // Still 3 products
            Assert.Contains(_products, p => p.ProductId == 2); // Product 2 unchanged
            Assert.Contains(_products, p => p.ProductId == 3); // Product 3 unchanged
            
            var product2 = _repository.GetById(2);
            Assert.NotNull(product2);
            Assert.Equal("Gadget B", product2.Name); // Product 2 name unchanged
            
            var product3 = _repository.GetById(3);
            Assert.NotNull(product3);
            Assert.Equal("Tool C", product3.Name); // Product 3 name unchanged
        }

        [Fact]
        public void Add_MultipleProducts_AddsAllToCollection()
        {
            // Arrange
            var product1 = new Product { ProductId = 10, Name = "Product 10", Price = 10.00m, Sku = "PROD-010" };
            var product2 = new Product { ProductId = 11, Name = "Product 11", Price = 11.00m, Sku = "PROD-011" };
            
            // Act
            _repository.Add(product1);
            _repository.Add(product2);
            
            // Assert
            Assert.Equal(5, _products.Count);
            Assert.Contains(_products, p => p.ProductId == 10);
            Assert.Contains(_products, p => p.ProductId == 11);
        }

        [Fact]
        public void Update_ProductWithDifferentProperties_UpdatesAllFields()
        {
            // Arrange
            var originalProduct = _repository.GetById(1);
            Assert.NotNull(originalProduct);
            
            var updatedProduct = new Product 
            { 
                ProductId = 1, 
                SupplierId = 99,  // Different supplier
                Name = "Completely Different Name", 
                Description = "Completely different description", 
                Price = 999.99m,  // Very different price
                Sku = "DIFF-999", 
                Unit = "kilogram",  // Different unit
                ImgName = "different.jpg", 
                Discount = 0.99m  // Different discount
            };
            
            // Act
            var result = _repository.Update(updatedProduct);
            
            // Assert
            Assert.True(result);
            var updated = _repository.GetById(1);
            Assert.NotNull(updated);
            Assert.Equal(99, updated.SupplierId);
            Assert.Equal("Completely Different Name", updated.Name);
            Assert.Equal("Completely different description", updated.Description);
            Assert.Equal(999.99m, updated.Price);
            Assert.Equal("DIFF-999", updated.Sku);
            Assert.Equal("kilogram", updated.Unit);
            Assert.Equal("different.jpg", updated.ImgName);
            Assert.Equal(0.99m, updated.Discount);
        }
    }
}