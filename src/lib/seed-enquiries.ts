import type { Enquiry } from './types'

export const seedEnquiries: Enquiry[] = [
  {
    id: 'enq-demo-01',
    roomId: 'room-01',
    roomTitle: 'Sunny bedsitter near South B shopping centre',
    hostUserId: 'user-host-demo',
    hostName: 'Mama Njeri House',
    name: 'Kevin Oduor',
    phone: '+254722111333',
    email: 'kevin.oduor@example.com',
    moveInDate: '2026-11-05',
    message:
      'Hello, I am starting an attachment at a firm on Mombasa Road. Is the bedsitter still available for a weekly arrangement?',
    status: 'New',
    thread: [
      {
        from: 'seeker',
        name: 'Kevin Oduor',
        text:
          'Hello, I am starting an attachment at a firm on Mombasa Road. Is the bedsitter still available for a weekly arrangement?',
        at: '2026-10-24T09:15:00.000Z',
      },
    ],
    createdAt: '2026-10-24T09:15:00.000Z',
  },
  {
    id: 'enq-demo-02',
    roomId: 'room-02',
    roomTitle: 'Quiet study room on Ngong Road',
    hostUserId: 'user-host-demo',
    hostName: 'Ngong Court House',
    name: 'Grace Wambui',
    phone: '+254733222444',
    email: 'grace.wambui@example.com',
    moveInDate: '2026-11-15',
    message: 'Is the monthly price inclusive of water? I would like to view the room this Saturday.',
    status: 'Replied',
    thread: [
      {
        from: 'seeker',
        name: 'Grace Wambui',
        text: 'Is the monthly price inclusive of water? I would like to view the room this Saturday.',
        at: '2026-10-22T14:40:00.000Z',
      },
      {
        from: 'host',
        name: 'Mama Njeri House',
        text:
          'Water is included in the monthly rent. Saturday at 10am works for a viewing. Please come with your ID and do not send any deposit before you view.',
        at: '2026-10-22T16:05:00.000Z',
      },
    ],
    createdAt: '2026-10-22T14:40:00.000Z',
  },
  {
    id: 'enq-demo-03',
    roomId: 'room-06',
    roomTitle: 'Bright room in Nyali near Links Road',
    hostUserId: 'user-host-demo',
    hostName: 'Nyali House',
    name: 'Salma Hassan',
    phone: '+254711333555',
    email: 'salma.hassan@example.com',
    moveInDate: '2026-12-01',
    message: 'I work at a hotel near Links Road. Can I pay weekly for the first month?',
    status: 'New',
    thread: [
      {
        from: 'seeker',
        name: 'Salma Hassan',
        text: 'I work at a hotel near Links Road. Can I pay weekly for the first month?',
        at: '2026-10-26T11:20:00.000Z',
      },
    ],
    createdAt: '2026-10-26T11:20:00.000Z',
  },
]
