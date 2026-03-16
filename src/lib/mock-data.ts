// Mock data for all marketplace displays

export const categories = [
  { id: "web-dev", name: "Web Development", icon: "Code2", count: 2340 },
  { id: "design", name: "Design & Creative", icon: "Palette", count: 1890 },
  { id: "mobile", name: "Mobile Development", icon: "Smartphone", count: 1240 },
  { id: "ai-ml", name: "AI & Machine Learning", icon: "Brain", count: 980 },
  { id: "bots", name: "Bots & Automation", icon: "Bot", count: 760 },
  { id: "video", name: "Video & Animation", icon: "Video", count: 1560 },
  { id: "writing", name: "Writing & Content", icon: "PenTool", count: 2100 },
  { id: "marketing", name: "Digital Marketing", icon: "TrendingUp", count: 1430 },
];

export const trendingServices: any[] = [];

export const featuredProducts: any[] = [];

export const topFreelancers = [
  {
    id: "f1",
    name: "Alex Chen",
    title: "Full-Stack Developer",
    avatar: "/avatars/1.jpg",
    level: "Legend",
    rating: 4.9,
    completedOrders: 342,
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    verified: true,
  },
  {
    id: "f2",
    name: "Sarah Kim",
    title: "Senior UI/UX Designer",
    avatar: "/avatars/2.jpg",
    level: "Legend",
    rating: 5.0,
    completedOrders: 521,
    skills: ["Figma", "Adobe XD", "Prototyping", "Design Systems"],
    verified: true,
  },
  {
    id: "f3",
    name: "Priya Patel",
    title: "Mobile App Specialist",
    avatar: "/avatars/6.jpg",
    level: "Legend",
    rating: 4.9,
    completedOrders: 412,
    skills: ["React Native", "Flutter", "Swift", "Kotlin"],
    verified: true,
  },
  {
    id: "f4",
    name: "James Wilson",
    title: "Video Production Expert",
    avatar: "/avatars/5.jpg",
    level: "Elite",
    rating: 4.9,
    completedOrders: 278,
    skills: ["Premiere Pro", "After Effects", "DaVinci", "Motion Graphics"],
    verified: true,
  },
];

export const testimonials = [
  {
    id: "t1",
    name: "David Rodriguez",
    role: "Startup Founder",
    avatar: "/avatars/11.jpg",
    content:
      "Victus Vision helped me find the perfect developer for my startup. The quality of talent here is unmatched. Our MVP was delivered 2 weeks ahead of schedule!",
    rating: 5,
  },
  {
    id: "t2",
    name: "Lisa Chang",
    role: "Product Manager at TechCo",
    avatar: "/avatars/12.jpg",
    content:
      "Ive tried several freelance platforms, but Victus Vision stands out with its premium sellers and digital marketplace. The plugin we bought saved us months of development.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Marcus Johnson",
    role: "Indie Game Developer",
    avatar: "/avatars/13.jpg",
    content:
      "As both a buyer and seller on Victus Vision, I love the ecosystem. Selling my game assets has become a significant revenue stream, and the platform takes care of everything.",
    rating: 5,
  },
];

export const faqItems = [
  {
    q: "What is Victus Vision?",
    a: "Victus Vision is a premium hybrid marketplace that combines freelance services and digital products. You can hire talented freelancers, buy ready-made digital assets, or sell your own services and products — all in one platform.",
  },
  {
    q: "How do I become a seller?",
    a: "Simply create an account and apply to become a seller through your dashboard. Our review team will verify your profile within 24-48 hours. Once approved, you can create service listings and upload digital products.",
  },
  {
    q: "What payment methods are supported?",
    a: "We support all major credit and debit cards, PayPal, and cryptocurrency. Payments are processed securely and sellers receive payouts on a bi-weekly schedule with multiple withdrawal options.",
  },
  {
    q: "How does the reputation system work?",
    a: "You earn XP through completing orders, receiving positive reviews, selling products, and platform activity. As you accumulate XP, you progress through levels: Beginner → Skilled → Professional → Elite → Legend. Higher levels unlock premium features and increased visibility.",
  },
  {
    q: "What fees does the platform charge?",
    a: "Victus Vision charges a competitive 10% service fee on transactions. This covers payment processing, platform maintenance, dispute resolution, and customer support. Promoted listings and premium features are available at additional rates.",
  },
  {
    q: "How are disputes handled?",
    a: "Our dedicated resolution team mediates all disputes. Both buyers and sellers can submit evidence, and our team ensures fair outcomes. We offer full purchase protection for buyers and seller protection for verified transactions.",
  },
];

