import { faker } from '@faker-js/faker';

// Type pour un événement de log
export type LogEntry = {
  timestamp: string;
  message: string;
};

// Type pour un prospect
export type Prospect = {
  id: string;
  name: string;
  title: string;
  company: string;
  status: 'en attente' | 'message généré' | 'envoyé' | 'erreur';
  avatar: string;
};

// Fonction pour simuler un journal d'événements de recherche
export function generateFakeLog(): LogEntry[] {
  return [
    { timestamp: '11:05:01', message: 'Lancement de la recherche pour "Spécialistes santé..."' },
    { timestamp: '11:05:03', message: 'Requête générée par l\'IA : "santé connectée Dakar site:linkedin.com/in"' },
    { timestamp: '11:05:05', message: '10 profils trouvés.' },
    { timestamp: '11:05:07', message: 'Ajout de "Moussa Diop" au Google Sheet.' },
    { timestamp: '11:05:08', message: 'Ajout de "Aisha Traoré" au Google Sheet.' },
    { timestamp: '11:05:10', message: 'Ajout de "Jean Dupont" au Google Sheet.' },
    { timestamp: '11:05:12', message: 'Ajout de "Fatou Diallo" au Google Sheet.' },
    { timestamp: '11:05:15', message: 'Recherche terminée.' },
  ];
}

// Fonction pour simuler une liste de prospects
export function generateFakeProspects(count: number): Prospect[] {
  return Array.from({ length: count }, () => {
    const name = faker.person.fullName();
    return {
      id: faker.string.uuid(),
      name,
      title: faker.person.jobTitle(),
      company: faker.company.name(),
      status: 'en attente',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    };
  });
}

// lib/fakeData.ts


// ... (types existants : LogEntry, Prospect) ...

// Nouveau type pour les messages de conversation
export type Message = {
  id: string;
  sender: 'prospect' | 'ia' | 'human';
  content: string;
  timestamp: string;
};

// Nouveau type pour une conversation
export type Conversation = {
  id: string;
  prospectName: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  messages: Message[];
  avatar: string;
};

// Fonction pour générer une conversation fictive
function generateFakeConversation(): Conversation {
  const prospectName = faker.person.fullName();
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(prospectName)}&background=random`;
  const messages: Message[] = Array.from({ length: faker.number.int({ min: 3, max: 10 }) }, (_, i) => ({
    id: faker.string.uuid(),
    sender: i % 2 === 0 ? 'prospect' : 'ia',
    content: faker.lorem.sentence({ min: 5, max: 20 }),
    timestamp: faker.date.recent().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
  }));

  const lastMessage = messages[messages.length - 1];

  return {
    id: faker.string.uuid(),
    prospectName: prospectName,
    lastMessage: lastMessage.content,
    lastMessageTimestamp: lastMessage.timestamp,
    messages: messages,
    avatar,
  };
}

// Fonction pour générer une liste de conversations fictives
export function generateFakeConversations(count: number): Conversation[] {
  return Array.from({ length: count }, () => generateFakeConversation());
}