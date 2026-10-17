const WA_NUMBER = "919607721244";

// ===== Top bar ticker =====
const tickerItems = document.querySelectorAll(".ticker-item");
let tickerIndex = 0;
setInterval(() => {
  tickerItems[tickerIndex].classList.remove("active");
  tickerIndex = (tickerIndex + 1) % tickerItems.length;
  tickerItems[tickerIndex].classList.add("active");
}, 3000);

// ===== Mobile menu =====
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");
const toggleMenu = (open) => {
  mobileMenu.classList.toggle("open", open);
  overlay.classList.toggle("show", open);
};
document.getElementById("menuToggle").addEventListener("click", () => toggleMenu(true));
document.getElementById("mobileClose").addEventListener("click", () => toggleMenu(false));
overlay.addEventListener("click", () => toggleMenu(false));
mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

// ===== Header shadow, back-to-top =====
const header = document.getElementById("header");
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 20);
  toTop.classList.toggle("show", y > 600);
});

// ===== Test catalogue =====
const tests = [
  ["CBC (Complete Blood Count)", "fa-droplet", "Blood"],
  ["Blood Sugar – Fasting / PP", "fa-droplet", "Blood"],
  ["HbA1c", "fa-droplet", "Diabetes"],
  ["Lipid Profile", "fa-heart-pulse", "Heart"],
  ["Liver Function Test (LFT)", "fa-vial", "Blood"],
  ["Kidney Function Test (KFT)", "fa-vial", "Blood"],
  ["Thyroid Profile (T3, T4, TSH)", "fa-dna", "Hormone"],
  ["TSH", "fa-dna", "Hormone"],
  ["Vitamin D", "fa-sun", "Vitamin"],
  ["Vitamin B12", "fa-capsules", "Vitamin"],
  ["Urine Routine & Microscopy", "fa-flask", "Urine"],
  ["Urine Culture", "fa-flask", "Urine"],
  ["Sputum for AFB", "fa-lungs", "Sputum"],
  ["Widal Test", "fa-virus", "Fever"],
  ["Dengue NS1 / IgG / IgM", "fa-mosquito", "Fever"],
  ["Malaria Test", "fa-mosquito", "Fever"],
  ["ESR", "fa-droplet", "Blood"],
  ["Blood Group & Rh", "fa-droplet", "Blood"],
  ["Uric Acid", "fa-vial", "Blood"],
  ["Prolactin", "fa-dna", "Hormone"],
  ["FSH / LH", "fa-dna", "Hormone"],
  ["Testosterone", "fa-dna", "Hormone"],
  ["Beta hCG (Pregnancy)", "fa-person-pregnant", "Hormone"],
  ["Iron Studies", "fa-vial", "Blood"],
  ["C-Reactive Protein (CRP)", "fa-vial", "Fever"],
  ["Phosphorus Inorganic", "fa-vial", "Blood"],
  ["Full Body Profile – ₹1,999", "fa-notes-medical", "Package"],
  ["Essential Fever Profile – ₹1,800", "fa-temperature-high", "Package"],
];

const testGrid = document.getElementById("testGrid");
const renderTests = (q = "") => {
  if (!testGrid) return;
  const term = q.trim().toLowerCase();
  const list = tests.filter(([name, , cat]) => (name + " " + cat).toLowerCase().includes(term));
  testGrid.innerHTML = list.length
    ? list.map(([name, icon, cat]) => {
        const msg = encodeURIComponent(`Hello Surya Pathology Lab, I want to book: ${name}`);
        return `<a class="test-card" href="https://wa.me/${WA_NUMBER}?text=${msg}" target="_blank" rel="noopener">
          <i class="ti fa-solid ${icon}"></i>
          <div><h4>${name}</h4><small>${cat} · Book on WhatsApp</small></div>
        </a>`;
      }).join("")
    : `<p class="test-empty">Can't find that test? Call us at 96077 21244 – we probably do it.</p>`;
};
renderTests();
document.getElementById("testSearch")?.addEventListener("input", (e) => renderTests(e.target.value));

// ===== Enquiry form -> WhatsApp =====
const homeVisit = document.getElementById("homeVisit");
const addrWrap = document.getElementById("addrWrap");
homeVisit?.addEventListener("change", () => addrWrap.classList.toggle("hidden", !homeVisit.checked));

document.getElementById("enquiryForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  let msg = `Hello Surya Pathology Lab,%0A%0AName: ${encodeURIComponent(f.elements.name.value)}%0APhone: ${encodeURIComponent(f.phone.value)}%0AService: ${encodeURIComponent(f.service.value)}%0ABranch: ${encodeURIComponent(f.branch.value)}`;
  if (f.home.checked) msg += `%0AHome collection: Yes%0AAddress: ${encodeURIComponent(f.address.value)}`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
  f.reset();
  addrWrap.classList.add("hidden");
});

// ===== Services page sub-nav: highlight current section =====
const subLinks = document.querySelectorAll(".subnav a");
if (subLinks.length) {
  const subSections = [...subLinks].map((a) => document.querySelector(a.getAttribute("href")));
  window.addEventListener("scroll", () => {
    let current = 0;
    subSections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < 200) current = i; });
    subLinks.forEach((a, i) => a.classList.toggle("active", i === current));
  });
  subLinks[0].classList.add("active");
}

// ===== Gallery filters + lightbox =====
const gItems = document.querySelectorAll(".g-item");
document.querySelectorAll(".g-filters button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".g-filters button").forEach((b) => b.classList.toggle("active", b === btn));
    const f = btn.dataset.filter;
    gItems.forEach((it) => it.classList.toggle("hide", f !== "all" && it.dataset.cat !== f));
  });
});
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const lbImg = document.getElementById("lbImg");
  const lbCap = document.getElementById("lbCap");
  gItems.forEach((it) => it.addEventListener("click", () => {
    if (it.classList.contains("ph")) return; // placeholder, no photo yet
    const img = it.querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = it.querySelector("figcaption").textContent;
    lightbox.classList.add("open");
  }));
  // Posters on the Services page
  document.querySelectorAll("img[data-zoom]").forEach((img) => img.addEventListener("click", () => {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = "";
    lightbox.classList.add("open");
  }));
  const closeLb = () => lightbox.classList.remove("open");
  document.getElementById("lbClose").addEventListener("click", closeLb);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLb(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });
}

// ===== Reveal on scroll =====
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
