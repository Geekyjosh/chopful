"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { recipes } from "@/data/recipes";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const mealTypes = ["Breakfast", "Lunch", "Dinner"];

type Plan = {
  [key: string]: {
    [key: string]: string;
  };
};

export default function PlannerPage() {
  const [plan, setPlan] = useState<Plan>({});
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedMeal, setSelectedMeal] = useState("Dinner");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedPlan = localStorage.getItem("chopful-plan");

    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chopful-plan", JSON.stringify(plan));
  }, [plan]);

  const plannedCount = useMemo(() => {
    return Object.values(plan).reduce(
      (total, meals) => total + Object.keys(meals).length,
      0,
    );
  }, [plan]);

  const uniqueRecipeCount = useMemo(() => {
    const ids = new Set<string>();

    Object.values(plan).forEach((meals) => {
      Object.values(meals).forEach((recipeId) => ids.add(recipeId));
    });

    return ids.size;
  }, [plan]);

  const estimatedCost = useMemo(() => {
    const ids = new Set<string>();

    Object.values(plan).forEach((meals) => {
      Object.values(meals).forEach((recipeId) => ids.add(recipeId));
    });

    return [...ids].reduce((total, recipeId) => {
      const recipe = getRecipe(recipeId);
      return total + (recipe?.estimatedCost ?? 0);
    }, 0);
  }, [plan]);

  const filteredRecipes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return recipes;
    }

    return recipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(query) ||
        recipe.cuisine.toLowerCase().includes(query) ||
        recipe.region.toLowerCase().includes(query) ||
        recipe.culture.some((culture) => culture.toLowerCase().includes(query))
      );
    });
  }, [search]);

  function getRecipe(recipeId?: string) {
    return recipes.find((recipe) => recipe.id === recipeId);
  }

  function addRecipe(recipeId: string) {
    setPlan((current) => ({
      ...current,
      [selectedDay]: {
        ...current[selectedDay],
        [selectedMeal]: recipeId,
      },
    }));
  }

  function removeRecipe(day: string, meal: string) {
    setPlan((current) => {
      const updated = { ...current };
      const dayPlan = { ...updated[day] };

      delete dayPlan[meal];

      if (Object.keys(dayPlan).length === 0) {
        delete updated[day];
      } else {
        updated[day] = dayPlan;
      }

      return updated;
    });
  }

  function clearWeek() {
    setPlan({});
  }

  function selectSlot(day: string, meal: string) {
    setSelectedDay(day);
    setSelectedMeal(meal);
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

            <Link href="/planner" className="font-medium">
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
            href="/shopping"
            className="bg-[#1C241E] px-5 py-2.5 text-sm font-medium text-white"
          >
            Shopping list
          </Link>
        </div>
      </header>

      <section className="border-b border-[#1C241E]/10">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B65C32]">
                Weekly planner
              </p>

              <h1 className="mt-4 text-5xl font-medium leading-[0.95] tracking-[-0.06em] md:text-6xl">
                Plan your week.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#465149]">
                Decide what you&apos;re eating before the week gets busy. Build
                your meals, then turn the plan into a shopping list.
              </p>
            </div>

            <div className="flex gap-8 border-t border-[#1C241E]/10 pt-5 md:border-t-0 md:pt-0">
              <div>
                <p className="text-2xl font-semibold tracking-[-0.04em]">
                  {plannedCount}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[#667068]">
                  Meals
                </p>
              </div>

              <div>
                <p className="text-2xl font-semibold tracking-[-0.04em]">
                  {uniqueRecipeCount}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[#667068]">
                  Recipes
                </p>
              </div>

              <div>
                <p className="text-2xl font-semibold tracking-[-0.04em]">
                  ₦{estimatedCost.toLocaleString()}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[#667068]">
                  Est. cost
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="mb-8 flex flex-col gap-4 border-b border-[#1C241E]/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">Your weekly meals</p>

            <p className="mt-1 text-sm text-[#667068]">
              Select any empty slot to start planning.
            </p>
          </div>

          {plannedCount > 0 && (
            <button
              onClick={clearWeek}
              className="self-start text-sm font-semibold underline underline-offset-4"
            >
              Clear week
            </button>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="overflow-x-auto border-y border-[#1C241E]/10">
              <div className="min-w-[820px]">
                <div className="grid grid-cols-[125px_repeat(7,1fr)] border-b border-[#1C241E]/10">
                  <div className="px-3 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#667068]">
                    Meal
                  </div>

                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`border-l border-[#1C241E]/10 px-3 py-4 text-left transition-colors ${
                        selectedDay === day
                          ? "bg-[#E9E3D8]"
                          : "hover:bg-[#F1EDE4]"
                      }`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.1em]">
                        {day.slice(0, 3)}
                      </p>

                      <p
                        className={`mt-1 text-[11px] ${
                          selectedDay === day
                            ? "font-semibold text-[#B65C32]"
                            : "text-[#667068]"
                        }`}
                      >
                        {selectedDay === day ? "Selected" : "Plan meals"}
                      </p>
                    </button>
                  ))}
                </div>

                {mealTypes.map((meal) => (
                  <div
                    key={meal}
                    className="grid grid-cols-[125px_repeat(7,1fr)] border-b border-[#1C241E]/10 last:border-b-0"
                  >
                    <button
                      onClick={() => setSelectedMeal(meal)}
                      className={`px-3 py-5 text-left text-sm transition-colors ${
                        selectedMeal === meal
                          ? "bg-[#E9E3D8] font-semibold"
                          : "text-[#465149]"
                      }`}
                    >
                      {meal}
                    </button>

                    {days.map((day) => {
                      const recipe = getRecipe(plan[day]?.[meal]);
                      const isSelected =
                        selectedDay === day && selectedMeal === meal;

                      return (
                        <div
                          key={`${day}-${meal}`}
                          className="border-l border-[#1C241E]/10 p-2"
                        >
                          {recipe ? (
                            <div
                              className={`group relative min-h-[120px] overflow-hidden ${
                                isSelected
                                  ? "ring-2 ring-[#B65C32] ring-offset-2 ring-offset-[#F6F3EC]"
                                  : ""
                              }`}
                            >
                              <Link
                                href={`/recipes/${recipe.slug}`}
                                className="absolute inset-0"
                              >
                                <img
                                  src={recipe.image}
                                  alt={recipe.name}
                                  className="h-full w-full object-cover"
                                />

                                <div className="absolute inset-0 bg-[#1C241E]/60" />

                                <div className="relative flex h-full min-h-[120px] flex-col justify-between p-3 text-white">
                                  <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/70">
                                      {recipe.cuisine}
                                    </p>

                                    <p className="mt-1 text-xs font-medium leading-4">
                                      {recipe.name}
                                    </p>
                                  </div>

                                  <p className="text-[10px] text-white/70">
                                    View recipe →
                                  </p>
                                </div>
                              </Link>

                              <button
                                onClick={() => {
                                  selectSlot(day, meal);
                                }}
                                className="absolute right-2 top-2 z-10 bg-white px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#1C241E] opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                Change
                              </button>

                              <button
                                onClick={() => removeRecipe(day, meal)}
                                className="absolute bottom-2 right-2 z-10 bg-[#1C241E] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-white opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => selectSlot(day, meal)}
                              className={`flex min-h-[120px] w-full flex-col items-center justify-center border border-dashed transition-colors ${
                                isSelected
                                  ? "border-[#B65C32] bg-[#E9E3D8] text-[#B65C32]"
                                  : "border-[#1C241E]/20 text-[#667068] hover:border-[#B65C32] hover:text-[#B65C32]"
                              }`}
                            >
                              <span className="text-xl">+</span>
                              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em]">
                                Add meal
                              </span>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 border border-[#1C241E]/10 bg-[#EEEAE1] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold">
                  {plannedCount === 0
                    ? "Your week is empty."
                    : `${plannedCount} ${plannedCount === 1 ? "meal" : "meals"} planned.`}
                </p>

                <p className="mt-1 text-xs leading-5 text-[#667068]">
                  Add meals as you go. Your plan is saved automatically on this
                  device.
                </p>
              </div>

              <Link
                href="/shopping"
                className="shrink-0 border border-[#1C241E] px-5 py-3 text-sm font-semibold transition-colors hover:bg-[#1C241E] hover:text-white"
              >
                View shopping list →
              </Link>
            </div>
          </div>

          <aside className="border border-[#1C241E]/10 bg-[#F1EDE4]">
            <div className="border-b border-[#1C241E]/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B65C32]">
                Add a meal
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em]">
                {selectedDay} · {selectedMeal}
              </h2>

              <div className="mt-5">
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search recipes..."
                  className="w-full border border-[#1C241E]/15 bg-[#F6F3EC] px-4 py-3 text-sm outline-none placeholder:text-[#667068] focus:border-[#B65C32]"
                />
              </div>
            </div>

            <div className="max-h-[620px] overflow-y-auto">
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                  <button
                    key={recipe.id}
                    onClick={() => addRecipe(recipe.id)}
                    className="flex w-full gap-4 border-b border-[#1C241E]/10 p-4 text-left transition-colors hover:bg-[#E9E3D8]"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="h-16 w-20 shrink-0 object-cover"
                    />

                    <div className="min-w-0">
                      <p className="text-sm font-medium">{recipe.name}</p>

                      <p className="mt-1 text-xs leading-5 text-[#667068]">
                        {recipe.culture.join(" / ")}
                      </p>

                      <div className="mt-1 flex gap-3 text-xs text-[#667068]">
                        <span>{recipe.prepTime + recipe.cookTime} min</span>

                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-sm font-semibold">No recipes found.</p>

                  <button
                    onClick={() => setSearch("")}
                    className="mt-3 text-xs font-semibold underline underline-offset-4"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
