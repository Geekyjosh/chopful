"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { recipes } from "@/data/recipes";

type Plan = {
  [day: string]: {
    [meal: string]: string;
  };
};

type ShoppingItem = {
  name: string;
  amount: number | null;
  unit?: string;
  recipes: string[];
  checked: boolean;
};

function parseAmount(amount: string) {
  const value = amount.trim().toLowerCase();

  const fractions: Record<string, number> = {
    "1/4": 0.25,
    "1/3": 1 / 3,
    "1/2": 0.5,
    "2/3": 2 / 3,
    "3/4": 0.75,
  };

  if (value in fractions) {
    return fractions[value];
  }

  const mixed = value.match(/^(\d+)\s+(\d+)\/(\d+)$/);

  if (mixed) {
    return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]);
  }

  const fraction = value.match(/^(\d+)\/(\d+)$/);

  if (fraction) {
    return Number(fraction[1]) / Number(fraction[2]);
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

function formatAmount(amount: number | null) {
  if (amount === null) {
    return "";
  }

  if (Number.isInteger(amount)) {
    return amount.toString();
  }

  const commonFractions: [number, string][] = [
    [0.25, "1/4"],
    [1 / 3, "1/3"],
    [0.5, "1/2"],
    [2 / 3, "2/3"],
    [0.75, "3/4"],
  ];

  for (const [value, label] of commonFractions) {
    if (Math.abs(amount - value) < 0.01) {
      return label;
    }
  }

  const whole = Math.floor(amount);
  const fraction = amount - whole;

  for (const [value, label] of commonFractions) {
    if (Math.abs(fraction - value) < 0.01) {
      return whole > 0 ? `${whole} ${label}` : label;
    }
  }

  return amount.toFixed(1).replace(".0", "");
}

export default function ShoppingPage() {
  const [plan, setPlan] = useState<Plan>({});
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const hasInitialized = localStorage.getItem("chopful-initialized");

    if (!hasInitialized) {
      localStorage.removeItem("chopful-plan");
      localStorage.removeItem("chopful-shopping-checked");

      localStorage.setItem("chopful-initialized", "true");

      setPlan({});
      setCheckedItems([]);
      setLoaded(true);

      return;
    }

    const savedPlan = localStorage.getItem("chopful-plan");
    const savedChecked = localStorage.getItem("chopful-shopping-checked");

    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }

    if (savedChecked) {
      setCheckedItems(JSON.parse(savedChecked));
    }

    setLoaded(true);
  }, []);

  const shoppingItems = useMemo(() => {
    if (!loaded) {
      return [];
    }

    const items = new Map<string, ShoppingItem>();

    Object.values(plan).forEach((day) => {
      Object.values(day).forEach((recipeId) => {
        const recipe = recipes.find((item) => item.id === recipeId);

        if (!recipe) return;

        recipe.ingredients.forEach((ingredient) => {
          const normalizedName = ingredient.name.trim().toLowerCase();

          const normalizedUnit = (ingredient.unit ?? "").trim().toLowerCase();

          const key = `${normalizedName}-${normalizedUnit}`;

          const parsedAmount = parseAmount(ingredient.amount);
          const existing = items.get(key);

          if (existing) {
            if (parsedAmount !== null && existing.amount !== null) {
              existing.amount += parsedAmount;
            } else {
              existing.amount = null;
            }

            if (!existing.recipes.includes(recipe.name)) {
              existing.recipes.push(recipe.name);
            }
          } else {
            items.set(key, {
              name: ingredient.name,
              amount: parsedAmount,
              unit: ingredient.unit,
              recipes: [recipe.name],
              checked: checkedItems.includes(key),
            });
          }
        });
      });
    });

    return Array.from(items.entries()).map(([key, item]) => ({
      key,
      ...item,
    }));
  }, [plan, checkedItems, loaded]);

  const checkedCount = shoppingItems.filter((item) => item.checked).length;

  const remainingCount = shoppingItems.length - checkedCount;

  const progress =
    shoppingItems.length > 0
      ? Math.round((checkedCount / shoppingItems.length) * 100)
      : 0;

  function toggleItem(key: string) {
    const updated = checkedItems.includes(key)
      ? checkedItems.filter((item) => item !== key)
      : [...checkedItems, key];

    setCheckedItems(updated);

    localStorage.setItem("chopful-shopping-checked", JSON.stringify(updated));
  }

  function clearList() {
    setCheckedItems([]);
    localStorage.removeItem("chopful-shopping-checked");
  }

  function printList() {
    window.print();
  }

  return (
    <main className="min-h-screen bg-[#F6F3EC] text-[#1C241E] print:bg-white">
      <header className="border-b border-[#1C241E]/10 print:hidden">
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

            <Link
              href="/pantry"
              className="transition-opacity hover:opacity-60"
            >
              Pantry
            </Link>

            <Link href="/shopping" className="font-medium">
              Shopping
            </Link>
          </nav>

          <Link
            href="/planner"
            className="bg-[#1C241E] px-5 py-2.5 text-sm font-medium text-white"
          >
            Back to planner
          </Link>
        </div>
      </header>

      <section className="border-b border-[#1C241E]/10">
        <div className="mx-auto max-w-5xl px-6 py-12 lg:px-10 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B65C32]">
            Your shopping list
          </p>

          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-5xl font-medium leading-[0.95] tracking-[-0.06em] md:text-6xl">
                Buy what you need.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#465149]">
                Ingredients from your planned meals, gathered and combined into
                one list.
              </p>
            </div>

            {shoppingItems.length > 0 && (
              <div className="text-sm text-[#465149]">
                <span className="font-medium text-[#1C241E]">
                  {remainingCount}
                </span>{" "}
                {remainingCount === 1 ? "item" : "items"} left
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-10 lg:py-14">
        {shoppingItems.length > 0 ? (
          <>
            <div className="mb-8 border border-[#1C241E]/10 bg-[#EEEAE1] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#667068]">
                    Shopping progress
                  </p>

                  <p className="mt-2 text-lg font-semibold tracking-[-0.03em]">
                    {checkedCount} of {shoppingItems.length} checked
                  </p>
                </div>

                <p className="text-sm text-[#667068]">{progress}% complete</p>
              </div>

              <div className="mt-5 h-2 w-full bg-[#D8D2C7]">
                <div
                  className="h-full bg-[#1C241E] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="border-y border-[#1C241E]/10">
              {shoppingItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => toggleItem(item.key)}
                  className="flex w-full items-center gap-5 border-b border-[#1C241E]/10 px-2 py-5 text-left last:border-b-0"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center border ${
                      item.checked
                        ? "border-[#1C241E] bg-[#1C241E] text-white"
                        : "border-[#1C241E]/30"
                    }`}
                  >
                    {item.checked && "✓"}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-base font-medium ${
                        item.checked ? "text-[#667068] line-through" : ""
                      }`}
                    >
                      {item.name}
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-[#667068]">
                      Used for {item.recipes.join(", ")}
                    </span>
                  </span>

                  <span
                    className={`shrink-0 text-sm font-medium ${
                      item.checked ? "text-[#667068]" : ""
                    }`}
                  >
                    {formatAmount(item.amount)}
                    {item.unit ? ` ${item.unit}` : ""}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-[#1C241E]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#667068]">
                {shoppingItems.length}{" "}
                {shoppingItems.length === 1 ? "ingredient" : "ingredients"} from
                your planned meals.
              </p>

              <div className="flex gap-5">
                <button
                  onClick={printList}
                  className="text-sm font-medium underline underline-offset-4"
                >
                  Print list
                </button>

                <button
                  onClick={clearList}
                  className="text-sm font-medium underline underline-offset-4"
                >
                  Uncheck everything
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="border-y border-[#1C241E]/10 py-20 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B65C32]">
              Nothing here yet
            </p>

            <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em]">
              Your list is empty.
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#465149]">
              Add a few meals to your weekly planner and Chopful will gather the
              ingredients for you.
            </p>

            <Link
              href="/planner"
              className="mt-7 inline-block bg-[#1C241E] px-6 py-3 text-sm font-medium text-white"
            >
              Plan some meals
            </Link>
          </div>
        )}
      </section>

      <style jsx global>{`
        @media print {
          @page {
            margin: 20mm;
          }

          button {
            color: #1c241e !important;
          }

          a {
            color: #1c241e !important;
          }
        }
      `}</style>
    </main>
  );
}
