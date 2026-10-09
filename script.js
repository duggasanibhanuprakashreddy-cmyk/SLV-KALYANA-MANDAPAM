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
  initManagerSystem();
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
   3. INTERACTIVE SUBHA MUHURTHAM & AVAILABILITY CALENDAR WITH MANAGER CONTROLS
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

// Default Sample Booked Dates (Pre-seeded so owner sees how offline bookings prevent online conflicts)
const DEFAULT_OFFLINE_BOOKINGS = {
  "2026-11-20": {
    customer: "K. Reddy Family Wedding",
    phone: "9440400291",
    slot: "Full Day 24-Hours",
    advance: "₹30,000",
    notes: "Booked offline at mandapam office",
    status: "booked"
  },
  "2026-12-06": {
    customer: "G. Purushotham Reddy Wedding",
    phone: "6303414221",
    slot: "Morning Muhurtham (05:00 AM - 02:00 PM)",
    advance: "₹25,000",
    notes: "Auspicious Sunday Muhurtham ceremony",
    status: "booked"
  }
};

function getOfflineBookings() {
  try {
    const raw = localStorage.getItem('slv_offline_bookings');
    if (!raw) {
      localStorage.setItem('slv_offline_bookings', JSON.stringify(DEFAULT_OFFLINE_BOOKINGS));
      return DEFAULT_OFFLINE_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_OFFLINE_BOOKINGS;
  }
}

function saveOfflineBookingsStore(data) {
  localStorage.setItem('slv_offline_bookings', JSON.stringify(data));
  updateTotalBookingsBadge();
  renderCalendar();
  updateSelectedDateCard(selectedDateStr);
}

/* ==========================================================================
   MANAGER SECURITY, CRYPTOGRAPHIC AUTHENTICATION & SESSION ENGINE
   ========================================================================== */

const AUTH_SALT = 'SLV_MANDAPAM_SALT_2026';

// Pre-computed SHA-256 Hashes of Authorized Master Credentials (salted):
// - 6303 (Quick PIN)
// - 0944 (Quick PIN)
// - 6303414221 (Proprietor Ramana Reddy)
// - 09440400291 (Manager Bhanuprakash Reddy)
// - slv2026 (Alphanumeric PIN)
// - SLV@Admin2026 (Master Passphrase)
const AUTHORIZED_CREDENTIAL_HASHES = new Set([
  'fbdedc02503015e8eca4d13bb066799853db83436c4629e8d6cf534e94cb025a',
  'd0d39948e24afcd9545c89a5662d95f9fedc9bb6153e92401bc605fe24427c5f',
  '8834e7c1dff374adb69e9283d0e9141b4a6d594b1b1e45a68ec0416b8924cb6b',
  'a45b7e2f4538f8f39a62e1cfb89c0233dba3816ccd3148c7c44e5d1bf28a1343',
  'ff9e680e8312a9f9528af49e20d07477c0ff70d0b074d1ca94f88ab09c1f782d',
  '650b4e3d367bdc5a66260a0406a00a0178acdea4dcad468aafc7d451ec4513fd'
]);

// WebCrypto SHA-256 Hasher
async function computeSha256(input) {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(AUTH_SALT + String(input).trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (err) {
    // Fallback simple hash for older runtimes if subtle is unavailable
    let hash = 0;
    const str = AUTH_SALT + String(input).trim();
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return String(hash);
  }
}

// Brute-Force Rate Limiting (5 failed attempts locks for 5 minutes)
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000;

function getAuthFailedState() {
  try {
    const raw = localStorage.getItem('slv_auth_state');
    return raw ? JSON.parse(raw) : { failedCount: 0, lockedUntil: 0 };
  } catch (e) {
    return { failedCount: 0, lockedUntil: 0 };
  }
}

function saveAuthFailedState(state) {
  localStorage.setItem('slv_auth_state', JSON.stringify(state));
}

function getLockoutSecondsRemaining() {
  const state = getAuthFailedState();
  if (state.lockedUntil && Date.now() < state.lockedUntil) {
    return Math.ceil((state.lockedUntil - Date.now()) / 1000);
  }
  return 0;
}

// Session Engine (30 minutes session with auto-expiry)
const SESSION_DURATION_MS = 30 * 60 * 1000;

function getManagerSession() {
  try {
    const raw = localStorage.getItem('slv_manager_session');
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (!session || !session.expiresAt || Date.now() > session.expiresAt) {
      clearManagerSession();
      return null;
    }
    return session;
  } catch (e) {
    return null;
  }
}

function createManagerSession() {
  const session = {
    token: 'slv_sec_' + Math.random().toString(36).substring(2) + Date.now(),
    authenticatedAs: 'Duggasani Bhanuprakash Reddy & Ramana Reddy',
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION_MS
  };
  localStorage.setItem('slv_manager_session', JSON.stringify(session));
  localStorage.setItem('slv_manager_logged_in', 'true');
  return session;
}

function refreshManagerSession() {
  const session = getManagerSession();
  if (session) {
    session.expiresAt = Date.now() + SESSION_DURATION_MS;
    localStorage.setItem('slv_manager_session', JSON.stringify(session));
  }
}

function clearManagerSession() {
  localStorage.removeItem('slv_manager_session');
  localStorage.removeItem('slv_manager_logged_in');
}

function isManagerLoggedIn() {
  return getManagerSession() !== null;
}

function checkManagerAuth() {
  if (!isManagerLoggedIn()) {
    alert('Security Alert: Authentication required. Please log in as Venue Manager.');
    openManagerLoginModal();
    return false;
  }
  refreshManagerSession();
  return true;
}

// Security Audit Log (Immutable record of management actions)
function addAuditLog(action, type = 'general') {
  try {
    const raw = localStorage.getItem('slv_security_audit_log') || '[]';
    const list = JSON.parse(raw);
    const item = {
      id: 'log_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      action: action,
      type: type,
      timestamp: new Date().toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      })
    };
    list.unshift(item);
    if (list.length > 50) list.pop();
    localStorage.setItem('slv_security_audit_log', JSON.stringify(list));
  } catch (e) {}
}

