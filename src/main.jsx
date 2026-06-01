import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart, Mountain, PawPrint, Sparkles, Mail, ArrowUpRight, Menu, X, MapPin, Clock, Aperture } from "lucide-react";
import { categories, portfolioItems } from "./data/portfolio";
import "./styles.css";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

function Logo() {
  return (
    <a href="#top" className="logo-wrap" aria-label="Memories by Milind home">
      <div className="logo-camera">
        <Camera size={22} />
        <span>m</span>
      </div>
      <div className="logo-text">
        <strong>memories</strong>
        <small>by milind</small>
      </div>
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Portfolio", "Story", "Services", "Experience", "Contact"];
  return (
    <header className="nav-shell">
      <Logo />
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={open ? "nav-links open" : "nav-links"}>
        {links.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero({ onBookClick }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grain" />
      <motion.div
        className="hero-inner"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <motion.div className="hero-copy" variants={fadeUp}>
          <span className="eyebrow">Seattle • Bellevue • Travel</span>
          <h1>
            Capturing Moments.
            <br />
            Creating Memories.
          </h1>
          <p>
            Premium, warm, cinematic photography for portraits, pets, lifestyle stories,
            sunsets, mountains, and intimate events.
          </p>
          <div className="hero-actions">
            <a className="button primary magnetic" href="#portfolio">
              View Portfolio <ArrowUpRight size={18} />
            </a>
            <button className="button ghost magnetic" onClick={onBookClick}>
              Book a Session
            </button>
          </div>
        </motion.div>

        <motion.div className="hero-art" variants={fadeUp}>
          <div className="photo-stack">
            <div className="photo-card main-card">
              <span className="floating-label">Golden hour stories</span>
            </div>
            <div className="mini-card top">
              <PawPrint size={20} />
              Pets
            </div>
            <div className="mini-card bottom">
              <Mountain size={20} />
              Sunsets
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="signature-watermark">memories</div>
    </section>
  );
}

function BrandStrip() {
  const items = [
    ["Emotive", <Heart size={18} />],
    ["Timeless", <Sparkles size={18} />],
    ["Authentic", <Aperture size={18} />],
    ["Storytelling", <Camera size={18} />],
    ["Adventurous", <Mountain size={18} />],
  ];
  return (
    <motion.section className="brand-strip" initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
      {items.map(([label, icon]) => (
        <motion.div variants={fadeUp} key={label}>
          {icon}
          <span>{label}</span>
        </motion.div>
      ))}
    </motion.section>
  );
}

function Portfolio() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    if (active === "All") return portfolioItems;
    return portfolioItems.filter((item) => item.category === active);
  }, [active]);

  return (
    <section className="section portfolio" id="portfolio">
      <motion.div className="section-heading" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <span className="eyebrow">Portfolio</span>
        <h2>Stories worth keeping.</h2>
        <p>
          A curated collection of natural portraits, pet photography, scenic landscapes, and lifestyle moments.
        </p>
      </motion.div>

      <div className="filters">
        {categories.map((category) => (
          <button
            key={category}
            className={active === category ? "filter active" : "filter"}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div className="gallery" layout>
        <AnimatePresence>
          {filtered.map((item, index) => (
            <motion.button
              layout
              className={`gallery-item item-${index % 5}`}
              key={item.title}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.42 }}
              onClick={() => setSelected(item)}
            >
              <img src={item.src} alt={item.title} />
              <span className="gallery-tag">{item.category}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="lightbox-card"
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button className="close" onClick={() => setSelected(null)}><X size={22} /></button>
              <img src={selected.src} alt={selected.title} />
              <div>
                <span className="eyebrow">{selected.category}</span>
                <h3>{selected.title}</h3>
                <ul style={{ marginTop: '20px' }}>
                  <li><MapPin size={16} /> {selected.location}</li>
                  <li><Camera size={16} /> {selected.camera}</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Story() {
  return (
    <section className="story section" id="story">
      <motion.div className="story-content" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <span className="eyebrow">The Story</span>
        <h2>Hi, I’m Milind.</h2>
        <p>
          I believe that memories are our most valuable possessions. Over time, details fade—the way a pet tilted their head, the exact warmth of a sunset on a mountain trail, or a spontaneous laugh shared with a loved one. That is why I started Memories by Milind: to capture and collect those fleeting moments before they slip away.
        </p>
        <p>
          Photography is more than just taking pictures; it is about preserving a feeling. My sessions are relaxed, natural, and story-driven, designed to make you feel completely comfortable. The best photos aren't staged; they are the ones where your real story shines through.
        </p>
        <a href="#contact" className="text-link">Start your session story →</a>
      </motion.div>

      <motion.div className="story-card" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <div className="lens-circle">
          <Camera size={46} />
        </div>
        <div className="story-stats">
          <div><strong>Sony</strong><span>Alpha 6400</span></div>
          <div><strong>Seattle • Bellevue</strong><span>Locations</span></div>
          <div><strong>Warm & Cinematic</strong><span>Aesthetic</span></div>
        </div>
      </motion.div>
    </section>
  );
}

function Services() {
  const services = [
    ["Mini Memories", "$75", "30 minutes • 10 edited photos", "Best for quick portraits, profile photos, and portfolio-building shoots."],
    ["Portrait Session", "$150", "60 minutes • 25 edited photos", "Your main package for individuals, grads, creators, and natural portraits."],
    ["Friends / Couple", "$200", "60–75 minutes • 30 edited photos", "For couples, friends, candid lifestyle, and memory-driven sessions."],
    ["Pet Session", "$125", "45 minutes • 15 edited photos", "Pet style"],
    ["Small Events", "From $250", "Custom timing", "Birthdays, proposals, intimate celebrations, and family gatherings."],
    ["Outdoor / Travel", "Custom", "Sunset or location-based", "Mountains, sunsets, lifestyle adventures, and creative concepts."],
  ];

  return (
    <section className="section services" id="services">
      <div className="section-heading">
        <span className="eyebrow">Services</span>
        <h2>Premium feel. Simple packages.</h2>
        <p>Transparent pricing designed to make professional storytelling accessible. Each package is tailored to preserve your genuine moments.</p>
      </div>

      <motion.div className="service-grid" initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
        {services.map(([name, price, meta, copy], index) => (
          <motion.article className={index === 1 ? "service-card featured" : "service-card"} variants={fadeUp} key={name}>
            <span className="service-number">0{index + 1}</span>
            <h3>{name}</h3>
            <p>{meta}</p>
            <small>{copy}</small>
            <strong>{price}</strong>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Experience() {
  const steps = [
    ["Plan", "We choose the mood, outfits, location, and best light."],
    ["Shoot", "Comfortable posing prompts and candid direction."],
    ["Edit", "Warm cinematic color with clean, natural skin tones."],
    ["Deliver", "A polished online gallery ready to download and share."],
  ];
  return (
    <section className="experience section" id="experience">
      <div className="section-heading">
        <span className="eyebrow">Client Experience</span>
        <h2>A smooth flow from first DM to final gallery.</h2>
      </div>
      <div className="timeline">
        {steps.map(([title, copy], i) => (
          <motion.div className="timeline-item" key={title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact({ onBookClick }) {
  return (
    <section className="contact section" id="contact">
      <motion.div className="contact-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="eyebrow">Book Memories by Milind</span>
        <h2>Let’s create something that still feels special years from now.</h2>
        <p>
          Start with the booking form below, or reach out directly via email or Instagram DM.
        </p>
        <div className="contact-actions">
          <button className="button primary" onClick={onBookClick}>
            <Sparkles size={18} /> Book & Intake Form
          </button>
          <a className="button ghost" href="mailto:milindkurma@gmail.com?subject=Photography%20Session%20Inquiry">
            <Mail size={18} /> Email: milindkurma@gmail.com
          </a>
          <a className="button ghost" href="https://instagram.com/_memories_by_m" target="_blank" rel="noreferrer">
            <Camera size={18} /> Instagram: @_memories_by_m
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Logo />
      <p>Portraits • Pets • Lifestyle • Sunsets • Events</p>
      <p>© {new Date().getFullYear()} Memories by Milind. All rights reserved.</p>
    </footer>
  );
}

function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Portraits",
    date: "",
    location: "",
    vision: "",
    iceName: "",
    iceRelationship: "",
    icePhone: "",
    iceNotes: ""
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (currentStep) => {
    const nextErrors = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) nextErrors.name = "Name is required";
      if (!formData.email.trim()) {
        nextErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        nextErrors.email = "Invalid email format";
      }
      if (!formData.phone.trim()) nextErrors.phone = "Phone number is required";
    } else if (currentStep === 2) {
      if (!formData.date) nextErrors.date = "Preferred date is required";
      if (!formData.location.trim()) nextErrors.location = "Location preference is required";
    } else if (currentStep === 3) {
      if (!formData.iceName.trim()) nextErrors.iceName = "Emergency contact name is required";
      if (!formData.iceRelationship.trim()) nextErrors.iceRelationship = "Relationship is required";
      if (!formData.icePhone.trim()) nextErrors.icePhone = "Emergency contact phone is required";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleIframeLoad = () => {
    if (submitting) {
      setSubmitting(false);
      setStep(4);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setSubmitting(true);
    setSubmitError("");

    setTimeout(() => {
      const form = document.getElementById("formsubmit-form");
      if (form) {
        form.submit();
      } else {
        setSubmitError("Form connection error. Please copy to clipboard instead.");
        setSubmitting(false);
      }
    }, 50);
  };

  const handleCopyToClipboard = () => {
    const textToCopy = `Client Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCategory: ${formData.category}\nDate: ${formData.date}\nLocation: ${formData.location}\nVision: ${formData.vision}\nICE Contact: ${formData.iceName} (${formData.iceRelationship})\nICE Phone: ${formData.icePhone}\nICE Notes: ${formData.iceNotes}`;
    navigator.clipboard.writeText(textToCopy);
    alert("Inquiry details copied to clipboard!");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "Portraits",
      date: "",
      location: "",
      vision: "",
      iceName: "",
      iceRelationship: "",
      icePhone: "",
      iceNotes: ""
    });
    setErrors({});
    setSubmitting(false);
    setSubmitError("");
    setStep(1);
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => { resetForm(); onClose(); }}
      >
        <motion.div 
          className="modal-container"
          initial={{ scale: 0.94, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.94, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={() => { resetForm(); onClose(); }} aria-label="Close modal">
            <X size={20} />
          </button>

          <div className="modal-header">
            <h3>Book a Session</h3>
            <p>Please fill out your session inquiry and safety details below.</p>
          </div>

          <div className="modal-form-content">
            {step < 4 && (
              <div className="form-steps-indicator">
                <div className={`step-dot ${step >= 1 ? "active" : ""}`}><span>1</span><label>Client Info</label></div>
                <div className={`step-line ${step >= 2 ? "active" : ""}`}></div>
                <div className={`step-dot ${step >= 2 ? "active" : ""}`}><span>2</span><label>Shoot Vision</label></div>
                <div className={`step-line ${step >= 3 ? "active" : ""}`}></div>
                <div className={`step-dot ${step >= 3 ? "active" : ""}`}><span>3</span><label>ICE Safety</label></div>
              </div>
            )}

            {step === 1 && (
              <div className="form-step-pane">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className={`form-input ${errors.name ? "error" : ""}`} 
                    placeholder="e.g., Jane Doe"
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className={`form-input ${errors.email ? "error" : ""}`}
                    placeholder="e.g., jane@example.com"
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    className={`form-input ${errors.phone ? "error" : ""}`}
                    placeholder="e.g., (206) 555-0199"
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
                <div className="form-navigation">
                  <button className="button primary" onClick={handleNext}>Next: Shoot Details</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-step-pane">
                <div className="form-group">
                  <label className="form-label">Shoot Category</label>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    className="form-select"
                  >
                    <option value="Portraits">Portraits</option>
                    <option value="Pets">Pets</option>
                    <option value="Lifestyle">Lifestyle / Couples</option>
                    <option value="Landscapes">Landscapes</option>
                    <option value="Events">Small Events</option>
                    <option value="BTS">BTS / Setup</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Date *</label>
                  <input 
                    type="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleChange} 
                    className={`form-input ${errors.date ? "error" : ""}`}
                  />
                  {errors.date && <span className="error-text">{errors.date}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Location / Area *</label>
                  <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange} 
                    className={`form-input ${errors.location ? "error" : ""}`}
                    placeholder="e.g., Bellevue Downtown Park, Discovery Park"
                  />
                  {errors.location && <span className="error-text">{errors.location}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Vision, Outfits & Ideas (Optional)</label>
                  <textarea 
                    name="vision" 
                    value={formData.vision} 
                    onChange={handleChange} 
                    className="form-textarea"
                    placeholder="Describe what you want to capture, styling ideas, number of participants, etc."
                    rows={3}
                  />
                </div>
                <div className="form-navigation">
                  <button className="button ghost" onClick={handleBack}>Back</button>
                  <button className="button primary" onClick={handleNext}>Next: Safety Info</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="form-step-pane">
                <div className="ice-header">
                  <Heart size={16} className="heart-icon" />
                  <span>In Case of Emergency (ICE) Details</span>
                </div>
                <p className="ice-sub">
                  Because we do active outdoor sessions, we collect ICE contacts to keep you safe.
                </p>

                <div className="form-group">
                  <label className="form-label">Emergency Contact Name *</label>
                  <input 
                    type="text" 
                    name="iceName" 
                    value={formData.iceName} 
                    onChange={handleChange} 
                    className={`form-input ${errors.iceName ? "error" : ""}`}
                    placeholder="e.g., John Doe"
                  />
                  {errors.iceName && <span className="error-text">{errors.iceName}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Relationship to Client *</label>
                  <input 
                    type="text" 
                    name="iceRelationship" 
                    value={formData.iceRelationship} 
                    onChange={handleChange} 
                    className={`form-input ${errors.iceRelationship ? "error" : ""}`}
                    placeholder="e.g., Spouse, Parent, Friend"
                  />
                  {errors.iceRelationship && <span className="error-text">{errors.iceRelationship}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Emergency Phone Number *</label>
                  <input 
                    type="tel" 
                    name="icePhone" 
                    value={formData.icePhone} 
                    onChange={handleChange} 
                    className={`form-input ${errors.icePhone ? "error" : ""}`}
                    placeholder="e.g., (206) 555-9988"
                  />
                  {errors.icePhone && <span className="error-text">{errors.icePhone}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Special Medical Notes / Safety Prep (Optional)</label>
                  <textarea 
                    name="iceNotes" 
                    value={formData.iceNotes} 
                    onChange={handleChange} 
                    className="form-textarea"
                    placeholder="Any relevant allergies, asthma, or accessibility details to be aware of during outdoor shoots."
                    rows={2}
                  />
                </div>
                {submitError && (
                  <p className="error-text" style={{ marginTop: "12px", textAlign: "center", fontSize: "13px" }}>
                    {submitError}
                  </p>
                )}
                <div className="form-navigation">
                  <button type="button" className="button ghost" onClick={handleBack} disabled={submitting}>Back</button>
                  <button type="submit" className="button primary" disabled={submitting}>
                    {submitting ? "Sending..." : "Submit Inquiry"}
                  </button>
                </div>
              </form>
            )}

            {step === 4 && (
              <div className="success-pane">
                <div className="success-icon-wrap">
                  <Sparkles size={40} />
                </div>
                <h4>Inquiry Sent!</h4>
                <p>
                  Your details have been sent directly to <strong>milindkurma@gmail.com</strong>. 
                  We will get back to you shortly to confirm your booking!
                </p>
                <div className="success-actions">
                  <button className="button primary" onClick={handleCopyToClipboard}>
                    Copy to Clipboard (Fallback)
                  </button>
                  <button className="button ghost" onClick={() => { resetForm(); onClose(); }}>
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </div>

          <form 
            id="formsubmit-form"
            action="https://formsubmit.co/milindkurma@gmail.com" 
            method="POST" 
            target="formsubmit-iframe"
            style={{ display: "none" }}
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="Name" value={formData.name} />
            <input type="hidden" name="Email" value={formData.email} />
            <input type="hidden" name="Phone" value={formData.phone} />
            <input type="hidden" name="Session Category" value={formData.category} />
            <input type="hidden" name="Preferred Date" value={formData.date} />
            <input type="hidden" name="Location Preference" value={formData.location} />
            <input type="hidden" name="Shoot Vision" value={formData.vision || "N/A"} />
            <input type="hidden" name="Emergency Contact Name" value={formData.iceName} />
            <input type="hidden" name="Emergency Contact Relationship" value={formData.iceRelationship} />
            <input type="hidden" name="Emergency Contact Phone" value={formData.icePhone} />
            <input type="hidden" name="Special Instructions / Medical Notes" value={formData.iceNotes || "N/A"} />
          </form>
          <iframe 
            name="formsubmit-iframe" 
            id="formsubmit-iframe" 
            style={{ display: "none" }}
            onLoad={handleIframeLoad}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  return (
    <>
      <Navbar />
      <main>
        <Hero onBookClick={() => setBookingOpen(true)} />
        <BrandStrip />
        <Portfolio />
        <Story />
        <Services />
        <Experience />
        <Contact onBookClick={() => setBookingOpen(true)} />
      </main>
      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
