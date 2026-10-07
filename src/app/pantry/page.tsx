"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { recipes } from "@/data/recipes";

type PantryMatch = {
  recipe: (typeof recipes)[number];
  matches: number;
  total: number;
  missing: string[];
};

export default function PantryPage() {
  const [pantry, setPantry] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("chopful-pantry");

    if (saved) {
      setPantry(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chopful-pantry", JSON.stringify(pantry));
  }, [pantry]);

  const recipeMatches = useMemo<PantryMatch[]>(() => {
    return recipes
      .map((recipe) => {
        const ingredients = recipe.ingredients.map((item) =>
          item.name.toLowerCase(),
        );

        const matches = ingredients.filter((item) =>
          pantry.some((available) => {
            const value = available.toLowerCase();

            return item.includes(value) || value.includes(item);
          }),
        );

        const missing = recipe.ingredients
          .filter((item) => {
            const value = item.name.toLowerCase();

            return !pantry.some((available) => {
              const availableValue = available.toLowerCase();

              return (
                value.includes(availableValue) || availableValue.includes(value)
              );
            });
          })
          .map((item) => item.name);

        return {
          recipe,
          matches: matches.length,
          total: ingredients.length,
          missing,
        };
      })
      .filter((item) => item.matches > 0)
      .sort((a, b) => {
        const aComplete = a.matches === a.total;
        const bComplete = b.matches === b.total;

        if (aComplete !== bComplete) {
          return Number(bComplete) - Number(aComplete);
        }

        return b.matches / b.total - a.matches / a.total;
      });
  }, [pantry]);

  const readyToCook = recipeMatches.filter(
    (item) => item.matches === item.total,
  );

  const almostThere = recipeMatches.filter((item) => item.matches < item.total);

  function addIngredient() {
    const value = ingredient.trim();

    if (!value) return;

    const exists = pantry.some(
      (item) => item.toLowerCase() === value.toLowerCase(),
    );

    if (exists) {
      setIngredient("");
      return;
    }

    setPantry((current) => [...current, value]);
    setIngredient("");
  }

  function removeIngredient(item: string) {
    setPantry((current) => current.filter((value) => value !== item));
  }

  function clearPantry() {
    setPantry([]);
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

            <Link href="/pantry" className="font-medium">
              Pantry
            </Link>

            <Link
              href="/shopping"
              className="transition-opacity hover:opacity-60"
            >
              Shopping
            </Link>
          </nav>

          <Link
            href="/planner"
            className="bg-[#1C241E] px-5 py-2.5 text-sm font-medium text-white"
          >
            Plan a meal
          </Link>
        </div>
      </header>

      <section className="border-b border-[#1C241E]/10">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B65C32]">
            Your pantry
          </p>

          <h1 className="mt-4 max-w-3xl text-5xl font-medium leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Cook with what you have.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#465149]">
            Tell Chopful what&apos;s already in your kitchen. We&apos;ll show
            you what you can make now and what&apos;s only a few ingredients
            away.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[340px_1fr]">
          <aside className="self-start border border-[#1C241E]/10 bg-[#F1EDE4]">
            <div className="border-b border-[#1C241E]/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B65C32]">
                Ingredients
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em]">
                What do you have?
              </h2>
            </div>

            <div className="p-6">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  addIngredient();
                }}
                className="flex gap-2"
              >
                <input
                  value={ingredient}
                  onChange={(event) => setIngredient(event.target.value)}
                  placeholder="e.g. rice"
                  className="min-w-0 flex-1 border border-[#1C241E]/15 bg-[#F6F3EC] px-3 py-3 text-sm outline-none placeholder:text-[#8A918B] focus:border-[#1C241E]/40"
                />

                <button
                  type="submit"
                  className="bg-[#1C241E] px-4 text-sm font-medium text-white"
                >
                  Add
                </button>
              </form>

              {pantry.length > 0 ? (
                <div className="mt-6">
                  <div className="flex flex-wrap gap-2">
                    {pantry.map((item) => (
                      <button
                        key={item}
                        onClick={() => removeIngredient(item)}
                        className="border border-[#1C241E]/15 px-3 py-2 text-xs transition-colors hover:border-[#B65C32] hover:text-[#B65C32]"
                      >
                        {item} ×
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={clearPantry}
                    className="mt-6 border-b border-[#1C241E] pb-1 text-xs font-medium"
                  >
                    Clear pantry
                  </button>
                </div>
              ) : (
                <p className="mt-6 text-sm leading-6 text-[#667068]">
                  Add a few ingredients to discover what you can cook.
                </p>
              )}
            </div>
          </aside>

          <div>
            {pantry.length > 0 ? (
              <>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="border border-[#1C241E]/10 bg-[#EEEAE1] p-5">
                    <p className="text-3xl font-semibold tracking-[-0.05em]">
                      {pantry.length}
                    </p>

                    <p className="mt-2 text-xs uppercase tracking-[0.1em] text-[#667068]">
                      Ingredients
                    </p>
                  </div>

                  <div className="border border-[#1C241E]/10 bg-[#EEEAE1] p-5">
                    <p className="text-3xl font-semibold tracking-[-0.05em]">
                      {readyToCook.length}
                    </p>

                    <p className="mt-2 text-xs uppercase tracking-[0.1em] text-[#667068]">
                      Ready to cook
                    </p>
                  </div>

                  <div className="border border-[#1C241E]/10 bg-[#EEEAE1] p-5">
                    <p className="text-3xl font-semibold tracking-[-0.05em]">
                      {almostThere.length}
                    </p>

                    <p className="mt-2 text-xs uppercase tracking-[0.1em] text-[#667068]">
                      Almost there
                    </p>
                  </div>
                </div>

                {readyToCook.length > 0 && (
                  <RecipeSection
                    title="You can cook this now"
                    eyebrow="Ready to cook"
                    recipes={readyToCook}
                  />
                )}

                {almostThere.length > 0 && (
                  <RecipeSection
                    title="You're almost there"
                    eyebrow="A few ingredients away"
                    recipes={almostThere}
                  />
                )}

                {recipeMatches.length === 0 && (
                  <div className="border-y border-[#1C241E]/10 py-20 text-center">
                    <p className="text-3xl font-medium tracking-[-0.04em]">
                      Nothing matches yet.
                    </p>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#667068]">
                      Try adding common ingredients like rice, beans, pepper,
                      tomatoes, plantain or yam.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="border-y border-[#1C241E]/10 py-24 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B65C32]">
                  Start with your kitchen
                </p>

                <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em]">
                  What&apos;s in your pantry?
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#667068]">
                  Add ingredients on the left and Chopful will find recipes that
                  match what you already have.
                </p>
              </div>
            )}
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

function RecipeSection({
  eyebrow,
  title,
  recipes: matchedRecipes,
}: {
  eyebrow: string;
  title: string;
  recipes: PantryMatch[];
}) {
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between border-b border-[#1C241E]/10 pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B65C32]">
            {eyebrow}
          </p>

          <h2 className="mt-2 text-3xl font-medium tracking-[-0.04em]">
            {title}
          </h2>
        </div>

        <p className="text-sm text-[#667068]">{matchedRecipes.length}</p>
      </div>

      <div className="divide-y divide-[#1C241E]/10">
        {matchedRecipes.map(({ recipe, matches, total, missing }) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.slug}`}
            className="group grid gap-5 py-7 sm:grid-cols-[180px_1fr_auto] sm:items-center"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#DED8CA]">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#B65C32]">
                <span>{recipe.culture.join(" / ")}</span>
                <span className="text-[#1C241E]/30">·</span>
                <span>{recipe.region}</span>
              </div>

              <h3 className="mt-2 text-2xl font-medium tracking-[-0.04em]">
                {recipe.name}
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#465149]">
                {recipe.description}
              </p>

              {missing.length > 0 && (
                <p className="mt-3 text-xs text-[#667068]">
                  Missing:{" "}
                  <span className="font-medium text-[#1C241E]">
                    {missing.join(", ")}
                  </span>
                </p>
              )}
            </div>

            <div className="text-sm sm:text-right">
              <p className="font-medium">
                {matches} / {total}
              </p>

              <p className="mt-1 text-xs text-[#667068]">
                ingredients available
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
