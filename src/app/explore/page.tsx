import Link from "next/link";
import { recipes } from "@/data/recipes";

const regions = [
  {
    name: "South West",
    description: "Bold soups, swallows, rice dishes and everyday classics.",
    href: "/recipes?region=South%20West",
  },
  {
    name: "South East",
    description: "Hearty soups, traditional dishes and rich local flavours.",
    href: "/recipes?region=South%20East",
  },
  {
    name: "South South",
    description: "Vegetable-rich soups, seafood and dishes from the coast.",
    href: "/recipes?region=South%20South",
  },
  {
    name: "North",
    description: "Grains, hearty stews, masa, tuwo and northern classics.",
    href: "/recipes?region=North",
  },
  {
    name: "North Central",
    description:
      "A meeting point of flavours, grains and diverse food traditions.",
    href: "/recipes?region=North%20Central",
  },
];

const cultures = [
  "Yoruba",
  "Igbo",
  "Hausa",
  "Edo",
  "Efik",
  "Ibibio",
  "Ijaw",
  "Urhobo",
];

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snacks"];

const categories = ["Classic", "Traditional", "Soup"];

const ingredients = [
  "Rice",
  "Beans",
  "Plantain",
  "Yam",
  "Pepper",
  "Tomatoes",
  "Palm oil",
  "Chicken",
];

function countCulture(culture: string) {
  return recipes.filter((recipe) => recipe.culture.includes(culture)).length;
}

function countMealType(mealType: string) {
  return recipes.filter((recipe) => recipe.mealType.includes(mealType)).length;
}

function countCategory(category: string) {
  return recipes.filter((recipe) => recipe.category === category).length;
}

