import Link from "next/link";
import { notFound } from "next/navigation";
import { recipes } from "@/data/recipes";

type RecipePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;

  const recipe = recipes.find((item) => item.slug === slug);

  if (!recipe) {
    notFound();
  }

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

            <Link
              href="/planner"
              className="transition-opacity hover:opacity-60"
            >
              Planner
            </Link>
          </nav>

          <button className="bg-[#1C241E] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5">
            Get started
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-12">
        <Link
          href="/recipes"
          className="text-sm text-[#465149] transition-opacity hover:opacity-60"
        >
          ← All recipes
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#B65C32]">
              <span>{recipe.culture.join(" / ")}</span>
              <span className="text-[#1C241E]/30">·</span>
              <span>{recipe.region}</span>
            </div>

            <h1 className="mt-5 text-5xl font-medium leading-[0.95] tracking-[-0.06em] md:text-7xl">
              {recipe.name}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#465149]">
              {recipe.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-y border-[#1C241E]/10 py-5">
              <RecipeStat label="Prep" value={`${recipe.prepTime} min`} />
              <RecipeStat label="Cook" value={`${recipe.cookTime} min`} />
              <RecipeStat label="Serves" value={`${recipe.servings}`} />
              <RecipeStat label="Difficulty" value={recipe.difficulty} />
              <RecipeStat
                label="Est. cost"
                value={`₦${recipe.estimatedCost.toLocaleString()}`}
              />
            </div>
          </div>

          <div className="aspect-[4/3] overflow-hidden bg-[#DED8CA]">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[#1C241E]/10">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[0.7fr_1.3fr]">
          <div className="border-b border-[#1C241E]/10 px-6 py-12 lg:border-b-0 lg:border-r lg:px-10 lg:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B65C32]">
              Ingredients
            </p>

            <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em]">
              What you need
            </h2>

            <div className="mt-8">
              {recipe.ingredients.map((ingredient) => (
                <div
                  key={ingredient.name}
                  className="flex items-center justify-between gap-6 border-t border-[#1C241E]/10 py-4"
                >
                  <span className="text-sm">{ingredient.name}</span>

                  <span className="text-sm text-[#465149]">
                    {ingredient.amount}
                    {ingredient.unit ? ` ${ingredient.unit}` : ""}
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full border border-[#1C241E] px-5 py-3 text-sm font-medium transition-colors hover:bg-[#1C241E] hover:text-white">
              Add to shopping list
            </button>
          </div>

          <div className="px-6 py-12 lg:px-16 lg:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B65C32]">
              Method
            </p>

            <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em]">
              How to make it
            </h2>

            <div className="mt-10">
              {recipe.instructions.map((instruction, index) => (
                <div
                  key={instruction}
                  className="grid grid-cols-[40px_1fr] gap-5 border-t border-[#1C241E]/10 py-6"
                >
                  <span className="text-sm font-semibold text-[#B65C32]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="max-w-2xl text-base leading-7 text-[#465149]">
                    {instruction}
                  </p>
                </div>
              ))}
            </div>

            <button className="mt-8 bg-[#1C241E] px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5">
              Add to meal plan
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col gap-5 border-t border-[#1C241E]/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B65C32]">
              Keep exploring
            </p>

            <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em]">
              More recipes
            </h2>
          </div>

          <Link
            href="/recipes"
            className="text-sm font-medium underline underline-offset-4"
          >
            View all recipes
          </Link>
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

function RecipeStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#667068]">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
