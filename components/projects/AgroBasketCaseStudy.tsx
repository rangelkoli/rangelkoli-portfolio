import type { Project } from "@/data/projects";
import CaseStudyShell, { h2, muted, p, secondary } from "./CaseStudyShell";

const accent = "#15803D";

const toc = [
  { id: "idea", label: "The idea" },
  { id: "doors", label: "Two ways in" },
  { id: "cart", label: "How the cart works" },
  { id: "totals", label: "Working out the total" },
  { id: "status", label: "Where it stopped" },
];

const cartSteps = [
  {
    title: "Press Add to Cart",
    body: "Each product card carries its id. The click posts that id to /updatecart as JSON, with Django's CSRF token in the header.",
  },
  {
    title: "Find the open cart",
    body: "The server looks up the customer's cart that isn't completed yet, and creates one if there isn't. Each customer has exactly one open cart.",
  },
  {
    title: "Find the line",
    body: "It does the same for the line item: one row per product in that cart. Adding a product that's already there raises its quantity by one instead of adding a second row.",
  },
  {
    title: "Show the new total",
    body: "The page reloads, and the cart's totals are worked out from its line items when the page renders.",
  },
];

// Seeded products from db.sqlite3; quantities are an example.
const lines = [
  { name: "Banana", price: 20, qty: 3 },
  { name: "BlackBerry", price: 35, qty: 2 },
];
const cartTotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
const itemTotal = lines.reduce((sum, l) => sum + l.qty, 0);

const models = [
  { name: "User", note: "Django auth, shared by farmers and customers" },
  { name: "Cart", note: "customer, cart_id (UUID), completed" },
  { name: "Cartitems", note: "cart, product, quantity" },
  { name: "Products", note: "name, category, price, image, stock status" },
];

