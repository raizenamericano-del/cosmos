/**
 * ============================================================
 * COSMOS ACADEMY — SEED SCRIPT
 * Jalankan: npm run db:seed   (atau: npx prisma db seed)
 * Idempoten: aman dijalankan berulang kali (memakai upsert).
 * ============================================================
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { ARTICLES } from '../src/lib/data/articles';
import { ALIEN_SPECIES } from '../src/lib/data/species';
import { FICTIONAL_PLANETS } from '../src/lib/data/worlds';
import { QUIZ_QUESTIONS } from '../src/lib/data/quiz';
import { SIGNALS } from '../src/lib/data/signals';

const prisma = new PrismaClient();

async function seedArticles() {
  for (const article of ARTICLES) {
    await prisma.article.upsert({
      where: { id: article.id },
      update: {
        title: article.title,
        slug: article.slug,
        category: article.category,
        type: article.type,
        summary: article.summary,
        content: article.content,
        funFacts: article.funFacts,
        imageUrl: article.imageUrl,
        readTime: article.readTime
      },
      create: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        category: article.category,
        type: article.type,
        summary: article.summary,
        content: article.content,
        funFacts: article.funFacts,
        imageUrl: article.imageUrl,
        readTime: article.readTime,
        createdAt: new Date(article.createdAt)
      }
    });
  }
  console.log(`   📚 ${ARTICLES.length} artikel (${ARTICLES.filter((a) => a.type === 'fact').length} fakta, ${ARTICLES.filter((a) => a.type === 'fiction').length} fiksi)`);
}

async function seedSpecies() {
  for (const species of ALIEN_SPECIES) {
    await prisma.alienSpecies.upsert({
      where: { id: species.id },
      update: {
        name: species.name,
        slug: species.slug,
        homePlanet: species.homePlanet,
        homePlanetSlug: species.homePlanetSlug,
        kardashevLevel: species.kardashevLevel,
        status: species.status,
        abilities: species.abilities,
        lore: species.lore,
        appearance: species.appearance,
        avatarUrl: species.avatarUrl,
        accentColor: species.accentColor
      },
      create: {
        id: species.id,
        name: species.name,
        slug: species.slug,
        homePlanet: species.homePlanet,
        homePlanetSlug: species.homePlanetSlug,
        kardashevLevel: species.kardashevLevel,
        status: species.status,
        abilities: species.abilities,
        lore: species.lore,
        appearance: species.appearance,
        avatarUrl: species.avatarUrl,
        accentColor: species.accentColor
      }
    });
  }
  console.log(`   👽 ${ALIEN_SPECIES.length} spesies alien`);
}

async function seedPlanets() {
  for (const planet of FICTIONAL_PLANETS) {
    await prisma.fictionalPlanet.upsert({
      where: { id: planet.id },
      update: {
        name: planet.name,
        slug: planet.slug,
        tagline: planet.tagline,
        description: planet.description,
        atmosphere: planet.atmosphere,
        inhabitants: planet.inhabitants,
        resources: planet.resources,
        dangerLevel: planet.dangerLevel,
        beautyScore: planet.beautyScore,
        themeColor: planet.themeColor,
        gradientFrom: planet.gradientFrom,
        gradientTo: planet.gradientTo
      },
      create: {
        id: planet.id,
        name: planet.name,
        slug: planet.slug,
        tagline: planet.tagline,
        description: planet.description,
        atmosphere: planet.atmosphere,
        inhabitants: planet.inhabitants,
        resources: planet.resources,
        dangerLevel: planet.dangerLevel,
        beautyScore: planet.beautyScore,
        themeColor: planet.themeColor,
        gradientFrom: planet.gradientFrom,
        gradientTo: planet.gradientTo
      }
    });
  }
  console.log(`   🪐 ${FICTIONAL_PLANETS.length} planet fiksi`);
}

async function seedQuiz() {
  for (const question of QUIZ_QUESTIONS) {
    await prisma.quizQuestion.upsert({
      where: { id: question.id },
      update: {
        category: question.category,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        difficulty: question.difficulty,
        order: question.order
      },
      create: {
        id: question.id,
        category: question.category,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        difficulty: question.difficulty,
        order: question.order
      }
    });
  }
  console.log(`   ❓ ${QUIZ_QUESTIONS.length} pertanyaan kuis`);
}

async function seedSignals() {
  for (const signal of SIGNALS) {
    await prisma.signal.upsert({
      where: { id: signal.id },
      update: {
        title: signal.title,
        difficulty: signal.difficulty,
        encodedMessage: signal.encodedMessage,
        decodedMessage: signal.decodedMessage,
        hint: signal.hint,
        cipher: signal.cipher,
        sender: signal.sender,
        rewardBadge: signal.rewardBadge,
        order: signal.order
      },
      create: {
        id: signal.id,
        title: signal.title,
        difficulty: signal.difficulty,
        encodedMessage: signal.encodedMessage,
        decodedMessage: signal.decodedMessage,
        hint: signal.hint,
        cipher: signal.cipher,
        sender: signal.sender,
        rewardBadge: signal.rewardBadge,
        order: signal.order
      }
    });
  }
  console.log(`   📡 ${SIGNALS.length} sinyal misterius`);
}

async function seedDemoUsers() {
  const password = await bcrypt.hash('cosmos123', 10);

  const cadet = await prisma.user.upsert({
    where: { email: 'cadet@cosmos.academy' },
    update: {},
    create: {
      email: 'cadet@cosmos.academy',
      name: 'Crew Cadet',
      passwordHash: password,
      role: 'cadet'
    }
  });

  const captain = await prisma.user.upsert({
    where: { email: 'captain@cosmos.academy' },
    update: {},
    create: {
      email: 'captain@cosmos.academy',
      name: 'Kapten Alya Wijaya',
      passwordHash: password,
      role: 'captain'
    }
  });

  // Contoh hasil kuis agar leaderboard tidak kosong
  const existingResults = await prisma.quizResult.count();
  if (existingResults === 0) {
    await prisma.quizResult.createMany({
      data: [
        { userId: captain.id, category: 'Black Hole & Kosmologi', score: 7, total: 7 },
        { userId: captain.id, category: 'Tata Surya', score: 7, total: 8 },
        { userId: cadet.id, category: 'Tata Surya', score: 6, total: 8 },
        { userId: cadet.id, category: 'Eksoplanet', score: 5, total: 7 }
      ]
    });
  }

  // Contoh achievement
  await prisma.achievement.upsert({
    where: { userId_badgeName: { userId: captain.id, badgeName: 'Quiz Champion' } },
    update: {},
    create: {
      userId: captain.id,
      badgeName: 'Quiz Champion',
      description: 'Skor sempurna pada kategori Black Hole & Kosmologi.'
    }
  });

  console.log('   👤 2 pengguna demo (password: cosmos123)');
}

async function main() {
  console.log('\n🚀 Cosmos Academy — seeding database...\n');
  await seedArticles();
  await seedSpecies();
  await seedPlanets();
  await seedQuiz();
  await seedSignals();
  await seedDemoUsers();
  console.log('\n✅ Seed selesai. Selamat menjelajah, Kapten!\n');
}

main()
  .catch((error) => {
    console.error('\n❌ Seed gagal:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