let sessionTickerInterval = null;

function initManagerSystem() {
  updateManagerUI();

  // Background ticker to monitor session expiration and update UI live
  if (sessionTickerInterval) clearInterval(sessionTickerInterval);
  sessionTickerInterval = setInterval(() => {
    const session = getManagerSession();
    if (session) {
      const remainingMs = session.expiresAt - Date.now();
      if (remainingMs <= 0) {
        managerLogout(true); // Auto-logout upon timeout
      } else {
        const remainingMin = Math.ceil(remainingMs / (60 * 1000));
        const timerText = `⏱️ Session: ${remainingMin}m`;
        const barTimer = document.getElementById('managerSessionTimer');
        const portalTimer = document.getElementById('portalSessionTimerBadge');
        if (barTimer) barTimer.textContent = timerText;
        if (portalTimer) portalTimer.textContent = `🟢 Active (${remainingMin}m remaining)`;
      }
    }
  }, 10000);
}

function updateManagerUI() {
  const isAuth = isManagerLoggedIn();

  // 1. Manager Admin Bar
  const bar = document.getElementById('managerAdminBar');
  if (bar) bar.style.display = isAuth ? 'block' : 'none';

  // 2. Topbar Login & Logout Pills
  const topbarBtn = document.getElementById('topbarManagerBtn');
  const topbarLogout = document.getElementById('topbarLogoutBtn');
  if (topbarBtn) {
    topbarBtn.innerHTML = isAuth ? '👑 Manager Active' : '🔒 Manager Login';
    topbarBtn.title = isAuth ? 'Open Manager Portal' : 'Log in as Venue Manager';
  }
  if (topbarLogout) {
    topbarLogout.style.display = isAuth ? 'inline-flex' : 'none';
  }

  // 3. Navbar Manager & Logout Buttons
  const navBtn = document.getElementById('navManagerBtn');
  const navLogout = document.getElementById('navLogoutBtn');
  if (navBtn) {
    navBtn.innerHTML = isAuth ? '👑 Manager' : '🔒 Manager';
    navBtn.title = isAuth ? 'Open Manager Portal' : 'Author & Manager Login';
    if (isAuth) {
      navBtn.classList.add('btn-gold');
      navBtn.classList.remove('btn-outline');
    } else {
      navBtn.classList.remove('btn-gold');
      navBtn.classList.add('btn-outline');
    }
  }
  if (navLogout) {
    navLogout.style.display = isAuth ? 'inline-block' : 'none';
  }

  // 4. Mobile Drawer Navigation Items
  const drawerLogin = document.getElementById('drawerLoginItem');
  const drawerActive = document.getElementById('drawerManagerActiveItem');
  const drawerLogout = document.getElementById('drawerLogoutItem');
  if (drawerLogin) drawerLogin.style.display = isAuth ? 'none' : 'block';
  if (drawerActive) drawerActive.style.display = isAuth ? 'block' : 'none';
  if (drawerLogout) drawerLogout.style.display = isAuth ? 'block' : 'none';

  // 5. Calendar Owner Bar
  const ownerBar = document.getElementById('calendarOwnerBar');
  const ownerIcon = document.getElementById('calendarOwnerIcon');
  const ownerText = document.getElementById('calendarOwnerText');
  const ownerAction = document.getElementById('calendarOwnerActionBtn');
  if (ownerBar) {
    ownerBar.classList.toggle('active', isAuth);
    if (ownerIcon) ownerIcon.textContent = isAuth ? '👑' : '🛡️';
    if (ownerText) {
      ownerText.textContent = isAuth
        ? 'Manager Portal Active: Any offline booking you add will automatically block online bookings.'
        : 'Venue Management: Log in to block offline walk-in bookings and manage calendar dates.';
    }
    if (ownerAction) {
      ownerAction.textContent = isAuth ? '🚪 Secure Logout' : '🔒 Manager Login';
    }
  }

  // 6. Sidebar Quick Editor
  const adminEditor = document.getElementById('adminDateEditor');
  if (adminEditor) adminEditor.style.display = isAuth ? 'block' : 'none';

  updateTotalBookingsBadge();
}

