using System;
using System.Collections.Generic;
using System.Linq;
using OctoCat.Api.Models;

namespace OctoCat.Api.Data
{
    public class DataRepository
    {
        // In-memory data collections for each entity
        public List<Product> Products { get; private set; } = new List<Product>();
        public List<Supplier> Suppliers { get; private set; } = new List<Supplier>();
        public List<Headquarters> Headquarters { get; private set; } = new List<Headquarters>();
        public List<Branch> Branches { get; private set; } = new List<Branch>();
        public List<Order> Orders { get; private set; } = new List<Order>();
        public List<OrderDetail> OrderDetails { get; private set; } = new List<OrderDetail>();
        public List<Delivery> Deliveries { get; private set; } = new List<Delivery>();
        public List<OrderDetailDelivery> OrderDetailDeliveries { get; private set; } = new List<OrderDetailDelivery>();

        // Generic repositories for each entity
        public IGenericRepository<Product, int> ProductRepository { get; private set; }
        public IGenericRepository<Supplier, int> SupplierRepository { get; private set; }
        public IGenericRepository<Headquarters, int> HeadquartersRepository { get; private set; }
        public IGenericRepository<Branch, int> BranchRepository { get; private set; }
        public IGenericRepository<Order, int> OrderRepository { get; private set; }
        public IGenericRepository<OrderDetail, int> OrderDetailRepository { get; private set; }
        public IGenericRepository<Delivery, int> DeliveryRepository { get; private set; }
        public IGenericRepository<OrderDetailDelivery, int> OrderDetailDeliveryRepository { get; private set; }

        public DataRepository()
        {
            // Initialize with sample data for demonstration
            SeedData();
            
            // Initialize repositories
            ProductRepository = new GenericRepository<Product, int>(Products);
            SupplierRepository = new GenericRepository<Supplier, int>(Suppliers);
            HeadquartersRepository = new GenericRepository<Headquarters, int>(Headquarters);
            BranchRepository = new GenericRepository<Branch, int>(Branches);
            OrderRepository = new GenericRepository<Order, int>(Orders);
            OrderDetailRepository = new GenericRepository<OrderDetail, int>(OrderDetails);
            DeliveryRepository = new GenericRepository<Delivery, int>(Deliveries);
            OrderDetailDeliveryRepository = new GenericRepository<OrderDetailDelivery, int>(OrderDetailDeliveries);
        }

