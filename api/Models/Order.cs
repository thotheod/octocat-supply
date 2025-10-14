using System;

namespace OctoCat.Api.Models
{
    public class Order : IEntity<int>
    {
        public int OrderId { get; set; }
        public int BranchId { get; set; }
        public DateTime OrderDate { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;

        // Implement IEntity interface
        public int Id 
        { 
            get => OrderId;
            set => OrderId = value;
        }
    }
}