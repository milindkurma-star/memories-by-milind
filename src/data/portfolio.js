function normalizeCategory(raw) {
  const cat = raw.toLowerCase().trim();
  if (cat.startsWith("port")) return "Portraits";
  if (cat.startsWith("pet")) return "Pets";
  if (cat.startsWith("land") || cat.startsWith("mount") || cat.startsWith("sun") || cat.startsWith("sus")) return "Landscapes";
  if (cat.startsWith("life") || cat.startsWith("friend") || cat.startsWith("coup") || cat.startsWith("cand")) return "Lifestyle";
  if (cat.startsWith("event")) return "Events";
  if (cat.startsWith("bts") || cat.startsWith("behind") || cat.startsWith("setup")) return "BTS";
  return "Portraits";
}

function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function parseFilenameToPortfolioItem(filename, src) {
  let category = "Portraits";
  let title = "";
  let location = "Seattle, WA";
  let camera = "Sony Alpha 6400";

  const name = filename.trim();

  if (name.includes("_")) {
    const parts = name.split("_").map(p => p.trim());
    if (parts[0]) category = normalizeCategory(parts[0]);
    if (parts[1]) {
      title = parts[1];
    } else {
      title = name.split(/[_-]/).map(capitalize).join(" ");
    }
    if (parts[2]) location = parts[2];
    if (parts[3]) camera = parts[3];
  } else {
    const parts = name.split("-").map(p => p.trim());
    if (parts[0]) category = normalizeCategory(parts[0]);
    const titleParts = parts.filter(p => isNaN(p) && p.toLowerCase() !== "01" && p.toLowerCase() !== "02" && p.toLowerCase() !== "03");
    title = titleParts.map(capitalize).join(" ");
  }

  // Clean title by stripping trailing numeric suffixes (like _01, -01, _1, 1)
  title = title.replace(/\s*[-_]?\s*\d+\s*$/, "");
  // Normalize word capitalization
  title = title.split(/[ -]/).map(capitalize).join(" ");

  return {
    title,
    category,
    src,
    location,
    camera
  };
}

// Dynamically load ONLY real image formats (exclude SVG templates completely)
const placeholderModules = import.meta.glob("../assets/placeholders/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}", { eager: true });
const portfolioModules = import.meta.glob("../assets/portfolio/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}", { eager: true });

// Merge all imported modules
const allModules = { ...placeholderModules, ...portfolioModules };

const items = Object.entries(allModules).map(([path, module]) => {
  const filename = path.split("/").pop().replace(/\.[^/.]+$/, "");
  const src = module.default || module;
  return parseFilenameToPortfolioItem(filename, src);
});

// Interleave portrait (tall) and landscape/square (wide) shapes to distribute evenly across columns
function interleaveShapes(portfolioList) {
  const portraits = portfolioList.filter(item => item.category === "Portraits");
  const landscapes = portfolioList.filter(item => item.category !== "Portraits");

  const interleaved = [];
  let pIndex = 0;
  let lIndex = 0;

  while (pIndex < portraits.length || lIndex < landscapes.length) {
    if (pIndex < portraits.length) {
      interleaved.push(portraits[pIndex++]);
    }
    if (lIndex < landscapes.length) {
      interleaved.push(landscapes[lIndex++]);
    }
  }

  return interleaved;
}

export const portfolioItems = interleaveShapes(items);

// Dynamically compute active categories based on uploaded files
const activeCategoriesSet = new Set(items.map(item => item.category));
const order = ["Portraits", "Pets", "Landscapes", "Lifestyle", "Events", "BTS"];
const presentCategories = order.filter(cat => activeCategoriesSet.has(cat));

export const categories = ["All", ...presentCategories];
