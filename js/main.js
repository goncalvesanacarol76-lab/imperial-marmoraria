/* =====================================================================
   IMPERIAL MARMORARIA — scripts do site
   (as configurações ficam em js/config.js, banners.js,
    portfolio.js e depoimentos.js — não é preciso mexer aqui)
   ===================================================================== */

(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const C = typeof CONFIG !== "undefined" ? CONFIG : { consultoras: [] };
  const waLink = (num, msg) => `https://wa.me/${String(num).replace(/\D/g, "")}?text=${encodeURIComponent(msg || C.mensagemPadrao || "")}`;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const nextFrame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

  /* ---------- Preloader ---------- */
  const done = () => {
    if (document.body.classList.contains("loaded")) return;
    document.body.classList.add("loaded");
    setTimeout(() => document.body.classList.remove("is-loading"), 700);
    setTimeout(() => { const p = $(".preloader"); p && p.remove(); }, 1600);
  };
  window.addEventListener("load", () => setTimeout(done, 1000));
  setTimeout(done, 4000);
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Header ---------- */
  const header = $(".header");
  let lastY = 0;
  const heroImg = $(".hero__media img");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 30);
    header.classList.toggle("is-hidden", y > lastY + 2 && y > 500 && !document.body.classList.contains("menu-open"));
    if (y < lastY - 2) header.classList.remove("is-hidden");
    lastY = y;
    $("#wa-float").classList.toggle("is-on", y > window.innerHeight * 0.5);
    if (heroImg && y < window.innerHeight && document.body.classList.contains("loaded")) heroImg.style.transform = `translateY(${y * 0.15}px)`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const navLinks = $$(".nav a");
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean).forEach((s) => navObs.observe(s));

  /* ---------- Menu mobile ---------- */
  const burger = $(".burger");
  const toggleMenu = (open) => {
    const isOpen = open ?? !document.body.classList.contains("menu-open");
    document.body.classList.toggle("menu-open", isOpen);
    burger.setAttribute("aria-expanded", isOpen);
    $(".mobile-menu").setAttribute("aria-hidden", !isOpen);
  };
  burger.addEventListener("click", () => toggleMenu());
  $$(".mobile-menu a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

  /* ---------- Revelar ao rolar ---------- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); revealObs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
  const observeReveal = (els) => els.forEach((el) => {
    const sib = Array.from(el.parentElement?.children || []).filter((c) => c.classList.contains(el.classList[0]));
    const idx = sib.indexOf(el);
    if (idx > 0) el.style.transitionDelay = Math.min(idx * 0.07, 0.4) + "s";
    revealObs.observe(el);
  });
  observeReveal($$(".reveal, .about__figure, .craft__item, .process__steps li"));

  /* ---------- Contador ---------- */
  $$("[data-count]").forEach((el) => {
    const target = +el.dataset.count;
    const run = () => {
      const t0 = performance.now(), dur = 1600;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const iv = setInterval(() => { if (document.body.classList.contains("loaded")) { clearInterval(iv); setTimeout(run, 600); } }, 100);
  });

  /* ---------- Carrossel genérico (arrastar / swipe) ---------- */
  function swipe(el, onSwipe, canSwipe = () => true) {
    let x0 = null, y0 = null;
    el.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener("touchend", (e) => {
      if (x0 === null || !canSwipe()) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) onSwipe(dx < 0 ? 1 : -1);
      x0 = null;
    });
  }

  /* ---------- Banners ---------- */
  (function banners() {
    const list = typeof BANNERS !== "undefined" ? BANNERS : [];
    const root = $("#banners");
    if (!list.length) { root.closest(".banners").remove(); return; }
    const track = $(".carousel__track", root), dots = $(".carousel__dots", root);
    const lightTex = ["calacatta-oro", "taj-mahal", "crema-marfil"];
    list.forEach((b, i) => {
      const s = document.createElement("div");
      s.className = "slide";
      if (b.imagem) {
        const inner = `<picture>${b.imagemMobile ? `<source media="(max-width:600px)" srcset="${esc(b.imagemMobile)}">` : ""}<img src="${esc(b.imagem)}" alt="${esc(b.alt || "")}" loading="${i ? "lazy" : "eager"}"></picture>`;
        s.innerHTML = b.link ? `<a href="${esc(b.link)}">${inner}</a>` : inner;
      } else {
        const tex = b.textura || "nero-marquina";
        s.dataset.light = lightTex.includes(tex) ? "1" : "0";
        s.innerHTML = `
          <div class="slide__bg" style="background-image:url('assets/stones/${esc(tex)}.jpg')"></div>
          <div class="slide__veil"></div>
          <div class="slide__content">
            ${b.etiqueta ? `<span class="slide__tag">${esc(b.etiqueta)}</span>` : ""}
            ${b.titulo ? `<h3 class="slide__title">${esc(b.titulo)}</h3>` : ""}
            ${b.texto ? `<p class="slide__text">${esc(b.texto)}</p>` : ""}
            ${b.botao ? `<a class="btn btn--gold" href="${esc(b.link || "#contato")}">${esc(b.botao)}</a>` : ""}
          </div>`;
      }
      track.appendChild(s);
      const d = document.createElement("button");
      d.setAttribute("aria-label", `Banner ${i + 1}`);
      d.addEventListener("click", () => go(i, true));
      dots.appendChild(d);
    });
    const slides = $$(".slide", track), dotBtns = $$("button", dots);
    let idx = 0, timer;
    const go = (i, user) => {
      idx = (i + slides.length) % slides.length;
      track.style.transform = `translateX(${-idx * 100}%)`;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === idx));
      dotBtns.forEach((d, k) => d.classList.toggle("is-active", k === idx));
      if (user) restart();
    };
    const restart = () => { clearInterval(timer); if (slides.length > 1) timer = setInterval(() => go(idx + 1), 6500); };
    if (slides.length < 2) { $$(".carousel__arrow", root).forEach((a) => a.remove()); dots.remove(); }
    $(".carousel__arrow--prev", root)?.addEventListener("click", () => go(idx - 1, true));
    $(".carousel__arrow--next", root)?.addEventListener("click", () => go(idx + 1, true));
    root.addEventListener("mouseenter", () => clearInterval(timer));
    root.addEventListener("mouseleave", restart);
    swipe(root, (d) => go(idx + d, true));
    go(0); restart();
  })();

  /* ---------- Materiais (acordeão) ---------- */
  const stones = $$(".stone");
  const openStone = (s) => stones.forEach((x) => x.classList.toggle("is-open", x === s));
  stones.forEach((s) => {
    s.addEventListener("click", () => openStone(s));
    if (finePointer) s.addEventListener("mouseenter", () => openStone(s));
    s.setAttribute("tabindex", "0");
    s.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openStone(s); } });
  });

  /* ---------- Portfólio ---------- */
  const gallery = $("#gallery");
  const filtersEl = $(".filters");
  const slotTextures = ["calacatta-oro", "taj-mahal", "crema-marfil", "nero-marquina", "ultracompacta", "sao-gabriel"];
  const showSlots = typeof MOSTRAR_ESPACOS_RESERVADOS === "undefined" || MOSTRAR_ESPACOS_RESERVADOS;
  const items = (typeof PORTFOLIO !== "undefined" ? PORTFOLIO : []).filter((it) => it.imagem || showSlots);
  const CATS = typeof CATEGORIAS !== "undefined" ? CATEGORIAS : {};
  const catLabel = (c) => CATS[c] || (c ? c.charAt(0).toUpperCase() + c.slice(1) : "");

  let slotN = 0;
  const cards = items.map((it) => {
    const el = document.createElement(it.imagem ? "button" : "div");
    el.className = "work" + (it.tamanho ? " work--" + it.tamanho : "");
    if (it.imagem) {
      el.type = "button";
      el.setAttribute("aria-label", `Ampliar: ${it.titulo || ""}`);
      el.innerHTML = `<img src="${esc(it.imagem)}" alt="${esc(it.titulo)}" loading="lazy" />
        <div class="work__info"><span>${esc(catLabel(it.categoria))}</span><h3>${esc(it.titulo)}</h3></div>`;
    } else {
      el.classList.add("work--slot");
      el.style.backgroundImage = `url('assets/stones/${slotTextures[slotN++ % slotTextures.length]}.jpg')`;
      el.innerHTML = `<div class="slot__inner">
          <svg viewBox="0 0 34 34" aria-hidden="true"><rect x="3" y="7" width="28" height="21" rx="3"/><path d="M3 24 L12 16 L19 22 L24 18 L31 24"/><circle cx="24" cy="13" r="2.2"/></svg>
          <span>${esc(catLabel(it.categoria))}</span><h3>${esc(it.titulo || "Novo projeto")}</h3><p>Foto em breve</p></div>`;
    }
    gallery.appendChild(el);
    return { el, it };
  });

  const usedCats = Object.keys(CATS).filter((c) => items.some((i) => i.categoria === c))
    .concat([...new Set(items.map((i) => i.categoria))].filter((c) => c && !(c in CATS)));
  const mkFilter = (key, label, count) => {
    const b = document.createElement("button");
    b.className = "filter" + (key === "*" ? " is-active" : "");
    b.type = "button"; b.dataset.f = key; b.setAttribute("role", "tab");
    b.innerHTML = `${esc(label)}<sup>${count}</sup>`;
    filtersEl.appendChild(b);
  };
  mkFilter("*", "Todos", items.length);
  usedCats.forEach((c) => mkFilter(c, catLabel(c), items.filter((i) => i.categoria === c).length));

  filtersEl.addEventListener("click", (e) => {
    const b = e.target.closest(".filter"); if (!b) return;
    $$(".filter", filtersEl).forEach((x) => x.classList.toggle("is-active", x === b));
    const f = b.dataset.f;
    let n = 0;
    cards.forEach(({ el, it }) => {
      const show = f === "*" || it.categoria === f;
      el.classList.remove("is-in");
      el.classList.toggle("is-hidden", !show);
      if (show) { const k = n++; setTimeout(() => el.classList.add("is-in"), 40 + Math.min(k, 8) * 55); }
    });
  });

  const workObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const idx = cards.findIndex((c) => c.el === e.target);
        setTimeout(() => e.target.classList.add("is-in"), (idx % 4) * 80);
        workObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  cards.forEach((c) => workObs.observe(c.el));

  /* ---------- Lightbox: abertura suave + zoom com o cursor ---------- */
  (function lightbox() {
    const lb = $("#lightbox");
    const frame = $(".lb-frame", lb);
    const img = $("img", frame);
    const EASE = "cubic-bezier(.22,.8,.2,1)";
    let list = [], idx = 0, busy = false, open = false;

    /* zoom */
    let zoom = 1, zoomTarget = 2.2, ox = 50, oy = 50, tx = 50, ty = 50, raf = null;
    const loop = () => {
      ox += (tx - ox) * 0.16; oy += (ty - oy) * 0.16;
      img.style.transformOrigin = `${ox}% ${oy}%`;
      raf = Math.abs(tx - ox) + Math.abs(ty - oy) > 0.05 ? requestAnimationFrame(loop) : null;
    };
    const aim = (cx, cy) => {
      const r = frame.getBoundingClientRect();
      tx = Math.min(100, Math.max(0, ((cx - r.left) / r.width) * 100));
      ty = Math.min(100, Math.max(0, ((cy - r.top) / r.height) * 100));
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const setZoom = (z) => {
      zoom = z;
      img.style.transform = z > 1 ? `scale(${z})` : "";
      frame.classList.toggle("is-zoom", z > 1);
    };
    const resetZoom = () => { setZoom(1); tx = ty = ox = oy = 50; img.style.transformOrigin = "50% 50%"; };

    if (finePointer) {
      frame.addEventListener("mouseenter", (e) => { if (busy) return; ox = tx; oy = ty; aim(e.clientX, e.clientY); ox = tx; oy = ty; setZoom(zoomTarget); });
      frame.addEventListener("mousemove", (e) => { if (busy) return; aim(e.clientX, e.clientY); if (zoom === 1) setZoom(zoomTarget); });
      frame.addEventListener("mouseleave", () => setZoom(1));
      frame.addEventListener("wheel", (e) => {
        e.preventDefault();
        zoomTarget = Math.min(4, Math.max(1.3, zoomTarget * (e.deltaY < 0 ? 1.12 : 0.89)));
        aim(e.clientX, e.clientY); setZoom(zoomTarget);
      }, { passive: false });
      frame.addEventListener("click", () => setZoom(zoom > 1 ? 1 : zoomTarget));
    } else {
      // celular: toque duplo para ampliar, arraste para mover
      let lastTap = 0;
      frame.addEventListener("touchend", (e) => {
        const now = Date.now(), t = e.changedTouches[0];
        if (now - lastTap < 300) { aim(t.clientX, t.clientY); ox = tx; oy = ty; setZoom(zoom > 1 ? 1 : 2.5); }
        lastTap = now;
      });
      frame.addEventListener("touchmove", (e) => {
        if (zoom > 1 && e.touches.length === 1) { e.preventDefault(); aim(e.touches[0].clientX, e.touches[0].clientY); }
      }, { passive: false });
    }

    const fill = (it) => {
      $(".lb-cat", lb).textContent = catLabel(it.categoria);
      $(".lb-title", lb).textContent = it.titulo || "";
      $(".lb-desc", lb).textContent = it.descricao || "";
      $(".lightbox__count", lb).textContent = `${String(idx + 1).padStart(2, "0")} / ${String(list.length).padStart(2, "0")}`;
    };
    const load = async (src) => { img.src = src; try { await img.decode(); } catch (e) { /* ok */ } };
    const thumbOf = (it) => cards.find((c) => c.it === it)?.el;
    const flipFrom = (el) => {
      const a = el.getBoundingClientRect(), b = frame.getBoundingClientRect();
      const s = Math.max(a.width / b.width, a.height / b.height);
      const dx = a.left + a.width / 2 - (b.left + b.width / 2);
      const dy = a.top + a.height / 2 - (b.top + b.height / 2);
      // recorta a imagem para ter o mesmo formato da miniatura
      const cw = (b.width - a.width / s) / 2 / b.width * 100, ch = (b.height - a.height / s) / 2 / b.height * 100;
      return { t: `translate(${dx}px, ${dy}px) scale(${s})`, clip: `inset(${Math.max(0, ch)}% ${Math.max(0, cw)}% round ${20 / s}px)` };
    };

    const openLb = async (it) => {
      if (busy) return; busy = true;
      const active = $(".filter.is-active", filtersEl)?.dataset.f || "*";
      list = items.filter((i) => i.imagem && (active === "*" || i.categoria === active));
      idx = Math.max(0, list.indexOf(it));
      resetZoom(); fill(it);
      frame.style.transition = "none"; frame.style.opacity = "0";
      await load(it.imagem);
      lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false");
      document.body.classList.add("lb-open"); open = true;
      await nextFrame();
      const th = thumbOf(it);
      if (th) { const f = flipFrom(th); frame.style.transform = f.t; frame.style.clipPath = f.clip; }
      frame.style.opacity = "1";
      await nextFrame();
      frame.style.transition = `transform .75s ${EASE}, clip-path .75s ${EASE}, opacity .3s`;
      frame.style.transform = ""; frame.style.clipPath = "inset(0% 0% round 20px)";
      await wait(760); busy = false;
    };

    const closeLb = async () => {
      if (!open || busy) return; busy = true;
      resetZoom();
      const th = thumbOf(list[idx]);
      const r = th?.getBoundingClientRect();
      const visible = r && !th.classList.contains("is-hidden") && r.bottom > 0 && r.top < innerHeight;
      frame.style.transition = `transform .6s ${EASE}, clip-path .6s ${EASE}, opacity .45s ${EASE}`;
      if (visible) { const f = flipFrom(th); frame.style.transform = f.t; frame.style.clipPath = f.clip; }
      else { frame.style.transform = "scale(.92)"; frame.style.opacity = "0"; }
      lb.classList.remove("is-open");
      await wait(visible ? 600 : 450);
      lb.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lb-open");
      frame.style.transition = "none"; frame.style.transform = ""; frame.style.clipPath = ""; frame.style.opacity = "0";
      open = false; busy = false;
    };

    const step = async (d) => {
      if (busy || list.length < 2) return; busy = true;
      resetZoom();
      frame.style.transition = `transform .35s ${EASE}, opacity .3s ${EASE}`;
      frame.style.transform = `translateX(${-d * 60}px) scale(.97)`; frame.style.opacity = "0";
      idx = (idx + d + list.length) % list.length;
      const it = list[idx];
      await Promise.all([wait(320), load(it.imagem)]);
      fill(it);
      frame.style.transition = "none"; frame.style.transform = `translateX(${d * 60}px) scale(.97)`;
      await nextFrame();
      frame.style.transition = `transform .6s ${EASE}, opacity .5s ${EASE}`;
      frame.style.transform = ""; frame.style.opacity = "1";
      await wait(400); busy = false;
    };

    cards.forEach(({ el, it }) => { if (it.imagem) el.addEventListener("click", () => openLb(it)); });
    $(".lightbox__close", lb).addEventListener("click", closeLb);
    $(".lightbox__prev", lb).addEventListener("click", () => step(-1));
    $(".lightbox__next", lb).addEventListener("click", () => step(1));
    $(".lightbox__bg", lb).addEventListener("click", closeLb);
    $(".lightbox__stage", lb).addEventListener("click", (e) => { if (e.target === e.currentTarget) closeLb(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { closeLb(); toggleMenu(false); }
      if (!open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    });
    swipe($(".lightbox__stage", lb), step, () => zoom === 1);
  })();

  /* ---------- Depoimentos ---------- */
  (function testimonials() {
    const track = $("#testimonials");
    const showSlots = typeof MOSTRAR_DEPOIMENTOS_RESERVADOS === "undefined" || MOSTRAR_DEPOIMENTOS_RESERVADOS;
    const list = (typeof DEPOIMENTOS !== "undefined" ? DEPOIMENTOS : []).filter((d) => (d.texto && d.texto.trim()) || showSlots);
    if (!list.length) { $("#depoimentos").remove(); $$('a[href="#depoimentos"]').forEach((a) => a.remove()); return; }
    list.forEach((d) => {
      const c = document.createElement("article");
      if (d.texto && d.texto.trim()) {
        const n = Math.max(0, Math.min(5, Math.round(d.nota ?? 5)));
        c.className = "t-card";
        c.innerHTML = `
          <div class="t-stars" aria-label="${n} de 5 estrelas">${"★".repeat(n)}<span class="off">${"★".repeat(5 - n)}</span></div>
          <div class="t-quote" aria-hidden="true">“</div>
          <p class="t-text">${esc(d.texto)}</p>
          ${d.foto ? `<div class="t-photo"><img src="${esc(d.foto)}" alt="Projeto de ${esc(d.nome)}" loading="lazy"></div>` : ""}
          <div class="t-person"><span class="t-avatar">${esc((d.nome || "?").charAt(0))}</span>
            <div><strong>${esc(d.nome)}</strong><span>${esc([d.projeto, d.cidade].filter(Boolean).join(" · "))}</span></div></div>`;
      } else {
        c.className = "t-card t-card--slot";
        c.innerHTML = `<svg viewBox="0 0 36 36" aria-hidden="true"><path d="M6 8h24a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H15l-7 5v-5H6a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3z"/><path d="M11 15h14M11 20h9"/></svg>
          <strong>Espaço para depoimento</strong><p>Em breve, a opinião de quem já fez projeto com a Imperial.</p>`;
      }
      track.appendChild(c);
    });

    const foot = $("#t-foot");
    const dots = document.createElement("div"); dots.className = "t-dots"; foot.appendChild(dots);
    if (C.linkAvaliacaoGoogle) foot.insertAdjacentHTML("beforeend", `<a class="t-google" href="${esc(C.linkAvaliacaoGoogle)}" target="_blank" rel="noopener">Ver avaliações no Google →</a>`);

    const viewport = $(".t-viewport");
    const cardsEl = $$(".t-card", track);
    let idx = 0, maxIdx = 0;
    const measure = () => {
      const gap = 16, w = cardsEl[0].getBoundingClientRect().width + gap;
      const pad = parseFloat(getComputedStyle(track).paddingLeft);
      const visible = Math.max(1, Math.floor((viewport.clientWidth - pad * 2 + gap) / w));
      maxIdx = Math.max(0, cardsEl.length - visible);
      dots.innerHTML = "";
      for (let i = 0; i <= maxIdx; i++) {
        const b = document.createElement("button"); b.setAttribute("aria-label", `Ir para depoimento ${i + 1}`);
        b.addEventListener("click", () => go(i)); dots.appendChild(b);
      }
      go(Math.min(idx, maxIdx));
      return w;
    };
    let cw = 0;
    const go = (i) => {
      idx = Math.max(0, Math.min(maxIdx, i));
      track.style.transform = `translateX(${-idx * cw}px)`;
      $$("button", dots).forEach((d, k) => d.classList.toggle("is-active", k === idx));
      $$(".t-controls .round-btn").forEach((b) => { b.style.opacity = (b.dataset.dir === "-1" ? idx === 0 : idx === maxIdx) ? ".35" : "1"; });
    };
    const remeasure = () => { cw = cardsEl[0].getBoundingClientRect().width + 16; measure(); };
    remeasure();
    window.addEventListener("resize", () => { clearTimeout(remeasure.t); remeasure.t = setTimeout(remeasure, 150); });
    $$(".t-controls .round-btn").forEach((b) => b.addEventListener("click", () => go(idx + +b.dataset.dir)));
    swipe(viewport, (d) => go(idx + d));
    // arrastar com o mouse
    let dragX = null;
    viewport.addEventListener("mousedown", (e) => { dragX = e.clientX; viewport.classList.add("is-drag"); });
    window.addEventListener("mouseup", (e) => {
      if (dragX === null) return;
      const dx = e.clientX - dragX; dragX = null; viewport.classList.remove("is-drag");
      if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
    });
  })();

  /* ---------- Localização: mapa + vídeo ---------- */
  (function location() {
    const end = C.endereco || {};
    const q = encodeURIComponent(end.busca || [end.linha1, end.linha2].filter(Boolean).join(", "));
    $("#addr1").textContent = end.linha1 || "";
    $("#addr2").textContent = end.linha2 || "";
    $("#footer-addr").textContent = [end.linha1, end.linha2].filter(Boolean).join(" · ");
    $("#map-frame").src = `https://www.google.com/maps?q=${q}&hl=pt-BR&z=16&output=embed`;
    $("#btn-route").href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
    $("#btn-maps").href = `https://www.google.com/maps/search/?api=1&query=${q}`;
    $("#btn-waze").href = `https://waze.com/ul?q=${q}&navigate=yes`;

    const hours = (C.horario || []).filter(Boolean);
    if (hours.length) { $("#hours").innerHTML = hours.map(esc).join("<br>"); $("#hours-card").hidden = false; }

    const box = $("#howto-video");
    const v = (C.videoComoChegar || "").trim();
    const yt = v.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
    if (yt) {
      box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0" title="Como chegar na Imperial Marmoraria" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else if (v) {
      box.innerHTML = `<video src="${esc(v)}" controls playsinline preload="metadata" ${C.videoCapa ? `poster="${esc(C.videoCapa)}"` : ""}></video>`;
    } else {
      box.innerHTML = `<div class="video-slot">
        <span class="video-slot__play"><svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z"/></svg></span>
        <strong>Vídeo em breve</strong><span>O passo a passo para chegar até a marmoraria.</span></div>`;
    }
  })();

  /* ---------- Contatos ---------- */
  const cons = C.consultoras || [];
  const consEl = $("#consultants");
  cons.forEach((c) => {
    const a = document.createElement("a");
    a.className = "consultant reveal";
    a.href = waLink(c.whatsapp); a.target = "_blank"; a.rel = "noopener";
    a.innerHTML = `<span class="consultant__avatar">${esc(c.nome.charAt(0))}</span>
      <span><small>${esc(c.cargo || "Consultora")}</small><strong>${esc(c.nome)}</strong><em>Conversar no WhatsApp</em></span>`;
    consEl.appendChild(a);
  });
  observeReveal($$(".consultant"));

  const social = $("#social");
  if (C.instagram) social.insertAdjacentHTML("beforeend", `<a href="${esc(C.instagram)}" target="_blank" rel="noopener">Instagram</a>`);
  if (C.facebook) social.insertAdjacentHTML("beforeend", `<a href="${esc(C.facebook)}" target="_blank" rel="noopener">Facebook</a>`);

  const fc = $("#footer-contacts");
  cons.forEach((c) => fc.insertAdjacentHTML("beforeend", `<a href="${waLink(c.whatsapp)}" target="_blank" rel="noopener">WhatsApp · ${esc(c.nome)}</a>`));
  if (C.instagram) fc.insertAdjacentHTML("beforeend", `<a href="${esc(C.instagram)}" target="_blank" rel="noopener">Instagram</a>`);

  const waFloat = $("#wa-float");
  if (cons[0]) { waFloat.href = waLink(cons[0].whatsapp); waFloat.target = "_blank"; waFloat.rel = "noopener"; }

  /* ---------- Formulário → WhatsApp ---------- */
  const formTo = $("#form-to");
  cons.forEach((c, i) => formTo.insertAdjacentHTML("beforeend",
    `<label class="chip"><input type="radio" name="para" value="${i}" ${i === 0 ? "checked" : ""} /><span>${esc(c.nome)}</span></label>`));

  const form = $("#form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = $(".form__msg", form);
    let ok = true;
    ["nome", "telefone", "ambiente"].forEach((n) => {
      const f = form.elements[n];
      const bad = !f.value.trim();
      f.closest(".field").classList.toggle("is-error", bad);
      if (bad) ok = false;
    });
    if (!ok) { msg.textContent = "Preencha nome, WhatsApp e ambiente, por favor."; return; }
    msg.textContent = "";
    const c = cons[+(form.elements.para?.value) || 0];
    if (!c) return;
    const text =
      `Olá, ${c.nome}! Vim pelo site da Imperial Marmoraria.\n\n` +
      `*Nome:* ${form.elements.nome.value.trim()}\n` +
      `*WhatsApp:* ${form.elements.telefone.value.trim()}\n` +
      `*Ambiente:* ${form.elements.ambiente.value}\n` +
      (form.elements.mensagem.value.trim() ? `*Projeto:* ${form.elements.mensagem.value.trim()}\n` : "");
    window.open(waLink(c.whatsapp, text), "_blank", "noopener");
  });
  $$(".field input, .field select", form).forEach((f) => f.addEventListener("input", () => f.closest(".field").classList.remove("is-error")));
})();