export default function AgroBasketCaseStudy({ project }: { project: Project }) {
  return (
    <CaseStudyShell
      project={project}
      accent={accent}
      badge={
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--text-primary)] px-3.5 py-1.5 text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="9" r="6" />
            <path d="M8.5 14 7 22l5-3 5 3-1.5-8" />
          </svg>
          1st place, hackathon 2023
        </p>
      }
      subtitle="A marketplace where farmers list produce and customers buy it from them directly, without a middleman."
      meta={[
        ["When", "March 2023"],
        ["Apps", "Customer storefront and farmer portal"],
        ["Type", "Django web app"],
        ["Stack", project.technologies.join(", ")],
      ]}
      summary={[
        ["Problem", "Produce passes through several traders before anyone buys it, and each one takes a cut from the farmer."],
        ["Solution", "One site with two sides: farmers list what they grow, customers browse it and fill a cart."],
        ["Result", "Won 1st place at the hackathon. Accounts, profiles, a product catalogue and a working cart. Farmer uploads and checkout were the next things to build."],
      ]}
      toc={toc}
    >
      {/* Idea */}
      <section className="pt-16" aria-labelledby="idea">
        <h2 id="idea" className={h2}>
          The idea
        </h2>
        <p className={`mt-6 ${p}`}>
          By the time fruit and vegetables reach a shop they have usually passed through a wholesaler and one or more
          traders, and each of them takes a margin out of what the farmer gets paid. AgroBasket puts both ends of that
          chain on one site, so a farmer can sell straight to the person eating the food.
        </p>
      </section>

      {/* Two doors */}
      <section className="pt-16" aria-labelledby="doors">
        <h2 id="doors" className={h2}>
          Two ways in
        </h2>
        <p className={`mt-6 ${p}`}>
          It&apos;s a single Django project split into two apps. Customers use the site root and farmers use{" "}
          <code className="text-[0.9em]">/farmer</code>. Each side has its own pages, but both sign in through Django&apos;s
          built-in auth, so there is one user table and one session system to look after.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["Customers", ["Sign up and log in", "Profile with a delivery address", "Product catalogue", "Cart", "Order tracking page"]],
            ["Farmers", ["Sign up and log in", "Profile", "Product upload form", "Dashboard"]],
          ].map(([who, items]) => (
            <div key={who as string} className="rounded-2xl border border-[var(--border)] p-5 md:p-6">
              <h3 className="text-xl font-semibold">{who}</h3>
              <ul className={`mt-3 space-y-1.5 ${secondary}`}>
                {(items as string[]).map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Cart */}
      <section className="pt-16" aria-labelledby="cart">
        <h2 id="cart" className={h2}>
          How the cart works
        </h2>
        <p className={`mt-6 ${p}`}>Four models hold the cart together:</p>
        <figure className="mt-8 rounded-2xl border border-[var(--border)] p-5 md:p-7">
          <figcaption className="text-lg font-semibold">What the cart is made of</figcaption>
          <ol className="mt-6 space-y-0">
            {models.map((m, i) => (
              <li key={m.name}>
                <div className="flex items-baseline gap-4">
                  <span
                    className="shrink-0 rounded-md px-2.5 py-1 font-mono text-sm"
                    style={{ background: i === 1 || i === 2 ? accent : "var(--text-primary)", color: "var(--background)" }}
                  >
                    {m.name}
                  </span>
                  <span className={`text-sm ${secondary}`}>{m.note}</span>
                </div>
                {i < models.length - 1 && (
                  <div className={`ml-6 h-6 border-l border-[var(--border)] pl-4 text-xs leading-6 ${muted}`}>
                    {i === 2 ? "points to" : "has"}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </figure>
        <ol className="mt-10 space-y-8">
          {cartSteps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--text-primary)] text-sm tabular-nums"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl font-semibold leading-snug">{s.title}</h3>
                <p className={`mt-2 ${p}`}>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Totals */}
      <section className="pt-16" aria-labelledby="totals">
        <h2 id="totals" className={h2}>
          Working out the total
        </h2>
        <p className={`mt-6 ${p}`}>
          The cart doesn&apos;t store a total. It adds one up from its line items each time it&apos;s asked, so the total can&apos;t
          drift out of step with the items. Changing a quantity box in the cart posts the new number to{" "}
          <code className="text-[0.9em]">/updatequantity</code>. A line whose total reaches zero deletes itself.
        </p>
        <figure className="mt-8 rounded-2xl border border-[var(--border)] p-5 md:p-7">
          <figcaption className="text-lg font-semibold">An example cart</figcaption>
          <table className="mt-5 w-full text-left tabular-nums">
            <thead className={`text-sm ${muted}`}>
              <tr className="border-b border-[var(--border)]">
                <th className="py-2 font-normal">Product</th>
                <th className="py-2 font-normal text-right">Price</th>
                <th className="py-2 font-normal text-right">Qty</th>
                <th className="py-2 font-normal text-right">Line total</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l) => (
                <tr key={l.name} className="border-b border-[var(--border)]">
                  <td className="py-3">{l.name}</td>
                  <td className={`py-3 text-right ${secondary}`}>{l.price}</td>
                  <td className={`py-3 text-right ${secondary}`}>× {l.qty}</td>
                  <td className="py-3 text-right">{l.price * l.qty}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="pt-4 font-semibold" colSpan={2}>
                  Cart
                </td>
                <td className="pt-4 text-right font-semibold" style={{ color: accent }}>
                  {itemTotal} items
                </td>
                <td className="pt-4 text-right font-semibold" style={{ color: accent }}>
                  {cartTotal}
                </td>
              </tr>
            </tfoot>
          </table>
          <p className={`mt-4 text-sm ${secondary}`}>
            Products and prices are the ones seeded in the project&apos;s database; the quantities are an example.
          </p>
        </figure>
      </section>

      {/* Status */}
      <section className="pt-16" aria-labelledby="status">
        <h2 id="status" className={h2}>
          Where it stopped
        </h2>
        <dl className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {[
            ["Working", "Customer and farmer accounts, customer profiles, the product catalogue, and adding, changing and totalling cart items."],
            ["Front end only", "The farmer upload form and dashboard are built as pages but don't save anything yet. Products are added through the Django admin for now."],
            ["Not started", "Checkout and payment. The tracking page shows no orders, because a cart can't be completed yet."],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-1 sm:gap-6 py-5">
              <dt className="font-semibold">{k}</dt>
              <dd className={p}>{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </CaseStudyShell>
  );
}
