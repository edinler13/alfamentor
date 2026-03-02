import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Ana Sayfa", href: "#home" },
  { label: "Ürün İncelemeleri", href: "#reviews" },
  { label: "Bilimsel İçerik", href: "#science" },
  { label: "Hakkımda", href: "#about" },
  { label: "İletişim", href: "#contact" },
];

const PRODUCTS = [
  {
    name: "Ashwagandha KSM-66",
    category: "Adaptogen",
    rating: 4.8,
    badge: "EDİTÖR SEÇİMİ",
    desc: "Kortizol düşürücü, testosteron destekleyici klinik kanıtlı formül.",
    tag: "Kanıta Dayalı",
    color: "#C8A96E",
  },
  {
    name: "Zinc + Magnesium B6",
    category: "Mineral Kompleks",
    rating: 4.6,
    badge: "POPÜLER",
    desc: "Erkek hormonal profili için temel mineral kombinasyonu.",
    tag: "Temel Takviye",
    color: "#7EB8A4",
  },
  {
    name: "Tongkat Ali 200:1",
    category: "Bitkisel Ekstrakt",
    rating: 4.5,
    badge: "YENİ",
    desc: "Serbest testosteron artışı için standardize ekstrakt.",
    tag: "Bitkisel",
    color: "#A87DB8",
  },
  {
    name: "L-Citrulline Malate",
    category: "Amino Asit",
    rating: 4.7,
    badge: null,
    desc: "Nitrik oksit öncüsü, vasküler fonksiyon desteği.",
    tag: "Dolaşım",
    color: "#E07878",
  },
];

const SCIENCE_POSTS = [
  {
    title: "PE Egzersizlerinin Fizyolojisi: Mekanizmalar ve Kanıtlar",
    date: "15 Şubat 2025",
    readTime: "8 dk",
    excerpt: "Doku yeniden yapılanmasının biyomekanik temelleri ve mevcut klinik literatürün değerlendirmesi.",
  },
  {
    title: "Testosteron ve Erkek Seksüel Sağlığı: Güncel Rehberler",
    date: "2 Şubat 2025",
    readTime: "12 dk",
    excerpt: "Endokrin Society 2024 kılavuzları ışığında testosteron optimizasyonuna kanıta dayalı yaklaşım.",
  },
  {
    title: "Vazküler Sağlık ve Erektil Fonksiyon: Bütüncül Değerlendirme",
    date: "20 Ocak 2025",
    readTime: "10 dk",
    excerpt: "Kardiyovasküler risk faktörleri ile erektil disfonksiyon arasındaki ilişkinin klinik analizi.",
  },
];

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="14" height="14" viewBox="0 0 14 14" fill={s <= Math.floor(rating) ? "#C8A96E" : s - 0.5 <= rating ? "#C8A96E" : "#333"}>
          <polygon points="7,1 8.8,5.5 13.5,5.5 9.8,8.5 11.2,13 7,10.2 2.8,13 4.2,8.5 0.5,5.5 5.2,5.5" />
        </svg>
      ))}
      <span style={{ color: "#C8A96E", fontSize: "13px", fontWeight: 600, marginLeft: "4px" }}>{rating}</span>
    </div>
  );
}

