"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { recipes } from "@/data/recipes";

const regions = ["All", ...new Set(recipes.map((recipe) => recipe.region))];

const cultures = [
  "All",
  ...new Set(recipes.flatMap((recipe) => recipe.culture)),
];

const categories = [
  "All",
  ...new Set(recipes.map((recipe) => recipe.category)),
];

const mealTypes = [
  "All",
  ...new Set(recipes.flatMap((recipe) => recipe.mealType)),
];

const ingredients = [
  "All",
  "Rice",
  "Beans",
  "Plantain",
  "Yam",
  "Pepper",
  "Tomatoes",
  "Palm oil",
  "Chicken",
];

export default function RecipesPage() {
  const [region, setRegion] = useState("All");
  const [culture, setCulture] = useState("All");
  const [category, setCategory] = useState("All");
  const [mealType, setMealType] = useState("All");
  const [ingredient, setIngredient] = useState("All");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setRegion(params.get("region") ?? "All");
    setCulture(params.get("culture") ?? "All");
    setCategory(params.get("category") ?? "All");
    setMealType(params.get("meal") ?? "All");
    setIngredient(params.get("ingredient") ?? "All");
  }, []);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesRegion = region === "All" || recipe.region === region;

      const matchesCulture =
        culture === "All" || recipe.culture.includes(culture);

      const matchesCategory =
        category === "All" || recipe.category === category;

      const matchesMealType =
        mealType === "All" || recipe.mealType.includes(mealType);

      const matchesIngredient =
        ingredient === "All" ||
        recipe.ingredients.some((item) =>
          item.name.toLowerCase().includes(ingredient.toLowerCase()),
        );

      return (
        matchesRegion &&
        matchesCulture &&
        matchesCategory &&
        matchesMealType &&
        matchesIngredient
      );
    });
  }, [region, culture, category, mealType, ingredient]);

  function updateFilter(
    key: string,
    value: string,
    setter: (value: string) => void,
  ) {
    setter(value);

    const params = new URLSearchParams(window.location.search);

    if (value === "All") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();

    window.history.replaceState(
      null,
      "",
      query ? `/recipes?${query}` : "/recipes",
    );
  }

  function clearFilters() {
    setRegion("All");
    setCulture("All");
    setCategory("All");
    setMealType("All");
    setIngredient("All");

    window.history.replaceState(null, "", "/recipes");
  }

  const activeFilters = [
    region !== "All" ? region : null,
    culture !== "All" ? culture : null,
    category !== "All" ? category : null,
    mealType !== "All" ? mealType : null,
    ingredient !== "All" ? ingredient : null,
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-[#F6F3EC] text-[#1C241E]">
      <header className="border-b border-[#1C241E]/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="text-2xl font-black tracking-[-0.06em]">
            chop<span className="text-[#D95D39]">ful</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link
              href="/planner"
              className="transition-opacity hover:opacity-60"
            >
              Planner
            </Link>

            <Link
              href="/recipes"
              className="transition-opacity hover:opacity-60"
            >
              Recipes
            </Link>

            <Link
              href="/explore"
              className="transition-opacity hover:opacity-60"
            >
              Explore
            </Link>

            <Link
              href="/pantry"
              className="transition-opacity hover:opacity-60"
            >
              Pantry
            </Link>
          </nav>

          <Link
            href="/planner"
            className="border border-[#1C241E] px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#1C241E] hover:text-[#F6F3EC]"
          >
            Plan your week
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-14 pt-20 lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#D95D39]">
            Chopful recipes
          </p>

          <h1 className="text-5xl font-black tracking-[-0.055em] md:text-7xl">
            Food worth making.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#1C241E]/65">
            Discover Nigerian recipes, everyday favourites and dishes rooted in
            different food traditions.
          </p>
        </div>
      </section>

      <section className="border-y border-[#1C241E]/10 bg-[#EEEAE1]">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
          <div className="flex gap-3 overflow-x-auto pb-1">
            <FilterGroup
              label="Region"
              value={region}
              options={regions}
              onChange={(value) => updateFilter("region", value, setRegion)}
            />

            <FilterGroup
              label="Culture"
              value={culture}
              options={cultures}
              onChange={(value) => updateFilter("culture", value, setCulture)}
            />

            <FilterGroup
              label="Category"
              value={category}
              options={categories}
              onChange={(value) => updateFilter("category", value, setCategory)}
            />

            <FilterGroup
              label="Meal"
              value={mealType}
              options={mealTypes}
              onChange={(value) => updateFilter("meal", value, setMealType)}
            />

            <FilterGroup
              label="Ingredient"
              value={ingredient}
              options={ingredients}
              onChange={(value) =>
                updateFilter("ingredient", value, setIngredient)
              }
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="mb-10 flex flex-col gap-5 border-b border-[#1C241E]/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold">
              {filteredRecipes.length}{" "}
              {filteredRecipes.length === 1 ? "recipe" : "recipes"}
            </p>

            {activeFilters.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <span
                    key={filter}
                    className="border border-[#1C241E]/15 bg-white px-3 py-1.5 text-xs font-semibold"
                  >
                    {filter}
                  </span>
                ))}
              </div>
            )}
          </div>

          {activeFilters.length > 0 && (
            <button
              onClick={clearFilters}
              className="self-start text-sm font-semibold underline underline-offset-4 md:self-auto"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.slug}`}
                className="group"
              >
                <article>
                  <div className="aspect-[4/3] overflow-hidden bg-[#E5E0D6]">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="pt-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
                      <span className="text-[#D95D39]">{recipe.cuisine}</span>

                      <span className="text-[#1C241E]/25">/</span>

                      <span className="text-[#1C241E]/50">{recipe.region}</span>
                    </div>

                    <h2 className="mt-3 text-2xl font-bold tracking-[-0.035em]">
                      {recipe.name}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#1C241E]/60">
                      {recipe.description}
                    </p>

                    <div className="mt-5 flex gap-5 text-xs font-semibold uppercase tracking-[0.08em] text-[#1C241E]/45">
                      <span>{recipe.cookTime} min</span>
                      <span>{recipe.difficulty}</span>
                      <span>{recipe.servings} servings</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border-y border-[#1C241E]/10 py-24 text-center">
            <p className="text-3xl font-bold tracking-[-0.04em]">
              Nothing here yet.
            </p>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#1C241E]/60">
              Try another combination or browse the full collection.
            </p>

            <button
              onClick={clearFilters}
              className="mt-7 border border-[#1C241E] px-5 py-3 text-sm font-semibold transition-colors hover:bg-[#1C241E] hover:text-[#F6F3EC]"
            >
              Browse everything
            </button>
          </div>
        )}
      </section>

      <footer className="border-t border-[#1C241E]/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-[#1C241E]/55 md:flex-row md:items-center md:justify-between lg:px-10">
          <Link
            href="/"
            className="text-lg font-black tracking-[-0.05em] text-[#1C241E]"
          >
            chop<span className="text-[#D95D39]">ful</span>
          </Link>

          <p>Discover food. Plan your week. Eat well.</p>
        </div>
      </footer>
    </main>
  );
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex shrink-0 items-center border border-[#1C241E]/10 bg-[#F6F3EC]">
      <span className="border-r border-[#1C241E]/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#1C241E]/45">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-[120px] bg-transparent px-4 py-3 text-sm font-semibold outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
