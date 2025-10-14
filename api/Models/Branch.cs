namespace OctoCat.Api.Models
{
    public class Branch : IEntity<int>
    {
        public int BranchId { get; set; }
        public int HeadquartersId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string ContactPerson { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;

        // Implement IEntity interface
        public int Id 
        { 
            get => BranchId;
            set => BranchId = value;
        }
    }
}