import fs from "node:fs";
import path from "node:path";
import { MongoClient } from "mongodb";

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...values] = trimmed.split("=");
      if (key && !process.env[key.trim()]) {
        process.env[key.trim()] = values.join("=").trim();
      }
    }
  }
}

loadEnv();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set in .env.local");
  process.exit(1);
}

const sampleProducts = [
  { name: "Filter of the day", description: "Ethiopian single origin, washed, notes of citrus and jasmine", price: 120, category: "Coffee", imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80", isSpecial: false },
  { name: "Cortado", description: "Double espresso cut with equal parts silky steamed milk", price: 140, category: "Coffee", imageUrl: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80", isSpecial: true },
  { name: "Cold brew", description: "Steeped slowly for 18 hours, served cold over clear ice", price: 160, category: "Coffee", imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80", isSpecial: false },
  { name: "Flat white", description: "Ristretto double shot topped with velvety textured microfoam", price: 150, category: "Coffee", imageUrl: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=400&q=80", isSpecial: false },
  { name: "Masala chai", description: "Assam whole leaf, crushed cardamom, fresh ginger and warm milk", price: 90, category: "Tea", imageUrl: "https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=400&q=80", isSpecial: false },
  { name: "First flush Darjeeling", description: "Spring harvest loose leaf tea with delicate floral muscatel notes", price: 130, category: "Tea", imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80", isSpecial: true },
  { name: "Kashmiri kahwa", description: "Green tea brewed with saffron strands, crushed almonds and cinnamon", price: 150, category: "Tea", imageUrl: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=400&q=80", isSpecial: false },
  { name: "Sourdough cardamom bun", description: "Twisted Swedish-style bun with freshly ground green cardamom", price: 110, category: "Pastries", imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80", isSpecial: true },
  { name: "Butter croissant", description: "Flaky layered pastry made with cultured French butter", price: 130, category: "Pastries", imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80", isSpecial: false },
  { name: "Almond frangipane tart", description: "Crisp pastry shell filled with rich almond cream and toasted flakes", price: 160, category: "Pastries", imageUrl: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=400&q=80", isSpecial: false },
  { name: "Whipped ricotta & fig toast", description: "Thick sourdough, house-whipped ricotta, fresh figs and wild honey", price: 220, category: "Food", imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80", isSpecial: true },
  { name: "Mushroom melt", description: "Sautéed wild mushrooms, aged cheddar and fresh thyme on sourdough", price: 240, category: "Food", imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80", isSpecial: false },
].map((item) => ({ ...item, createdAt: new Date() }));

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("cafe");
    const collection = db.collection("products");
    await collection.deleteMany({});
    const result = await collection.insertMany(sampleProducts);
    console.log(`Successfully seeded ${result.insertedCount} menu items with images.`);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