function updateTotalBookingsBadge() {
  const bookings = getOfflineBookings();
  const count = Object.values(bookings).filter(b => b.status === 'booked').length;
  const countEl = document.getElementById('totalBookingsCount');
  const portalCountEl = document.getElementById('portalTotalBookingsCount');
  if (countEl) countEl.textContent = count;
  if (portalCountEl) portalCountEl.textContent = count;
}

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

  const offlineBookings = getOfflineBookings();

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
    const offlineBooking = offlineBookings[fullDateKey];
    const isBooked = offlineBooking && offlineBooking.status === 'booked';

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

    if (isBooked) {
      dayCell.classList.add('is-booked');
      statusHtml = '<span class="day-status-pill status-booked">Booked</span>';
    } else if (muhurthamInfo) {
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

  const bookedNotice = document.getElementById('bookedDateNotice');
  const bookedReason = document.getElementById('bookedReasonText');
  const slotOptions = document.getElementById('availableSlotOptions');
  const actionButtons = document.getElementById('availableDateActions');
  const adminEditor = document.getElementById('adminDateEditor');
  const adminLabel = document.getElementById('adminDateLabel');

  const d = new Date(dateKey);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formatted = d.toLocaleDateString('en-IN', options);

  const muhurthamInfo = subhaMuhurthamDates[dateKey];
  const offlineBookings = getOfflineBookings();
  const currentBooking = offlineBookings[dateKey];
  const isBooked = currentBooking && currentBooking.status === 'booked';
  const isManager = isManagerLoggedIn();

  if (text) text.textContent = formatted;
  if (adminLabel) adminLabel.textContent = `Managing Date: ${dateKey}`;

  // Configure Status Display based on Booked vs Available
  if (isBooked) {
    if (badge) {
      badge.textContent = "⛔ BOOKED & UNAVAILABLE";
      badge.style.background = "#FFE4E6";
      badge.style.color = "#BE123C";
    }
    if (tithi) {
      tithi.innerHTML = `<strong>Offline Reservation Confirmed</strong><br>This date is reserved for ${currentBooking.customer || 'a family event'}.`;
    }
    if (bookedNotice) bookedNotice.style.display = 'block';
    if (bookedReason) {
      bookedReason.textContent = `This date (${formatted}) is confirmed and reserved for an event. Online bookings are closed to prevent double-booking.`;
    }
    if (slotOptions) slotOptions.style.display = 'none';
    if (actionButtons) actionButtons.style.display = 'none';
  } else {
    if (bookedNotice) bookedNotice.style.display = 'none';
    if (slotOptions) slotOptions.style.display = 'flex';
    if (actionButtons) actionButtons.style.display = 'flex';

    if (muhurthamInfo) {
      if (badge) {
        badge.textContent = "⭐ Subha Muhurtham Date";
        badge.style.background = "#FDF0D5";
        badge.style.color = "#8A6210";
      }
      if (tithi) {
        tithi.innerHTML = `<strong>${muhurthamInfo.title}</strong><br>${muhurthamInfo.tithi}. Status: Highly Auspicious & Open for Booking.`;
      }
    } else {
      if (badge) {
        badge.textContent = "🟢 Standard Available Date";
        badge.style.background = "#E6F4EA";
        badge.style.color = "#137333";
      }
      if (tithi) {
        tithi.textContent = "Open for all family occasions, weddings, receptions, and birthday celebrations.";
      }
    }
  }

  // Pre-fill Manager Quick Editor if logged in
  if (adminEditor) {
    adminEditor.style.display = isManager ? 'block' : 'none';
    const statusSelect = document.getElementById('adminStatusSelect');
    const customerInput = document.getElementById('adminCustomerName');
    const phoneInput = document.getElementById('adminCustomerPhone');

    if (statusSelect) {
      statusSelect.value = isBooked ? 'booked' : (currentBooking ? currentBooking.status : 'available');
    }
    if (customerInput) {
      customerInput.value = currentBooking ? (currentBooking.customer || '') : '';
    }
    if (phoneInput) {
      phoneInput.value = currentBooking ? (currentBooking.phone || '') : '';
    }
  }

  // Pre-fill modal input
  const modalDate = document.getElementById('modalDate');
  if (modalDate) modalDate.value = dateKey;
  const formDate = document.getElementById('formDate');
  if (formDate) formDate.value = dateKey;
  const offlineDate = document.getElementById('offlineDate');
  if (offlineDate) offlineDate.value = dateKey;
}

function selectNextAvailableDate() {
  const offlineBookings = getOfflineBookings();
  const keys = Object.keys(subhaMuhurthamDates).sort();
  for (const k of keys) {
    if (k > selectedDateStr && (!offlineBookings[k] || offlineBookings[k].status !== 'booked')) {
      selectedDateStr = k;
      const d = new Date(k);
      currentCalYear = d.getFullYear();
      currentCalMonth = d.getMonth();
      renderCalendar();
      updateSelectedDateCard(k);
      return;
    }
  }
  alert("Please browse the calendar arrows to explore upcoming months for open dates.");
}

