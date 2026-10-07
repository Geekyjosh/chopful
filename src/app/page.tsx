import Link from "next/link";
const meals = [
  {
    day: "MON",
    date: "12",
    meal: "Amala & Ewedu",
    detail: "Gbegiri · assorted meat",
    origin: "Yoruba · South West",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
  },
  {
    day: "TUE",
    date: "13",
    meal: "Jollof Rice",
    detail: "Chicken · fried plantain",
    origin: "Nigerian · West Africa",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=85",
  },
  {
    day: "WED",
    date: "14",
    meal: "Afang Soup",
    detail: "Eba · assorted meat",
    origin: "Efik / Ibibio · South South",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
  },
  {
    day: "THU",
    date: "15",
    meal: "Beans & Plantain",
    detail: "Ripe fried plantain",
    origin: "Nigerian · West Africa",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
  },
];

const cultures = [
  {
    name: "Yoruba",
    region: "South West",
    meals: "Amala · Ewa Riro · Ofada",
  },
  {
    name: "Igbo",
    region: "South East",
    meals: "Oha · Abacha · Ofe Nsala",
  },
  {
    name: "Hausa",
    region: "North",
    meals: "Tuwo · Miyan Kuka · Masa",
  },
  {
    name: "Efik / Ibibio",
    region: "South South",
    meals: "Afang · Edikang Ikong · Ekpang",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F3EC] text-[#1C241E]">
      <header className="border-b border-[#1C241E]/10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="/" className="text-2xl font-bold tracking-[-0.06em]">
            chop<span className="text-[#B65C32]">ful</span>
          </a>

          <nav className="hidden items-center gap-9 text-sm md:flex">
            <a href="/planner" className="transition-opacity hover:opacity-60">
              Planner
            </a>
            <a href="/recipes" className="transition-opacity hover:opacity-60">
              Recipes
            </a>
            <a href="#cultures" className="transition-opacity hover:opacity-60">
              Explore
            </a>
            <a href="/pantry" className="transition-opacity hover:opacity-60">
              Pantry
            </a>
          </nav>

          <button className="bg-[#1C241E] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5">
            Get started
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#B65C32]">
              Food worth planning for
            </p>

            <h1 className="max-w-3xl text-[clamp(3.5rem,7vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.065em]">
              Know what&apos;s cooking.
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-8 text-[#465149]">
              Plan your meals around the food you love, your budget, your
              schedule, and what&apos;s already in your kitchen.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <button className="bg-[#1C241E] px-7 py-4 text-sm font-medium text-white transition-transform hover:-translate-y-0.5">
                Plan my meals
              </button>

              <button className="border border-[#1C241E]/20 px-7 py-4 text-sm font-medium transition-colors hover:border-[#1C241E]">
                Explore recipes
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-[#DED8CA]">
              <img
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=90"
                alt="A freshly prepared meal"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-5 hidden w-60 bg-[#F6F3EC] p-5 shadow-[0_12px_40px_rgba(28,36,30,0.12)] sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B65C32]">
                Tonight
              </p>

              <p className="mt-2 text-xl font-medium tracking-[-0.03em]">
                Amala & Ewedu
              </p>

              <p className="mt-1 text-sm text-[#465149]">
                Gbegiri · Assorted meat
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="planner"
        className="border-y border-[#1C241E]/10 bg-[#EEE9DE]"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B65C32]">
                Your week
              </p>

              <h2 className="mt-3 text-4xl font-medium tracking-[-0.045em] md:text-5xl">
                A better week starts here.
              </h2>
            </div>

            <button className="w-fit border-b border-[#1C241E] pb-1 text-sm font-medium">
              View full plan →
            </button>
          </div>

          <div className="mt-10 grid border-l border-t border-[#1C241E]/10 sm:grid-cols-2 lg:grid-cols-4">
            {meals.map((meal) => (
              <article
                key={meal.date}
                className="group border-b border-r border-[#1C241E]/10"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.meal}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-[0.15em] text-[#B65C32]">
                      {meal.day}
                    </span>

                    <span className="text-xs text-[#465149]">{meal.date}</span>
                  </div>

                  <h3 className="mt-5 text-xl font-medium tracking-[-0.03em]">
                    {meal.meal}
                  </h3>

                  <p className="mt-1 text-sm text-[#465149]">{meal.detail}</p>

                  <p className="mt-3 text-xs uppercase tracking-[0.12em] text-[#667068]">
                    {meal.origin}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cultures" className="border-t border-[#1C241E]/10">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#D95D39]">
              Explore food culture
            </p>

            <h2 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">
              There's more to Nigerian food than jollof.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#1C241E]/60">
              Discover meals, ingredients, and cooking traditions from different
              communities and regions across Nigeria.
            </p>

            <Link
              href="/explore"
              className="mt-8 inline-flex items-center gap-3 border-b border-[#1C241E] pb-1 text-sm font-semibold"
            >
              Explore Nigerian food
              <span>→</span>
            </Link>
          </div>

          <div className="mt-16 grid border-t border-[#1C241E]/15 md:grid-cols-2">
            <Link
              href="/recipes?culture=Yoruba"
              className="group border-b border-[#1C241E]/15 p-6 transition-colors hover:bg-white md:border-r"
            >
              <div className="mb-12 flex items-start justify-between">
                <span className="text-xs font-semibold text-[#1C241E]/40">
                  01
                </span>

                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
              </div>

              <h3 className="text-3xl font-bold tracking-[-0.04em]">Yoruba</h3>

              <p className="mt-3 text-sm text-[#1C241E]/55">
                Amala · Ewa Riro · Ofada
              </p>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-[#D95D39]">
                South West
              </p>
            </Link>

            <Link
              href="/recipes?culture=Igbo"
              className="group border-b border-[#1C241E]/15 p-6 transition-colors hover:bg-white"
            >
              <div className="mb-12 flex items-start justify-between">
                <span className="text-xs font-semibold text-[#1C241E]/40">
                  02
                </span>

                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
              </div>

              <h3 className="text-3xl font-bold tracking-[-0.04em]">Igbo</h3>

              <p className="mt-3 text-sm text-[#1C241E]/55">
                Oha · Abacha · Ofe Nsala
              </p>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-[#D95D39]">
                South East
              </p>
            </Link>

            <Link
              href="/recipes?culture=Hausa"
              className="group border-b border-[#1C241E]/15 p-6 transition-colors hover:bg-white md:border-b-0 md:border-r"
            >
              <div className="mb-12 flex items-start justify-between">
                <span className="text-xs font-semibold text-[#1C241E]/40">
                  03
                </span>

                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
              </div>

              <h3 className="text-3xl font-bold tracking-[-0.04em]">Hausa</h3>

              <p className="mt-3 text-sm text-[#1C241E]/55">
                Tuwo · Miyan Kuka · Masa
              </p>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-[#D95D39]">
                North
              </p>
            </Link>

            <Link
              href="/recipes?culture=Efik"
              className="group p-6 transition-colors hover:bg-white"
            >
              <div className="mb-12 flex items-start justify-between">
                <span className="text-xs font-semibold text-[#1C241E]/40">
                  04
                </span>

                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
              </div>

              <h3 className="text-3xl font-bold tracking-[-0.04em]">
                Efik / Ibibio
              </h3>

              <p className="mt-3 text-sm text-[#1C241E]/55">
                Afang · Edikang Ikong · Ekpang
              </p>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-[#D95D39]">
                South South
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section id="recipes" className="border-b border-[#1C241E]/10">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=85"
                  alt="Fresh food ingredients"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-12 aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85"
                  alt="Prepared food"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B65C32]">
                Your kitchen, your way
              </p>

              <h2 className="mt-4 max-w-xl text-4xl font-medium tracking-[-0.05em] md:text-6xl">
                Plan around real life.
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-[#465149]">
                Whether you&apos;re cooking for yourself, your family, or a
                house full of people, Chopful helps turn everyday food decisions
                into a plan you can actually follow.
              </p>

              <div className="mt-10 grid gap-6 border-t border-[#1C241E]/10 pt-7 sm:grid-cols-3">
                <div>
                  <p className="text-2xl font-medium">01</p>
                  <p className="mt-2 text-sm font-medium">Choose</p>
                  <p className="mt-1 text-sm leading-6 text-[#465149]">
                    Find meals you actually want to eat.
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-medium">02</p>
                  <p className="mt-2 text-sm font-medium">Plan</p>
                  <p className="mt-1 text-sm leading-6 text-[#465149]">
                    Build a week around your schedule.
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-medium">03</p>
                  <p className="mt-2 text-sm font-medium">Shop</p>
                  <p className="mt-1 text-sm leading-6 text-[#465149]">
                    Turn your plan into one simple list.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
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
