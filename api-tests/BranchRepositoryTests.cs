using System.Collections.Generic;
using OctoCat.Api.Models;
using OctoCat.Api.Data;
using Xunit;

namespace OctoCat.Api.Tests
{
    public class BranchRepositoryTests
    {
        private readonly List<Branch> _branches;
        private readonly GenericRepository<Branch, int> _repository;

        public BranchRepositoryTests()
        {
            // Setup test data
            _branches = new List<Branch>
            {
                new Branch { BranchId = 1, HeadquartersId = 1, Name = "Main Office", Description = "Main downtown office", Address = "123 Main St", ContactPerson = "John Doe", Phone = "555-123-4567", Email = "main@octocat.com" },
                new Branch { BranchId = 2, HeadquartersId = 1, Name = "Downtown", Description = "Downtown branch", Address = "456 Pine St", ContactPerson = "Jane Smith", Phone = "555-987-6543", Email = "downtown@octocat.com" }
            };
            
            _repository = new GenericRepository<Branch, int>(_branches);
        }

        [Fact]
        public void GetAll_ReturnsAllBranches()
        {
            // Act
            var result = _repository.GetAll();
            
            // Assert
            Assert.Equal(2, result.Count());
            Assert.Contains(result, b => b.BranchId == 1);
            Assert.Contains(result, b => b.BranchId == 2);
        }
        
        [Fact]
        public void GetById_ExistingId_ReturnsBranch()
        {
            // Act
            var result = _repository.GetById(1);
            
            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result.BranchId);
            Assert.Equal("Main Office", result.Name);
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
        public void Add_NewBranch_AddsToCollection()
        {
            // Arrange
            var newBranch = new Branch { BranchId = 3, HeadquartersId = 2, Name = "East Side", Description = "East side branch" };
            
            // Act
            var result = _repository.Add(newBranch);
            
            // Assert
            Assert.Equal(3, _branches.Count);
            Assert.Contains(_branches, b => b.BranchId == 3);
            Assert.Same(newBranch, result);
        }
        
        [Fact]
        public void Update_ExistingBranch_UpdatesInCollection()
        {
            // Arrange
            var updatedBranch = new Branch { BranchId = 1, HeadquartersId = 1, Name = "Updated Name", Description = "Updated Description", Address = "Updated Address" };
            
            // Act
            var result = _repository.Update(updatedBranch);
            
            // Assert
            Assert.True(result);
            var branch = _repository.GetById(1);
            Assert.NotNull(branch);
            Assert.Equal("Updated Name", branch!.Name);
            Assert.Equal("Updated Description", branch.Description);
            Assert.Equal("Updated Address", branch.Address);
        }
        
        [Fact]
        public void Update_NonExistingBranch_ReturnsFalse()
        {
            // Arrange
            var nonExistingBranch = new Branch { BranchId = 99, Name = "Does Not Exist" };
            
            // Act
            var result = _repository.Update(nonExistingBranch);
            
            // Assert
            Assert.False(result);
        }
        
        [Fact]
        public void Delete_ExistingBranch_RemovesFromCollection()
        {
            // Act
            var result = _repository.Delete(1);
            
            // Assert
            Assert.True(result);
            Assert.Single(_branches);
            Assert.DoesNotContain(_branches, b => b.BranchId == 1);
        }
        
        [Fact]
        public void Delete_NonExistingBranch_ReturnsFalse()
        {
            // Act
            var result = _repository.Delete(99);
            
            // Assert
            Assert.False(result);
            Assert.Equal(2, _branches.Count);
        }

        [Fact]
        public void Add_NullBranch_AddsNullToCollection()
        {
            // Act
            var result = _repository.Add(null!);
            
            // Assert
            Assert.Null(result);
            Assert.Equal(3, _branches.Count); // Collection now has null added
        }

        [Fact]
        public void Update_NullBranch_ThrowsNullReferenceException()
        {
            // Act & Assert
            Assert.Throws<NullReferenceException>(() => _repository.Update(null!));
        }

        [Fact]
        public void Add_MultipleBranches_AddsAllToCollection()
        {
            // Arrange
            var branch1 = new Branch { BranchId = 10, Name = "Branch 10" };
            var branch2 = new Branch { BranchId = 11, Name = "Branch 11" };
            
            // Act
            _repository.Add(branch1);
            _repository.Add(branch2);
            
            // Assert
            Assert.Equal(4, _branches.Count);
            Assert.Contains(_branches, b => b.BranchId == 10);
            Assert.Contains(_branches, b => b.BranchId == 11);
        }

        [Fact]
        public void GetById_AfterDelete_ReturnsNull()
        {
            // Arrange
            _repository.Delete(1);
            
            // Act
            var result = _repository.GetById(1);
            
            // Assert
            Assert.Null(result);
        }

        [Fact]
        public void Update_ExistingBranch_PreservesOtherBranches()
        {
            // Arrange
            var updatedBranch = new Branch { BranchId = 1, HeadquartersId = 1, Name = "Updated Branch" };
            
            // Act
            var result = _repository.Update(updatedBranch);
            
            // Assert
            Assert.True(result);
            Assert.Equal(2, _branches.Count); // Still 2 branches
            Assert.Contains(_branches, b => b.BranchId == 2); // Branch 2 unchanged
            
            var branch2 = _repository.GetById(2);
            Assert.NotNull(branch2);
            Assert.Equal("Downtown", branch2.Name); // Branch 2 name unchanged
        }
    }
}