import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const TRIP = {
  destination: "Penang, Malaysia",
  dates: "22 – 25 July 2026",
  travelers: "8 Pax",
  hotel: "Maritime Suite Duplex by Uptown",
  hotelAddress: "Persiaran Karpal Singh 1, George Town",
  flights: [
    { no: "SQ134", route: "Singapore → Penang", dep: "09:35", arr: "11:00", terminal: "Changi T2", day: "22 Jul" },
    { no: "SQ137", route: "Penang → Singapore", dep: "17:45", arr: "19:20", terminal: "Penang PEN", day: "25 Jul" },
  ],
};

const DAYS = [
  {
    id: 1,
    date: "Wed, 22 Jul",
    label: "Day 1",
    theme: "Arrive · Settle In · Night Market Feast",
    emoji: "✈️",
    color: "#0E7C8B",
    schedule: [
      { time: "09:35", act: "Depart Singapore Changi T2 (SQ134)" },
      { time: "11:00", act: "Arrive Penang International Airport" },
      { time: "11:30–12:00", act: "Grab to Maritime Suite (~RM35, ~30 min)" },
      { time: "12:00–12:30", act: "Drop luggage / request early check-in" },
      { time: "12:30–2:00pm", act: "🍜 Lunch — New World Park Food Court" },
      { time: "2:00–3:30pm", act: "Check in · rest · kids pool time (infinity pool!)" },
      { time: "3:30–5:30pm", act: "Karpal Singh Drive seafront promenade stroll" },
      { time: "5:30pm", act: "Grab to Kimberley Street (~RM15, 15 min)" },
      { time: "6:00–10:00pm", act: "🌙 Dinner — Kimberley Street Night Market" },
    ],
    meals: [
      {
        type: "LUNCH",
        icon: "🍜",
        name: "New World Park Food Court",
        address: "Jalan Burma, Georgetown",
        hours: "Daily 11am–10pm",
        cost: "RM15–25/pax",
        notes: "Air-conditioned, great variety. Perfect for the group on arrival day.",
        mustTry: ["Char Koay Teow", "Penang Laksa", "Rojak", "Cendol (must-try dessert!)"],
      },
      {
        type: "DINNER",
        icon: "🌙",
        name: "Kimberley Street Night Market",
        address: "Lebuh Kimberley, George Town",
        hours: "Daily 5pm–11pm",
        cost: "RM200–280 for group",
        notes: "Arrive by 6pm before queues build. Cash preferred.",
        mustTry: [
          "Duck Kway Chap (Restoran Kimberly #137) — closed Thu ✅ open Wed",
          "Char Koay Teow — wok hei, cockles, smoky noodles",
          "Oyster Omelette — crispy egg, fresh oysters, sambal",
          "Loh Bak — five-spice pork rolls",
          "Tong Shui stalls — Chinese sweet soups (kids love!)",
        ],
      },
    ],
    tip: "After dinner, walk 5 min to Penang Road Famous Teochew Chendul (RM3/bowl) — the most iconic dessert in Penang. Also explore Chulia Street Night Hawker Stalls just 3 blocks away.",
    tipType: "info",
  },
  {
    id: 2,
    date: "Thu, 23 Jul",
    label: "Day 2",
    theme: "Heritage · Culture · Shopping · Seafood",
    emoji: "🏛️",
    color: "#C0600A",
    schedule: [
      { time: "8:00–9:30am", act: "🍳 Breakfast — Hameediyah Restaurant (Nasi Kandar)" },
      { time: "9:30–10:00am", act: "Street Art Trail — Armenian Street murals" },
      { time: "10:00–10:45am", act: "Khoo Kongsi Clan Temple" },
      { time: "10:45–11:30am", act: "Chew Jetty (Clan Jetties)" },
      { time: "11:30am–1:00pm", act: "Penang Peranakan Mansion (A/C indoors)" },
      { time: "1:00–2:30pm", act: "🍱 Lunch — China House / Kebaya Dining Room" },
      { time: "2:30–4:00pm", act: "Gurney Plaza / Gurney Paragon Mall — shopping" },
      { time: "4:00–4:30pm", act: "🍦 Gelato — Ciao Gelato (Victoria Street)" },
      { time: "6:00–9:30pm", act: "🦀 Dinner — Bali Hai Seafood Market (pre-book!)" },
      { time: "9:30pm+", act: "Optional: Gurney Drive seafront evening stroll" },
    ],
    meals: [
      {
        type: "BREAKFAST",
        icon: "🍛",
        name: "Hameediyah Restaurant",
        address: "164, Lebuh Campbell, Georgetown",
        hours: "Mon–Sat 8am–9pm",
        cost: "RM10–18/pax",
        notes: "Penang's oldest nasi kandar (est. 1907). Mild-to-spicy curries. Good for all ages.",
        mustTry: ["Fish curry", "Mutton curry", "Dhal with papadum", "Teh tarik"],
      },
      {
        type: "GELATO STOP",
        icon: "🍦",
        name: "Ciao Gelato",
        address: "171-A, Lebuh Victoria Street, Georgetown",
        hours: "11am–11pm (confirm if Wed closed)",
        cost: "~RM10–12/cup",
        notes: "100% natural artisanal Italian gelato. Served in stainless steel cups. 900+ Google reviews.",
        mustTry: ["Pistachio Paste — pure ground, perfectly balanced", "Matcha", "Calamansi Sorbet (kids love!)", "Chocolate Hazelnut"],
      },
      {
        type: "DINNER",
        icon: "🦀",
        name: "Bali Hai Seafood Market",
        address: "90–90D, Persiaran Gurney, Georgetown",
        hours: "Tue–Sun: 11am–2:30pm & 5pm–midnight",
        cost: "RM100–160/pax",
        notes: "Pick live seafood from tanks. Cook Teochew, Nyonya or Thai style. Over 500 seats.",
        mustTry: ["Cereal Prawns — butter, oat powder, crispy", "Salted Egg Crab", "Steamed Grouper (Teochew)", "Mantis Prawns"],
        booking: "📞 +604-228 8272 or +6016-520 3024 · Book 3–4 days ahead for 8 pax",
        urgent: true,
      },
    ],
    sights: [
      { name: "Street Art Trail", cost: "Free", duration: "45 min", note: "Best light before 10am for photos" },
      { name: "Khoo Kongsi Clan Temple", cost: "RM10 adult · Kids free", duration: "45 min", note: "Stunning Hokkien temple" },
      { name: "Chew Jetty", cost: "Free", duration: "30 min", note: "Wooden stilt houses, very photogenic" },
      { name: "Penang Peranakan Mansion", cost: "RM50 adult · Kids free", duration: "60 min", note: "Fully A/C, rich Nyonya history" },
    ],
    tip: "Tip for seniors & toddlers: Streets are mostly flat. Bring stroller & water. Peranakan Mansion is fully air-conditioned — perfect for the hottest part of the day.",
    tipType: "success",
  },
  {
    id: 3,
    date: "Fri, 24 Jul",
    label: "Day 3",
    theme: "Dim Sum · Durian Season · Michelin Nyonya",
    emoji: "🍈",
    color: "#556B2F",
    schedule: [
      { time: "11:00am–12:30pm", act: "🍵 Breakfast (11am) — Bao Teck Tea House (dim sum)" },
      { time: "1:30–3:00pm", act: "🍈 Durian Tasting — Ah Teik Stall, Lorong Susu" },
      { time: "3:00–3:30pm", act: "Rest & digest (mandatory! 😄)" },
      { time: "3:30–5:30pm", act: "Wonderfood Museum OR Penang Hill funicular" },
      { time: "6:00–9:30pm", act: "🍲 Dinner — Auntie Gaik Lean's (Michelin ⭐ — BOOK NOW!)" },
      { time: "After dinner", act: "Optional: Penang Road Teochew Chendul (RM3/bowl)" },
    ],
    meals: [
      {
        type: "BREAKFAST (11am)",
        icon: "🍵",
        name: "Bao Teck Tea House",
        address: "25, Lebuh Melayu, Georgetown",
        hours: "8am–8pm (Closed Wednesdays) ✅ Friday open",
        cost: "RM30–50/pax",
        notes: "Heritage Peranakan shophouse, vintage furniture, moss garden. One of the most photogenic restaurants in Penang.",
        mustTry: ["Cheong Fun (silky rice rolls)", "Egg Custard Tarts", "Har Gao & Siew Mai", "Pao (steamed buns, great for toddlers)", "Signature Chinese Tea"],
      },
      {
        type: "DINNER",
        icon: "🍲",
        name: "Auntie Gaik Lean's Old School Eatery ⭐",
        address: "1, Lebuh Bishop, Georgetown",
        hours: "6pm–9:30pm (Wed–Sun) ✅ Friday open",
        cost: "RM60–90/pax",
        notes: "One Michelin Star. Authentic Peranakan cuisine. Everything made from scratch. 1960s heritage setting.",
        mustTry: [
          "Curry Kapitan (RM48–58) — chicken, candlenut, kaffir lime",
          "Nasi Ulam — rice tossed with 10+ herbs, rare traditional dish",
          "Nyonya Beef Rendang (RM88) — Aus black angus, ultra tender",
          "Baba Delight Platter — spring rolls, lor bak, cucur",
          "Black Glutinous Rice — salted coconut milk, dried longan",
        ],
        booking: "📞 +6017-434 4398 · RM200 deposit required · Book 2 weeks ahead",
        urgent: true,
      },
    ],
    sights: [
      { name: "Wonderfood Museum", cost: "RM28 adult · RM18 child", duration: "90 min", note: "3D interactive, great for kids + seniors. Fully A/C. ⭐ Recommended" },
      { name: "Penang Hill (funicular)", cost: "RM30 adult · RM15 child", duration: "2–3 hrs", note: "Pre-book online at mypenanghill.com.my" },
      { name: "Penang Butterfly Farm", cost: "RM35 adult · RM20 child", duration: "2 hrs", note: "Kids 3–6 love it" },
    ],
    tip: "Bao Teck Tea House is one of the most photogenic restaurants in Penang — bring your camera! The interior is a stunning 1920s Peranakan time capsule.",
    tipType: "photo",
  },
  {
    id: 4,
    date: "Sat, 25 Jul",
    label: "Day 4",
    theme: "Last Morning · Heritage Walk · Fly Home",
    emoji: "🏠",
    color: "#6B3FA0",
    schedule: [
      { time: "7:30–9:00am", act: "🍳 Breakfast — Toh Soon Café (heritage alley)" },
      { time: "9:30–11:00am", act: "Little India shopping OR 1st Avenue Mall" },
      { time: "11:00am–12:30pm", act: "Heritage walk — Campbell St, Kapitan Keling Mosque" },
      { time: "12:30–1:30pm", act: "🍜 Final Lunch — Gurney Drive area" },
      { time: "1:30pm", act: "Return to hotel, pack, check out" },
      { time: "3:15pm", act: "Grab to airport (~RM35, 30 min) — MUST LEAVE BY 3:15PM" },
      { time: "4:00pm", act: "Airport arrival — check in, security" },
      { time: "5:45pm", act: "Depart Penang SQ137 → Singapore Changi T3 (arr 19:20)" },
    ],
    meals: [
      {
        type: "BREAKFAST",
        icon: "☕",
        name: "Toh Soon Café",
        address: "Alley off Armenian Street, Georgetown",
        hours: "7:30am–1pm (closed Tue & Sun) ✅ Saturday open",
        cost: "RM8–12/pax",
        notes: "Legendary heritage alley café. Charcoal-toasted kaya toast, half-boiled eggs. Extremely photogenic setting.",
        mustTry: ["Kaya toast (charcoal toasted)", "Half-boiled eggs with soy", "Kopitiam coffee / teh tarik"],
      },
      {
        type: "FINAL LUNCH",
        icon: "🍜",
        name: "Gurney Drive Hawker Centre area",
        address: "Solok Gurney 1 / Gurney Paragon Food Hall",
        hours: "Food hall from ~11am",
        cost: "RM15–25/pax",
        notes: "Last chance for Penang classics. Try anything you missed earlier in the trip!",
        mustTry: ["Hokkien Prawn Mee", "Char Siu Rice", "Cendol (final bowl!)"],
      },
    ],
    tip: "⚠️ FLIGHT REMINDER: SQ137 departs 17:45. Leave hotel no later than 3:15pm. Check-in closes ~17:05.",
    tipType: "warning",
  },
];