export const platformStats = [
  { label: "Active Freelancers", value: 12400, suffix: "+" },
  { label: "Digital Products", value: 8700, suffix: "+" },
  { label: "Orders Completed", value: 145000, suffix: "+" },
  { label: "Customer Satisfaction", value: 98, suffix: "%" },
];

export const serviceListings = [
  ...trendingServices,
  {
    id: "s7",
    title: "SEO Optimization & Strategy",
    seller: { name: "Mark Thompson", avatar: "/avatars/14.jpg", level: "Elite", verified: true },
    rating: 4.8,
    reviews: 213,
    price: 249,
    deliveryDays: 10,
    category: "Digital Marketing",
    image: "/services/seo.jpg",
    tags: ["SEO", "Analytics", "Strategy"],
  },
  {
    id: "s8",
    title: "Brand Identity & Logo Design",
    seller: { name: "Nina Rodriguez", avatar: "/avatars/15.jpg", level: "Professional", verified: true },
    rating: 4.7,
    reviews: 178,
    price: 129,
    deliveryDays: 4,
    category: "Design & Creative",
    image: "/services/branding.jpg",
    tags: ["Logo", "Branding", "Identity"],
  },
  {
    id: "s9",
    title: "Smart Contract Development",
    seller: { name: "Chris Lee", avatar: "/avatars/16.jpg", level: "Elite", verified: true },
    rating: 4.9,
    reviews: 98,
    price: 599,
    deliveryDays: 14,
    category: "Web Development",
    image: "/services/blockchain.jpg",
    tags: ["Solidity", "Web3", "DeFi"],
  },
];

export const productListings = [
  ...featuredProducts,
  {
    id: "p5",
    title: "Admin Panel React Template",
    seller: { name: "UIForge", avatar: "/avatars/17.jpg" },
    price: 59,
    rating: 4.8,
    reviews: 312,
    downloads: 3200,
    category: "Templates",
    image: "/products/admin-panel.jpg",
    tags: ["React", "Admin", "Dashboard"],
  },
  {
    id: "p6",
    title: "Minecraft Server Plugin Suite",
    seller: { name: "PluginPros", avatar: "/avatars/18.jpg" },
    price: 24,
    rating: 4.5,
    reviews: 890,
    downloads: 12400,
    category: "Plugins",
    image: "/products/mc-plugin.jpg",
    tags: ["Minecraft", "Java", "Spigot"],
  },
  {
    id: "p7",
    title: "AI Image Generator API Wrapper",
    seller: { name: "AIToolkit", avatar: "/avatars/19.jpg" },
    price: 35,
    rating: 4.7,
    reviews: 201,
    downloads: 1540,
    category: "Scripts",
    image: "/products/ai-api.jpg",
    tags: ["Python", "AI", "API"],
  },
  {
    id: "p8",
    title: "Social Media Automation Tool",
    seller: { name: "GrowthHack", avatar: "/avatars/20.jpg" },
    price: 45,
    rating: 4.6,
    reviews: 167,
    downloads: 890,
    category: "Tools",
    image: "/products/social-tool.jpg",
    tags: ["Automation", "Social Media", "Growth"],
  },
];

// Dashboard mock data
export const dashboardStats = {
  totalEarnings: 12450,
  monthlyEarnings: 3240,
  totalOrders: 89,
  pendingOrders: 5,
  completionRate: 98,
  responseTime: "1.2h",
  activeServices: 4,
  activeProducts: 7,
};

