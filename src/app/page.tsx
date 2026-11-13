import Image from "next/image";
import Listen from "@/components/Listen";
import Mark from "@/components/Mark";
import Sky from "@/components/sky/Sky";
import ThemeToggle from "@/components/ThemeToggle";
import { contact, products, toolGroups, websites } from "@/content/projects";
import { cambodiaTime, getTrainingStatus } from "@/lib/samleng";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Out() {
  return (
    <svg className="out" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="t-h2 mask" data-reveal>
      <span>{children}</span>
    </h2>
  );
}

export default async function Home() {
  const run = await getTrainingStatus();

  return (
    <>
      <header className="hd wrap">
        <a href="#top" className="brand" aria-label="Horizxon, back to top">
          <Mark />
        </a>
        <nav aria-label="Main">
          <a className="u" href="#work">Work</a>
          <a className="u" href="#open-source">Open source</a>
          <a className="u" href="#contact">Contact</a>
          <ThemeToggle />
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-word">
            <div className="word-row">
              <h1 className="mega">
                <span>
                  <span className="set">
                    Horizxo<span className="n">n</span>
                  </span>
                </span>
              </h1>
              <Sky />
            </div>
          </div>
          <div className="horizon" />
          <div className="wrap grid hero-foot">
            <p className="hero-lede">
              A small software startup in Cambodia. We build tools people here use every day, and
              open-source the parts others can build on.
            </p>
            <a className="now" href="#samleng">
              <span className="t-label">Building now</span>
              <span className="now-text">
                Samleng, a Khmer voice that runs on an ordinary computer
              </span>
            </a>
          </div>
        </section>

        <section className="sec wrap" id="work">
          <div className="grid sec-head">
            <Heading>Products</Heading>
            <p className="t-body sec-note">
              Two things we run ourselves, for people in Cambodia. One is live, one is still
              learning to speak.
            </p>
          </div>

          <div className="products">
            {products.map((p) => {
              const training = p.id === "samleng" && run;
              const live = p.live || !!training;
              return (
              <article key={p.id} id={p.id} className={`panel panel-${p.id}`}>
                <div className="panel-top">
                  <Image src={p.mark} alt="" width={44} height={44} />
                  <span
                    className={`status${live ? " is-live" : ""}`}
                    title={
                      training
                        ? `Epoch ${training.epoch} of ${training.epochs}, updated ${cambodiaTime(training.updatedAt)} Cambodia time`
                        : undefined
                    }
                  >
                    {training ? `Training, ${Math.round(training.progress * 100)}% done` : p.status}
                  </span>
                </div>
                <h3 className="panel-name">{p.name}</h3>
                <p className="panel-summary">{p.summary}</p>
                {p.id === "samleng" && <Listen />}
                <ul className="panel-facts">
                  {p.facts.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="panel-links">
                  {p.links.map((l, i) => (
                    <a key={l.href} href={l.href} className={i === 0 ? "pill solid" : "pill"} {...ext}>
                      {l.label}
                      <Out />
                    </a>
                  ))}
                </div>
              </article>
              );
            })}
          </div>
        </section>

        <section className="sec wrap" id="open-source">
          <div className="grid sec-head">
            <Heading>Open source</Heading>
            <p className="t-body sec-note">
              Smaller pieces we built along the way. All on GitHub, all free to use.
            </p>
          </div>

          {toolGroups.map((g) => (
            <div key={g.title} className="grid group">
              <div className="group-head">
                <h3 className="t-h3">{g.title}</h3>
                <p className="t-small">{g.note}</p>
              </div>
              <ul className="rows">
                {g.tools.map((t) => (
                  <li key={t.name}>
                    <a href={t.href} className="row" {...ext}>
                      <span className="row-name">{t.name}</span>
                      <span className="row-summary">{t.summary}</span>
                      <span className="row-kind">{t.kind}</span>
                      <Out />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="grid group">
            <div className="group-head">
              <h3 className="t-h3">Websites</h3>
              <p className="t-small">Shops we designed and built.</p>
            </div>
            <ul className="rows">
              {websites.map((w) => (
                <li key={w.href}>
                  <a href={w.href} className="row row-site" {...ext}>
                    <span className="row-name">{w.label}</span>
                    <span className="row-kind">Online store</span>
                    <Out />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band">
          <div className="wrap grid">
            <h2 className="t-h2 band-title mask" data-reveal>
              <span>Built here, for here</span>
            </h2>
            <dl className="beliefs">
              <div>
                <dt>Khmer first</dt>
                <dd>CheckSen answers in Khmer by default, and Samleng exists because good Khmer speech didn&apos;t.</dd>
              </div>
              <div>
                <dt>Open by default</dt>
                <dd>Our products and tools are on GitHub, so anyone can check how they work or build on them.</dd>
              </div>
              <div>
                <dt>Made for what people have</dt>
                <dd>Telegram instead of another app to install. A Mac mini instead of a rack of GPUs.</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="sec wrap end" id="contact">
          <Heading>Say hello</Heading>
          <p className="t-body end-note">
            Working on something in Cambodia, or want to use one of our tools? Write to us.
          </p>
          <a className="mail" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <ul className="social">
            {contact.social.map((s) => (
              <li key={s.href}>
                <a className="u" href={s.href} {...ext}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="ft wrap">
        <span>© 2026 Horizxon</span>
        <a className="u" href="#top">
          Back to top
        </a>
      </footer>
    </>
  );
}