const FOOD_STORES = [
  { no: 1, name: "Kimberley Street Duck Kway Chap", eat: "Braised duck, herbal kway chap", area: "137, Kimberley St", hours: "5:30–10:30pm (closed Thu)" },
  { no: 2, name: "Hameediyah", eat: "Nasi Kandar (est. 1907)", area: "164, Lebuh Campbell", hours: "Mon–Sat 8am–9pm" },
  { no: 3, name: "Penang Road Famous Teochew Chendul", eat: "Cendol — coconut milk, gula Melaka", area: "Jalan Penang", hours: "Daily 10am–7pm" },
  { no: 4, name: "Ah Teik Durian Stall ★", eat: "Red Prawn, Black Thorn, Musang King", area: "Lorong Susu, Georgetown", hours: "Afternoon til sold out" },
  { no: 5, name: "Ciao Gelato", eat: "Pistachio, Matcha, Calamansi Sorbet", area: "171-A, Lebuh Victoria St", hours: "11am–11pm (check Wed)" },
  { no: 6, name: "Siam Road Charcoal Char Kway Teow ⭐", eat: "Char Kway Teow (Michelin Bib Gourmand)", area: "Jalan Siam, Georgetown", hours: "Tue–Sat 12pm–6pm" },
  { no: 7, name: "Toh Soon Café", eat: "Kaya toast, half-boiled eggs, charcoal coffee", area: "Alley off Armenian St", hours: "7:30am–1pm (closed Tue/Sun)" },
  { no: 8, name: "Bao Teck Tea House", eat: "Dim sum, cheong fun, egg tarts, Chinese tea", area: "25, Lebuh Melayu", hours: "8am–8pm (closed Wed)" },
  { no: 9, name: "New Lane Hawker Centre", eat: "Oyster omelette, Char Kway Teow, shaved ice", area: "Lorong Baru, Georgetown", hours: "~6pm–midnight" },
  { no: 10, name: "Gurney Drive Hawker Centre", eat: "All Penang classics in one open-air spot", area: "Solok Gurney 1, Pulau Tikus", hours: "Daily ~5pm–midnight" },
  { no: 11, name: "Auntie Gaik Lean's ⭐ Michelin", eat: "Curry Kapitan, Nasi Ulam, Nyonya Beef Rendang", area: "1, Lebuh Bishop", hours: "12–2:30pm & 6–9:30pm (Wed–Sun)" },
  { no: 12, name: "Bali Hai Seafood Market", eat: "Live seafood — cereal prawns, salted egg crab", area: "90, Persiaran Gurney", hours: "11am–2:30pm & 5pm–midnight" },
  { no: 13, name: "888 Hokkien Mee", eat: "Hokkien prawn mee in rich prawn stock", area: "67-A, Lebuh Presgrave", hours: "~7am–1pm (morning only)" },
  { no: 14, name: "Penang Laksa (Air Itam)", eat: "Sour fish laksa with shrimp paste & pineapple", area: "Ayer Itam Market", hours: "~10am–4pm" },
];

