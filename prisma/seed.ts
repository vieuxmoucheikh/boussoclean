import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.service.deleteMany({});

  // Create services
  const services = [
    {
      nom: 'Nettoyage de Canapés',
      description: 'Nos experts redonnent vie à vos canapés grâce à notre procédé de nettoyage en profondeur. Nous éliminons taches, odeurs et acariens pour un résultat impeccable.',
      prix: 79.99,
      unite: 'par canapé',
      image: '/images/services/canape.jpg',
      categorie: 'AMEUBLEMENT'
    },
    {
      nom: 'Nettoyage de Matelas',
      description: 'Éliminez les allergènes, acariens et bactéries de votre matelas pour un sommeil plus sain et réparateur. Notre traitement en profondeur assainit complètement votre literie.',
      prix: 69.99,
      unite: 'par matelas',
      image: '/images/services/matelas.jpg',
      categorie: 'AMEUBLEMENT'
    },
    {
      nom: 'Nettoyage de Tapis et Moquettes',
      description: 'Retrouvez l\'éclat et la propreté de vos tapis et moquettes grâce à notre procédé d\'extraction en profondeur. Nous traitons tous types de fibres avec des produits adaptés.',
      prix: 12.99,
      unite: 'par m²',
      image: '/images/services/tapis.jpg',
      categorie: 'AMEUBLEMENT'
    },
    {
      nom: 'Nettoyage Intérieur Voiture',
      description: 'Redonnez à l\'intérieur de votre véhicule sa propreté d\'origine. Notre service complet traite sièges, moquettes, plafond et surfaces plastiques.',
      prix: 89.99,
      unite: 'par véhicule',
      image: '/images/services/voiture.jpg',
      categorie: 'AUTOMOBILE'
    },
    {
      nom: 'Nettoyage de Mobilier',
      description: 'Nous prenons soin de tous vos meubles rembourrés avec des techniques adaptées à chaque type de tissu et de matériau.',
      prix: 49.99,
      unite: 'par pièce',
      image: '/images/services/mobilier.jpg',
      categorie: 'AMEUBLEMENT'
    },
    {
      nom: 'Nettoyage de Rideaux et Stores',
      description: 'Nos techniques spécialisées permettent de nettoyer vos rideaux et stores sans les démonter, éliminant poussière, allergènes et taches.',
      prix: 14.99,
      unite: 'par m²',
      image: '/images/services/rideaux.jpg',
      categorie: 'AMEUBLEMENT'
    },
    {
      nom: 'Nettoyage de Bureaux',
      description: 'Service professionnel de nettoyage pour espaces de travail, incluant bureaux, salles de réunion et espaces communs.',
      prix: 19.99,
      unite: 'par m²',
      image: '/images/services/bureau.jpg',
      categorie: 'PROFESSIONNEL'
    },
    {
      nom: 'Nettoyage après Travaux',
      description: 'Remise en état complète après travaux de rénovation ou de construction. Élimination de la poussière, des débris et des résidus.',
      prix: 24.99,
      unite: 'par m²',
      image: '/images/services/travaux.jpg',
      categorie: 'SPECIAL'
    }
  ];

  for (const service of services) {
    await prisma.service.create({
      data: service
    });
  }

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