export const recentOrders = [
  { id: "ORD-001", buyer: "John Smith", service: "Website Development", amount: 299, status: "in_progress", date: "2026-03-10" },
  { id: "ORD-002", buyer: "Emily Brown", service: "Logo Design", amount: 129, status: "delivered", date: "2026-03-09" },
  { id: "ORD-003", buyer: "Tom Harris", service: "Discord Bot", amount: 149, status: "completed", date: "2026-03-08" },
  { id: "ORD-004", buyer: "Anna White", service: "Mobile App", amount: 499, status: "in_progress", date: "2026-03-07" },
  { id: "ORD-005", buyer: "Sam Green", service: "UI/UX Design", amount: 199, status: "revision", date: "2026-03-06" },
];

export const earningsData = [
  { month: "Sep", amount: 1800 },
  { month: "Oct", amount: 2400 },
  { month: "Nov", amount: 2100 },
  { month: "Dec", amount: 3600 },
  { month: "Jan", amount: 2800 },
  { month: "Feb", amount: 3100 },
  { month: "Mar", amount: 3240 },
];

export const notifications = [
  { id: "n1", type: "order", message: "New order received from John Smith", time: "2 min ago", read: false },
  { id: "n2", type: "message", message: "Emily Brown sent you a message", time: "15 min ago", read: false },
  { id: "n3", type: "review", message: "Tom Harris left a 5-star review", time: "1 hour ago", read: false },
  { id: "n4", type: "sale", message: "Your product 'Dashboard Kit' was purchased", time: "3 hours ago", read: true },
  { id: "n5", type: "update", message: "Platform update: New features available", time: "1 day ago", read: true },
];

export const conversations = [
  {
    id: "c1",
    user: { name: "John Smith", avatar: "/avatars/11.jpg", online: true },
    lastMessage: "Sounds great! Ill send over the requirements doc.",
    time: "2 min ago",
    unread: 2,
  },
  {
    id: "c2",
    user: { name: "Emily Brown", avatar: "/avatars/12.jpg", online: true },
    lastMessage: "Can we add a few more revisions to the logo?",
    time: "15 min ago",
    unread: 1,
  },
  {
    id: "c3",
    user: { name: "Tom Harris", avatar: "/avatars/13.jpg", online: false },
    lastMessage: "Thanks for the amazing work! Left you a review.",
    time: "1 hour ago",
    unread: 0,
  },
  {
    id: "c4",
    user: { name: "Anna White", avatar: "/avatars/14.jpg", online: false },
    lastMessage: "When can we schedule the next milestone?",
    time: "3 hours ago",
    unread: 0,
  },
];

export const chatMessages = [
  { id: "m1", senderId: "other", text: "Hi! I'm interested in your website development service.", time: "10:00 AM" },
  { id: "m2", senderId: "me", text: "Hello! Thanks for reaching out. I'd love to hear about your project.", time: "10:02 AM" },
  { id: "m3", senderId: "other", text: "I need a modern e-commerce website built with Next.js and Supabase. It should have user auth, product listings, and a checkout flow.", time: "10:05 AM" },
  { id: "m4", senderId: "me", text: "That sounds like a great project! I've built several e-commerce platforms with that exact stack. Let me send you some examples.", time: "10:07 AM" },
  { id: "m5", senderId: "other", text: "Sounds great! I'll send over the requirements doc.", time: "10:10 AM" },
];

export const adminStats = {
  totalUsers: 45200,
  newUsersToday: 128,
  totalRevenue: 892400,
  monthlyRevenue: 124500,
  activeOrders: 1240,
  pendingDisputes: 23,
  pendingSellers: 45,
  reportedContent: 12,
};

export const adminUsers = [
  { id: "u1", name: "Alex Chen", email: "alex@email.com", role: "seller", level: "Legend", status: "active", joined: "2025-01-15" },
  { id: "u2", name: "Sarah Kim", email: "sarah@email.com", role: "seller", level: "Legend", status: "active", joined: "2025-02-20" },
  { id: "u3", name: "Mike Torres", email: "mike@email.com", role: "seller", level: "Professional", status: "active", joined: "2025-03-10" },
  { id: "u4", name: "John Smith", email: "john@email.com", role: "buyer", level: "Skilled", status: "active", joined: "2025-04-05" },
  { id: "u5", name: "Emily Brown", email: "emily@email.com", role: "buyer", level: "Beginner", status: "suspended", joined: "2025-05-12" },
];