        private void SeedData()
        {
            // Clear existing data
            Products.Clear();
            Suppliers.Clear();
            Headquarters.Clear();
            Branches.Clear();
            Orders.Clear();
            OrderDetails.Clear();
            Deliveries.Clear();
            OrderDetailDeliveries.Clear();

            // Seed Suppliers
            Suppliers.AddRange(new List<Supplier>
            {
                new Supplier 
                { 
                    SupplierId = 1, 
                    Name = "PurrTech Innovations", 
                    Description = "Leading supplier of premium smart cat technology",
                    ContactPerson = "Felix Whiskerton", 
                    Email = "felix@purrtech.co", 
                    Phone = "555-0101"
                },
                new Supplier 
                { 
                    SupplierId = 2, 
                    Name = "WhiskerWare Systems", 
                    Description = "Advanced feline-focused smart product supplier",
                    ContactPerson = "Tabitha Pawson", 
                    Email = "tabitha@whiskerware.com", 
                    Phone = "555-0102"
                },
                new Supplier 
                { 
                    SupplierId = 3, 
                    Name = "CatNip Creations", 
                    Description = "Supplier of eco-friendly cat toys and accessories",
                    ContactPerson = "Nina Nibbles", 
                    Email = "nina@catnip.com", 
                    Phone = "555-0103"
                }
            });

            // Seed Products
            Products.AddRange(new List<Product>
            {
                new Product 
                { 
                    ProductId = 1, 
                    SupplierId = 3, 
                    Name = "SmartFeeder One", 
                    Description = "This AI-powered feeder learns your cat's snack schedule based on nap cycles and mealtime habits. It detects overeating, undernapping, and auto-updates a Feline Health Repo.", 
                    Price = 129.99m, 
                    Sku = "CAT-FEED-001", 
                    Unit = "piece", 
                    ImgName = "feeder.png", 
                    Discount = 0.25m 
                },
                new Product 
                { 
                    ProductId = 2, 
                    SupplierId = 3, 
                    Name = "AutoClean Litter Dome", 
                    Description = "A self-cleaning litter box that detects patterns in your cat's... commits. Sends you a health report and Slack alert if things look off.", 
                    Price = 199.99m, 
                    Sku = "CAT-LITTER-001", 
                    Unit = "piece", 
                    ImgName = "litter-box.png", 
                    Discount = 0.25m 
                },
                new Product 
                { 
                    ProductId = 3, 
                    SupplierId = 2, 
                    Name = "CatFlix Entertainment Portal", 
                    Description = "On-demand laser shows, motion videos, and bird-watching streams - customized per cat using AI interest tracking. Think Netflix, but for felines.", 
                    Price = 89.99m, 
                    Sku = "CAT-FLIX-001", 
                    Unit = "piece", 
                    ImgName = "catflix.png" 
                },
                new Product 
                { 
                    ProductId = 4, 
                    SupplierId = 2, 
                    Name = "PawTrack Smart Collar", 
                    Description = "GPS and activity tracker with AI-powered mood detection based on tail position, purring frequency, and movement patterns. Syncs with your phone for walk stats and zoomie alerts.", 
                    Price = 79.99m, 
                    Sku = "CAT-COLLAR-001", 
                    Unit = "piece", 
                    ImgName = "smart-collar.png" 
                },
                new Product 
                { 
                    ProductId = 5, 
                    SupplierId = 1, 
                    Name = "SleepNest ThermoPod", 
                    Description = "A smart bed that adjusts its temperature, lighting, and white noise based on your cat's REM cycles. Auto-generates nap metrics in JSON.", 
                    Price = 149.99m, 
                    Sku = "CAT-BED-001", 
                    Unit = "piece", 
                    ImgName = "sleep-nest.png" 
                },
                new Product 
                { 
                    ProductId = 6, 
                    SupplierId = 1, 
                    Name = "ClawMate Auto Groomer", 
                    Description = "Your cat brushes itself. This AI station detects which areas need grooming, dispenses treats for patience, and logs grooming history to your pet portal.", 
                    Price = 119.99m, 
                    Sku = "CAT-GROOM-001", 
                    Unit = "piece", 
                    ImgName = "auto-groomer.png" 
                },
                new Product 
                { 
                    ProductId = 7, 
                    SupplierId = 3, 
                    Name = "Smart Fountain Flow+", 
                    Description = "This water fountain adjusts flow patterns based on time of day, cat hydration levels, and even playfulness. Uses facial recognition to distinguish multiple cats.", 
                    Price = 69.99m, 
                    Sku = "CAT-FOUNTAIN-001", 
                    Unit = "piece", 
                    ImgName = "smart-fountain.png", 
                    Discount = 0.25m 
                },
                new Product 
                { 
                    ProductId = 8, 
                    SupplierId = 2, 
                    Name = "ScratchPad Pro", 
                    Description = "More than a scratcher - this one detects scratching habits, gamifies it with leaderboard stats for multi-cat homes, and awards digital badges.", 
                    Price = 59.99m, 
                    Sku = "CAT-SCRATCH-001", 
                    Unit = "piece", 
                    ImgName = "scratch-pad.png" 
                },
                new Product 
                { 
                    ProductId = 9, 
                    SupplierId = 2, 
                    Name = "ChirpCam Window Mount", 
                    Description = "Motion-activated smart cam that records wildlife outside the window and sends curated 'Birdflix' highlights to your cat's personal feed.", 
                    Price = 99.99m, 
                    Sku = "CAT-CAM-001", 
                    Unit = "piece", 
                    ImgName = "chirp-cam.png" 
                },
                new Product 
                { 
                    ProductId = 10, 
                    SupplierId = 3, 
                    Name = "SnackVault Puzzle Dispenser", 
                    Description = "Treat puzzle toy that evolves in difficulty with your cat's cleverness. AI engine auto-adjusts pathways and provides tips to the human if the cat cheats.", 
                    Price = 49.99m, 
                    Sku = "CAT-SNACK-001", 
                    Unit = "piece", 
                    ImgName = "snack-vault.png", 
                    Discount = 0.25m 
                },
                new Product 
                { 
                    ProductId = 11, 
                    SupplierId = 1, 
                    Name = "DoorDash Pet Portal", 
                    Description = "Smart cat door with facial recognition and time-based access. Prevents midnight squirrel parties and tracks in/out commits to your dashboard.", 
                    Price = 159.99m, 
                    Sku = "CAT-DOOR-001", 
                    Unit = "piece", 
                    ImgName = "door-dash.png" 
                },
                new Product 
                { 
                    ProductId = 12, 
                    SupplierId = 2, 
                    Name = "ZoomieTracker AI Mat", 
                    Description = "A motion-sensing mat that detects zoomies, spins up chase lights, and logs agility bursts to a weekly health report. Yes, it graphs zoomies per hour.", 
                    Price = 79.99m, 
                    Sku = "CAT-TRACKER-001", 
                    Unit = "piece", 
                    ImgName = "tracker-mat.png" 
                }
            });

            // Seed Headquarters
            Headquarters.AddRange(new List<Headquarters>
            {
                new Headquarters 
                { 
                    HeadquartersId = 1, 
                    Name = "CatTech Global HQ", 
                    Description = "Feline tech innovations headquarters",
                    Address = "123 Whisker Lane, Purrington District", 
                    ContactPerson = "Catherine Purrston", 
                    Email = "catherine@octocat.com", 
                    Phone = "555-0001" 
                }
            });

            // Seed Branches
            Branches.AddRange(new List<Branch>
            {
                new Branch 
                { 
                    BranchId = 1, 
                    HeadquartersId = 1, 
                    Name = "Meowtown Branch", 
                    Description = "Main downtown cat tech showroom",
                    Address = "456 Purrfect Plaza", 
                    ContactPerson = "Chloe Whiskers", 
                    Email = "cwhiskers@octocat.com", 
                    Phone = "555-0201" 
                },
                new Branch 
                { 
                    BranchId = 2, 
                    HeadquartersId = 1, 
                    Name = "Tabby Terrace Branch", 
                    Description = "Western district cat tech hub",
                    Address = "789 Feline Avenue", 
                    ContactPerson = "Tom Pouncer", 
                    Email = "tpouncer@octocat.com", 
                    Phone = "555-0202" 
                }
            });

            // Seed Orders
            Orders.AddRange(new List<Order>
            {
                new Order 
                { 
                    OrderId = 1, 
                    BranchId = 1, 
                    OrderDate = DateTime.Now, 
                    Name = "Q2 Feline Tech Refresh", 
                    Description = "Quarterly smart cat tech product refresh", 
                    Status = "pending" 
                },
                new Order 
                { 
                    OrderId = 2, 
                    BranchId = 2, 
                    OrderDate = DateTime.Now, 
                    Name = "Cat Enrichment Bundle", 
                    Description = "Monthly cat entertainment systems restock", 
                    Status = "processing" 
                }
            });

            // Seed Order Details
            OrderDetails.AddRange(new List<OrderDetail>
            {
                new OrderDetail 
                { 
                    OrderDetailId = 1, 
                    OrderId = 1, 
                    ProductId = 2, 
                    Quantity = 5, 
                    UnitPrice = 199.99m, 
                    Notes = "AutoClean Litter Domes for new cat café locations" 
                },
                new OrderDetail 
                { 
                    OrderDetailId = 2, 
                    OrderId = 1, 
                    ProductId = 3, 
                    Quantity = 5, 
                    UnitPrice = 89.99m, 
                    Notes = "CatFlix Entertainment Portals for waiting areas" 
                },
                new OrderDetail 
                { 
                    OrderDetailId = 3, 
                    OrderId = 2, 
                    ProductId = 4, 
                    Quantity = 20, 
                    UnitPrice = 79.99m, 
                    Notes = "PawTrack Smart Collars for adoption events" 
                }
            });

            // Seed Deliveries
            Deliveries.AddRange(new List<Delivery>
            {
                new Delivery 
                { 
                    DeliveryId = 1, 
                    SupplierId = 1, 
                    DeliveryDate = DateTime.Now.AddDays(7), 
                    Name = "PurrTech Smart Home Bundle", 
                    Description = "Premium cat tech products delivery for smart cat homes", 
                    Status = "pending" 
                },
                new Delivery 
                { 
                    DeliveryId = 2, 
                    SupplierId = 2, 
                    DeliveryDate = DateTime.Now.AddDays(2), 
                    Name = "WhiskerWare Entertainment Package", 
                    Description = "Entertainment and tracking systems for feline companions", 
                    Status = "in-transit" 
                }
            });

            // Seed Order Detail Deliveries
            OrderDetailDeliveries.AddRange(new List<OrderDetailDelivery>
            {
                new OrderDetailDelivery 
                { 
                    OrderDetailDeliveryId = 1, 
                    OrderDetailId = 1, 
                    DeliveryId = 1, 
                    Quantity = 5, 
                    Notes = "Delivery batch" 
                },
                new OrderDetailDelivery 
                { 
                    OrderDetailDeliveryId = 2, 
                    OrderDetailId = 2, 
                    DeliveryId = 1, 
                    Quantity = 5, 
                    Notes = "Delivery batch" 
                },
                new OrderDetailDelivery 
                { 
                    OrderDetailDeliveryId = 3, 
                    OrderDetailId = 3, 
                    DeliveryId = 2, 
                    Quantity = 20, 
                    Notes = "Delivery" 
                }
            });
        }

        // Keep existing collections for backward compatibility
        // All operations now delegate to the generic repositories
    }
}
