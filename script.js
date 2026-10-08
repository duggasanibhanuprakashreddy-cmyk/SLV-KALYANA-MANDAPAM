/**
 * SLV KALYANA MANDAPAM - Interactive Engine
 * Handles 3D Lighting Presets, Muhurtham Calendar, Gallery Lightbox,
 * Tariff Calculator, WhatsApp Booking Integration, and 3D Card Tilts.
 */

document.addEventListener('DOMContentLoaded', () => {
  initFairyLights();
  initLightingModes();
  initCalendar();
  initGallery();
  initTariffCalculator();
  init3DTilt();
  initMobileDrawer();
});

/* ==========================================================================
   1. FAIRY LIGHTS GARLAND GENERATOR
   ========================================================================== */
function initFairyLights() {
  const container = document.getElementById('fairyBulbs');
  if (!container) return;

  const bulbCount = Math.floor(window.innerWidth / 36);
  container.innerHTML = '';

  for (let i = 0; i < bulbCount; i++) {
    const bulb = document.createElement('div');
    bulb.className = 'fairy-bulb';
    bulb.style.animationDelay = `${(i * 0.18) % 2.5}s`;
    container.appendChild(bulb);
  }

  window.addEventListener('resize', debounce(() => {
    initFairyLights();
  }, 300));
}

/* ==========================================================================
   2. 3D LIGHTING & AMBIENCE SYSTEM (Inspired by kmpalace.com)
   ========================================================================== */
const lightingPresets = {
  twilight: {
    name: 'Twilight Royal Glow',
    bodyClass: 'lighting-twilight',
    imgSrc: 'assets/images/edited/exterior_night.jpg',
    caption: 'SLV Kalyana Mandapam - Twilight Architectural View with Glowing Fairy Lights & Grand Entrance',
    statusText: 'Currently Viewing: Twilight Fairy Glow (Exterior Night Lighting)'
  },
  gold: {
    name: 'Grand Gold Mandap',
    bodyClass: 'lighting-gold',
    imgSrc: 'assets/images/edited/main_hall.jpg',
    caption: 'SLV Kalyana Mandapam - Grand Marriage Hall with Royal Chandeliers & Festive Ambiance',
    statusText: 'Currently Viewing: Grand Gold Mandap (Main Hall Festive Lighting)'
  },
  daylight: {
    name: 'Daylight Elegance',
    bodyClass: 'lighting-daylight',
    imgSrc: 'assets/images/edited/dining_hall.jpg',
    caption: 'SLV Kalyana Mandapam - 500 Seater Dining Hall with Fresh Daylight & Cross Ventilation',
    statusText: 'Currently Viewing: Daylight Elegance (Spacious Dining Arena)'
  }
};

let currentPresetKey = 'twilight';

function initLightingModes() {
  const toggleBtn = document.getElementById('lightingToggleBtn');
  const dropdown = document.getElementById('lightingDropdown');

  if (toggleBtn && dropdown) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });

    const modeOpts = dropdown.querySelectorAll('.mode-opt');
    modeOpts.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        switchLightingPreset(mode);
        modeOpts.forEach(o => o.classList.remove('active'));
        btn.classList.add('active');
        dropdown.classList.remove('show');
      });
    });
  }
}

function switchLightingPreset(presetKey) {
  if (!lightingPresets[presetKey]) return;
  currentPresetKey = presetKey;
  const config = lightingPresets[presetKey];

  // Update Body Theme
  document.body.className = config.bodyClass;

  // Update Visualizer Image & Status
  const visualizerImg = document.getElementById('visualizerImg');
  const activeModeText = document.getElementById('activeModeText');
  const lightingLabel = document.querySelector('.lighting-label');

  if (visualizerImg) {
    visualizerImg.style.opacity = '0.4';
    setTimeout(() => {
      visualizerImg.src = config.imgSrc;
      visualizerImg.alt = config.caption;
      visualizerImg.style.opacity = '1';
    }, 200);
  }

  if (activeModeText) {
    activeModeText.textContent = config.statusText;
  }

  if (lightingLabel) {
    lightingLabel.textContent = config.name;
  }

  // Update Preset Buttons in Section
  const presetBtns = document.querySelectorAll('.lighting-preset-btn');
  presetBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-preset') === presetKey);
  });
}

