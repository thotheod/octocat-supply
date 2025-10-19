using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using OctoCat.Api.Data;
using OctoCat.Api.Models;
using Xunit;

namespace OctoCat.Api.Tests
{
    public class ProductApiTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;
        private readonly HttpClient _client;
        private readonly string _apiPath = "/api/products";
        private readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        public ProductApiTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    // Remove existing DataRepository and register test data
                    services.AddSingleton<DataRepository>(provider =>
                    {
                        var dataRepository = new DataRepository();
                        // Add test products
                        dataRepository.Products.Clear();
                        dataRepository.Products.Add(new Product
                        {
                            ProductId = 1,
                            SupplierId = 1,
                            Name = "Test Product",
                            Description = "Test product description",
                            Price = 19.99m,
                            Sku = "TEST-001",
                            Unit = "piece",
                            ImgName = "test-product.jpg",
                            Discount = 0.10m
                        });
                        dataRepository.Products.Add(new Product
                        {
                            ProductId = 2,
                            SupplierId = 2,
                            Name = "Another Product",
                            Description = "Another test product",
                            Price = 29.99m,
                            Sku = "TEST-002",
                            Unit = "kg",
                            ImgName = "another-product.jpg",
                            Discount = null
                        });
                        
                        return dataRepository;
                    });
                });
            });
            
            _client = _factory.CreateClient();
        }

        [Fact]
        public async Task GetAll_ReturnsSuccessAndProducts()
        {
            // Act
            var response = await _client.GetAsync(_apiPath);
            
            // Assert
            response.EnsureSuccessStatusCode();
            var products = await response.Content.ReadFromJsonAsync<List<Product>>();
            Assert.NotNull(products);
            Assert.Equal(2, products.Count);
            Assert.Contains(products, p => p.Name == "Test Product");
            Assert.Contains(products, p => p.Name == "Another Product");
        }

        [Fact]
        public async Task GetById_ExistingId_ReturnsSuccessAndProduct()
        {
            // Act
            var response = await _client.GetAsync($"{_apiPath}/1");
            
            // Assert
            response.EnsureSuccessStatusCode();
            var product = await response.Content.ReadFromJsonAsync<Product>();
            Assert.NotNull(product);
            Assert.Equal(1, product.ProductId);
            Assert.Equal("Test Product", product.Name);
            Assert.Equal(19.99m, product.Price);
            Assert.Equal("TEST-001", product.Sku);
            Assert.Equal(0.10m, product.Discount);
        }

        [Fact]
        public async Task GetById_NonExistingId_ReturnsNotFound()
        {
            // Act
            var response = await _client.GetAsync($"{_apiPath}/999");
            
            // Assert
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task Post_ValidProduct_ReturnsCreatedAndProduct()
        {
            // Arrange
            var newProduct = new Product
            {
                ProductId = 3,
                SupplierId = 1,
                Name = "New Product",
                Description = "New product description",
                Price = 39.99m,
                Sku = "NEW-001",
                Unit = "box",
                ImgName = "new-product.jpg",
                Discount = 0.15m
            };
            
            // Act
            var response = await _client.PostAsJsonAsync(_apiPath, newProduct);
            
            // Assert
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            Assert.Equal($"{_apiPath}/3", response.Headers.Location?.ToString());
            
            var returnedProduct = await response.Content.ReadFromJsonAsync<Product>();
            Assert.NotNull(returnedProduct);
            Assert.Equal(3, returnedProduct.ProductId);
            Assert.Equal("New Product", returnedProduct.Name);
            Assert.Equal(39.99m, returnedProduct.Price);
            Assert.Equal("NEW-001", returnedProduct.Sku);
            Assert.Equal(0.15m, returnedProduct.Discount);
        }

        [Fact]
        public async Task Post_MinimalValidProduct_ReturnsCreatedAndProduct()
        {
            // Arrange - Test with minimal required data
            var newProduct = new Product
            {
                ProductId = 4,
                SupplierId = 2,
                Name = "Minimal Product",
                Price = 9.99m,
                Sku = "MIN-001"
                // Other fields will be empty strings or default values
            };
            
            // Act
            var response = await _client.PostAsJsonAsync(_apiPath, newProduct);
            
            // Assert
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            Assert.Equal($"{_apiPath}/4", response.Headers.Location?.ToString());
            
            var returnedProduct = await response.Content.ReadFromJsonAsync<Product>();
            Assert.NotNull(returnedProduct);
            Assert.Equal(4, returnedProduct.ProductId);
            Assert.Equal("Minimal Product", returnedProduct.Name);
            Assert.Equal(9.99m, returnedProduct.Price);
            Assert.Equal("MIN-001", returnedProduct.Sku);
            Assert.Equal(string.Empty, returnedProduct.Description);
            Assert.Null(returnedProduct.Discount);
        }

        [Fact]
        public async Task Post_ProductWithNullDiscount_ReturnsCreated()
        {
            // Arrange
            var newProduct = new Product
            {
                ProductId = 5,
                SupplierId = 1,
                Name = "No Discount Product",
                Description = "Product without discount",
                Price = 15.99m,
                Sku = "NODISC-001",
                Unit = "piece",
                Discount = null // Explicitly null discount
            };
            
            // Act
            var response = await _client.PostAsJsonAsync(_apiPath, newProduct);
            
            // Assert
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            
            var returnedProduct = await response.Content.ReadFromJsonAsync<Product>();
            Assert.NotNull(returnedProduct);
            Assert.Null(returnedProduct.Discount);
        }

        [Fact]
        public async Task Put_ValidUpdate_ReturnsSuccessAndUpdatedProduct()
        {
            // Arrange
            var updatedProduct = new Product
            {
                ProductId = 1,
                SupplierId = 1,
                Name = "Updated Product Name",
                Description = "Updated description",
                Price = 24.99m,
                Sku = "UPD-001",
                Unit = "piece",
                ImgName = "updated-product.jpg",
                Discount = 0.20m
            };
            
            // Act
            var response = await _client.PutAsJsonAsync($"{_apiPath}/1", updatedProduct);
            
            // Assert
            response.EnsureSuccessStatusCode();
            var returnedProduct = await response.Content.ReadFromJsonAsync<Product>();
            Assert.NotNull(returnedProduct);
            Assert.Equal("Updated Product Name", returnedProduct.Name);
            Assert.Equal(24.99m, returnedProduct.Price);
            Assert.Equal("UPD-001", returnedProduct.Sku);
            Assert.Equal(0.20m, returnedProduct.Discount);
        }

        [Fact]
        public async Task Put_IdMismatch_ReturnsBadRequest()
        {
            // Arrange
            var productWithWrongId = new Product
            {
                ProductId = 999, // Doesn't match URL ID
                Name = "Wrong ID Product",
                Price = 10.00m
            };
            
            // Act
            var response = await _client.PutAsJsonAsync($"{_apiPath}/1", productWithWrongId);
            
            // Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task Put_NonExistingProduct_ReturnsNotFound()
        {
            // Arrange
            var nonExistingProduct = new Product
            {
                ProductId = 999,
                SupplierId = 1,
                Name = "Non Existing",
                Price = 50.00m,
                Sku = "NOTFOUND-001"
            };
            
            // Act
            var response = await _client.PutAsJsonAsync($"{_apiPath}/999", nonExistingProduct);
            
            // Assert
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task Delete_ExistingProduct_ReturnsNoContent()
        {
            // Act
            var response = await _client.DeleteAsync($"{_apiPath}/1");
            
            // Assert
            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
            
            // Verify the product was actually deleted
            var getResponse = await _client.GetAsync($"{_apiPath}/1");
            Assert.Equal(HttpStatusCode.NotFound, getResponse.StatusCode);
        }

        [Fact]
        public async Task Delete_NonExistingProduct_ReturnsNotFound()
        {
            // Act
            var response = await _client.DeleteAsync($"{_apiPath}/999");
            
            // Assert
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task Get_AfterPostAndDelete_MaintainsCorrectState()
        {
            // Arrange - Add a product
            var newProduct = new Product
            {
                ProductId = 10,
                SupplierId = 1,
                Name = "Temporary Product",
                Price = 5.99m,
                Sku = "TEMP-001"
            };
            
            // Act & Assert - Add product
            var postResponse = await _client.PostAsJsonAsync(_apiPath, newProduct);
            Assert.Equal(HttpStatusCode.Created, postResponse.StatusCode);
            
            // Verify it exists
            var getResponse = await _client.GetAsync($"{_apiPath}/10");
            Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);
            
            // Delete it
            var deleteResponse = await _client.DeleteAsync($"{_apiPath}/10");
            Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);
            
            // Verify it's gone
            var getFinalResponse = await _client.GetAsync($"{_apiPath}/10");
            Assert.Equal(HttpStatusCode.NotFound, getFinalResponse.StatusCode);
        }
    }
}