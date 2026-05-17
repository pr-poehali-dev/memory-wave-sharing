import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/85d57ff8-daf5-418a-a38a-de638e6ccb4b/files/534b5d33-6558-47ae-9f35-38ffaa1d2c69.jpg";
const ALBUM_IMG = "https://cdn.poehali.dev/projects/85d57ff8-daf5-418a-a38a-de638e6ccb4b/files/2c390034-74d8-4ae7-9cc9-79f121f51813.jpg";
const PHOTOS_IMG = "https://cdn.poehali.dev/projects/85d57ff8-daf5-418a-a38a-de638e6ccb4b/files/1a22ec5f-6010-4d90-be84-e3184bc1b883.jpg";

type Section = "home" | "about" | "archive" | "upload" | "contacts";
type AuthModal = null | "login" | "register";

const ARCHIVE_ITEMS = [
  { id: 1, year: 1962, title: "Летние каникулы", location: "Крым", tags: ["лето", "море", "семья"], img: HERO_IMG, author: "Мария К." },
  { id: 2, year: 1978, title: "Свадебный день", location: "Москва", tags: ["свадьба", "семья"], img: ALBUM_IMG, author: "Иван П." },
  { id: 3, year: 1985, title: "Новый год дома", location: "Ленинград", tags: ["праздник", "дети"], img: PHOTOS_IMG, author: "Анна С." },
  { id: 4, year: 1971, title: "На даче", location: "Подмосковье", tags: ["дача", "лето"], img: HERO_IMG, author: "Сергей В." },
  { id: 5, year: 1990, title: "Выпускной вечер", location: "Киев", tags: ["молодость", "школа"], img: ALBUM_IMG, author: "Елена Д." },
  { id: 6, year: 1965, title: "Первый снег", location: "Свердловск", tags: ["зима", "дети"], img: PHOTOS_IMG, author: "Николай Р." },
];

