import { useState } from "react";
import Icon from "@/components/ui/icon";

const BG_IMG = "https://cdn.poehali.dev/projects/85d57ff8-daf5-418a-a38a-de638e6ccb4b/files/d18b0ead-fbe8-4b6f-9d0b-b5e43d20fa4c.jpg";
const CLASS_IMG = "https://cdn.poehali.dev/projects/85d57ff8-daf5-418a-a38a-de638e6ccb4b/files/63205466-e030-42d0-a237-6bac6014edc3.jpg";
const HERO_CARD_IMG = "https://cdn.poehali.dev/projects/85d57ff8-daf5-418a-a38a-de638e6ccb4b/bucket/1682c7ba-16da-42f7-a78d-2ef0f0fbd0fa.png";

type Tab = "all" | "events" | "memories" | "people";

const POSTS = [
  {
    id: 1,
    user: "Горхон",
    time: "2 д назад",
    text: "Выпускной 2026 — момент, который останется навсегда. Смотрите полный репортаж в нашем архиве.",
    img: BG_IMG,
    likes: 581,
    comments: 2100,
    shares: 36,
    tag: "Выпускной",
  },
  {
    id: 2,
    user: "Горхон",
    time: "5 д назад",
    text: "Последний звонок прозвенел. Эти лица, эти улыбки — теперь часть истории школы.",
    img: CLASS_IMG,
    likes: 348,
    comments: 890,
    shares: 21,
    tag: "Последний звонок",
  },
  {
    id: 3,
    user: "Горхон",
    time: "1 нед назад",
    text: "Учителя, которые изменили нас. Благодарим каждого, кто вложил частицу себя в наш путь.",
    img: BG_IMG,
    likes: 712,
    comments: 3400,
    shares: 88,
    tag: "Учителя",
  },
];

const TIMELINE = [
  { date: "20 мая", event: "Открытие выставки «По волнам школьной памяти»", hot: true },
  { date: "25 мая", event: "Последний звонок — торжественная церемония", hot: false },
  { date: "3 июня", event: "Онлайн-встреча выпускников разных лет", hot: false },
  { date: "14 июня", event: "Фотомарафон «Моя школа»", hot: true },
  { date: "28 июня", event: "Закрытие архива и гала-вечер", hot: false },
];

const MEMORIES = [
  { year: "1998", title: "Первый урок", count: 42 },
  { year: "2005", title: "КВН чемпионат", count: 87 },
  { year: "2011", title: "Олимпиада по математике", count: 31 },
  { year: "2018", title: "Театральный фестиваль", count: 65 },
];