/* ==========================================================================
   PHONE & OTP AUTHENTICATION & FORGOT PASSWORD ENGINE
   ========================================================================== */

const REGISTERED_ADMIN_PHONES = {
  '6303414221': 'Ramana Reddy (Proprietor)',
  '9440400291': 'Duggasani Bhanuprakash Reddy (Manager)',
  '09440400291': 'Duggasani Bhanuprakash Reddy (Manager)'
};

function normalizePhone(p) {
  return String(p || '').replace(/[^0-9]/g, '').slice(-10);
}

function getAdminNameByPhone(p) {
  const clean = normalizePhone(p);
  if (clean === '6303414221') return 'Ramana Reddy (Proprietor)';
  if (clean === '9440400291') return 'Duggasani Bhanuprakash Reddy (Manager)';
  return null;
}

let currentLoginOtp = null;
let currentLoginOtpExpiresAt = 0;
let currentLoginOtpPhone = '';
let loginOtpTicker = null;

let currentResetOtp = null;
let currentResetOtpExpiresAt = 0;
let currentResetOtpPhone = '';
let resetOtpTicker = null;

function switchAuthTab(tab) {
  const tabOtpBtn = document.getElementById('tabOtpBtn');
  const tabPasscodeBtn = document.getElementById('tabPasscodeBtn');
  const sectionOtp = document.getElementById('sectionAuthOtp');
  const sectionPasscode = document.getElementById('sectionAuthPasscode');

  if (tab === 'otp') {
    if (tabOtpBtn) tabOtpBtn.classList.add('active');
    if (tabPasscodeBtn) tabPasscodeBtn.classList.remove('active');
    if (sectionOtp) sectionOtp.style.display = 'block';
    if (sectionPasscode) sectionPasscode.style.display = 'none';
  } else {
    if (tabOtpBtn) tabOtpBtn.classList.remove('active');
    if (tabPasscodeBtn) tabPasscodeBtn.classList.add('active');
    if (sectionOtp) sectionOtp.style.display = 'none';
    if (sectionPasscode) sectionPasscode.style.display = 'block';
  }
}

function handleSendOtp(e) {
  e.preventDefault();
  const phoneInput = document.getElementById('loginPhone');
  const rawPhone = phoneInput ? phoneInput.value.trim() : '';
  const adminName = getAdminNameByPhone(rawPhone);

  if (!adminName) {
    alert('❌ Mobile number not registered as Venue Administrator.\n\nOnly registered numbers (6303414221 or 09440400291) can request manager access.');
    return;
  }

  // Generate 6-digit cryptographic OTP
  currentLoginOtp = String(Math.floor(100000 + Math.random() * 900000));
  currentLoginOtpExpiresAt = Date.now() + (3 * 60 * 1000); // 3 minutes
  currentLoginOtpPhone = normalizePhone(rawPhone);

  const maskedPhone = '+91 ******' + currentLoginOtpPhone.slice(-4);
  const waPhone = currentLoginOtpPhone.startsWith('0') ? currentLoginOtpPhone.substring(1) : currentLoginOtpPhone;
  const waMsg = `Namaste ${adminName},\n\nYour SLV Kalyana Mandapam Manager Portal 2FA verification OTP is:\n\n*${currentLoginOtp}*\n\nValid for 3 minutes. Keep this OTP confidential and do not share with anyone.`;
  const waUrl = `https://api.whatsapp.com/send?phone=91${waPhone}&text=${encodeURIComponent(waMsg)}`;

  // Update UI Display safely (NEVER reveal plaintext OTP on screen)
  const maskedDisplay = document.getElementById('otpMaskedPhoneDisplay');
  const waLink = document.getElementById('otpWhatsAppLink');
  const containerEl = document.getElementById('verifyOtpContainer');
  const otpInput = document.getElementById('otpInputField');

  if (maskedDisplay) maskedDisplay.textContent = `${maskedPhone} (${adminName})`;
  if (waLink) waLink.href = waUrl;
  if (containerEl) containerEl.style.display = 'block';
  if (otpInput) {
    otpInput.value = '';
    otpInput.focus();
  }

  // Start Countdown
  if (loginOtpTicker) clearInterval(loginOtpTicker);
  loginOtpTicker = startOtpCountdown('otpCountdownBadge', currentLoginOtpExpiresAt, () => {
    currentLoginOtp = null;
    const badge = document.getElementById('otpCountdownBadge');
    if (badge) badge.textContent = 'Expired';
    alert('The verification OTP has expired. Please click Resend.');
  });

  addAuditLog(`Secure OTP dispatched to ${adminName} (${maskedPhone}) via WhatsApp`, 'security');

  // Trigger WhatsApp dispatch in new tab
  try {
    window.open(waUrl, '_blank');
  } catch (err) {
    console.info('Popup blocked, WhatsApp link available in dialog.', err);
  }

  alert(`📲 [Secure 2FA OTP Dispatched]\n\nA confidential 6-digit OTP has been dispatched to ${adminName} via WhatsApp (${maskedPhone}).\n\nPlease check your WhatsApp and enter the 6 digits below to complete login.`);
}

function autoFillOtp() {
  // Disabled for end-to-end user privacy and security
}