function countIngredient(ingredient: string) {
  return recipes.filter((recipe) =>
    recipe.ingredients.some((item) =>
      item.name.toLowerCase().includes(ingredient.toLowerCase()),
    ),
  ).length;
}

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-[#F6F3EC] text-[#1C241E]">
      <header className="border-b border-[#1C241E]/10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="text-2xl font-bold tracking-[-0.06em]">
            chop<span className="text-[#B65C32]">ful</span>
          </Link>

          <nav className="hidden items-center gap-9 text-sm md:flex">
            <Link
              href="/recipes"
              className="transition-opacity hover:opacity-60"
            >
              Recipes
            </Link>

            <Link href="/explore" className="font-medium">
              Explore
            </Link>

            <Link
              href="/planner"
              className="transition-opacity hover:opacity-60"
            >
              Planner
            </Link>

            <Link
              href="/pantry"
              className="transition-opacity hover:opacity-60"
            >
              Pantry
            </Link>
          </nav>

          <Link
            href="/recipes"
            className="bg-[#1C241E] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            Explore recipes
          </Link>
        </div>
      </header>

      <section className="border-b border-[#1C241E]/10">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B65C32]">
                Explore Nigerian food
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.92] tracking-[-0.07em] md:text-7xl">
                There is more to Nigerian food than one list.
              </h1>
            </div>

            <p className="max-w-xl text-lg leading-8 text-[#465149]">
              Discover dishes through the regions, communities, ingredients and
              occasions that shape how people actually eat.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="flex items-end justify-between border-b border-[#1C241E]/10 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B65C32]">
              By region
            </p>

            <h2 className="mt-2 text-3xl font-medium tracking-[-0.05em]">
              Taste your way across Nigeria.
            </h2>
          </div>
        </div>

        <div className="mt-8 grid border-t border-l border-[#1C241E]/10 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((region, index) => (
            <Link
              key={region.name}
              href={region.href}
              className={`group border-r border-b border-[#1C241E]/10 p-7 transition-colors hover:bg-[#EEE9DE] ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#B65C32]">
                  0{index + 1}
                </span>

                <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>

              <h3 className="mt-16 text-3xl font-medium tracking-[-0.05em]">
                {region.name}
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-[#465149]">
                {region.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[#1C241E]/10 bg-[#1C241E] text-[#F6F3EC]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D88A62]">
                By community
              </p>

              <h2 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.05em] md:text-5xl">
                Food carries culture.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#C7CDC8]">
                Explore dishes associated with different Nigerian communities,
                while leaving room for the variations and shared traditions that
                make food culture what it is.
              </p>
            </div>

            <div className="grid grid-cols-2 border-l border-t border-white/15 sm:grid-cols-3 lg:grid-cols-4">
              {cultures.map((culture) => {
                const count = countCulture(culture);

                return (
                  <Link
                    key={culture}
                    href={`/recipes?culture=${encodeURIComponent(culture)}`}
                    className="group border-r border-b border-white/15 p-5 transition-colors hover:bg-white/5"
                  >
                    <span className="text-lg font-medium">{culture}</span>

                    <span className="mt-10 block text-xs text-[#AEB6B0]">
                      {count} {count === 1 ? "recipe" : "recipes"}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B65C32]">
              By meal
            </p>

            <h2 className="mt-3 text-3xl font-medium tracking-[-0.05em]">
              What are you hungry for?
            </h2>

            <div className="mt-8 border-t border-[#1C241E]/10">
              {mealTypes.map((meal) => {
                const count = countMealType(meal);

                return (
                  <Link
                    key={meal}
                    href={`/recipes?meal=${encodeURIComponent(meal)}`}
                    className="flex items-center justify-between border-b border-[#1C241E]/10 py-5 transition-colors hover:text-[#B65C32]"
                  >
                    <span className="text-lg">{meal}</span>

                    <span className="text-sm text-[#667068]">{count}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B65C32]">
              By category
            </p>

            <h2 className="mt-3 text-3xl font-medium tracking-[-0.05em]">
              Find your kind of food.
            </h2>

            <div className="mt-8 border-t border-[#1C241E]/10">
              {categories.map((category) => {
                const count = countCategory(category);

                return (
                  <Link
                    key={category}
                    href={`/recipes?category=${encodeURIComponent(category)}`}
                    className="flex items-center justify-between border-b border-[#1C241E]/10 py-5 transition-colors hover:text-[#B65C32]"
                  >
                    <span className="text-lg">{category}</span>

                    <span className="text-sm text-[#667068]">{count}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#1C241E]/10">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B65C32]">
                By ingredient
              </p>

              <h2 className="mt-3 text-3xl font-medium tracking-[-0.05em]">
                Start with what you love.
              </h2>
            </div>

            <Link
              href="/recipes"
              className="text-sm font-medium underline underline-offset-4"
            >
              See all recipes
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {ingredients.map((ingredient) => {
              const count = countIngredient(ingredient);

              return (
                <Link
                  key={ingredient}
                  href={`/recipes?ingredient=${encodeURIComponent(ingredient)}`}
                  className="border border-[#1C241E]/15 px-5 py-3 text-sm transition-colors hover:border-[#B65C32] hover:text-[#B65C32]"
                >
                  {ingredient}
                  <span className="ml-2 text-[#667068]">{count}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-7 border-t border-[#1C241E]/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B65C32]">
              Ready to cook?
            </p>

            <h2 className="mt-3 max-w-xl text-4xl font-medium leading-tight tracking-[-0.05em]">
              Find something good, then plan the week around it.
            </h2>
          </div>

          <div className="flex gap-3">
            <Link
              href="/recipes"
              className="bg-[#1C241E] px-6 py-3 text-sm font-medium text-white"
            >
              Browse recipes
            </Link>

            <Link
              href="/planner"
              className="border border-[#1C241E] px-6 py-3 text-sm font-medium"
            >
              Open planner
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1C241E]/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="text-xl font-bold tracking-[-0.05em]">
            chop<span className="text-[#B65C32]">ful</span>
          </p>

          <p className="text-[#465149]">
            Discover food. Plan your week. Eat well.
          </p>
        </div>
      </footer>
    </main>
  );
}