function showHotspotInfo(type) {
  const messages = {
    fairy: 'Roof Fairy Light Garland: High-voltage golden fairy-lights stretch across the entire perimeter of the mandapam building facade, creating an enchanting palace glow.',
    hall: 'Grand 500 Capacity Function Hall: Features 500+ comfortable seating capacity, modern concentric false ceilings, and multi-tiered decorative chandeliers.',
    generator: '100% Silent Generator Power Backup: High-capacity on-site diesel generator ensures 24/7 continuous uninterrupted electricity for uninterrupted wedding rituals.',
    sign: 'SLV Kalyana Mandapam: Situated right near Junior College on Thamballapalle Main Road with prominent visibility and wide vehicular approach.'
  };

  alert(messages[type] || 'SLV Kalyana Mandapam feature highlight.');
}

/* ==========================================================================
   3. INTERACTIVE SUBHA MUHURTHAM & AVAILABILITY CALENDAR
   ========================================================================== */
// Auspicious Telugu Wedding Subha Muhurtham dates for 2026-2027
const subhaMuhurthamDates = {
  // Format: "YYYY-MM-DD": { title, tithi, status }
  // November 2026
  "2026-11-04": { title: "Subha Muhurtham (Dhanishta)", tithi: "Ekadashi / Dhanishta Nakshatra", status: "muhurtham" },
  "2026-11-08": { title: "Subha Muhurtham (Uttarabhadra)", tithi: "Chaturdashi / Uttarabhadra", status: "muhurtham" },
  "2026-11-12": { title: "Subha Muhurtham (Rohini)", tithi: "Tritiya / Rohini Nakshatra", status: "muhurtham" },
  "2026-11-15": { title: "Subha Muhurtham (Mrigasira)", tithi: "Shashti / Mrigasira (Sunday)", status: "muhurtham" },
  "2026-11-20": { title: "Subha Muhurtham (Makha)", tithi: "Ekadashi / Makha Nakshatra", status: "fast-filling" },
  "2026-11-25": { title: "Subha Muhurtham (Hasta)", tithi: "Dwitiya / Hasta Nakshatra", status: "muhurtham" },
  "2026-11-29": { title: "Subha Muhurtham (Swati)", tithi: "Panchami / Swati (Sunday)", status: "fast-filling" },

  // December 2026
  "2026-12-03": { title: "Subha Muhurtham (Anuradha)", tithi: "Navami / Anuradha", status: "muhurtham" },
  "2026-12-06": { title: "Subha Muhurtham (Moola)", tithi: "Dwadashi / Moola (Sunday)", status: "fast-filling" },
  "2026-12-10": { title: "Subha Muhurtham (Uttarasadha)", tithi: "Prathama / Uttarasadha", status: "muhurtham" },
  "2026-12-13": { title: "Subha Muhurtham (Sravana)", tithi: "Panchami / Sravana (Sunday)", status: "muhurtham" },
  "2026-12-18": { title: "Subha Muhurtham (Satabhisha)", tithi: "Dashami / Satabhisha", status: "fast-filling" },

  // January 2027
  "2027-01-17": { title: "Sankranti Subha Muhurtham", tithi: "Dasami / Rohini (Sunday)", status: "muhurtham" },
  "2027-01-21": { title: "Subha Muhurtham (Punarvasu)", tithi: "Chaturdasi / Punarvasu", status: "muhurtham" },
  "2027-01-24": { title: "Subha Muhurtham (Pushyami)", tithi: "Dwitiya / Pushyami (Sunday)", status: "fast-filling" },
  "2027-01-28": { title: "Subha Muhurtham (Makha)", tithi: "Shashti / Makha Nakshatra", status: "muhurtham" },

  // February 2027
  "2027-02-07": { title: "Subha Muhurtham (Swati)", tithi: "Prathama / Swati Nakshatra", status: "muhurtham" },
  "2027-02-14": { title: "Grand Wedding Muhurtham", tithi: "Ashtami / Anuradha", status: "fast-filling" },
  "2027-02-18": { title: "Subha Muhurtham (Moola)", tithi: "Dwadashi / Moola", status: "muhurtham" },
  "2027-02-22": { title: "Subha Muhurtham (Uttarasadha)", tithi: "Dwitiya / Uttarasadha", status: "muhurtham" }
};