const DURIAN = {
  stall: "Ah Teik Durian Stall",
  address: "Lorong Susu, 10450 George Town",
  timing: "~1:30pm on Day 3 (before afternoon peak crowds)",
  cost: "RM25–60/pax",
  season: "July is peak season — best selection at best prices!",
  varieties: [
    { name: "D24", flavour: "Classic sweet-bitter, creamy", price: "RM10–15/fruit", forWho: "First-timers & seniors" },
    { name: "Red Prawn (Ang Heh)", flavour: "Sweet, orange-hued, rich & creamy", price: "RM20–35/fruit", forWho: "Sweet lovers" },
    { name: "Black Thorn (Ochee)", flavour: "Bittersweet, complex, premium", price: "RM30–60/kg", forWho: "Adventurous eaters" },
    { name: "Musang King", flavour: "Buttery, slightly bitter, intense", price: "RM25–50/kg", forWho: "Connoisseurs" },
    { name: "Milk Durian (Susu)", flavour: "Mild, creamy, light flavour", price: "RM15–25/fruit", forWho: "Kids & first-timers" },
  ],
};

const BOOKINGS = [
  { urgency: "critical", label: "CRITICAL — Book Today", what: "Auntie Gaik Lean's Dinner", when: "24 Jul (Day 3) at 6pm, 8 pax", how: "+6017-434 4398 · RM200 deposit for groups 4+", note: "Books up 2 weeks ahead" },
  { urgency: "urgent", label: "URGENT — Book This Week", what: "Bali Hai Seafood Market", when: "23 Jul (Day 2) at 6:30pm, 8 pax", how: "+604-228 8272 or seafood@balihaiseafood.com", note: "Book 3–4 days ahead" },
  { urgency: "recommended", label: "RECOMMENDED", what: "Penang Hill Funicular", when: "Day 3 afternoon (if chosen)", how: "mypenanghill.com.my (online)", note: "Avoids 1–2 hr queues" },
  { urgency: "asap", label: "ASAP", what: "Maritime Suite Early Check-in", when: "22 Jul — arrive ~11:30am", how: "Contact Uptown host via booking app", note: "Standard check-in is 3pm" },
];