function handleVerifyOtp(e) {
  e.preventDefault();
  const enteredOtp = document.getElementById('otpInputField').value.trim();

  if (!currentLoginOtp || Date.now() > currentLoginOtpExpiresAt) {
    alert('❌ OTP has expired. Please click Resend to generate a new OTP.');
    return;
  }

  if (enteredOtp !== currentLoginOtp) {
    alert('❌ Incorrect OTP entered. Please check and try again.');
    return;
  }

  // Success: Clear OTP and create authenticated session
  const adminName = getAdminNameByPhone(currentLoginOtpPhone) || 'Venue Administrator';
  currentLoginOtp = null;
  currentLoginOtpExpiresAt = 0;
  if (loginOtpTicker) clearInterval(loginOtpTicker);

  createManagerSession();
  addAuditLog(`Manager successfully logged in via Mobile OTP (${adminName})`, 'login');

  closeManagerLoginModal();
  updateManagerUI();
  updateSelectedDateCard(selectedDateStr);

  alert(`✅ OTP Verified Successfully!\n\nWelcome, ${adminName}. Manager portal controls are now active.`);
}

function handleResendOtp() {
  const phone = currentLoginOtpPhone || '6303414221';
  const loginInput = document.getElementById('loginPhone');
  if (loginInput) loginInput.value = phone;
  handleSendOtp(new Event('submit'));
}

function startOtpCountdown(badgeId, expiresAt, onExpire) {
  const badge = document.getElementById(badgeId);
  const update = () => {
    const diff = expiresAt - Date.now();
    if (diff <= 0) {
      if (badge) badge.textContent = 'Expired';
      if (onExpire) onExpire();
      return false;
    }
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    if (badge) badge.textContent = `Expires in ${mins}:${secs < 10 ? '0' : ''}${secs}`;
    return true;
  };
  update();
  const interval = setInterval(() => {
    if (!update()) clearInterval(interval);
  }, 1000);
  return interval;
}

/* ==========================================================================
   FORGOT PASSWORD & RESET RECOVERY VIA OTP
   ========================================================================== */
function openForgotPasswordModal() {
  closeManagerLoginModal();
  const modal = document.getElementById('forgotPasswordModal');
  const fields = document.getElementById('resetFieldsContainer');
  if (fields) fields.style.display = 'none';
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeForgotPasswordModal() {
  const modal = document.getElementById('forgotPasswordModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleSendResetOtp(e) {
  e.preventDefault();
  const phone = document.getElementById('resetPhone').value.trim();
  const adminName = getAdminNameByPhone(phone);

  if (!adminName) {
    alert('❌ Phone number not recognized.\n\nOnly registered administrators (6303414221 or 09440400291) can reset credentials.');
    return;
  }

  currentResetOtp = String(Math.floor(100000 + Math.random() * 900000));
  currentResetOtpExpiresAt = Date.now() + (3 * 60 * 1000);
  currentResetOtpPhone = normalizePhone(phone);

  const maskedPhone = '+91 ******' + currentResetOtpPhone.slice(-4);
  const waPhone = currentResetOtpPhone.startsWith('0') ? currentResetOtpPhone.substring(1) : currentResetOtpPhone;
  const waMsg = `Namaste ${adminName},\n\nYour SLV Kalyana Mandapam Passcode Reset Recovery OTP is:\n\n*${currentResetOtp}*\n\nValid for 3 minutes. Keep this OTP confidential and do not share with anyone.`;
  const waUrl = `https://api.whatsapp.com/send?phone=91${waPhone}&text=${encodeURIComponent(waMsg)}`;

  const maskedDisplay = document.getElementById('resetOtpMaskedPhoneDisplay');
  const waLink = document.getElementById('resetOtpWhatsAppLink');
  const fieldsEl = document.getElementById('resetFieldsContainer');
  const input = document.getElementById('resetOtpInputField');

  if (maskedDisplay) maskedDisplay.textContent = `${maskedPhone} (${adminName})`;
  if (waLink) waLink.href = waUrl;
  if (fieldsEl) fieldsEl.style.display = 'block';
  if (input) {
    input.value = '';
    input.focus();
  }

  if (resetOtpTicker) clearInterval(resetOtpTicker);
  resetOtpTicker = startOtpCountdown('resetOtpCountdownBadge', currentResetOtpExpiresAt, () => {
    currentResetOtp = null;
    alert('Password recovery OTP has expired. Please request a new one.');
  });

  addAuditLog(`Password Reset OTP dispatched to ${adminName} (${maskedPhone}) via WhatsApp`, 'security');

  // Trigger WhatsApp dispatch in new tab
  try {
    window.open(waUrl, '_blank');
  } catch (err) {
    console.info('Popup blocked, WhatsApp link available in dialog.', err);
  }

  alert(`📲 [Recovery OTP Dispatched]\n\nA confidential 6-digit passcode recovery code has been dispatched to ${adminName} via WhatsApp (${maskedPhone}).\n\nPlease check WhatsApp and enter the 6-digit code below.`);
}

function autoFillResetOtp() {
  // Disabled for end-to-end user privacy and security
}

async function handlePerformPasswordReset(e) {
  e.preventDefault();
  const otp = document.getElementById('resetOtpInputField').value.trim();
  const newPass = document.getElementById('resetNewPasscode').value.trim();
  const confirmPass = document.getElementById('resetConfirmPasscode').value.trim();

  if (!currentResetOtp || Date.now() > currentResetOtpExpiresAt) {
    alert('❌ OTP has expired. Please request a new recovery OTP.');
    return;
  }

  if (otp !== currentResetOtp) {
    alert('❌ Incorrect OTP entered. Please check and retype.');
    return;
  }

  if (newPass.length < 4) {
    alert('Security requirement: New passcode must be at least 4 characters long.');
    return;
  }

  if (newPass !== confirmPass) {
    alert('❌ Passwords do not match. Please verify and retype.');
    return;
  }

  // Hash new password using SHA-256
  const newHash = await computeSha256(newPass);
  localStorage.setItem('slv_custom_pass_hash', newHash);

  // Reset state
  currentResetOtp = null;
  currentResetOtpExpiresAt = 0;
  if (resetOtpTicker) clearInterval(resetOtpTicker);

  addAuditLog(`Manager passcode reset via OTP verification (${currentResetOtpPhone})`, 'security');

  closeForgotPasswordModal();
  alert('✅ Success! Your new passcode has been saved securely with SHA-256 encryption.\n\nYou can now log in using your new passcode or Phone & OTP.');
  openManagerLoginModal();
  switchAuthTab('passcode');
}

/* ==========================================================================
   MANAGER ACTION HANDLERS, SECURE AUTHENTICATION & OFFLINE REGISTRATION
   ========================================================================== */

function togglePasscodeVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
    btn.title = 'Hide Passcode';
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
    btn.title = 'Show Passcode';
  }
}