let currentCalYear = 2026;
let currentCalMonth = 10; // 0-indexed: 10 is November
let selectedDateStr = "2026-11-15";
let activeCalendarFilter = "all";

function initCalendar() {
  const prevBtn = document.getElementById('prevMonthBtn');
  const nextBtn = document.getElementById('nextMonthBtn');
  const slotPills = document.querySelectorAll('.slot-pill');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentCalMonth--;
      if (currentCalMonth < 0) {
        currentCalMonth = 11;
        currentCalYear--;
      }
      renderCalendar();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentCalMonth++;
      if (currentCalMonth > 11) {
        currentCalMonth = 0;
        currentCalYear++;
      }
      renderCalendar();
    });
  }

  slotPills.forEach(pill => {
    pill.addEventListener('click', () => {
      slotPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCalendarFilter = pill.getAttribute('data-slot');
      renderCalendar();
    });
  });

  renderCalendar();
  updateSelectedDateCard(selectedDateStr);
}

function renderCalendar() {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentMonthDisplay = document.getElementById('currentMonthYear');
  if (currentMonthDisplay) {
    currentMonthDisplay.textContent = `${monthNames[currentCalMonth]} ${currentCalYear}`;
  }

  const daysGrid = document.getElementById('calendarDaysGrid');
  if (!daysGrid) return;

  daysGrid.innerHTML = '';

  const firstDayIndex = new Date(currentCalYear, currentCalMonth, 1).getDay();
  const lastDate = new Date(currentCalYear, currentCalMonth + 1, 0).getDate();
  const prevLastDate = new Date(currentCalYear, currentCalMonth, 0).getDate();

  // Prev month padding cells
  for (let x = firstDayIndex; x > 0; x--) {
    const dayCell = document.createElement('div');
    dayCell.className = 'cal-day-cell other-month';
    dayCell.innerHTML = `<span class="day-num">${prevLastDate - x + 1}</span>`;
    daysGrid.appendChild(dayCell);
  }

  // Current month day cells
  for (let day = 1; day <= lastDate; day++) {
    const monthStr = String(currentCalMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const fullDateKey = `${currentCalYear}-${monthStr}-${dayStr}`;
    const dayOfWeek = new Date(currentCalYear, currentCalMonth, day).getDay();
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
    const muhurthamInfo = subhaMuhurthamDates[fullDateKey];

    // Filter check
    if (activeCalendarFilter === 'muhurtham' && !muhurthamInfo) {
      // Show dimmed if only muhurthams requested
    }

    const dayCell = document.createElement('div');
    dayCell.className = 'cal-day-cell';
    dayCell.setAttribute('data-date', fullDateKey);

    if (fullDateKey === selectedDateStr) {
      dayCell.classList.add('selected');
    }

    let statusHtml = '<span class="day-status-pill status-avail">Avail</span>';

    if (muhurthamInfo) {
      dayCell.classList.add('is-muhurtham');
      if (muhurthamInfo.status === 'fast-filling') {
        dayCell.classList.add('fast-filling');
        statusHtml = '<span class="day-status-pill status-rush">Fast Fill</span>';
      } else {
        statusHtml = '<span class="day-status-pill status-muh">Muhurtham</span>';
      }
    } else if (isWeekend) {
      statusHtml = '<span class="day-status-pill status-avail">Weekend</span>';
    }

    dayCell.innerHTML = `
      <span class="day-num">${day}</span>
      ${statusHtml}
    `;

    dayCell.addEventListener('click', () => {
      document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected'));
      dayCell.classList.add('selected');
      selectedDateStr = fullDateKey;
      updateSelectedDateCard(fullDateKey);
    });

    daysGrid.appendChild(dayCell);
  }
}

function updateSelectedDateCard(dateKey) {
  const badge = document.getElementById('selectedDateBadge');
  const text = document.getElementById('selectedDateText');
  const tithi = document.getElementById('selectedDateTithi');

  const d = new Date(dateKey);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formatted = d.toLocaleDateString('en-IN', options);

  const muhurthamInfo = subhaMuhurthamDates[dateKey];

  if (text) text.textContent = formatted;

  if (muhurthamInfo) {
    if (badge) {
      badge.textContent = "⭐ Subha Muhurtham Date";
      badge.style.background = "#FDF0D5";
      badge.style.color = "#8A6210";
    }
    if (tithi) {
      tithi.innerHTML = `<strong>${muhurthamInfo.title}</strong><br>${muhurthamInfo.tithi}. Status: Highly Auspicious & Filling Rapidly.`;
    }
  } else {
    if (badge) {
      badge.textContent = "Standard Available Date";
      badge.style.background = "#E6F4EA";
      badge.style.color = "#137333";
    }
    if (tithi) {
      tithi.textContent = "Open for all family occasions, weddings, receptions, and birthday celebrations.";
    }
  }

  // Pre-fill modal input as well
  const modalDate = document.getElementById('modalDate');
  if (modalDate) modalDate.value = dateKey;
  const formDate = document.getElementById('formDate');
  if (formDate) formDate.value = dateKey;
}

function getSelectedTimingSlot() {
  const selectedRadio = document.querySelector('input[name="eventSlot"]:checked');
  return selectedRadio ? selectedRadio.value : 'Full Day 24-Hours';
}

function inquireSelectedDateViaWhatsApp() {
  const slot = getSelectedTimingSlot();
  const d = new Date(selectedDateStr);
  const dateFormatted = d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const msg = `Namaste SLV Kalyana Mandapam, I would like to check availability and book the venue for Date: ${dateFormatted} (${selectedDateStr}), Timing Slot: ${slot}. Expected guests: ~500. Please share tariff and availability.`;
  const url = `https://wa.me/919440400291?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function openBookingModalWithSelectedDate() {
  const modalDate = document.getElementById('modalDate');
  if (modalDate) modalDate.value = selectedDateStr;
  openBookingModal();
}

/* ==========================================================================
   4. PHOTO GALLERY & LIGHTBOX
   ========================================================================== */
const galleryImages = [
  {
    src: 'assets/images/edited/main_hall.jpg',
    category: 'main-hall',
    title: 'Grand Marriage Function Hall',
    desc: '500 capacity spacious hall with multi-tiered chandeliers, green carpet central aisle, and clear column sightlines.'
  },
  {
    src: 'assets/images/edited/exterior_night.jpg',
    category: 'exterior',
    title: 'Illuminated Night Exterior',
    desc: 'Twilight architectural view showing illuminated fairy lights garland, grand entrance, and dedicated parking space.'
  },
  {
    src: 'assets/images/edited/wedding_gathering.jpg',
    category: 'main-hall',
    title: '500+ Seated Guests Gathering',
    desc: 'Live grand wedding celebration with full 500+ capacity crowd comfortably seated during ceremonies.'
  },
  {
    src: 'assets/images/edited/dining_hall.jpg',
    category: 'dining',
    title: '500 Seater Dining Hall',
    desc: 'Clean stainless steel tables, fresh banana leaf meal setup, and ample ceiling ventilation fans.'
  },
  {
    src: 'assets/images/edited/mandap_stage.jpg',
    category: 'stage',
    title: 'Royal Mandap Stage Decor',
    desc: 'Ornate floral arch, royal gold sofa seating, and ambient stage lighting for bride and groom rituals.'
  },
  {
    src: 'assets/images/edited/wedding_feast.jpg',
    category: 'dining',
    title: 'Traditional Andhra Wedding Banquet',
    desc: 'Authentic pure vegetarian delicacies served traditionally on fresh green banana leaves.'
  },
  {
    src: 'assets/images/edited/entrance_decor.jpg',
    category: 'stage',
    title: 'Royal Floral Welcome Entrance',
    desc: 'Marigold and jasmine floral entrance arch with traditional auspicious brass deepams.'
  }
];

let currentLightboxIndex = 0;

function initGallery() {
  const tabs = document.querySelectorAll('.gallery-tab');
  const items = document.querySelectorAll('.gallery-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Keyboard support for Lightbox
  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightboxModal');
    if (!lightbox || !lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lightboxNext();
    if (e.key === 'ArrowLeft') lightboxPrev();
  });
}

function openLightbox(src, caption) {
  const lightbox = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  if (!lightbox || !img) return;

  // find index
  const idx = galleryImages.findIndex(g => g.src === src);
  if (idx !== -1) currentLightboxIndex = idx;

  img.src = src;
  img.alt = caption || 'SLV Kalyana Mandapam';
  if (cap) cap.textContent = caption || '';

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  if (lightbox) lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function closeLightboxOnOutside(e) {
  if (e.target.id === 'lightboxModal') closeLightbox();
}

function lightboxNext() {
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
  const item = galleryImages[currentLightboxIndex];
  openLightbox(item.src, `${item.title} - ${item.desc}`);
}

function lightboxPrev() {
  currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
  const item = galleryImages[currentLightboxIndex];
  openLightbox(item.src, `${item.title} - ${item.desc}`);
}

/* ==========================================================================
   5. TARIFF & PACKAGE ESTIMATOR
   ========================================================================== */
function calculateTariff() {
  const eventType = document.getElementById('calcEventType').value;
  const guests = parseInt(document.getElementById('calcGuests').value);
  const rooms = parseInt(document.getElementById('calcRooms').value);

  let baseRate = 60000;
  let summary = "";

  if (eventType === 'wedding') {
    baseRate = 75000;
    summary = "Full 24-Hour Grand Wedding package. Includes 500-seat main hall, 500-seater dining hall, 100% generator backup, full commercial kitchen vessels, and " + rooms + " deluxe rooms.";
  } else if (eventType === 'oneday') {
    baseRate = 50000;
    summary = "12-Hour Full Day Marriage / Reception package. Includes main hall (500 capacity), dining hall, generator power backup, and " + rooms + " rooms.";
  } else if (eventType === 'engagement') {
    baseRate = 35000;
    summary = "6-Hour Engagement / Ceremony package. Includes main hall, dining setup, generator backup, and " + rooms + " rooms.";
  } else {
    baseRate = 30000;
    summary = "Half-day celebration package for Birthdays, Upanayanam & Family functions with dining hall and power backup.";
  }

  // Adjust for rooms
  if (rooms === 8) baseRate += 10000;
  else if (rooms === 4) baseRate += 5000;

  // Format price
  const formatted = baseRate.toLocaleString('en-IN');
  const priceVal = document.getElementById('estimatedPrice');
  const summaryEl = document.getElementById('packageSummary');

  if (priceVal) priceVal.textContent = formatted;
  if (summaryEl) summaryEl.textContent = summary;
}

function initTariffCalculator() {
  calculateTariff();
}

function requestQuoteOnWhatsApp() {
  const eventType = document.getElementById('calcEventType').options[document.getElementById('calcEventType').selectedIndex].text;
  const guests = document.getElementById('calcGuests').value;
  const rooms = document.getElementById('calcRooms').value;
  const price = document.getElementById('estimatedPrice').textContent;

  const msg = `Namaste SLV Kalyana Mandapam management, I calculated a package estimate on your website for:\n- Function: ${eventType}\n- Estimated Guests: ${guests}\n- Rooms: ${rooms} Deluxe Rooms\n- Approx Estimated Rate: ₹${price}\n\nPlease share the official dates availability and booking advance details.`;
  const url = `https://wa.me/919440400291?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

/* ==========================================================================
   6. 3D CARD TILT EFFECT (Vanilla JS depth)
   ========================================================================== */
function init3DTilt() {
  const cards = document.querySelectorAll('[data-tilt]');
  if (window.innerWidth < 860) return; // Disable on mobile touch

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ==========================================================================
   7. MODAL BOOKING & CONTACT FORMS
   ========================================================================== */
function openBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleModalSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('modalName').value;
  const phone = document.getElementById('modalPhone').value;
  const date = document.getElementById('modalDate').value;
  const slot = document.getElementById('modalSlot').value;
  const guests = document.getElementById('modalGuests').value;
  const notes = document.getElementById('modalNotes').value;

  const subject = `Booking Inquiry for SLV Kalyana Mandapam - ${date} - ${name}`;
  const body = `Name: ${name}%0D%0APhone: ${phone}%0D%0AEvent Date: ${date}%0D%0ATiming Slot: ${slot}%0D%0AEstimated Guests: ${guests}%0D%0ANotes: ${notes}%0D%0A%0D%0APlease contact me with confirmation.`;

  // Open default mail client targeting user provided email
  window.location.href = `mailto:duggasanibhanuprakashreddy@gamil.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  alert(`Thank you, ${name}! Your booking request for ${date} has been initiated. Our management will call you at ${phone} promptly.`);
  closeBookingModal();
}

function sendModalToWhatsApp() {
  const name = document.getElementById('modalName').value || 'Guest';
  const phone = document.getElementById('modalPhone').value || 'Not specified';
  const date = document.getElementById('modalDate').value || 'Upcoming Date';
  const slot = document.getElementById('modalSlot').value;
  const guests = document.getElementById('modalGuests').value;
  const notes = document.getElementById('modalNotes').value || 'None';

  const msg = `Namaste SLV Kalyana Mandapam,\nNew Booking Inquiry:\n- Name: ${name}\n- Phone: ${phone}\n- Event Date: ${date}\n- Slot: ${slot}\n- Guests: ${guests}\n- Notes: ${notes}\n\nPlease confirm availability and tariff.`;
  const url = `https://wa.me/919440400291?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function handleInquirySubmit(e) {
  e.preventDefault();
  const name = document.getElementById('formName').value;
  const phone = document.getElementById('formPhone').value;
  const email = document.getElementById('formEmail').value || 'Not provided';
  const eventType = document.getElementById('formEventType').value;
  const date = document.getElementById('formDate').value;
  const guests = document.getElementById('formGuests').value;
  const rooms = document.getElementById('formRooms').value;
  const message = document.getElementById('formMessage').value || 'None';

  const subject = `Venue Booking Request: ${name} (${date})`;
  const body = `Full Name: ${name}%0D%0APhone: ${phone}%0D%0AEmail: ${email}%0D%0AEvent Type: ${eventType}%0D%0AEvent Date: ${date}%0D%0AGuests: ${guests}%0D%0ARooms: ${rooms}%0D%0AMessage: ${message}`;

  window.location.href = `mailto:duggasanibhanuprakashreddy@gamil.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  alert(`Thank you ${name}! Your inquiry for ${date} has been submitted to management. We will get back to you shortly at ${phone}.`);
  document.getElementById('contactInquiryForm').reset();
}

/* ==========================================================================
   8. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const links = document.querySelectorAll('.drawer-link');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    links.forEach(l => {
      l.addEventListener('click', () => {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* Utility Debounce */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