const COSTS = [
  { day: "Day 1 · 22 Jul", activities: "—", meals: "RM440", transport: "RM100", total: "RM540" },
  { day: "Day 2 · 23 Jul", activities: "RM400", meals: "RM1,600", transport: "RM120", total: "RM2,120" },
  { day: "Day 3 · 24 Jul", activities: "RM250", meals: "RM1,260", transport: "RM100", total: "RM1,610" },
  { day: "Day 4 · 25 Jul", activities: "—", meals: "RM300", transport: "RM100", total: "RM400" },
];

const PACKING = {
  "👔 Clothing": [
    "Lightweight breathable clothing — cotton/linen preferred",
    "Compact umbrella or light rain jacket (ESSENTIAL — sudden showers)",
    "Comfortable walking shoes with grip (heritage street cobbles)",
    "Sandals/slippers for hawker centres",
    "Modest cover-up for temples & mosques (shoulders + knees)",
    "Swimwear for hotel infinity pool",
    "Kids: extra 2 sets of clothes per day",
  ],
  "🏥 Health & Safety": [
    "Sunscreen SPF50+ (intense tropical sun between showers)",
    "Insect repellent (especially for evening outdoor hawkers)",
    "Personal medications — seniors: BP, diabetes, joints",
    "Cooling towel or portable mini-fan (heat index ~40°C)",
    "Wet wipes and hand sanitiser (hawker centres)",
    "Motion sickness tablets (Penang Hill funicular)",
  ],
  "👶 For Toddlers (3–6)": [
    "Foldable lightweight stroller (streets mostly flat)",
    "Snacks from home for picky eaters",
    "Change of clothes ×2 per day minimum",
    "Small backpack with personal water bottle",
  ],
  "📱 Documents & Tech": [
    "Passports — valid >6 months beyond return date",
    "Travel insurance printout or digital copy",
    "Malaysia e-arrival card (fill before landing)",
    "MYR cash — many hawkers are cash only",
    "Grab Malaysia app installed & tested",
    "Touch 'n Go e-wallet",
    "Power bank (charged) — essential for full days out",
  ],
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const TABS = ["Overview", "Day 1", "Day 2", "Day 3", "Day 4", "Food Guide", "Durian 🍈", "Bookings ⚠️", "Costs", "Packing"];

const tipStyles = {
  info:    { bg: "#E0F7FA", border: "#0097A7", icon: "💬", text: "#006064" },
  success: { bg: "#E8F5E9", border: "#43A047", icon: "💡", text: "#1B5E20" },
  warning: { bg: "#FFF3E0", border: "#FB8C00", icon: "⚠️", text: "#E65100" },
  photo:   { bg: "#F3E5F5", border: "#8E24AA", icon: "📸", text: "#4A148C" },
};

function TipBox({ text, type = "info" }) {
  const s = tipStyles[type] || tipStyles.info;
  return (
    <div style={{ background: s.bg, borderLeft: `4px solid ${s.border}`, borderRadius: "0 8px 8px 0", padding: "12px 16px", marginTop: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span style={{ fontSize: 16, flexShrink: 0 }}>{s.icon}</span>
      <p style={{ margin: 0, fontSize: 13, color: s.text, lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

function Badge({ label, color = "#006B7D" }) {
  return (
    <span style={{ background: color + "22", color, border: `1px solid ${color}44`, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>
      {label}
    </span>
  );
}

function MealCard({ meal }) {
  const urgencyColor = { critical: "#C62828", urgent: "#E65100", recommended: "#2E7D32", asap: "#1565C0" };
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EDF0", padding: 18, marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 24 }}>{meal.icon}</span>
        <div>
          <Badge label={meal.type} color="#0E7C8B" />
          <h4 style={{ margin: "4px 0 0", fontSize: 15, fontWeight: 700, color: "#1A2E35" }}>{meal.name}</h4>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: "#666" }}>📍 {meal.address}</div>
        <div style={{ fontSize: 12, color: "#666" }}>🕐 {meal.hours}</div>
        <div style={{ fontSize: 12, color: "#666" }}>💰 {meal.cost}</div>
      </div>
      <p style={{ fontSize: 13, color: "#444", margin: "0 0 10px", fontStyle: "italic" }}>{meal.notes}</p>
      <div>
        <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 700, color: "#0E7C8B", textTransform: "uppercase", letterSpacing: 0.5 }}>Must Try</p>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {meal.mustTry.map((item, i) => (
            <li key={i} style={{ fontSize: 13, color: "#333", marginBottom: 3 }}>{item}</li>
          ))}
        </ul>
      </div>
      {meal.booking && (
        <div style={{ marginTop: 12, background: "#FFF3E0", borderRadius: 8, padding: "10px 12px", border: "1px solid #FFCC80" }}>
          <p style={{ margin: 0, fontSize: 12, color: "#E65100", fontWeight: 600 }}>📞 Advance Booking Required</p>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#E65100" }}>{meal.booking}</p>
        </div>
      )}
    </div>
  );
}

function OverviewTab() {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0E7C8B 0%, #0A5568 50%, #1A3A2A 100%)", borderRadius: 16, padding: "36px 32px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, fontSize: 120, opacity: 0.08, lineHeight: 1 }}>🌴</div>
        <p style={{ margin: "0 0 6px", fontSize: 11, letterSpacing: 2, color: "#80CBC4", textTransform: "uppercase", fontWeight: 600 }}>Trip Itinerary</p>
        <h1 style={{ margin: "0 0 4px", fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>Penang, Malaysia</h1>
        <p style={{ margin: "0 0 24px", fontSize: 16, color: "#B2DFDB" }}>22 – 25 July 2026 · 8 Pax · Maritime Suite Duplex</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["George Town Festival", "Durian Peak Season", "Michelin Dining", "Heritage UNESCO"].map(t => (
            <span key={t} style={{ background: "rgba(255,255,255,0.15)", color: "#E0F2F1", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 500 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Flight cards */}
      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0E7C8B", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>✈️ Flights</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
        {TRIP.flights.map(f => (
          <div key={f.no} style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EDF0", padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ margin: 0, fontWeight: 800, fontSize: 16, color: "#0E7C8B" }}>{f.no}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#888" }}>{f.day} · {f.terminal}</p>
              </div>
              <span style={{ fontSize: 20 }}>✈️</span>
            </div>
            <p style={{ margin: "10px 0 4px", fontSize: 13, color: "#333" }}>{f.route}</p>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#1A2E35" }}>{f.dep} → {f.arr}</p>
          </div>
        ))}
      </div>

      {/* Accommodation */}
      <div style={{ background: "#F0F9FA", borderRadius: 12, padding: 20, marginBottom: 24, border: "1px solid #B2DFDB" }}>
        <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: "#0E7C8B", textTransform: "uppercase", letterSpacing: 1 }}>🏠 Accommodation</p>
        <h3 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 800, color: "#1A2E35" }}>{TRIP.hotel}</h3>
        <p style={{ margin: "0 0 12px", fontSize: 13, color: "#555" }}>{TRIP.hotelAddress}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {["Seafront duplex · Penang Bridge views", "Infinity pool · Kids will love it", "30+ restaurants downstairs", "24hr McDonald's & mamak within 5 min"].map(f => (
            <div key={f} style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
              <span style={{ color: "#0E7C8B", flexShrink: 0, fontSize: 13 }}>✓</span>
              <span style={{ fontSize: 13, color: "#444" }}>{f}</span>
            </div>
          ))}
        </div>
        <TipBox text="Check-in is 3pm but you arrive ~11:30am. Request early check-in with your Uptown host in advance. Alternatively, store luggage and head straight to New World Park for lunch." type="warning" />
      </div>

      {/* Trip snapshot */}
      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0E7C8B", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>🗓️ Trip at a Glance</h3>
      <div style={{ display: "grid", gap: 8 }}>
        {DAYS.map(d => (
          <div key={d.id} style={{ background: "#fff", borderRadius: 10, border: "1px solid #E8EDF0", padding: "12px 16px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: d.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
              {d.emoji}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 800, fontSize: 14, color: "#1A2E35" }}>{d.label}</span>
                <span style={{ fontSize: 12, color: "#888" }}>{d.date}</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#555" }}>{d.theme}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, background: "#FFF8E1", borderRadius: 12, padding: 16, border: "1px solid #FFE082" }}>
        <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 13, color: "#7B4F00" }}>🌤️ July Weather in Penang</p>
        <p style={{ margin: 0, fontSize: 13, color: "#7B4F00" }}>~31°C daytime · High humidity · ~16 rainy days/month. Rain usually short (1–2 hrs). Always carry a compact umbrella. Mornings are best for sightseeing outdoors.</p>
      </div>
    </div>
  );
}

function DayTab({ day }) {
  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${day.color} 0%, ${day.color}BB 100%)`, borderRadius: 14, padding: "24px 24px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 36 }}>{day.emoji}</span>
          <div>
            <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>{day.label} · {day.date}</p>
            <h2 style={{ margin: "3px 0 0", fontSize: 20, fontWeight: 800, color: "#fff" }}>{day.theme}</h2>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <h3 style={{ fontSize: 13, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>Schedule</h3>
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EDF0", overflow: "hidden", marginBottom: 20 }}>
        {day.schedule.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 0, borderBottom: i < day.schedule.length - 1 ? "1px solid #F0F4F6" : "none" }}>
            <div style={{ width: 110, padding: "11px 14px", background: i % 2 === 0 ? "#F8FAFB" : "#fff", flexShrink: 0, borderRight: "1px solid #EEF2F4" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: day.color, fontVariantNumeric: "tabular-nums" }}>{s.time}</span>
            </div>
            <div style={{ padding: "11px 14px" }}>
              <span style={{ fontSize: 13, color: "#333" }}>{s.act}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sights (Day 2 & 3) */}
      {day.sights && (
        <>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>Sightseeing</h3>
          <div style={{ display: "grid", gap: 8, marginBottom: 20 }}>
            {day.sights.map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 10, border: "1px solid #E8EDF0", padding: "12px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: day.color + "22", color: day.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: "#1A2E35" }}>{s.name}</span>
                    <span style={{ fontSize: 12, color: "#0E7C8B", fontWeight: 600 }}>{s.cost}</span>
                  </div>
                  <p style={{ margin: "3px 0 0", fontSize: 12, color: "#777" }}>⏱ {s.duration} · {s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Meals */}
      <h3 style={{ fontSize: 13, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>Food & Dining</h3>
      {day.meals.map((m, i) => <MealCard key={i} meal={m} />)}

      {/* Tip */}
      {day.tip && <TipBox text={day.tip} type={day.tipType} />}
    </div>
  );
}

function FoodGuideTab() {
  const [search, setSearch] = useState("");
  const filtered = FOOD_STORES.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.eat.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #8B2500, #C0600A)", borderRadius: 14, padding: "24px", marginBottom: 20 }}>
        <p style={{ margin: "0 0 4px", fontSize: 11, color: "rgba(255,255,255,0.65)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Curated List</p>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#fff" }}>Famous Food Stores</h2>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "rgba(255,255,255,0.75)" }}>14 must-visit hawker stalls, restaurants & dessert spots</p>
      </div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by name or dish..."
        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #DDE3E8", fontSize: 13, marginBottom: 16, boxSizing: "border-box", outline: "none" }}
      />
      <div style={{ display: "grid", gap: 10 }}>
        {filtered.map(f => (
          <div key={f.no} style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EDF0", padding: "14px 16px", display: "flex", gap: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#C0600A22", color: "#C0600A", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{f.no}</div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 14, color: "#1A2E35" }}>{f.name}</p>
              <p style={{ margin: "0 0 6px", fontSize: 13, color: "#C0600A" }}>🍽 {f.eat}</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, color: "#888" }}>📍 {f.area}</span>
                <span style={{ fontSize: 11, color: "#888" }}>🕐 {f.hours}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DurianTab() {
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #556B2F, #8B7D2A)", borderRadius: 14, padding: "24px", marginBottom: 20 }}>
        <span style={{ fontSize: 40 }}>🍈</span>
        <h2 style={{ margin: "8px 0 4px", fontSize: 22, fontWeight: 800, color: "#fff" }}>Durian Guide</h2>
        <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.8)" }}>July = peak season in Penang. Best selection at best prices!</p>
      </div>

      <div style={{ background: "#F1F8E9", borderRadius: 12, padding: 16, marginBottom: 20, border: "1px solid #C5E1A5" }}>
        <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 14, color: "#33691E" }}>📍 Top Pick: {DURIAN.stall}</p>
        <p style={{ margin: "0 0 4px", fontSize: 13, color: "#558B2F" }}>{DURIAN.address}</p>
        <p style={{ margin: "0 0 4px", fontSize: 13, color: "#558B2F" }}>⏰ Best timing: {DURIAN.timing}</p>
        <p style={{ margin: 0, fontSize: 13, color: "#558B2F" }}>💰 {DURIAN.cost} · 30+ varieties · Gloves & water provided · Cards accepted</p>
      </div>

      <h3 style={{ fontSize: 13, fontWeight: 700, color: "#556B2F", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>Varieties to Try — tap to learn more</h3>
      <div style={{ display: "grid", gap: 8, marginBottom: 20 }}>
        {DURIAN.varieties.map((v, i) => (
          <div key={i}
            onClick={() => setSelected(selected === i ? null : i)}
            style={{ background: selected === i ? "#F9FBE7" : "#fff", borderRadius: 12, border: `1px solid ${selected === i ? "#C5E1A5" : "#E8EDF0"}`, padding: "14px 16px", cursor: "pointer", transition: "all 0.2s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#33691E" }}>{v.name}</span>
                <span style={{ marginLeft: 8, fontSize: 12, color: "#888" }}>{v.forWho}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#556B2F" }}>{v.price}</span>
            </div>
            {selected === i && (
              <p style={{ margin: "8px 0 0", fontSize: 13, color: "#555", lineHeight: 1.5 }}>🍈 {v.flavour}</p>
            )}
          </div>
        ))}
      </div>

      <TipBox text="Tell the uncle your preference — sweet or bitter? He'll guide you through a tasting from D24 → Red Prawn → Black Thorn. Eat in moderation. Bottled water is provided. Great experience for the whole family!" type="success" />
      <TipBox text="Health note for seniors: Durian is 'heaty'. Avoid alcohol the same evening. Those on blood pressure medication — consult your doctor. Not recommended for toddlers under 3." type="warning" />
    </div>
  );
}

function BookingsTab() {
  const colors = {
    critical:    { bg: "#FFEBEE", border: "#C62828", badge: "#C62828", text: "#B71C1C" },
    urgent:      { bg: "#FFF3E0", border: "#FB8C00", badge: "#E65100", text: "#E65100" },
    recommended: { bg: "#E8F5E9", border: "#43A047", badge: "#2E7D32", text: "#2E7D32" },
    asap:        { bg: "#E3F2FD", border: "#1976D2", badge: "#1565C0", text: "#1565C0" },
  };
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #B71C1C, #C62828)", borderRadius: 14, padding: "24px", marginBottom: 20 }}>
        <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#fff" }}>⚠️ Advance Bookings</h2>
        <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.8)" }}>Book these now — some fill up 2 weeks ahead!</p>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {BOOKINGS.map((b, i) => {
          const c = colors[b.urgency];
          return (
            <div key={i} style={{ background: c.bg, borderRadius: 12, border: `1px solid ${c.border}`, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ background: c.badge, color: "#fff", borderRadius: 4, padding: "3px 10px", fontSize: 10, fontWeight: 800, letterSpacing: 0.8, textTransform: "uppercase" }}>{b.label}</span>
              </div>
              <h4 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 800, color: "#1A2E35" }}>{b.what}</h4>
              <p style={{ margin: "0 0 4px", fontSize: 13, color: "#444" }}>📅 {b.when}</p>
              <p style={{ margin: "0 0 4px", fontSize: 13, color: c.text, fontWeight: 600 }}>{b.how}</p>
              <p style={{ margin: 0, fontSize: 12, color: "#777", fontStyle: "italic" }}>Note: {b.note}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CostsTab() {
  const total = "~RM4,670 (≈ SGD 1,415)";
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #1A237E, #283593)", borderRadius: 14, padding: "24px", marginBottom: 20 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "#fff" }}>💰 Cost Summary</h2>
        <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.75)" }}>8 pax · MYR · Excl. flights & accommodation</p>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EDF0", overflow: "hidden", marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr 1.2fr 1.2fr", background: "#1A237E", padding: "10px 0" }}>
          {["Day", "Activities", "Meals", "Transport", "Total"].map(h => (
            <div key={h} style={{ padding: "0 14px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.85)", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</div>
          ))}
        </div>
        {COSTS.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr 1.2fr 1.2fr", background: i % 2 === 0 ? "#fff" : "#F8FAFB", borderBottom: i < COSTS.length - 1 ? "1px solid #F0F4F6" : "none" }}>
            {[row.day, row.activities, row.meals, row.transport, row.total].map((cell, ci) => (
              <div key={ci} style={{ padding: "12px 14px", fontSize: 13, color: ci === 4 ? "#1A237E" : "#333", fontWeight: ci === 4 ? 700 : 400 }}>{cell}</div>
            ))}
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr 1.2fr 1.2fr", background: "#E8EAF6", borderTop: "2px solid #3949AB" }}>
          <div style={{ padding: "14px", fontSize: 13, fontWeight: 800, color: "#1A237E", gridColumn: "1 / 5" }}>TOTAL ESTIMATE (excl. flights & accommodation)</div>
          <div style={{ padding: "14px 14px", fontSize: 13, fontWeight: 800, color: "#1A237E" }}>{total}</div>
        </div>
      </div>

      <div style={{ background: "#FFF8E1", borderRadius: 12, padding: 16, border: "1px solid #FFE082" }}>
        <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 13, color: "#7B4F00" }}>+ Additional Budget</p>
        <p style={{ margin: 0, fontSize: 13, color: "#7B4F00" }}>Add RM600–1,000 for personal shopping, souvenirs, extra snacks and incidentals.</p>
      </div>

      <h3 style={{ fontSize: 13, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: 1, margin: "20px 0 12px" }}>Per-Person Cost Guide</h3>
      <div style={{ display: "grid", gap: 8 }}>
        {[
          ["Hawker Meals", "RM15–25/meal", "Cash preferred"],
          ["Casual Restaurant", "RM30–60/meal", "Bali Hai, lunch spots"],
          ["Michelin Dining (Auntie Gaik Lean)", "RM60–90/meal", "Worth every ringgit"],
          ["Gelato / Desserts", "RM10–15/visit", "Ciao Gelato etc."],
          ["Durian", "RM25–60/person", "Depends on variety"],
          ["Museum Entry", "RM18–50/entry", "Peranakan Mansion, Penang Hill"],
          ["Grab rides", "RM10–40/trip", "Shared across 8 pax"],
        ].map(([cat, price, note], i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 10, border: "1px solid #E8EDF0", padding: "11px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontWeight: 600, fontSize: 13, color: "#333" }}>{cat}</span>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "#999" }}>{note}</p>
            </div>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#1A237E" }}>{price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PackingTab() {
  const [open, setOpen] = useState("👔 Clothing");
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #37474F, #546E7A)", borderRadius: 14, padding: "24px", marginBottom: 20 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "#fff" }}>🎒 Packing Checklist</h2>
        <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.75)" }}>July: ~31°C · High humidity · ~16 rainy days/month</p>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {Object.entries(PACKING).map(([section, items]) => (
          <div key={section} style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EDF0", overflow: "hidden" }}>
            <button
              onClick={() => setOpen(open === section ? null : section)}
              style={{ width: "100%", padding: "14px 18px", background: open === section ? "#F0F9FA" : "#fff", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}
            >
              <span style={{ fontWeight: 700, fontSize: 14, color: "#1A2E35" }}>{section}</span>
              <span style={{ color: "#0E7C8B", fontSize: 16 }}>{open === section ? "▲" : "▼"}</span>
            </button>
            {open === section && (
              <div style={{ padding: "0 18px 16px", borderTop: "1px solid #EEF2F4" }}>
                {items.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: i < items.length - 1 ? "1px solid #F5F7F9" : "none" }}>
                    <span style={{ width: 18, height: 18, borderRadius: 4, border: "2px solid #0E7C8B", flexShrink: 0, marginTop: 1 }}></span>
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, background: "#E3F2FD", borderRadius: 12, padding: 16, border: "1px solid #90CAF9" }}>
        <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 13, color: "#1565C0" }}>🇸🇬 Singapore travellers note</p>
        <p style={{ margin: 0, fontSize: 13, color: "#1565C0" }}>Malaysia uses UK 3-pin plugs — same as Singapore ✅ No adapter needed. MYR available at Singapore money changers before departure (rates often better than Penang airport).</p>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState("Overview");

  const renderContent = () => {
    if (activeTab === "Overview") return <OverviewTab />;
    if (activeTab === "Food Guide") return <FoodGuideTab />;
    if (activeTab === "Durian 🍈") return <DurianTab />;
    if (activeTab === "Bookings ⚠️") return <BookingsTab />;
    if (activeTab === "Costs") return <CostsTab />;
    if (activeTab === "Packing") return <PackingTab />;
    const dayNum = parseInt(activeTab.replace("Day ", ""));
    const day = DAYS.find(d => d.id === dayNum);
    if (day) return <DayTab day={day} />;
    return null;
  };

  return (
    <div style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif", background: "#F4F7F9", minHeight: "100vh" }}>
      {/* Top bar */}
      <div style={{ background: "#0A3D47", padding: "12px 20px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 50 }}>
        <span style={{ fontSize: 20 }}>🌴</span>
        <div>
          <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: "#fff", letterSpacing: -0.3 }}>Penang 2026</p>
          <p style={{ margin: 0, fontSize: 11, color: "#80CBC4" }}>22–25 July · 8 Pax · Maritime Suite</p>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E8EDF0", overflowX: "auto", display: "flex", gap: 0, whiteSpace: "nowrap", WebkitOverflowScrolling: "touch" }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "12px 16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: activeTab === tab ? 700 : 500,
              color: activeTab === tab ? "#0E7C8B" : "#777",
              borderBottom: activeTab === tab ? "2px solid #0E7C8B" : "2px solid transparent",
              transition: "all 0.15s",
              flexShrink: 0,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 16px 40px" }}>
        {renderContent()}
      </div>
    </div>
  );
}
