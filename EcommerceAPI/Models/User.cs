namespace EcommerceAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();
        public string Role { get; set; } = "User";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public virtual List<Order> Orders { get; set; } = new List<Order>();
    }
}
