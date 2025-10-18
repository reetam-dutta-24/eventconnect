import { PrismaClient, Category, Role, EventStatus } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data (optional - be careful in production!)
  await prisma.notification.deleteMany()
  await prisma.message.deleteMany()
  await prisma.conversation.deleteMany()
  await prisma.match.deleteMany()
  await prisma.review.deleteMany()
  await prisma.ticket.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.ticketTier.deleteMany()
  await prisma.event.deleteMany()
  await prisma.user.deleteMany()

  // Create Users
  const hashedPassword = await bcrypt.hash('password123', 10)

  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      username: 'johndoe',
      name: 'John Doe',
      password: hashedPassword,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      bio: 'Music lover and tech enthusiast',
      location: 'Mumbai, India',
      role: Role.USER,
      interests: ['Music', 'Tech', 'Networking'],
    },
  })

  const organizer1 = await prisma.user.create({
    data: {
      email: 'sarah@example.com',
      username: 'sarahevents',
      name: 'Sarah Johnson',
      password: hashedPassword,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: 'Event organizer passionate about bringing people together',
      location: 'Delhi, India',
      role: Role.ORGANIZER,
      interests: ['Music', 'Arts', 'Food'],
    },
  })

  const admin1 = await prisma.user.create({
    data: {
      email: 'admin@eventconnect.com',
      username: 'admin',
      name: 'Admin User',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  })

  console.log('✅ Created users')

  // Create Events
  const event1 = await prisma.event.create({
    data: {
      title: 'Summer Music Festival 2025',
      slug: 'summer-music-festival-2025',
      description: `Join us for the biggest music festival of the summer! 
      
Featuring top artists from around the world, food trucks, and an unforgettable atmosphere.

Lineup includes:
- DJ Superstar
- Rock Band Legends
- Pop Sensation
- And many more!

Don't miss out on this incredible experience!`,
      category: Category.CONCERTS,
      coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
      venue: 'Mumbai Festival Grounds',
      address: '123 Festival Road, Bandra West',
      city: 'Mumbai',
      country: 'India',
      startDate: new Date('2025-06-15T16:00:00'),
      endDate: new Date('2025-06-15T23:00:00'),
      status: EventStatus.PUBLISHED,
      organizerId: organizer1.id,
      ticketTiers: {
        create: [
          {
            name: 'VIP Pass',
            description: 'Full access with exclusive perks',
            price: 5000,
            quantity: 100,
            sold: 23,
            benefits: [
              'Front row access',
              'Meet & greet with artists',
              'VIP lounge access',
              'Free food and drinks',
              'Exclusive merchandise',
            ],
          },
          {
            name: 'General Admission',
            description: 'Standard festival access',
            price: 1500,
            quantity: 500,
            sold: 234,
            benefits: [
              'Festival access',
              'General seating',
              'Access to food trucks',
            ],
          },
          {
            name: 'Early Bird',
            description: 'Limited time offer!',
            price: 999,
            quantity: 200,
            sold: 200, // Sold out!
            benefits: [
              'Festival access',
              'General seating',
              'Discounted price',
            ],
          },
        ],
      },
    },
    include: {
        ticketTiers: true,  // ← ADD THIS LINE
    },
  })

  const event2 = await prisma.event.create({
    data: {
      title: 'Tech Conference 2025: Future of AI',
      slug: 'tech-conference-2025-future-of-ai',
      description: `The premier technology conference exploring the future of Artificial Intelligence.

Join industry leaders, innovators, and enthusiasts for two days of:
- Keynote speeches from AI pioneers
- Hands-on workshops
- Networking opportunities
- Exhibition hall with cutting-edge tech

Topics include: Machine Learning, Neural Networks, Ethics in AI, and more!`,
      category: Category.TECH,
      coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      venue: 'Bangalore Convention Center',
      address: 'Tech Park, Whitefield',
      city: 'Bangalore',
      country: 'India',
      startDate: new Date('2025-07-20T09:00:00'),
      endDate: new Date('2025-07-21T18:00:00'),
      status: EventStatus.PUBLISHED,
      organizerId: organizer1.id,
      ticketTiers: {
        create: [
          {
            name: 'All-Access Pass',
            description: 'Full conference access',
            price: 8000,
            quantity: 200,
            sold: 45,
            benefits: [
              'Access to all sessions',
              'Workshop participation',
              'Networking events',
              'Conference materials',
              'Lunch both days',
            ],
          },
          {
            name: 'Day Pass',
            description: 'Single day access',
            price: 4500,
            quantity: 300,
            sold: 67,
            benefits: [
              'Access to day sessions',
              'Exhibition hall access',
              'Lunch included',
            ],
          },
        ],
      },
    },
    include: {
        ticketTiers: true,  // ← ADD THIS LINE
    },
  })

  const event3 = await prisma.event.create({
    data: {
      title: 'Food & Wine Tasting Night',
      slug: 'food-wine-tasting-night',
      description: `An elegant evening of fine dining and wine tasting.

Experience:
- 5-course gourmet meal
- Wine pairing with each course
- Meet renowned chefs
- Live acoustic music

Dress code: Smart casual`,
      category: Category.FOOD,
      coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      venue: 'The Grand Hotel Delhi',
      address: 'Connaught Place',
      city: 'Delhi',
      country: 'India',
      startDate: new Date('2025-05-10T19:00:00'),
      endDate: new Date('2025-05-10T23:00:00'),
      status: EventStatus.PUBLISHED,
      organizerId: organizer1.id,
      ticketTiers: {
        create: [
          {
            name: 'Premium Table',
            description: 'Best seating with sommelier service',
            price: 6000,
            quantity: 20,
            sold: 8,
            benefits: [
              'Priority seating',
              'Personal sommelier',
              'Extended wine selection',
              'Chef meet & greet',
            ],
          },
          {
            name: 'Standard',
            description: 'Full experience',
            price: 3500,
            quantity: 80,
            sold: 34,
            benefits: [
              '5-course meal',
              'Wine pairings',
              'Live music',
            ],
          },
        ],
      },
    },
    include: {
        ticketTiers: true,  // ← ADD THIS LINE
    },
  })

  const event4 = await prisma.event.create({
    data: {
      title: 'Startup Networking Mixer',
      slug: 'startup-networking-mixer',
      description: `Connect with entrepreneurs, investors, and innovators!

Perfect for:
- Founders seeking co-founders
- Investors looking for opportunities
- Professionals wanting to join startups
- Anyone interested in the startup ecosystem

Casual atmosphere with drinks and snacks provided.`,
      category: Category.NETWORKING,
      coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
      venue: 'WeWork Cyber City',
      address: 'DLF Cyber City, Gurgaon',
      city: 'Gurgaon',
      country: 'India',
      startDate: new Date('2025-05-25T18:00:00'),
      endDate: new Date('2025-05-25T21:00:00'),
      status: EventStatus.PUBLISHED,
      organizerId: organizer1.id,
      ticketTiers: {
        create: [
          {
            name: 'Networking Pass',
            description: 'Entry to mixer',
            price: 500,
            quantity: 150,
            sold: 89,
            benefits: [
              'Event access',
              'Drinks and snacks',
              'Name tag',
              'Access to networking app',
            ],
          },
        ],
      },
    },
    include: {
        ticketTiers: true,  // ← ADD THIS LINE
    },
  })

  console.log('✅ Created events with ticket tiers')

  // Create a booking for user1
  const booking1 = await prisma.booking.create({
    data: {
      userId: user1.id,
      eventId: event1.id,
      attendeeName: user1.name!,
      attendeeEmail: user1.email,
      attendeePhone: '+91 9876543210',
      totalAmount: 1500,
      status: 'CONFIRMED',
      tickets: {
        create: [
          {
            tierId: event1.ticketTiers[1].id, // General Admission
            qrCode: `QR-${Date.now()}-1`,
          },
        ],
      },
    },
  })

  console.log('✅ Created sample booking')

  // Create a review
  await prisma.review.create({
    data: {
      userId: user1.id,
      eventId: event1.id,
      rating: 5,
      comment: 'Amazing event! The lineup was incredible and the organization was top-notch.',
    },
  })

  console.log('✅ Created sample review')

  console.log('\n🎉 Seed completed successfully!\n')
  console.log('Created:')
  console.log('- 3 users (1 attendee, 1 organizer, 1 admin)')
  console.log('- 4 events with ticket tiers')
  console.log('- 1 booking with ticket')
  console.log('- 1 review')
  console.log('\nTest credentials:')
  console.log('User: john@example.com / password123')
  console.log('Organizer: sarah@example.com / password123')
  console.log('Admin: admin@eventconnect.com / password123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })