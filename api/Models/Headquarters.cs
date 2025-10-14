namespace OctoCat.Api.Models
{
    public class Headquarters : IEntity<int>
    {
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
            get => HeadquartersId;
            set => HeadquartersId = value;
        }
    }
}