export default function Alfamentor() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-observe]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const styles = {
    root: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      background: "#0A0A0A",
      color: "#E8E0D5",
      minHeight: "100vh",
      overflowX: "hidden",
    },
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: "20px 48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      transition: "all 0.4s ease",
      background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(200,169,110,0.15)" : "none",
      backdropFilter: scrolled ? "blur(10px)" : "none",
    },
    logo: {
      fontSize: "22px",
      fontWeight: 700,
      letterSpacing: "3px",
      color: "#E8E0D5",
      textTransform: "uppercase",
      textDecoration: "none",
    },
    logoAccent: {
      color: "#C8A96E",
    },
    navLinks: {
      display: "flex",
      gap: "36px",
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    navLink: {
      color: "#B0A898",
      textDecoration: "none",
      fontSize: "13px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 400,
      transition: "color 0.2s",
    },
    hero: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      position: "relative",
      padding: "0 48px",
      overflow: "hidden",
    },
    heroBg: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(ellipse 70% 60% at 80% 50%, rgba(200,169,110,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 20% 80%, rgba(126,184,164,0.04) 0%, transparent 60%)",
    },
    heroGrid: {
      position: "absolute",
      inset: 0,
      backgroundImage: "linear-gradient(rgba(200,169,110,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.03) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    },
    heroContent: {
      maxWidth: "700px",
      position: "relative",
      zIndex: 2,
      animation: "fadeInUp 1s ease forwards",
    },
    heroEyebrow: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "28px",
    },
    eyebrowLine: {
      width: "40px",
      height: "1px",
      background: "#C8A96E",
    },
    eyebrowText: {
      fontSize: "11px",
      letterSpacing: "4px",
      textTransform: "uppercase",
      color: "#C8A96E",
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 500,
    },
    heroTitle: {
      fontSize: "clamp(52px, 8vw, 96px)",
      fontWeight: 300,
      lineHeight: 1.0,
      letterSpacing: "-1px",
      marginBottom: "8px",
      color: "#E8E0D5",
    },
    heroTitleBold: {
      fontWeight: 700,
      fontStyle: "italic",
      color: "#C8A96E",
      display: "block",
    },
    heroSub: {
      fontSize: "16px",
      color: "#7A7268",
      lineHeight: 1.7,
      maxWidth: "480px",
      marginTop: "28px",
      marginBottom: "48px",
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 300,
    },
    heroButtons: {
      display: "flex",
      gap: "16px",
      flexWrap: "wrap",
    },
    btnPrimary: {
      background: "#C8A96E",
      color: "#0A0A0A",
      padding: "14px 36px",
      fontSize: "12px",
      letterSpacing: "3px",
      textTransform: "uppercase",
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 600,
      border: "none",
      cursor: "pointer",
      textDecoration: "none",
      display: "inline-block",
      transition: "all 0.3s ease",
    },
    btnSecondary: {
      background: "transparent",
      color: "#E8E0D5",
      padding: "14px 36px",
      fontSize: "12px",
      letterSpacing: "3px",
      textTransform: "uppercase",
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 400,
      border: "1px solid rgba(232,224,213,0.25)",
      cursor: "pointer",
      textDecoration: "none",
      display: "inline-block",
      transition: "all 0.3s ease",
    },
    heroRight: {
      position: "absolute",
      right: "48px",
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      flexDirection: "column",
      gap: "32px",
      alignItems: "flex-end",
      zIndex: 2,
    },
    statCard: {
      textAlign: "right",
      borderRight: "2px solid #C8A96E",
      paddingRight: "20px",
    },
    statNum: {
      fontSize: "42px",
      fontWeight: 700,
      color: "#C8A96E",
      lineHeight: 1,
    },
    statLabel: {
      fontSize: "10px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "#5A5248",
      fontFamily: "'Outfit', sans-serif",
      marginTop: "4px",
    },
    section: {
      padding: "100px 48px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    sectionHeader: {
      marginBottom: "64px",
    },
    sectionEyebrow: {
      fontSize: "10px",
      letterSpacing: "4px",
      textTransform: "uppercase",
      color: "#C8A96E",
      fontFamily: "'Outfit', sans-serif",
      marginBottom: "16px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    sectionTitle: {
      fontSize: "clamp(32px, 4vw, 52px)",
      fontWeight: 300,
      lineHeight: 1.1,
      color: "#E8E0D5",
    },
    sectionTitleBold: {
      fontWeight: 700,
      fontStyle: "italic",
    },
    divider: {
      width: "60px",
      height: "1px",
      background: "#C8A96E",
      marginTop: "24px",
    },
    productsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "2px",
    },
    productCard: {
      background: "#111",
      padding: "36px 28px",
      position: "relative",
      borderTop: "1px solid rgba(200,169,110,0.15)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    productBadge: {
      fontSize: "9px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 700,
      padding: "4px 10px",
      marginBottom: "20px",
      display: "inline-block",
    },
    productName: {
      fontSize: "20px",
      fontWeight: 600,
      marginBottom: "4px",
      color: "#E8E0D5",
    },
    productCategory: {
      fontSize: "11px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      fontFamily: "'Outfit', sans-serif",
      color: "#5A5248",
      marginBottom: "16px",
    },
    productDesc: {
      fontSize: "14px",
      color: "#7A7268",
      lineHeight: 1.6,
      fontFamily: "'Outfit', sans-serif",
      marginBottom: "20px",
      fontWeight: 300,
    },
    productFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "24px",
      paddingTop: "20px",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    },
    scienceGrid: {
      display: "grid",
      gap: "2px",
    },
    scienceCard: {
      background: "#0F0F0F",
      padding: "40px",
      borderLeft: "2px solid transparent",
      transition: "all 0.3s ease",
      cursor: "pointer",
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: "24px",
      alignItems: "center",
    },
    scienceTitle: {
      fontSize: "20px",
      fontWeight: 500,
      marginBottom: "10px",
      color: "#E8E0D5",
      lineHeight: 1.3,
    },
    scienceExcerpt: {
      fontSize: "14px",
      color: "#5A5248",
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 300,
      lineHeight: 1.6,
    },
    scienceMeta: {
      display: "flex",
      gap: "16px",
      marginTop: "16px",
    },
    scienceMetaItem: {
      fontSize: "10px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "#3A3530",
      fontFamily: "'Outfit', sans-serif",
    },
    scienceArrow: {
      fontSize: "24px",
      color: "#2A2520",
      transition: "all 0.3s ease",
    },
    aboutSection: {
      background: "#0D0D0D",
      borderTop: "1px solid rgba(200,169,110,0.1)",
      borderBottom: "1px solid rgba(200,169,110,0.1)",
    },
    aboutInner: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "100px 48px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "80px",
      alignItems: "center",
    },
    aboutCredential: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginBottom: "20px",
      paddingBottom: "20px",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    },
    credentialDot: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: "#C8A96E",
      flexShrink: 0,
    },
    credentialText: {
      fontSize: "14px",
      color: "#7A7268",
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 300,
    },
    quoteBlock: {
      borderLeft: "2px solid #C8A96E",
      paddingLeft: "28px",
      marginTop: "36px",
    },
    quoteText: {
      fontSize: "20px",
      fontStyle: "italic",
      fontWeight: 300,
      lineHeight: 1.6,
      color: "#B0A898",
    },
    footer: {
      background: "#050505",
      borderTop: "1px solid rgba(200,169,110,0.1)",
      padding: "60px 48px",
    },
    footerInner: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    footerNote: {
      fontSize: "11px",
      color: "#2A2520",
      fontFamily: "'Outfit', sans-serif",
      letterSpacing: "1px",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-in-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .product-card:hover {
          background: #161616 !important;
          transform: translateY(-4px);
        }
        .product-card:hover .product-accent-line {
          width: 100% !important;
        }

        .science-card:hover {
          border-left-color: #C8A96E !important;
          background: #141414 !important;
        }
        .science-card:hover .science-arrow {
          color: #C8A96E !important;
          transform: translateX(6px);
        }

        .btn-primary:hover {
          background: #D4B87E !important;
          transform: translateY(-2px);
        }
        .btn-secondary:hover {
          border-color: #C8A96E !important;
          color: #C8A96E !important;
        }

        a { color: inherit; }
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: #C8A96E; }
      `}</style>

      <div style={styles.root}>
        {/* NAV */}
        <nav style={styles.nav}>
          <a href="#home" style={styles.logo}>
            ALFA<span style={styles.logoAccent}>MENTOR</span>
          </a>
          <ul style={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} style={styles.navLink}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a href="#reviews" style={{ ...styles.btnPrimary, padding: "10px 24px", fontSize: "10px" }} className="btn-primary">
            Başla
          </a>
        </nav>

        {/* HERO */}
        <section id="home" style={styles.hero} ref={heroRef}>
          <div style={styles.heroBg} />
          <div style={styles.heroGrid} />
          <div style={styles.heroContent}>
            <div style={styles.heroEyebrow}>
              <div style={styles.eyebrowLine} />
              <span style={styles.eyebrowText}>Dr. tarafından hazırlanmış · Kanıta dayalı</span>
            </div>
            <h1 style={styles.heroTitle}>
              Erkek Sağlığı
              <span style={styles.heroTitleBold}>Rehberin.</span>
            </h1>
            <p style={styles.heroSub}>
              Anesteziyoloji ve reanimasyon uzmanı bir hekim tarafından hazırlanan, bilimsel temelli supplement incelemeleri ve erkek seksüel sağlığı rehberleri.
            </p>
            <div style={styles.heroButtons}>
              <a href="#reviews" style={styles.btnPrimary} className="btn-primary">Ürünleri İncele</a>
              <a href="#about" style={styles.btnSecondary} className="btn-secondary">Hakkımda</a>
            </div>
          </div>

          <div style={styles.heroRight}>
            {[
              { num: "200+", label: "İncelenen Ürün" },
              { num: "12+", label: "Yıl Klinik Deneyim" },
              { num: "50K+", label: "Aylık Okuyucu" },
            ].map((stat) => (
              <div key={stat.label} style={styles.statCard}>
                <div style={styles.statNum}>{stat.num}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="reviews" style={{ padding: "100px 0", background: "#080808" }}>
          <div style={styles.section}>
            <div
              id="products-header"
              data-observe
              className={`fade-in-section ${visibleSections["products-header"] ? "visible" : ""}`}
              style={styles.sectionHeader}
            >
              <div style={styles.sectionEyebrow}>
                <div style={{ width: "30px", height: "1px", background: "#C8A96E" }} />
                Ürün İncelemeleri
              </div>
              <h2 style={styles.sectionTitle}>
                Klinik Gözle <span style={styles.sectionTitleBold}>Değerlendirilen</span>
                <br />Supplement'ler
              </h2>
              <div style={styles.divider} />
            </div>

            <div style={styles.productsGrid}>
              {PRODUCTS.map((p, i) => (
                <div
                  key={p.name}
                  id={`product-${i}`}
                  data-observe
                  className={`fade-in-section product-card ${visibleSections[`product-${i}`] ? "visible" : ""}`}
                  style={{ ...styles.productCard, transitionDelay: `${i * 0.1}s`, position: "relative", overflow: "hidden" }}
                >
                  <div
                    className="product-accent-line"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "2px",
                      width: "0%",
                      background: p.color,
                      transition: "width 0.4s ease",
                    }}
                  />
                  {p.badge && (
                    <div style={{ ...styles.productBadge, background: `${p.color}20`, color: p.color }}>
                      {p.badge}
                    </div>
                  )}
                  <div style={styles.productName}>{p.name}</div>
                  <div style={styles.productCategory}>{p.category}</div>
                  <p style={styles.productDesc}>{p.desc}</p>
                  <div style={styles.productFooter}>
                    <StarRating rating={p.rating} />
                    <span style={{
                      fontSize: "10px",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      fontFamily: "'Outfit', sans-serif",
                      color: p.color,
                      fontWeight: 600,
                    }}>
                      {p.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SCIENCE */}
        <section id="science" style={{ padding: "100px 0" }}>
          <div style={styles.section}>
            <div
              id="science-header"
              data-observe
              className={`fade-in-section ${visibleSections["science-header"] ? "visible" : ""}`}
              style={styles.sectionHeader}
            >
              <div style={styles.sectionEyebrow}>
                <div style={{ width: "30px", height: "1px", background: "#C8A96E" }} />
                Bilimsel İçerik
              </div>
              <h2 style={styles.sectionTitle}>
                Peer-Reviewed <span style={styles.sectionTitleBold}>Literatür</span>
                <br />Işığında
              </h2>
              <div style={styles.divider} />
            </div>

            <div style={styles.scienceGrid}>
              {SCIENCE_POSTS.map((post, i) => (
                <div
                  key={post.title}
                  id={`science-${i}`}
                  data-observe
                  className={`fade-in-section science-card ${visibleSections[`science-${i}`] ? "visible" : ""}`}
                  style={{ ...styles.scienceCard, transitionDelay: `${i * 0.15}s` }}
                >
                  <div>
                    <h3 style={styles.scienceTitle}>{post.title}</h3>
                    <p style={styles.scienceExcerpt}>{post.excerpt}</p>
                    <div style={styles.scienceMeta}>
                      <span style={styles.scienceMetaItem}>{post.date}</span>
                      <span style={{ ...styles.scienceMetaItem, color: "#C8A96E40" }}>·</span>
                      <span style={styles.scienceMetaItem}>{post.readTime} okuma</span>
                    </div>
                  </div>
                  <div className="science-arrow" style={styles.scienceArrow}>→</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" style={styles.aboutSection}>
          <div style={styles.aboutInner}>
            <div
              id="about-left"
              data-observe
              className={`fade-in-section ${visibleSections["about-left"] ? "visible" : ""}`}
            >
              <div style={styles.sectionEyebrow}>
                <div style={{ width: "30px", height: "1px", background: "#C8A96E" }} />
                Hakkımda
              </div>
              <h2 style={{ ...styles.sectionTitle, marginBottom: "40px" }}>
                Bir Hekimin <span style={styles.sectionTitleBold}>Perspektifi</span>
              </h2>

              {[
                "Anesteziyoloji ve Reanimasyon Uzmanı",
                "12+ Yıl Klinik Deneyim",
                "Erkek Sağlığı Alanında Aktif Araştırmacı",
                "Türkiye'nin İlk Kanıta Dayalı PE Platformu",
              ].map((cred) => (
                <div key={cred} style={styles.aboutCredential}>
                  <div style={styles.credentialDot} />
                  <span style={styles.credentialText}>{cred}</span>
                </div>
              ))}

              <div style={styles.quoteBlock}>
                <p style={styles.quoteText}>
                  "Erkek sağlığı konusunda Türkçe, güvenilir ve bilimsel içerik üretmek için bu platformu kurdum."
                </p>
              </div>
            </div>

            <div
              id="about-right"
              data-observe
              className={`fade-in-section ${visibleSections["about-right"] ? "visible" : ""}`}
              style={{ transitionDelay: "0.2s" }}
            >
              <div style={{
                background: "#111",
                padding: "48px",
                borderTop: "2px solid #C8A96E",
              }}>
                <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#C8A96E", fontFamily: "'Outfit', sans-serif", marginBottom: "28px" }}>
                  Metodoloji
                </div>
                {[
                  { title: "Klinik Değerlendirme", desc: "Her ürün fizyolojik mekanizması açısından değerlendirilir." },
                  { title: "Literatür Taraması", desc: "PubMed ve Cochrane veri tabanlarındaki güncel kanıtlar analiz edilir." },
                  { title: "Tarafsız İnceleme", desc: "Hiçbir sponsorlu içerik yayınlanmaz. Editoryal bağımsızlık korunur." },
                ].map((item, i) => (
                  <div key={item.title} style={{ marginBottom: "28px", paddingBottom: "28px", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px", color: "#E8E0D5" }}>{item.title}</div>
                    <div style={{ fontSize: "13px", color: "#5A5248", fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <div style={styles.footerInner}>
            <div>
              <div style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>
                ALFA<span style={{ color: "#C8A96E" }}>MENTOR</span>
              </div>
              <div style={styles.footerNote}>Erkek Sağlığı · Kanıta Dayalı · © 2025</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", color: "#2A2520", fontFamily: "'Outfit', sans-serif", lineHeight: 1.8 }}>
                <div>Bu site tıbbi tavsiye niteliği taşımaz.</div>
                <div>Sağlık kararları için uzman hekiminize danışın.</div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