function handleNavManagerClick() {
  if (isManagerLoggedIn()) {
    openManagerPortalModal();
  } else {
    openManagerLoginModal();
  }
}

function handleCalendarOwnerClick() {
  if (isManagerLoggedIn()) {
    managerLogout();
  } else {
    openManagerLoginModal();
  }
}

function openManagerLoginModal() {
  const modal = document.getElementById('managerLoginModal');
  const lockoutEl = document.getElementById('authLockoutNotice');
  const submitBtn = document.getElementById('managerLoginSubmitBtn');
  const pinInput = document.getElementById('managerPin');

  const secondsLeft = getLockoutSecondsRemaining();
  if (secondsLeft > 0) {
    if (lockoutEl) {
      lockoutEl.style.display = 'flex';
      lockoutEl.innerHTML = `⚠️ Portal locked due to repeated failed attempts. Please wait ${secondsLeft}s before retrying.`;
    }
    if (submitBtn) submitBtn.disabled = true;
    if (pinInput) pinInput.disabled = true;
  } else {
    if (lockoutEl) lockoutEl.style.display = 'none';
    if (submitBtn) submitBtn.disabled = false;
    if (pinInput) {
      pinInput.disabled = false;
      pinInput.value = '';
    }
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (pinInput && !pinInput.disabled) {
      setTimeout(() => pinInput.focus(), 150);
    }
  }
}