const DECADES = ["Все", "1960-е", "1970-е", "1980-е", "1990-е"];

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [authModal, setAuthModal] = useState<AuthModal>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "Гость", email: "" });
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDecade, setActiveDecade] = useState("Все");
  const [favorites, setFavorites] = useState<number[]>([2, 5]);
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  const nav: { key: Section; label: string }[] = [
    { key: "home", label: "Главная" },
    { key: "about", label: "О проекте" },
    { key: "archive", label: "Архив" },
    { key: "upload", label: "Загрузка" },
    { key: "contacts", label: "Контакты" },
  ];

  const filteredArchive = ARCHIVE_ITEMS.filter((item) => {
    const matchDecade =
      activeDecade === "Все" ||
      (activeDecade === "1960-е" && item.year >= 1960 && item.year < 1970) ||
      (activeDecade === "1970-е" && item.year >= 1970 && item.year < 1980) ||
      (activeDecade === "1980-е" && item.year >= 1980 && item.year < 1990) ||
      (activeDecade === "1990-е" && item.year >= 1990 && item.year < 2000);
    const matchSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchDecade && matchSearch;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser({ name: authForm.email.split("@")[0] || "Пользователь", email: authForm.email });
    setAuthModal(null);
    setAuthForm({ name: "", email: "", password: "" });
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    setUser({ name: authForm.name || "Пользователь", email: authForm.email });
    setAuthModal(null);
    setAuthForm({ name: "", email: "", password: "" });
  };

  const handleContactSubmit = () => {
    setContactSent(true);
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--sepia-light)" }}>
      {/* ── ШАПКА ── */}
      <header className="sticky top-0 z-50" style={{ background: "rgba(245, 237, 224, 0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--sepia-mid)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={() => setActiveSection("home")} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--sepia-dark)", color: "var(--sepia-light)" }}>
              <Icon name="Camera" size={16} />
            </div>
            <span className="font-cormorant text-xl font-semibold tracking-wide" style={{ color: "var(--ink)" }}>
              Архив памяти
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className="story-link text-sm font-golos transition-colors"
                style={{ color: activeSection === item.key ? "var(--sepia-dark)" : "var(--warm-gray)" }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button onClick={() => setActiveSection("archive")} className="hidden sm:flex items-center gap-1.5 text-sm" style={{ color: "var(--warm-gray)" }}>
                  <Icon name="Heart" size={15} />
                  <span className="font-golos">{favorites.length}</span>
                </button>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-golos" style={{ background: "var(--sepia-mid)", color: "var(--ink)" }}>
                  <Icon name="User" size={14} />
                  <span>{user.name}</span>
                </div>
                <button onClick={() => setIsLoggedIn(false)} style={{ color: "var(--warm-gray)" }}>
                  <Icon name="LogOut" size={15} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModal("login")}
                className="px-4 py-1.5 rounded text-sm font-golos transition-all hover-scale"
                style={{ background: "var(--sepia-dark)", color: "var(--sepia-light)" }}
              >
                Войти
              </button>
            )}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: "var(--ink)" }}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 animate-fade-in" style={{ borderTop: "1px solid var(--sepia-mid)" }}>
            {nav.map((item) => (
              <button
                key={item.key}
                onClick={() => { setActiveSection(item.key); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2.5 text-sm font-golos"
                style={{ color: activeSection === item.key ? "var(--sepia-dark)" : "var(--warm-gray)" }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ══ ГЛАВНАЯ ══ */}
      {activeSection === "home" && (
        <main>
          <section className="relative overflow-hidden" style={{ minHeight: "85vh" }}>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})`, filter: "sepia(40%) brightness(0.65)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(44,31,20,0.3) 0%, rgba(44,31,20,0.7) 100%)" }} />
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32 pb-24" style={{ minHeight: "85vh" }}>
              <p className="text-xs font-golos tracking-[0.3em] uppercase mb-4 animate-fade-in" style={{ color: "var(--sepia-mid)", animationDelay: "0.1s", opacity: 0 }}>
                Хранилище воспоминаний
              </p>
              <h1 className="font-cormorant text-5xl sm:text-7xl font-light leading-tight mb-6 animate-fade-in" style={{ color: "#f5ede0", animationDelay: "0.2s", opacity: 0 }}>
                Архив памяти
              </h1>
              <p className="max-w-lg font-golos text-base sm:text-lg leading-relaxed mb-10 animate-fade-in" style={{ color: "rgba(245,237,224,0.8)", animationDelay: "0.4s", opacity: 0 }}>
                Место, где прошлое живёт. Загружайте старые фотографии, сохраняйте истории и делитесь воспоминаниями с теми, кому они дороги.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 animate-fade-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
                <button onClick={() => setActiveSection("archive")} className="px-8 py-3 font-golos text-sm tracking-wide transition-all hover-scale vintage-border" style={{ background: "var(--sepia-mid)", color: "var(--ink)" }}>
                  Открыть архив
                </button>
                <button onClick={() => setAuthModal(isLoggedIn ? null : "register")} className="px-8 py-3 font-golos text-sm tracking-wide transition-all" style={{ border: "1px solid rgba(245,237,224,0.5)", color: "rgba(245,237,224,0.9)" }}>
                  {isLoggedIn ? "Мой кабинет" : "Создать аккаунт"}
                </button>
              </div>
              <div className="flex gap-10 mt-16 animate-fade-in" style={{ animationDelay: "0.8s", opacity: 0 }}>
                {[["2 400+", "фотографий"], ["380+", "историй"], ["1960–2000", "годы архива"]].map(([val, label]) => (
                  <div key={label} className="text-center">
                    <div className="font-cormorant text-3xl font-light" style={{ color: "var(--sepia-mid)" }}>{val}</div>
                    <div className="text-xs font-golos mt-0.5" style={{ color: "rgba(245,237,224,0.6)" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to bottom, transparent, var(--sepia-light))" }} />
          </section>

          <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-golos tracking-[0.3em] uppercase mb-2" style={{ color: "var(--warm-gray)" }}>Коллекция</p>
                <h2 className="font-cormorant text-4xl font-light" style={{ color: "var(--ink)" }}>Последние поступления</h2>
              </div>
              <button onClick={() => setActiveSection("archive")} className="story-link text-sm font-golos hidden sm:block" style={{ color: "var(--sepia-dark)" }}>
                Смотреть всё →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ARCHIVE_ITEMS.slice(0, 3).map((item, i) => (
                <div key={item.id} className="photo-card rounded group cursor-pointer animate-fade-in hover-scale" style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }} onClick={() => setActiveSection("archive")}>
                  <div className="vintage-border overflow-hidden rounded">
                    <img src={item.img} alt={item.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" style={{ filter: "sepia(20%)" }} />
                    <div className="p-4" style={{ background: "var(--sepia-light)" }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-cormorant text-lg" style={{ color: "var(--ink)" }}>{item.title}</span>
                        <span className="text-xs font-golos px-2 py-0.5 rounded" style={{ background: "var(--sepia-mid)", color: "var(--sepia-dark)" }}>{item.year}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-golos" style={{ color: "var(--warm-gray)" }}>
                        <Icon name="MapPin" size={11} />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="py-20" style={{ background: "var(--sepia-mid)" }}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
              <Icon name="BookOpen" size={32} className="mx-auto mb-6" style={{ color: "var(--sepia-dark)" }} />
              <h2 className="font-cormorant text-4xl font-light mb-6" style={{ color: "var(--ink)" }}>Почему мы сохраняем прошлое?</h2>
              <p className="font-golos text-base leading-relaxed mb-8" style={{ color: "var(--ink)", opacity: 0.75 }}>
                Каждая фотография — это маленький фрагмент времени, который мог бы исчезнуть навсегда. Архив памяти создан, чтобы семейные истории жили вечно и передавались из поколения в поколение.
              </p>
              <button onClick={() => setActiveSection("about")} className="font-golos text-sm px-6 py-2.5 rounded transition-all hover-scale" style={{ background: "var(--sepia-dark)", color: "var(--sepia-light)" }}>
                Подробнее о проекте
              </button>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
            <div className="relative overflow-hidden rounded-lg p-10 sm:p-16 text-center vintage-border" style={{ background: "linear-gradient(135deg, rgba(139,101,64,0.08) 0%, rgba(232,213,183,0.4) 100%)" }}>
              <h2 className="font-cormorant text-4xl sm:text-5xl font-light mb-4" style={{ color: "var(--ink)" }}>У вас есть старые фото?</h2>
              <p className="font-golos text-base mb-8" style={{ color: "var(--warm-gray)" }}>
                Поделитесь ими с архивом — пусть они живут и вдохновляют других.
              </p>
              <button onClick={() => isLoggedIn ? setActiveSection("upload") : setAuthModal("register")} className="font-golos text-sm px-8 py-3 rounded transition-all hover-scale" style={{ background: "var(--sepia-dark)", color: "var(--sepia-light)" }}>
                Загрузить фотографии
              </button>
            </div>
          </section>
        </main>
      )}

      {/* ══ О ПРОЕКТЕ ══ */}
      {activeSection === "about" && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 animate-fade-in">
          <div className="text-center mb-16">
            <p className="text-xs font-golos tracking-[0.3em] uppercase mb-3" style={{ color: "var(--warm-gray)" }}>О нас</p>
            <h1 className="font-cormorant text-5xl font-light" style={{ color: "var(--ink)" }}>О проекте</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img src={ALBUM_IMG} alt="Фотоальбом" className="w-full rounded vintage-border" style={{ filter: "sepia(25%)" }} />
            </div>
            <div>
              <h2 className="font-cormorant text-3xl mb-4" style={{ color: "var(--ink)" }}>Наша миссия</h2>
              <p className="font-golos text-sm leading-relaxed mb-4" style={{ color: "var(--ink)", opacity: 0.75 }}>
                Архив памяти — это общественный проект по сохранению визуальной истории СССР и постсоветского пространства. Мы собираем фотографии обычных людей, семей, городов и деревень.
              </p>
              <p className="font-golos text-sm leading-relaxed" style={{ color: "var(--ink)", opacity: 0.75 }}>
                Каждая загруженная фотография становится частью большой летописи, доступной для всех. Мы бережно храним оригиналы и создаём цифровые копии высокого качества.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              { icon: "Shield", title: "Надёжное хранение", text: "Все файлы хранятся в нескольких копиях и защищены от утери" },
              { icon: "Users", title: "Сообщество", text: "Тысячи людей уже поделились своими воспоминаниями" },
              { icon: "Search", title: "Умный поиск", text: "Ищите по годам, городам, именам и тематическим тегам" },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded vintage-border text-center" style={{ background: "rgba(232,213,183,0.3)" }}>
                <Icon name={f.icon as "Shield"} size={28} className="mx-auto mb-3" style={{ color: "var(--sepia-dark)" }} />
                <h3 className="font-cormorant text-xl mb-2" style={{ color: "var(--ink)" }}>{f.title}</h3>
                <p className="font-golos text-sm" style={{ color: "var(--warm-gray)" }}>{f.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center vintage-border rounded p-10" style={{ background: "rgba(232,213,183,0.3)" }}>
            <h2 className="font-cormorant text-3xl mb-4" style={{ color: "var(--ink)" }}>Присоединяйтесь к архиву</h2>
            <p className="font-golos text-sm mb-6" style={{ color: "var(--warm-gray)" }}>Регистрация бесплатна. Загружайте свои фотографии и следите за любимыми воспоминаниями.</p>
            <button onClick={() => setAuthModal("register")} className="font-golos text-sm px-8 py-3 rounded hover-scale transition-all" style={{ background: "var(--sepia-dark)", color: "var(--sepia-light)" }}>
              Создать аккаунт
            </button>
          </div>
        </main>
      )}

      {/* ══ АРХИВ ══ */}
      {activeSection === "archive" && (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 animate-fade-in">
          <div className="mb-10">
            <p className="text-xs font-golos tracking-[0.3em] uppercase mb-2" style={{ color: "var(--warm-gray)" }}>Фонды</p>
            <h1 className="font-cormorant text-5xl font-light" style={{ color: "var(--ink)" }}>Архив</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--warm-gray)" }} />
              <input
                type="text"
                placeholder="Поиск по названию, месту, тегам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm font-golos rounded outline-none"
                style={{ background: "white", border: "1px solid var(--sepia-mid)", color: "var(--ink)" }}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {DECADES.map((d) => (
                <button key={d} onClick={() => setActiveDecade(d)} className="px-4 py-2 text-xs font-golos rounded transition-all" style={{ background: activeDecade === d ? "var(--sepia-dark)" : "var(--sepia-mid)", color: activeDecade === d ? "var(--sepia-light)" : "var(--ink)" }}>
                  {d}
                </button>
              ))}
            </div>
          </div>
          {isLoggedIn && (
            <div className="mb-6 flex items-center gap-2 text-sm font-golos" style={{ color: "var(--warm-gray)" }}>
              <Icon name="Heart" size={15} style={{ color: "var(--sepia-dark)" }} />
              <span>Избранное: {favorites.length} фото</span>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArchive.map((item, i) => (
              <div key={item.id} className="group rounded overflow-hidden vintage-border hover-scale transition-all animate-fade-in" style={{ animationDelay: `${i * 0.08}s`, opacity: 0, background: "white" }}>
                <div className="relative overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105" style={{ filter: "sepia(20%)" }} />
                  <div className="absolute top-3 right-3">
                    <button onClick={() => isLoggedIn ? toggleFavorite(item.id) : setAuthModal("login")} className="w-8 h-8 rounded-full flex items-center justify-center transition-all" style={{ background: "rgba(245,237,224,0.9)" }}>
                      <Icon name="Heart" size={14} style={{ color: favorites.includes(item.id) ? "#c0392b" : "var(--warm-gray)" }} />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-golos px-2 py-1 rounded" style={{ background: "rgba(44,31,20,0.75)", color: "var(--sepia-mid)" }}>{item.year}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-cormorant text-xl mb-1" style={{ color: "var(--ink)" }}>{item.title}</h3>
                  <div className="flex items-center gap-1 mb-3 text-xs font-golos" style={{ color: "var(--warm-gray)" }}>
                    <Icon name="MapPin" size={11} />
                    <span>{item.location}</span>
                    <span className="mx-1">·</span>
                    <Icon name="User" size={11} />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full font-golos" style={{ background: "var(--sepia-mid)", color: "var(--sepia-dark)" }}>#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredArchive.length === 0 && (
            <div className="text-center py-20">
              <Icon name="Search" size={40} className="mx-auto mb-4" style={{ color: "var(--sepia-mid)" }} />
              <p className="font-cormorant text-2xl" style={{ color: "var(--warm-gray)" }}>Ничего не найдено</p>
              <p className="font-golos text-sm mt-2" style={{ color: "var(--warm-gray)" }}>Попробуйте изменить фильтры или запрос</p>
            </div>
          )}
        </main>
      )}

      {/* ══ ЗАГРУЗКА ══ */}
      {activeSection === "upload" && (
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16 animate-fade-in">
          <div className="text-center mb-12">
            <p className="text-xs font-golos tracking-[0.3em] uppercase mb-3" style={{ color: "var(--warm-gray)" }}>Поделиться</p>
            <h1 className="font-cormorant text-5xl font-light" style={{ color: "var(--ink)" }}>Загрузка</h1>
          </div>
          {!isLoggedIn ? (
            <div className="text-center vintage-border rounded-lg p-12" style={{ background: "rgba(232,213,183,0.3)" }}>
              <Icon name="Lock" size={40} className="mx-auto mb-4" style={{ color: "var(--sepia-dark)" }} />
              <h2 className="font-cormorant text-3xl mb-3" style={{ color: "var(--ink)" }}>Нужен аккаунт</h2>
              <p className="font-golos text-sm mb-6" style={{ color: "var(--warm-gray)" }}>Чтобы загружать фотографии и отслеживать их в архиве, создайте аккаунт.</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setAuthModal("register")} className="font-golos text-sm px-6 py-2.5 rounded hover-scale" style={{ background: "var(--sepia-dark)", color: "var(--sepia-light)" }}>Создать аккаунт</button>
                <button onClick={() => setAuthModal("login")} className="font-golos text-sm px-6 py-2.5 rounded" style={{ border: "1px solid var(--sepia-mid)", color: "var(--ink)" }}>Войти</button>
              </div>
            </div>
          ) : (
            <div className="vintage-border rounded-lg p-8" style={{ background: "white" }}>
              <div className="border-2 border-dashed rounded-lg p-10 text-center mb-6 cursor-pointer" style={{ borderColor: "var(--sepia-mid)", background: "var(--sepia-light)" }}>
                <Icon name="Upload" size={36} className="mx-auto mb-3" style={{ color: "var(--sepia-dark)" }} />
                <p className="font-cormorant text-xl mb-1" style={{ color: "var(--ink)" }}>Перетащите фотографии сюда</p>
                <p className="font-golos text-xs" style={{ color: "var(--warm-gray)" }}>или нажмите для выбора файлов (JPG, PNG — до 20 МБ)</p>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Название фотографии", placeholder: "Например: Летние каникулы у бабушки" },
                  { label: "Год съёмки", placeholder: "1972" },
                  { label: "Место", placeholder: "Город, деревня, регион" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs font-golos mb-1.5" style={{ color: "var(--warm-gray)" }}>{field.label}</label>
                    <input type="text" placeholder={field.placeholder} className="w-full px-3 py-2.5 text-sm font-golos rounded outline-none" style={{ border: "1px solid var(--sepia-mid)", color: "var(--ink)", background: "var(--sepia-light)" }} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-golos mb-1.5" style={{ color: "var(--warm-gray)" }}>Теги (через запятую)</label>
                  <input type="text" placeholder="лето, семья, деревня, праздник" className="w-full px-3 py-2.5 text-sm font-golos rounded outline-none" style={{ border: "1px solid var(--sepia-mid)", color: "var(--ink)", background: "var(--sepia-light)" }} />
                </div>
                <div>
                  <label className="block text-xs font-golos mb-1.5" style={{ color: "var(--warm-gray)" }}>История (необязательно)</label>
                  <textarea rows={4} placeholder="Расскажите историю этой фотографии..." className="w-full px-3 py-2.5 text-sm font-golos rounded outline-none resize-none" style={{ border: "1px solid var(--sepia-mid)", color: "var(--ink)", background: "var(--sepia-light)" }} />
                </div>
                <button className="w-full py-3 font-golos text-sm rounded hover-scale transition-all" style={{ background: "var(--sepia-dark)", color: "var(--sepia-light)" }}>
                  Отправить в архив
                </button>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ══ КОНТАКТЫ ══ */}
      {activeSection === "contacts" && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 animate-fade-in">
          <div className="text-center mb-12">
            <p className="text-xs font-golos tracking-[0.3em] uppercase mb-3" style={{ color: "var(--warm-gray)" }}>Свяжитесь</p>
            <h1 className="font-cormorant text-5xl font-light" style={{ color: "var(--ink)" }}>Контакты</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              {contactSent ? (
                <div className="text-center py-12 vintage-border rounded-lg" style={{ background: "rgba(232,213,183,0.3)" }}>
                  <Icon name="CheckCircle" size={44} className="mx-auto mb-4" style={{ color: "var(--sepia-dark)" }} />
                  <h3 className="font-cormorant text-3xl mb-2" style={{ color: "var(--ink)" }}>Сообщение отправлено</h3>
                  <p className="font-golos text-sm" style={{ color: "var(--warm-gray)" }}>Мы ответим в течение 1–2 рабочих дней</p>
                  <button onClick={() => setContactSent(false)} className="mt-6 text-sm font-golos story-link" style={{ color: "var(--sepia-dark)" }}>Написать ещё</button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-golos mb-1.5" style={{ color: "var(--warm-gray)" }}>Ваше имя</label>
                    <input type="text" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} placeholder="Иван Иванов" className="w-full px-3 py-2.5 text-sm font-golos rounded outline-none" style={{ border: "1px solid var(--sepia-mid)", color: "var(--ink)", background: "white" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-golos mb-1.5" style={{ color: "var(--warm-gray)" }}>Электронная почта</label>
                    <input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} placeholder="ivan@mail.ru" className="w-full px-3 py-2.5 text-sm font-golos rounded outline-none" style={{ border: "1px solid var(--sepia-mid)", color: "var(--ink)", background: "white" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-golos mb-1.5" style={{ color: "var(--warm-gray)" }}>Сообщение</label>
                    <textarea rows={5} value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} placeholder="Ваш вопрос или предложение..." className="w-full px-3 py-2.5 text-sm font-golos rounded outline-none resize-none" style={{ border: "1px solid var(--sepia-mid)", color: "var(--ink)", background: "white" }} />
                  </div>
                  <button onClick={handleContactSubmit} className="w-full py-3 font-golos text-sm rounded hover-scale transition-all" style={{ background: "var(--sepia-dark)", color: "var(--sepia-light)" }}>
                    Отправить сообщение
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="font-cormorant text-3xl mb-4" style={{ color: "var(--ink)" }}>Как с нами связаться</h2>
                <p className="font-golos text-sm leading-relaxed" style={{ color: "var(--warm-gray)" }}>
                  Если вы хотите предложить фотографии для архива, задать вопрос или сообщить об ошибке — напишите нам.
                </p>
              </div>
              {[
                { icon: "Mail", label: "Почта", value: "archive@memory.ru" },
                { icon: "Clock", label: "Ответ", value: "1–2 рабочих дня" },
                { icon: "MapPin", label: "Адрес", value: "Москва, Россия" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 p-4 rounded vintage-border" style={{ background: "rgba(232,213,183,0.3)" }}>
                  <div className="mt-0.5">
                    <Icon name={c.icon as "Mail"} size={18} style={{ color: "var(--sepia-dark)" }} />
                  </div>
                  <div>
                    <div className="text-xs font-golos mb-0.5" style={{ color: "var(--warm-gray)" }}>{c.label}</div>
                    <div className="text-sm font-golos" style={{ color: "var(--ink)" }}>{c.value}</div>
                  </div>
                </div>
              ))}
              <div className="p-6 rounded" style={{ background: "var(--sepia-mid)" }}>
                <p className="font-cormorant text-xl italic mb-2" style={{ color: "var(--ink)" }}>«Каждый снимок — это миг вечности»</p>
                <p className="font-golos text-xs" style={{ color: "var(--warm-gray)" }}>— команда Архива памяти</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ══ ФУТЕР ══ */}
      <footer className="mt-12 py-10" style={{ background: "var(--ink)", borderTop: "3px solid var(--sepia-dark)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "var(--sepia-dark)" }}>
              <Icon name="Camera" size={13} style={{ color: "var(--sepia-light)" }} />
            </div>
            <span className="font-cormorant text-lg" style={{ color: "var(--sepia-light)" }}>Архив памяти</span>
          </div>
          <div className="flex gap-6">
            {nav.map((item) => (
              <button key={item.key} onClick={() => setActiveSection(item.key)} className="text-xs font-golos story-link" style={{ color: "rgba(245,237,224,0.5)" }}>
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-xs font-golos" style={{ color: "rgba(245,237,224,0.35)" }}>© 2024 Архив памяти</p>
        </div>
      </footer>

      {/* ══ МОДАЛ АВТОРИЗАЦИИ ══ */}
      {authModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(44,31,20,0.7)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md rounded-lg p-8 vintage-border animate-scale-in" style={{ background: "var(--sepia-light)" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-cormorant text-3xl" style={{ color: "var(--ink)" }}>
                {authModal === "login" ? "Вход в архив" : "Регистрация"}
              </h2>
              <button onClick={() => setAuthModal(null)} style={{ color: "var(--warm-gray)" }}>
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {authModal === "register" && (
                <div>
                  <label className="block text-xs font-golos mb-1.5" style={{ color: "var(--warm-gray)" }}>Ваше имя</label>
                  <input type="text" value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} placeholder="Иван Иванов" className="w-full px-3 py-2.5 text-sm font-golos rounded outline-none" style={{ border: "1px solid var(--sepia-mid)", color: "var(--ink)", background: "white" }} />
                </div>
              )}
              <div>
                <label className="block text-xs font-golos mb-1.5" style={{ color: "var(--warm-gray)" }}>Электронная почта</label>
                <input type="email" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} placeholder="ivan@mail.ru" className="w-full px-3 py-2.5 text-sm font-golos rounded outline-none" style={{ border: "1px solid var(--sepia-mid)", color: "var(--ink)", background: "white" }} />
              </div>
              <div>
                <label className="block text-xs font-golos mb-1.5" style={{ color: "var(--warm-gray)" }}>Пароль</label>
                <input type="password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} placeholder="••••••••" className="w-full px-3 py-2.5 text-sm font-golos rounded outline-none" style={{ border: "1px solid var(--sepia-mid)", color: "var(--ink)", background: "white" }} />
              </div>
              <button onClick={authModal === "login" ? handleLogin : handleRegister} className="w-full py-3 font-golos text-sm rounded hover-scale transition-all mt-2" style={{ background: "var(--sepia-dark)", color: "var(--sepia-light)" }}>
                {authModal === "login" ? "Войти" : "Зарегистрироваться"}
              </button>
              <p className="text-center text-xs font-golos" style={{ color: "var(--warm-gray)" }}>
                {authModal === "login" ? "Нет аккаунта? " : "Уже есть аккаунт? "}
                <button onClick={() => setAuthModal(authModal === "login" ? "register" : "login")} className="story-link" style={{ color: "var(--sepia-dark)" }}>
                  {authModal === "login" ? "Зарегистрироваться" : "Войти"}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
