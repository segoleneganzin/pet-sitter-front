export const mockUsers = [
  {
    id: '66f6c7d2ae23dd415171ffb1',
    email: 'test@test.com',
    password: '$2b$12$ONV10ix.rl6vMGdAZmy6YOdnmklPlAo7jng4Nbz40dzZN6FfHuF0G',
    roles: ['owner'],
    profilePicture: '/172768117799297990-1532336916.jpg',
    firstName: 'David',
    lastName: 'Thomas',
    city: 'Toulouse',
    country: 'France',
    roleDetails: {
      owner: {
        pets: ['dog', 'cat', 'nac'],
      },
      sitter: {
        acceptedPets: [],
      },
    },
  },
  {
    id: '66f6c7d2ae23dd415171ffb2',
    email: 'john@example.com',
    password: '$2b$12$Hh1I8lA5z7gOfA0O0HVWfO3H8HzWpa8tE8CjaRYedP4v/I/72j7qK',
    roles: ['sitter'],
    profilePicture: '/profile1.jpg',
    firstName: 'John',
    lastName: 'Doe',
    city: 'Paris',
    country: 'France',
    roleDetails: {
      owner: {},
      sitter: {
        acceptedPets: ['dog', 'cat'],
      },
    },
  },
  {
    id: '66f6c7d2ae23dd415171ffb3',
    email: 'jane@example.com',
    password: '$2b$12$Hh1I8lA5z7gOfA0O0HVWfO3H8HzWpa8tE8CjaRYedP4v/I/72j7qK',
    roles: ['owner', 'sitter'],
    profilePicture: '/profile2.jpg',
    firstName: 'Jane',
    lastName: 'Smith',
    city: 'Lyon',
    country: 'France',
    roleDetails: {
      owner: {
        pets: ['nac'],
      },
      sitter: {
        acceptedPets: ['cat', 'nac'],
      },
    },
  },
  {
    id: '66f6c7d2ae23dd415171ffb4',
    email: 'alex@example.com',
    password: '$2b$12$Hh1I8lA5z7gOfA0O0HVWfO3H8HzWpa8tE8CjaRYedP4v/I/72j7qK',
    roles: ['sitter'],
    profilePicture: '/profile3.jpg',
    firstName: 'Alex',
    lastName: 'Johnson',
    city: 'Marseille',
    country: 'France',
    roleDetails: {
      owner: {},
      sitter: {
        acceptedPets: ['dog'],
      },
    },
  },
  {
    id: '66f6c7d2ae23dd415171ffb5',
    email: 'emily@example.com',
    password: '$2b$12$Hh1I8lA5z7gOfA0O0HVWfO3H8HzWpa8tE8CjaRYedP4v/I/72j7qK',
    roles: ['owner'],
    profilePicture: '/profile4.jpg',
    firstName: 'Emily',
    lastName: 'Davis',
    city: 'Nice',
    country: 'France',
    roleDetails: {
      owner: {
        pets: ['nac'],
      },
      sitter: {
        acceptedPets: [],
      },
    },
  },
];