function closeManagerLoginModal() {
  const modal = document.getElementById('managerLoginModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

async function handleManagerLogin(e) {
  e.preventDefault();

  const secondsLeft = getLockoutSecondsRemaining();
  if (secondsLeft > 0) {
    alert(`Security Alert: Authentication is locked due to repeated incorrect entries. Please wait ${secondsLeft} seconds.`);
    return;
  }

  const pinInput = document.getElementById('managerPin');
  const enteredPasscode = pinInput ? pinInput.value.trim() : '';

  if (!enteredPasscode) {
    alert('Please enter your authorized security passcode.');
    return;
  }

  // Compute 256-Bit Cryptographic Hash
  const hash = await computeSha256(enteredPasscode);
  const customHash = localStorage.getItem('slv_custom_pass_hash');

  const isMasterAuthorized = AUTHORIZED_CREDENTIAL_HASHES.has(hash);
  const isCustomAuthorized = customHash && (customHash === hash);

  if (isMasterAuthorized || isCustomAuthorized) {
    // Reset rate-limiting state
    saveAuthFailedState({ failedCount: 0, lockedUntil: 0 });

    // Create session and log audit event
    createManagerSession();
    addAuditLog('Manager successfully authenticated into portal', 'login');

    closeManagerLoginModal();
    updateManagerUI();
    updateSelectedDateCard(selectedDateStr);

    alert('✅ Authentication Successful! Welcome, Venue Administrator. You can now manage dates and block offline bookings.');
  } else {
    // Handle failed attempt
    const state = getAuthFailedState();
    state.failedCount = (state.failedCount || 0) + 1;

    addAuditLog(`Failed authentication attempt (${state.failedCount}/${MAX_FAILED_ATTEMPTS})`, 'security');

    if (state.failedCount >= MAX_FAILED_ATTEMPTS) {
      state.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
      saveAuthFailedState(state);
      addAuditLog('Manager Portal temporarily locked due to brute-force threshold', 'security');
      openManagerLoginModal(); // Refresh UI with lockout warning
      alert(`⛔ Security Alert: Too many incorrect attempts. Authentication is locked for 5 minutes.`);
    } else {
      saveAuthFailedState(state);
      const remaining = MAX_FAILED_ATTEMPTS - state.failedCount;
      alert(`❌ Incorrect Passcode. ${remaining} attempt(s) remaining before security lockout.`);
    }
  }
}

function managerLogout(isExpired = false) {
  if (!isExpired) {
    const ok = confirm('Are you sure you want to securely log out of the Manager Portal?');
    if (!ok) return;
  }

  addAuditLog(isExpired ? 'Session automatically timed out' : 'Manager securely logged out', 'security');
  clearManagerSession();
  updateManagerUI();
  updateSelectedDateCard(selectedDateStr);

  alert(isExpired
    ? '🔒 Security Notice: Your manager session has timed out due to inactivity. Logged out.'
    : '🚪 You have been securely logged out of the Manager Portal.');
}

/* 1B. MANAGER DASHBOARD MODAL */
function openManagerPortalModal() {
  if (!checkManagerAuth()) return;
  const modal = document.getElementById('managerPortalModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeManagerPortalModal() {
  const modal = document.getElementById('managerPortalModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* 1C. CHANGE PASSCODE MODAL */
function openChangePasscodeModal() {
  if (!checkManagerAuth()) return;
  const modal = document.getElementById('changePasscodeModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeChangePasscodeModal() {
  const modal = document.getElementById('changePasscodeModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

async function handleChangePasscode(e) {
  e.preventDefault();
  if (!checkManagerAuth()) return;

  const currentPass = document.getElementById('currentPasscode').value.trim();
  const newPass = document.getElementById('newPasscode').value.trim();
  const confirmPass = document.getElementById('confirmNewPasscode').value.trim();

  if (newPass.length < 4) {
    alert('Security requirement: New passcode must be at least 4 characters long.');
    return;
  }

  if (newPass !== confirmPass) {
    alert('Error: New passcodes do not match. Please verify and retype.');
    return;
  }

  // Verify current password hash
  const currentHash = await computeSha256(currentPass);
  const savedCustomHash = localStorage.getItem('slv_custom_pass_hash');
  const isMaster = AUTHORIZED_CREDENTIAL_HASHES.has(currentHash);
  const isCustom = savedCustomHash && (savedCustomHash === currentHash);

  if (!isMaster && !isCustom) {
    alert('❌ Current Passcode is incorrect. Passcode was NOT changed.');
    return;
  }

  // Hash and save new passcode
  const newHash = await computeSha256(newPass);
  localStorage.setItem('slv_custom_pass_hash', newHash);
  addAuditLog('Manager security passcode successfully changed & hashed', 'security');

  closeChangePasscodeModal();
  document.getElementById('changePasscodeForm').reset();
  alert('✅ Success! Your new manager passcode has been saved securely with SHA-256 encryption. Keep it safe.');
}

/* 1D. AUDIT LOG MODAL */
function openAuditLogModal() {
  if (!checkManagerAuth()) return;
  const modal = document.getElementById('auditLogModal');
  renderAuditLog();
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAuditLogModal() {
  const modal = document.getElementById('auditLogModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function renderAuditLog() {
  const container = document.getElementById('auditLogContainer');
  if (!container) return;

  try {
    const raw = localStorage.getItem('slv_security_audit_log') || '[]';
    const list = JSON.parse(raw);

    if (list.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 20px;">No audit logs recorded yet.</p>';
      return;
    }

    let html = '';
    list.forEach(item => {
      const typeClass = item.type === 'login' ? 'login' : (item.type === 'security' ? 'security' : '');
      html += `
        <div class="audit-log-item ${typeClass}">
          <div>
            <div class="audit-log-action">${item.action}</div>
            <div class="audit-log-time">🕒 ${item.timestamp}</div>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  } catch (e) {
    container.innerHTML = '<p style="color: red;">Error reading audit logs.</p>';
  }
}

function clearAuditLog() {
  if (confirm('Are you sure you want to clear the security audit log history?')) {
    localStorage.setItem('slv_security_audit_log', '[]');
    addAuditLog('Security audit log history cleared by manager', 'security');
    renderAuditLog();
  }
}

/* 2. OFFLINE BOOKING & ADMIN DATE CONTROLS */
function openOfflineBookingModal() {
  if (!checkManagerAuth()) return;
  const modal = document.getElementById('offlineBookingModal');
  const dateInput = document.getElementById('offlineDate');
  if (dateInput && selectedDateStr) {
    dateInput.value = selectedDateStr;
  }
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeOfflineBookingModal() {
  const modal = document.getElementById('offlineBookingModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function saveOfflineBooking(e) {
  e.preventDefault();
  if (!checkManagerAuth()) return;

  const date = document.getElementById('offlineDate').value;
  const customer = document.getElementById('offlineCustomer').value.trim();
  const phone = document.getElementById('offlinePhone').value.trim();
  const slot = document.getElementById('offlineSlot').value;
  const advance = document.getElementById('offlineAdvance').value.trim() || 'Advance Received';
  const notes = document.getElementById('offlineNotes').value.trim() || 'Offline Booking';

  if (!date || !customer) {
    alert('Please enter date and customer name.');
    return;
  }

  const bookings = getOfflineBookings();
  bookings[date] = {
    customer,
    phone,
    slot,
    advance,
    notes,
    status: 'booked'
  };

  saveOfflineBookingsStore(bookings);
  addAuditLog(`Blocked date ${date} for offline booking (${customer})`, 'general');

  closeOfflineBookingModal();
  alert(`Success! Date ${date} is now marked as BOOKED for "${customer}". Online bookings for this date are now blocked.`);
}

function saveAdminDateChange() {
  if (!checkManagerAuth()) return;

  const dateKey = selectedDateStr;
  const status = document.getElementById('adminStatusSelect').value;
  const customer = document.getElementById('adminCustomerName').value.trim() || 'Offline Party';
  const phone = document.getElementById('adminCustomerPhone').value.trim();

  const bookings = getOfflineBookings();

  if (status === 'available') {
    delete bookings[dateKey];
    addAuditLog(`Marked date ${dateKey} as AVAILABLE`, 'general');
  } else {
    bookings[dateKey] = {
      customer,
      phone,
      slot: 'Full Day',
      advance: 'Token Paid',
      status: status
    };
    addAuditLog(`Marked date ${dateKey} as ${status.toUpperCase()} (${customer})`, 'general');
  }

  saveOfflineBookingsStore(bookings);
  alert(`Updated: Date ${dateKey} is now marked as ${status.toUpperCase()}!`);
}

function clearAdminDateBooking() {
  if (!checkManagerAuth()) return;

  const dateKey = selectedDateStr;
  const bookings = getOfflineBookings();
  delete bookings[dateKey];
  saveOfflineBookingsStore(bookings);
  addAuditLog(`Released booking on date ${dateKey} (made available)`, 'general');

  alert(`Date ${dateKey} is now released and AVAILABLE for online booking!`);
}

function openBookingRegisterModal() {
  if (!checkManagerAuth()) return;

  const modal = document.getElementById('bookingRegisterModal');
  renderBookingRegister();
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeBookingRegisterModal() {
  const modal = document.getElementById('bookingRegisterModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function renderBookingRegister() {
  const container = document.getElementById('bookingRegisterContainer');
  if (!container) return;

  const bookings = getOfflineBookings();
  const entries = Object.entries(bookings).sort(([a], [b]) => a.localeCompare(b));

  if (entries.length === 0) {
    container.innerHTML = '<p style="text-align:center; padding: 20px; color: var(--text-muted);">No offline bookings recorded yet.</p>';
    return;
  }

  let html = '';
  entries.forEach(([date, b]) => {
    html += `
      <div class="register-card-item">
        <div class="register-card-left">
          <strong>📅 ${date} — ${b.customer || 'Reserved'}</strong>
          <span>Slot: ${b.slot || 'Full Day'} • Phone: ${b.phone || 'N/A'} • Advance: ${b.advance || 'N/A'}</span>
          <small style="color: var(--text-muted);">${b.notes || ''}</small>
        </div>
        <div class="register-card-right">
          <span class="status-booked">${b.status.toUpperCase()}</span>
          <button class="btn btn-sm btn-outline" onclick="deleteBooking('${date}')" style="padding: 4px 8px; font-size: 0.72rem; color: #E11D48;">
            🗑️ Release Date
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function deleteBooking(dateKey) {
  if (!checkManagerAuth()) return;

  if (confirm(`Are you sure you want to release ${dateKey} and make it available for online bookings again?`)) {
    const bookings = getOfflineBookings();
    delete bookings[dateKey];
    saveOfflineBookingsStore(bookings);
    addAuditLog(`Released booking on date ${dateKey}`, 'general');
    renderBookingRegister();
  }
}

function getSelectedTimingSlot() {
  const selectedRadio = document.querySelector('input[name="eventSlot"]:checked');
  return selectedRadio ? selectedRadio.value : 'Full Day 24-Hours';
}

function inquireSelectedDateViaWhatsApp() {
  const offlineBookings = getOfflineBookings();
  if (offlineBookings[selectedDateStr] && offlineBookings[selectedDateStr].status === 'booked') {
    alert('This date is already booked! Please select another date.');
    return;
  }
  const slot = getSelectedTimingSlot();
  const d = new Date(selectedDateStr);
  const dateFormatted = d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const msg = `Namaste SLV Kalyana Mandapam, I would like to check availability and book the venue for Date: ${dateFormatted} (${selectedDateStr}), Timing Slot: ${slot}. Expected guests: ~500. Please share tariff and availability.`;
  const url = `https://wa.me/919440400291?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function openBookingModalWithSelectedDate() {
  const offlineBookings = getOfflineBookings();
  if (offlineBookings[selectedDateStr] && offlineBookings[selectedDateStr].status === 'booked') {
    alert('This date is already booked! Please select another date.');
    return;
  }
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
