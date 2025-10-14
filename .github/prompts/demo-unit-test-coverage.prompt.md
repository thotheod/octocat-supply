---
mode: 'agent'
description: 'Demo: Improve .NET API Test Coverage - Add Unit Tests for Product and Supplier Controllers.'
tools: ['changes', 'codebase', 'editFiles', 'fetch', 'findTestFiles', 'githubRepo', 'problems', 'runCommands', 'runTasks', 'search', 'terminalLastCommand', 'testFailure', 'usages', 'playwright', 'github', 'Azure MCP Server']
---
# 🧪 Demo: Add .NET Unit Tests for Product and Supplier Controllers

## 📊 Current State
- **Current test coverage**: Limited to `BranchApiTests.cs` and `BranchRepositoryTests.cs`
- **Controllers coverage**: Only Branch controller tested
- **Models coverage**: Only Branch model repository tested
- Only **2 test files exist** in the `api-tests` project

## 🎯 Objective
Increase .NET API test coverage by implementing comprehensive unit tests for Product and Supplier controllers and repositories.

## 📋 Missing Test Files

### 🔗 Controller Tests (High Priority)
The following controller files need complete test coverage:

- [ ] `ProductApiTests.cs`
- [ ] `SupplierApiTests.cs`

### 🏗️ Repository Tests (Medium Priority)
The following repository files need validation tests:

- [ ] `ProductRepositoryTests.cs`
- [ ] `SupplierRepositoryTests.cs`

## ✅ Test Coverage Requirements

### For Each Controller Test File:
- **CRUD Operations:**
  - ✅ GET all entities
  - ✅ GET single entity by ID
  - ✅ POST create new entity
  - ✅ PUT update existing entity
  - ✅ DELETE entity by ID

- **Error Scenarios:**
  - ❌ 404 for non-existent entities
  - ❌ 400 for invalid request payloads
  - ❌ Bad Request for ID mismatches
  - ❌ Edge cases (malformed IDs, empty requests)

### For Each Repository Test File:
- CRUD operations on the generic repository
- Data validation and constraints
- Collection manipulation
- GetById, Add, Update, Delete operations
- Edge cases and null handling

## 🛠️ Implementation Guidelines

### Use Existing Pattern
Follow the pattern established in `BranchApiTests.cs`:
```csharp
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;
using Xunit;
using OctoCat.Api.Models;
using OctoCat.Api.Data;
```

### Controller Test Structure Template
```csharp
public class [Entity]ApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;
    private readonly string _apiPath = "/api/[entities]";

    public [Entity]ApiTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                // Configure test data repository
            });
        });
        _client = _factory.CreateClient();
    }

    [Fact]
    public async Task GetAll_ReturnsSuccessAnd[Entities]() { /* GET all test */ }
    
    [Fact]
    public async Task GetById_NonExistingId_ReturnsNotFound() { /* 404 test */ }
    
    [Fact]
    public async Task Post_Valid[Entity]_ReturnsCreatedAnd[Entity]() { /* POST test */ }
    
    [Fact]
    public async Task Put_IdMismatch_ReturnsBadRequest() { /* PUT error test */ }
    
    [Fact]
    public async Task Delete_Existing[Entity]_ReturnsNoContent() { /* DELETE test */ }
}
```

### Repository Test Structure Template
```csharp
public class [Entity]RepositoryTests
{
    private readonly List<[Entity]> _[entities];
    private readonly GenericRepository<[Entity], int> _repository;

    public [Entity]RepositoryTests()
    {
        // Setup test data and repository
    }

    [Fact]
    public void GetAll_ReturnsAll[Entities]() { /* GetAll test */ }
    
    [Fact]
    public void GetById_ExistingId_Returns[Entity]() { /* GetById success test */ }
    
    [Fact]
    public void GetById_NonExistingId_ReturnsNull() { /* GetById null test */ }
    
    [Fact]
    public void Add_New[Entity]_AddsToCollection() { /* Add test */ }
    
    [Fact]
    public void Update_Existing[Entity]_UpdatesInCollection() { /* Update test */ }
    
    [Fact]
    public void Delete_Existing[Entity]_RemovesFromCollection() { /* Delete test */ }
}
```

## 🔧 Running Tests

```bash
# Run all tests with coverage
npm run test:api

# Generate coverage report  
npm run test:api:report

# Run tests with coverage and generate report
npm run test:api:cover

# Run specific test class
dotnet test api-tests/api-tests.csproj --filter "FullyQualifiedName~ProductApiTests"
```

## 📈 Success Criteria
- [ ] Add controller test files for Product and Supplier
- [ ] Add repository test files for Product and Supplier
- [ ] All tests passing in CI/CD

## 🚀 Getting Started
1. Start with `ProductApiTests.cs` - copy `BranchApiTests.cs` pattern
2. Implement basic CRUD tests first
3. Add error scenarios incrementally
4. Run coverage after each file to track progress
5. Follow ERD relationships for cross-entity testing

## 📚 Related Files
- ERD Diagram: `api/ERD.png`
- Existing controller test: `api-tests/BranchApiTests.cs`
- Existing repository test: `api-tests/BranchRepositoryTests.cs`
- Test project: `api-tests/api-tests.csproj`
- Coverage report: `api-tests/TestResults/CoverageReport/index.html`