const fmtNum = (n: number) =>
  n >= 1000 ? (n / 1000).toFixed(1).replace(".0", "") + "K" : String(n);

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [liked, setLiked] = useState<number[]>([]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: "Все" },
    { key: "events", label: "События" },
    { key: "memories", label: "Воспоминания" },
    { key: "people", label: "Люди" },
  ];

  const toggleLike = (id: number) =>
    setLiked((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div style={{ background: "var(--ink)", minHeight: "100vh" }}>

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden" style={{ minHeight: "100vh" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BG_IMG})`, filter: "grayscale(100%) brightness(0.35)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(13,148,136,0.45) 0%, rgba(45,212,191,0.12) 60%, rgba(0,0,0,0.5) 100%)" }}
        />

        {/* Шапка */}
        <header className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-6">
          <div className="gorkhon-logo">Горхон</div>
          <nav className="hidden md:flex items-center gap-8">
            {["Архив", "События", "Загрузить", "О проекте"].map((item) => (
              <button key={item} className="font-oswald text-sm uppercase tracking-wider hover-teal transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>
                {item}
              </button>
            ))}
          </nav>
          <button className="btn-teal text-sm py-2 px-5">Участвовать</button>
        </header>

        {/* Контент Hero */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 pt-4 pb-20 gap-10" style={{ minHeight: "calc(100vh - 82px)" }}>

          {/* Карточка-пост */}
          <div className="w-full lg:w-auto animate-scale-in" style={{ animationDelay: "0.2s", opacity: 0, maxWidth: "340px" }}>
            <div className="post-card" style={{ transform: "rotate(-2.5deg)" }}>
              <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid #f0f0f0" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#0d9488" }}>
                  <span className="font-oswald text-xs font-bold text-white">Г</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-golos font-semibold text-sm" style={{ color: "#111" }}>Горхон</span>
                  <Icon name="BadgeCheck" size={14} style={{ color: "#0d9488" }} />
                </div>
                <span className="ml-auto font-golos text-xs flex-shrink-0" style={{ color: "#9ca3af" }}>2 д назад</span>
              </div>
              <img src={HERO_CARD_IMG} alt="Выпускники" className="w-full object-cover" style={{ maxHeight: "260px" }} />
              <div className="flex items-center gap-5 px-4 py-3">
                <div className="flex items-center gap-1.5" style={{ color: "#6b7280" }}>
                  <Icon name="Heart" size={16} />
                  <span className="font-golos text-sm">581</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ color: "#6b7280" }}>
                  <Icon name="MessageCircle" size={16} />
                  <span className="font-golos text-sm">2,1K</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ color: "#6b7280" }}>
                  <Icon name="Share2" size={16} />
                  <span className="font-golos text-sm">36</span>
                </div>
              </div>
            </div>
          </div>

          {/* Текст Hero */}
          <div className="lg:max-w-xl text-center lg:text-left">
            <p className="font-golos text-sm uppercase tracking-[0.2em] mb-5 animate-fade-up" style={{ color: "var(--teal)", animationDelay: "0.1s", opacity: 0 }}>
              Горхон представляет
            </p>
            <h1
              className="font-oswald font-bold leading-none mb-5 animate-fade-up"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "white", animationDelay: "0.25s", opacity: 0, lineHeight: 0.92 }}
            >
              По волнам<br />
              <span style={{ color: "var(--teal)" }}>школьной</span><br />
              памяти
            </h1>
            <p className="font-golos text-lg font-semibold mb-8 animate-fade-up" style={{ color: "rgba(255,255,255,0.65)", animationDelay: "0.4s", opacity: 0 }}>
              20 МАЯ — 28 ИЮНЯ 2026 ГОД
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: "0.55s", opacity: 0 }}>
              <button className="btn-teal">Открыть архив</button>
              <button className="btn-outline-teal">Загрузить фото</button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0" style={{ height: "4px", background: "var(--teal)" }} />
      </section>

      {/* ══ СТАТИСТИКА ══ */}
      <section style={{ background: "var(--teal)", padding: "26px 0" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { num: "2 400+", label: "фотографий" },
            { num: "380+", label: "историй" },
            { num: "40 лет", label: "охват архива" },
            { num: "12K", label: "участников" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-oswald font-bold text-3xl" style={{ color: "var(--ink)" }}>{s.num}</div>
              <div className="font-golos text-sm mt-0.5" style={{ color: "rgba(10,10,10,0.6)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ЛЕНТА ПОСТОВ ══ */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 py-20">
        <div className="flex items-end justify-between mb-3">
          <h2 className="font-oswald font-bold text-4xl text-white">
            Лента<br /><span style={{ color: "var(--teal)" }}>воспоминаний</span>
          </h2>
          <button className="btn-outline-teal text-xs py-2 px-4 hidden sm:block">Смотреть все →</button>
        </div>
        <div className="teal-line mb-8" />

        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="font-oswald font-semibold text-sm uppercase tracking-wider px-5 py-2 rounded transition-all"
              style={{
                background: activeTab === t.key ? "var(--teal)" : "rgba(255,255,255,0.07)",
                color: activeTab === t.key ? "var(--ink)" : "rgba(255,255,255,0.5)",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <div
              key={post.id}
              className="rounded-xl overflow-hidden hover-scale animate-fade-up"
              style={{
                background: "#141414",
                border: "1px solid rgba(255,255,255,0.07)",
                animationDelay: `${i * 0.12}s`,
                opacity: 0,
              }}
            >
              <div className="relative overflow-hidden" style={{ height: "200px" }}>
                <img src={post.img} alt={post.tag} className="w-full h-full object-cover" style={{ filter: "grayscale(80%) brightness(0.65)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(13,148,136,0.3) 0%, rgba(0,0,0,0.55) 100%)" }} />
                <div className="absolute top-3 left-3"><span className="tag">{post.tag}</span></div>
                <div className="absolute bottom-3 right-3 font-golos text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{post.time}</div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#0d9488" }}>
                    <span className="font-oswald text-xs font-bold text-white">Г</span>
                  </div>
                  <span className="font-golos font-semibold text-sm text-white">{post.user}</span>
                  <Icon name="BadgeCheck" size={13} style={{ color: "var(--teal)" }} />
                </div>
                <p className="font-golos text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>{post.text}</p>
                <div className="flex items-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "12px" }}>
                  <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1.5 transition-colors" style={{ color: liked.includes(post.id) ? "#f87171" : "rgba(255,255,255,0.38)" }}>
                    <Icon name="Heart" size={15} />
                    <span className="font-golos text-xs">{fmtNum(post.likes + (liked.includes(post.id) ? 1 : 0))}</span>
                  </button>
                  <button className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.38)" }}>
                    <Icon name="MessageCircle" size={15} />
                    <span className="font-golos text-xs">{fmtNum(post.comments)}</span>
                  </button>
                  <button className="flex items-center gap-1.5 ml-auto" style={{ color: "rgba(255,255,255,0.38)" }}>
                    <Icon name="Share2" size={15} />
                    <span className="font-golos text-xs">{post.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ РАСПИСАНИЕ + КОЛЛЕКЦИИ ══ */}
      <section style={{ background: "#0f0f0f", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-12 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <div>
              <p className="font-golos text-xs uppercase tracking-[0.2em] mb-1" style={{ color: "var(--teal)" }}>Программа</p>
              <h2 className="font-oswald font-bold text-4xl mb-2 text-white">
                Расписание<br /><span style={{ color: "var(--teal)" }}>событий</span>
              </h2>
              <div className="teal-line mb-8" style={{ width: "80px" }} />
              <div className="relative" style={{ borderLeft: "2px solid rgba(45,212,191,0.18)", paddingLeft: "24px" }}>
                {TIMELINE.map((item, i) => (
                  <div key={i} className="relative mb-7 last:mb-0 animate-fade-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                    <div className="timeline-dot absolute" style={{ left: "-29px", top: "5px" }} />
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                      <span className="font-oswald font-bold text-sm flex-shrink-0" style={{ color: "var(--teal)", minWidth: "70px" }}>{item.date}</span>
                      <span className="font-golos text-sm leading-relaxed" style={{ color: item.hot ? "white" : "rgba(255,255,255,0.55)" }}>
                        {item.event}
                        {item.hot && <span className="ml-2 tag" style={{ fontSize: "0.62rem", padding: "1px 7px" }}>Горячо</span>}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-golos text-xs uppercase tracking-[0.2em] mb-1" style={{ color: "var(--teal)" }}>Коллекции</p>
              <h2 className="font-oswald font-bold text-4xl mb-2 text-white">
                Из года<br /><span style={{ color: "var(--teal)" }}>в год</span>
              </h2>
              <div className="teal-line mb-8" style={{ width: "60px" }} />
              <div className="grid grid-cols-2 gap-4">
                {MEMORIES.map((m, i) => (
                  <div
                    key={i}
                    className="hover-scale cursor-pointer animate-fade-up"
                    style={{
                      background: "rgba(45,212,191,0.07)",
                      border: "1px solid rgba(45,212,191,0.15)",
                      borderRadius: "10px",
                      padding: "16px",
                      animationDelay: `${i * 0.1 + 0.3}s`,
                      opacity: 0,
                    }}
                  >
                    <div className="font-oswald font-bold text-2xl" style={{ color: "var(--teal)" }}>{m.year}</div>
                    <div className="font-golos text-sm mt-1 text-white">{m.title}</div>
                    <div className="font-golos text-xs mt-2" style={{ color: "rgba(255,255,255,0.38)" }}>{m.count} фото</div>
                  </div>
                ))}
              </div>
              <button className="btn-teal mt-8 w-full text-center">Открыть архив</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${CLASS_IMG})`, filter: "grayscale(100%) brightness(0.2)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,148,136,0.4) 0%, rgba(10,10,10,0.85) 100%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-12 py-24 text-center">
          <span className="tag text-xs mb-6 inline-block">Ваша история важна</span>
          <h2 className="font-oswald font-bold text-white mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 0.95 }}>
            У вас есть<br /><span style={{ color: "var(--teal)" }}>школьные фото?</span>
          </h2>
          <p className="font-golos text-base mb-10" style={{ color: "rgba(255,255,255,0.55)" }}>
            Поделитесь воспоминаниями — стань частью живого архива, который хранит школьную историю поколений.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-teal text-base px-10 py-4">Загрузить фотографии</button>
            <button className="btn-outline-teal text-base px-8 py-4">Узнать больше</button>
          </div>
        </div>
      </section>

      {/* ══ ФУТЕР ══ */}
      <footer style={{ background: "#060606", borderTop: "3px solid var(--teal)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="gorkhon-logo" style={{ fontSize: "1.1rem" }}>Горхон</div>
          <p className="font-golos text-xs text-center" style={{ color: "rgba(255,255,255,0.28)" }}>
            Проект «По волнам школьной памяти» · 20 мая — 28 июня 2026
          </p>
          <div className="flex gap-4">
            {["Архив", "Контакты", "О проекте"].map((item) => (
              <button key={item} className="font-golos text-xs hover-teal" style={{ color: "rgba(255,255,255,0.32)" }}>{item}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
