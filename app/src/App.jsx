import React, { useRef, useState, useEffect } from 'react';
import {
  motion, useInView, useScroll, useTransform,
} from 'framer-motion';
import {
  Bluetooth, Usb, Monitor, Smartphone, Activity, Clock, Shield,
  Zap, Cloud, ChevronDown, ArrowRight, Check, Radio, Brain,
  FileText, BarChart3, Battery, Wind, Moon, Gauge, Heart,
  Wifi, Layers, Menu, X, Download,
} from 'lucide-react';
import { jsPDF } from 'jspdf';

// ─── Image Imports ────────────────────────────────────────────────────────────
import rhythmUltraMaxImg from './assets/extracted/pdf_img_3_47.jpeg';
import mobileAppImg from './assets/extracted/pdf_img_0_69.png';
import cardioxDashImg from './assets/cardiox_dashboard.png';
import cardiox12LeadImg from './assets/cardiox_12lead_ecg.png';
import holterSoftImg from './assets/cardiox_holter_software.png';
import holterHwImg from './assets/whatsapp_image_cardiox.jpeg';
import ecg12ChImg from './assets/ecg12channel_tabletop.png';
import ecg3ChImg from './assets/extracted/ecg3channel.jpg';
import bipapImg from './assets/extracted/bipap_new.jpg';
import sleepSenseImg from './assets/extracted/sleepsense_new.png';
import vt60stImg from './assets/extracted/vt60st_final.jpg';
import vt80stImg from './assets/extracted/vt80st_v2.jpg';

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════
const fadeUp = { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease: [.22, 1, .36, 1] } } };
const slideLeft = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { duration: .7, ease: [.22, 1, .36, 1] } } };
const slideRight = { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0, transition: { duration: .7, ease: [.22, 1, .36, 1] } } };
const scaleIn = { hidden: { opacity: 0, scale: .88 }, visible: { opacity: 1, scale: 1, transition: { duration: .5, ease: [.34, 1.56, .64, 1] } } };
const stagger = (d = 0) => ({ hidden: {}, visible: { transition: { staggerChildren: .1, delayChildren: d } } });

// ═══════════════════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════════════════
function useCountUp(target, inView, dur = 1.8) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let id, start = null;
    const go = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (dur * 1000), 1);
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) id = requestAnimationFrame(go); else setV(target);
    };
    id = requestAnimationFrame(go);
    return () => cancelAnimationFrame(id);
  }, [inView, target, dur]);
  return v;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRIMITIVE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

/** Animated ECG hero line */
const AnimatedECG = () => {
  const build = () => {
    const bl = 50, cw = 180;
    let d = `M -20 ${bl}`;
    for (let i = 0; i < 9; i++) {
      const x = i * cw;
      d += ` L${x + 20} ${bl} C${x + 22} ${bl},${x + 28} ${bl - 8},${x + 33} ${bl - 8} C${x + 38} ${bl - 8},${x + 44} ${bl},${x + 46} ${bl} L${x + 58} ${bl} L${x + 62} ${bl + 6} L${x + 67} ${bl - 38} L${x + 72} ${bl + 14} L${x + 76} ${bl} L${x + 92} ${bl} C${x + 94} ${bl},${x + 103} ${bl - 13},${x + 112} ${bl - 13} C${x + 121} ${bl - 13},${x + 130} ${bl},${x + 133} ${bl} L${x + 180} ${bl}`;
    }
    return d;
  };
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg viewBox="0 0 1620 100" className="absolute w-full" style={{ top: '52%', transform: 'translateY(-50%)' }} preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="eg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00D4AA" stopOpacity="0" />
            <stop offset="15%" stopColor="#00D4AA" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#00D4AA" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path d={build()} stroke="url(#eg)" strokeWidth="1.8" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.5, ease: 'easeInOut', delay: .4 }} />
      </svg>
    </div>
  );
};

const GridBg = ({ op = .022 }) => (
  <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(rgba(255,255,255,${op}) 1px,transparent 1px)`, backgroundSize: '48px 48px' }} />
);
const LightGrid = () => (
  <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
);
const PulsingDot = ({ color = '#00D4AA', size = 8 }) => (
  <div className="relative flex items-center justify-center" style={{ width: size * 3, height: size * 3 }}>
    <motion.div animate={{ scale: [1, 2.2, 1], opacity: [.7, 0, .7] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }} className="absolute rounded-full" style={{ width: size, height: size, backgroundColor: color, opacity: .4 }} />
    <div className="rounded-full z-10" style={{ width: size, height: size, backgroundColor: color }} />
  </div>
);
const Wrap = ({ children, className = '' }) => <div className={`max-w-7xl mx-auto px-6 lg:px-16 ${className}`}>{children}</div>;
const ChLabel = ({ number, title, light = false }) => (
  <div className="flex items-center gap-4 mb-8">
    {number && <span className="text-xs font-black tracking-[.4em] text-[#1A6BFF] uppercase">{number}</span>}
    <span className={`text-xs font-black tracking-[.35em] uppercase ${light ? 'text-slate-600' : 'text-slate-500'}`}>{title}</span>
    <div className={`flex-1 h-px ${light ? 'bg-slate-200' : 'bg-slate-800'}`} />
  </div>
);
const SpecRow = ({ label, value, light = false }) => (
  <div className={`flex items-center justify-between py-3 border-b ${light ? 'border-slate-100' : 'border-white/[.05]'}`}>
    <span className={`text-sm ${light ? 'text-slate-500' : 'text-slate-400'}`}>{label}</span>
    <span className={`text-sm font-semibold ${light ? 'text-slate-900' : 'text-white'}`}>{value}</span>
  </div>
);
const Pill = ({ children, dark = true }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${dark ? 'border-white/10 bg-white/[.05] text-slate-300' : 'border-slate-200 bg-white text-slate-600 shadow-sm'}`}>{children}</span>
);

// Helper to convert Vite asset image URLs to Base64
const getBase64Image = (imgUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imgUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      try {
        const dataURL = canvas.toDataURL('image/jpeg', 0.85);
        resolve(dataURL);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = (err) => reject(err);
  });
};

// Central product data for spec sheets
const productCatalog = {
  'rhythm-ultramax': {
    title: "Rhythm UltraMax",
    subtitle: "Portable 12-Lead ECG System",
    description: "Rhythm UltraMax captures all 12 leads simultaneously with hospital-grade 24-bit ADC precision. At 298 grams, it deploys in ambulances, rural clinics, emergency response, and bedside care.",
    image: rhythmUltraMaxImg,
    specs: [
      ['Lead configuration', '12-lead simultaneous ECG'],
      ['Sampling rate', '1,000 SPS per channel'],
      ['ADC resolution', '24-bit'],
      ['Wireless', 'Bluetooth LE 5.0'],
      ['Wired', 'USB direct to CardioX'],
      ['Battery life', '8 hours continuous acquisition'],
      ['Weight', '298 grams'],
      ['Standards', 'IEC 60601 compliant design'],
    ],
    features: [
      { title: "Simultaneous 12-lead", body: "Acquires hospital-grade diagnostic signals directly in the field." },
      { title: "BLE 5.0 Telemetry", body: "Streams live waveforms directly to companion mobile app under 10s." },
      { title: "Compact form factor", body: "Weighs only 298g, allowing high portability for medical responders." }
    ]
  },
  'cardiox': {
    title: "CardioX RhythmPro",
    subtitle: "Desktop Clinical Suite",
    description: "A clinical diagnostic nerve center built for diagnostic labs and cardiology workflows. Includes advanced tools for arrhythmia analysis, HRV modeling, and AI-assisted clinical drafting.",
    image: cardioxDashImg,
    specs: [
      ['Arrhythmia tools', '30+ clinically significant tools'],
      ['Analysis', 'HRV, Lorenz / Poincaré plots'],
      ['Assistant', 'AI Clinical Assistant & drafting'],
      ['Special tests', 'Peaked T-wave Hyperkalemia screening'],
      ['Storage', 'Offline-first database with auto-sync'],
      ['Security', 'Hardware-bound licensing'],
    ],
    features: [
      { title: "Advanced interpretation", body: "Detects 30+ arrhythmias including AFib, bradycardia, and blocks." },
      { title: "AI Assistant", body: "Generates clinical draft reviews to accelerate doctor sign-off." },
      { title: "Offline Resilience", body: "Full local capability, automatically syncing with cloud when live." }
    ]
  },
  '12ch-ecg': {
    title: "12 Channel ECG",
    subtitle: "Hospital Tabletop System",
    description: "Hospital-grade twelve-channel tabletop ECG system designed for clinical diagnostic labs, cardiology departments, and outpatient units. Features high-resolution live display and auto-analysis.",
    image: ecg12ChImg,
    specs: [
      ['Lead configuration', '12-lead simultaneous ECG'],
      ['Display', 'Large integrated clinical display'],
      ['Analysis', 'Automated ECG interpretation'],
      ['Report format', 'PDF / thermal print'],
      ['Connectivity', 'LAN · Wi-Fi · USB'],
      ['Data storage', 'Internal patient record storage'],
    ],
    features: [
      { title: "Hospital Workflow", body: "Direct LAN/Wi-Fi printing and digital EMR integration." },
      { title: "Clinical Screen", body: "High-contrast tabletop screen for monitoring patient status." }
    ]
  },
  '3ch-ecg': {
    title: "3 Channel ECG",
    subtitle: "Entry-Level Clinical ECG",
    description: "Entry-level 3-channel ECG system optimized for rapid acquisition and reporting in smaller clinics, health camps, and general practices. Lightweight and highly efficient.",
    image: ecg3ChImg,
    specs: [
      ['Lead configuration', '3-channel ECG acquisition'],
      ['Display', 'Clear onboard LCD display'],
      ['Analysis', 'Automated rhythm labeling'],
      ['Interface', 'USB and network connectivity'],
      ['Ideal for', 'High patient volume settings'],
    ],
    features: [
      { title: "Point-of-Care Use", body: "Extremely simple interface, generating fast 3-lead traces." },
      { title: "Routine Checks", body: "Ideal for high-volume screenings and occupational checkups." }
    ]
  },
  'bipap': {
    title: "BiPAP",
    subtitle: "Bilevel Positive Airway Pressure Therapy",
    description: "Advanced bilevel airway pressure therapy system for sleep apnea treatment and respiratory support. Offers quiet operation, precise ramp time settings, and integrated humidification.",
    image: bipapImg,
    specs: [
      ['Pressure range', '4–25 cmH₂O (IPAP / EPAP)'],
      ['Therapy modes', 'S · T · S/T · CPAP'],
      ['Humidification', 'Integrated heated humidifier'],
      ['Ramp time', '0–45 minutes configurable'],
      ['Data export', 'Smart card / USB export'],
      ['Alarm system', 'Apnea · Low pressure · Power failure'],
    ],
    features: [
      { title: "Precise Ventilation", body: "Delivers smooth bilevel support with quiet runtime operation." },
      { title: "Smart Alarms", body: "Monitors apnea, low pressure, mask disconnects, and power loss." }
    ]
  },
  'sleepsense': {
    title: "SleepSense",
    subtitle: "Sleep Diagnostic Monitor",
    description: "Comprehensive ambulatory sleep study diagnostic monitor for overnight screening. Records SpO₂, airflow, body position, effort belts, and snoring to classify sleep disorders.",
    image: sleepSenseImg,
    specs: [
      ['Monitoring', 'Overnight multi-channel screening'],
      ['Sensors', 'SpO₂, airflow, position, snore'],
      ['Analysis', 'AHI, RDI, and ODI calculations'],
      ['Capacity', '12-hour continuous recording'],
      ['Application', 'Home testing and sleep lab studies'],
    ],
    features: [
      { title: "Ambulatory Sleep Study", body: "Wearable diagnostic pack for professional sleep reviews." },
      { title: "Full Event Mapping", body: "Detailed clinical software AHI reports with position maps." }
    ]
  },
  'vt60st': {
    title: "VT60ST",
    subtitle: "Transport Ventilator",
    description: "Compact transport ventilator designed for ambulance services, emergency responders, and ICU transfers. Robust casing with dual power mains/battery input.",
    image: vt60stImg,
    specs: [
      ['Type', 'Transport Ventilator'],
      ['Ventilation modes', 'VCV · PCV · SIMV · CPAP · PEEP'],
      ['Tidal volume', '50–2000 mL'],
      ['Respiratory rate', '1–60 bpm'],
      ['PEEP', '0–20 cmH₂O'],
      ['Power', 'AC mains + Internal battery'],
    ],
    features: [
      { title: "Emergency Transfer", body: "Sturdy handle and portable shockproof casing." },
      { title: "Continuous Monitoring", body: "Track loops, pressure, and breathing patterns during travel." }
    ]
  },
  'vt80st': {
    title: "VT80ST",
    subtitle: "ICU / Advanced Ventilator",
    description: "Advanced ICU critical care ventilator supporting neonatal to adult patients. Features advanced ventilation modes including PRVC and high-precision gas mixing.",
    image: vt80stImg,
    specs: [
      ['Type', 'ICU / Advanced Ventilator'],
      ['Ventilation modes', 'VCV · PCV · PRVC · SIMV · BiPAP · CPAP'],
      ['Tidal volume', '20–2500 mL'],
      ['Respiratory rate', '1–80 bpm'],
      ['PEEP', '0–25 cmH₂O'],
      ['Power', 'AC mains + Extended battery'],
    ],
    features: [
      { title: "Critical Care Spec", body: "Full suite of modes (PRVC, BiPAP) for intensive respiratory therapy." },
      { title: "Dual Battery Backup", body: "Extended backup system for continuous critical care ventilation." }
    ]
  },
  'holter': {
    title: "Ambulatory Holter Recorder",
    subtitle: "Long-Term ambulatory ECG system",
    description: "Dedicated wearable ambulatory ECG recorder capturing 24-48 hours of uninterrupted heart data. Integrates with CardioX analysis module for beat clustering and arrhythmia reviews.",
    image: holterHwImg,
    specs: [
      ['Recording duration', '24–48 hours continuous'],
      ['Wearability', 'Lightweight compact ambulatory design'],
      ['Channel configuration', 'Standard multi-channel recording'],
      ['Analysis suite', 'CardioX RhythmPro Holter Module'],
      ['Clinical use', 'Transient arrhythmia & ST mapping'],
    ],
    features: [
      { title: "Long-term monitoring", body: "Wearable recorder worn during sleep, daily activity, and exertion." },
      { title: "CardioX Integration", body: "Beat templates, clustering, Lorenz plots, and complete reports." }
    ]
  }
};

// Client-side A4 spec sheet downloader
const downloadProductPDF = async (prodKey) => {
  const product = productCatalog[prodKey];
  if (!product) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = [26, 107, 255];
  const accentColor = [0, 212, 170];
  const textDark = [15, 23, 42];
  const textSlate = [71, 85, 105];
  const bgLight = [248, 250, 252];

  const margin = 15;
  const pageWidth = 210;
  const contentWidth = pageWidth - (margin * 2);

  // Top header bar
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 6, 'F');

  let currentY = 16;

  // Deckmount Header text
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...textSlate);
  doc.text('DECKMOUNT ELECTRONICS  |  CLINICAL SPECIFICATION SHEET', margin, currentY);

  // Divider line
  currentY += 3;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.2);
  doc.line(margin, currentY, margin + contentWidth, currentY);

  currentY += 10;

  // Product Name
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...textDark);
  doc.text(product.title, margin, currentY);

  // Product Subtitle / Category
  currentY += 6;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...primaryColor);
  doc.text(product.subtitle || '', margin, currentY);

  currentY += 10;

  // Render Product Image (left half) & Description (right half)
  const imageWidth = 72;
  const imageHeight = 50;

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, currentY, imageWidth, imageHeight, 3, 3, 'F');

  try {
    const base64Img = await getBase64Image(product.image);
    doc.addImage(base64Img, 'JPEG', margin + 2, currentY + 2, imageWidth - 4, imageHeight - 4);
  } catch (err) {
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...textSlate);
    doc.text('[Image preview not available]', margin + 16, currentY + 26);
  }

  // Right half description
  const rightX = margin + 78;
  const rightWidth = contentWidth - 78;

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...textDark);
  doc.text('PRODUCT DESCRIPTION', rightX, currentY + 4);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...textSlate);
  const splitDesc = doc.splitTextToSize(product.description, rightWidth);
  doc.text(splitDesc, rightX, currentY + 9);

  currentY += imageHeight + 12;

  // Technical Specifications Title
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...textDark);
  doc.text('TECHNICAL SPECIFICATIONS', margin, currentY);

  currentY += 3;
  doc.line(margin, currentY, margin + contentWidth, currentY);

  currentY += 6;

  // Specs Table Grid
  if (product.specs && product.specs.length > 0) {
    product.specs.forEach(([label, val], idx) => {
      if (idx % 2 === 0) {
        doc.setFillColor(...bgLight);
        doc.rect(margin, currentY - 4, contentWidth, 7, 'F');
      }

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...textDark);
      doc.text(label, margin + 4, currentY + 1);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...textSlate);
      doc.text(val, margin + 85, currentY + 1);

      currentY += 7;
    });
  }

  currentY += 6;

  // Key Highlights / Features
  if (product.features && product.features.length > 0) {
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...textDark);
    doc.text('KEY CLINICAL HIGHLIGHTS', margin, currentY);

    currentY += 3;
    doc.line(margin, currentY, margin + contentWidth, currentY);

    currentY += 7;

    product.features.forEach((feat) => {
      doc.setFillColor(...accentColor);
      doc.circle(margin + 2, currentY - 1, 0.8, 'F');

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...textDark);
      doc.text(feat.title, margin + 5, currentY);

      if (feat.body) {
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...textSlate);
        const splitFeatBody = doc.splitTextToSize(feat.body, contentWidth - 10);
        doc.text(splitFeatBody, margin + 5, currentY + 3.5);
        currentY += (splitFeatBody.length * 3.5) + 3;
      } else {
        currentY += 5;
      }
    });
  }

  // Footer bar
  const footerY = 282;
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, footerY - 4, margin + contentWidth, footerY - 4);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...textSlate);
  doc.text('Deckmount Electronics Private Limited  |  www.cardiox.in  |  info@deckmount.in', margin, footerY + 1.5);
  doc.text('IEC 60601 COMPLIANT DESIGN', margin + contentWidth - 52, footerY + 1.5);

  doc.save(`${product.title.replace(/\s+/g, '_')}_Spec_Sheet.pdf`);
};

// Spec Sheet downloader button
const DownloadSpecButton = ({ productId, light = false }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDownloading(true);
    try {
      await downloadProductPDF(productId);
    } catch (err) {
      console.error(err);
    }
    setDownloading(false);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${light
          ? 'bg-[#1A6BFF] text-white hover:bg-[#4285FF] shadow-md shadow-[#1A6BFF]/25'
          : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
        } disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      <Download className={`h-3.5 w-3.5 ${downloading ? 'animate-bounce' : ''}`} />
      {downloading ? 'Generating PDF...' : 'Download Spec Sheet'}
    </button>
  );
};

// Generic product section — reused across all chapters
const ProductSection = ({ productId, number, label, title, accentColor = '#1A6BFF', description, image, imageAlt, specs, features, pills, dark = true, reverse = false, extra }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const imgVariant = reverse ? slideLeft : slideRight;
  const bg = dark ? 'bg-[#050A14]' : 'bg-[#F8FAFC]';
  return (
    <section id={label.toLowerCase().replace(/[\s·\/]+/g, '-')} className={`relative ${bg} py-28 lg:py-36 overflow-hidden`}>
      {dark ? <GridBg /> : <LightGrid />}
      {dark && <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at ${reverse ? '80%' : '20%'} 50%,${accentColor}06 0%,transparent 60%)` }} />}
      <div ref={ref} className="relative z-10">
        <Wrap>
          <motion.div variants={stagger()} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.div variants={fadeUp}><ChLabel number={number} title={label} light={!dark} /></motion.div>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center`}>

              {/* Content */}
              <div className={reverse ? 'lg:order-2' : ''}>
                <motion.h2 variants={fadeUp} className={`text-5xl lg:text-[3.5rem] font-black leading-none tracking-tight mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}
                  dangerouslySetInnerHTML={{ __html: title }} />
                <motion.p variants={fadeUp} className={`text-lg leading-relaxed mb-8 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{description}</motion.p>

                {specs && (
                  <motion.div variants={fadeUp} className={`rounded-2xl border overflow-hidden mb-8 ${dark ? 'bg-white/[.03] border-white/[.06]' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className="px-6 pt-5 pb-3"><span className="text-[10px] font-black tracking-[.35em] uppercase" style={{ color: accentColor }}>Specifications</span></div>
                    <div className="px-6 pb-4">{specs.map(([l, v]) => <SpecRow key={l} label={l} value={v} light={!dark} />)}</div>
                  </motion.div>
                )}

                {features && (
                  <motion.div variants={stagger(.05)} className="space-y-3 mb-8">
                    {features.map(({ icon: Icon, title: t, body }) => (
                      <motion.div key={t} variants={fadeUp} className={`flex gap-4 p-4 rounded-2xl ${dark ? 'bg-white/[.03] border border-white/[.06] hover:border-white/20' : 'bg-white border border-slate-100 shadow-sm hover:shadow-md'} transition-all duration-300`}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${accentColor}15` }}>
                          <Icon className="h-5 w-5" style={{ color: accentColor }} />
                        </div>
                        <div>
                          <div className={`font-bold text-sm mb-0.5 ${dark ? 'text-white' : 'text-slate-900'}`}>{t}</div>
                          <div className={`text-sm leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{body}</div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {pills && (
                  <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-6">
                    {pills.map(p => <Pill key={p} dark={dark}>{p}</Pill>)}
                  </motion.div>
                )}

                {productId && (
                  <motion.div variants={fadeUp} className="mt-6">
                    <DownloadSpecButton productId={productId} light={!dark} />
                  </motion.div>
                )}
              </div>

              {/* Image */}
              <motion.div variants={imgVariant} className={`relative ${reverse ? 'lg:order-1' : ''}`}>
                <div className={`relative rounded-3xl overflow-hidden border shadow-2xl ${dark ? 'bg-gradient-to-br from-[#0A1428] to-[#050A14] border-white/[.06] shadow-black/60' : 'bg-slate-50 border-slate-200 shadow-slate-200/40'}`}>
                  <img src={image} alt={imageAlt} className="w-full h-[460px] object-contain p-6 opacity-90" />
                  {dark && <div className="absolute inset-0 bg-gradient-to-t from-[#050A14]/60 to-transparent" />}
                  {dark && <div className="absolute bottom-5 left-5">
                    <div className="text-[9px] font-black tracking-[.35em] uppercase mb-1" style={{ color: accentColor }}>{label}</div>
                    <div className="text-white font-bold">{imageAlt}</div>
                  </div>}
                </div>
              </motion.div>
            </div>
            {extra}
          </motion.div>
        </Wrap>
      </div>
    </section>
  );
};

// Category banner between product groups
const CategoryBanner = ({ badge, heading, sub, color }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <section ref={ref} className="relative bg-[#03070F] py-20 overflow-hidden">
      <GridBg op={.015} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 100%,${color}08 0%,transparent 60%)` }} />
      <Wrap>
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger()} className="text-center">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5" style={{ background: `${color}0F`, borderColor: `${color}25` }}>
            <span className="text-[10px] font-black tracking-widest uppercase" style={{ color }}>{badge}</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-6xl font-black text-white leading-none tracking-tight mb-4">{heading}</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-500 max-w-2xl mx-auto">{sub}</motion.p>
        </motion.div>
      </Wrap>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// NAV BAR
// ═══════════════════════════════════════════════════════════════════════════════
const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  const links = [
    { label: 'ECG Suite', href: '#ultramax' },
    { label: 'CardioX', href: '#cardiox' },
    { label: 'Respiratory', href: '#respiratory' },
    { label: 'Ventilators', href: '#ventilators' },
  ];
  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .6, delay: .15 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#050A14]/80 backdrop-blur-2xl border-b border-white/[.06]' : 'bg-transparent'}`}>
      <Wrap>
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1A6BFF] to-[#00D4AA] flex items-center justify-center shadow-lg shadow-[#1A6BFF]/30">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <div className="leading-none">
              <div className="text-[11px] font-black tracking-[.25em] text-white uppercase">Deckmount</div>
              <div className="text-[9px] text-slate-500 tracking-[.2em] uppercase mt-0.5">Electronics</div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {links.map(l => <a key={l.label} href={l.href} className="text-sm text-slate-500 hover:text-white transition-colors tracking-wide">{l.label}</a>)}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <a href="#overview" className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold bg-[#1A6BFF] text-white hover:bg-[#4285FF] transition-colors shadow-lg shadow-[#1A6BFF]/30">
              All Products <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <button onClick={() => setOpen(o => !o)} className="lg:hidden text-slate-400 hover:text-white">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden py-4 border-t border-white/[.06] space-y-3">
            {links.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block text-sm text-slate-400 hover:text-white py-1">{l.label}</a>)}
          </motion.div>
        )}
      </Wrap>
    </motion.nav>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════════════════
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 140]);
  const op = useTransform(scrollY, [0, 500], [1, 0]);
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-[#050A14] overflow-hidden">
      <GridBg />
      <AnimatedECG />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(26,107,255,.07) 0%,transparent 65%)' }} />
      <div className="absolute right-0 top-0 w-[500px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(circle at top right,rgba(0,212,170,.04) 0%,transparent 60%)' }} />

      <motion.div style={{ y, opacity: op }} className="relative z-10">
        <Wrap className="py-40 lg:py-48">
          <motion.div variants={stagger(.15)} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-12">
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#00D4AA]/8 border border-[#00D4AA]/20">
                <PulsingDot color="#00D4AA" size={5} /><span className="text-xs font-semibold text-[#00D4AA] tracking-[.15em] uppercase">Product 2026</span>
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-[clamp(3.5rem,10vw,8rem)] font-black text-white leading-none tracking-tight mb-8">
              Clinical devices
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A6BFF] via-[#4D8FFF] to-[#00D4AA]">built for India.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-2xl text-xl lg:text-2xl text-slate-400 leading-relaxed mb-14">
              From portable 12-lead ECG and AI-assisted analysis to BIPAP respiratory therapy and precision ventilation — a complete clinical ecosystem by Deckmount Electronics.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-8 mb-14">
              {[{ icon: Activity, label: 'ECG Suite' }, { icon: Wind, label: 'Respiratory' }, { icon: Gauge, label: 'Ventilation' }].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-[#00D4AA]" />
                  <span className="text-sm font-semibold text-slate-300">{label}</span>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a href="#overview" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold bg-[#1A6BFF] text-white hover:bg-[#4285FF] transition-all shadow-xl shadow-[#1A6BFF]/30 hover:-translate-y-0.5">
                See All Products <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#ultramax" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all">
                ECG Suite
              </a>
            </motion.div>
          </motion.div>
        </Wrap>
      </motion.div>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-slate-700 tracking-[.35em] uppercase">Scroll</span>
        <ChevronDown className="h-4 w-4 text-slate-700" />
      </motion.div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ALL PRODUCTS GRID
// ═══════════════════════════════════════════════════════════════════════════════
const ProductsOverview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const products = [
    { id: 'ultramax', cat: 'ECG Suite', title: 'Rhythm UltraMax', sub: 'Portable 12-Lead ECG', icon: Radio, color: '#1A6BFF', img: rhythmUltraMaxImg },
    { id: 'cardiox', cat: 'ECG Suite', title: 'CardioX RhythmPro', sub: 'Desktop Clinical Suite', icon: Monitor, color: '#1A6BFF', img: cardioxDashImg },
    { id: '12ch-ecg', cat: 'ECG Suite', title: '12 Channel ECG', sub: 'Hospital Tabletop System', icon: Activity, color: '#1A6BFF', img: ecg12ChImg },
    { id: '3ch-ecg', cat: 'ECG Suite', title: '3 Channel ECG', sub: 'Entry-Level Clinical ECG', icon: Activity, color: '#1A6BFF', img: ecg3ChImg },
    { id: 'respiratory', cat: 'Respiratory', title: 'BiPAP', sub: 'Bilevel Pressure Therapy', icon: Wind, color: '#00D4AA', img: bipapImg },
    { id: 'sleepsense', cat: 'Respiratory', title: 'SleepSense', sub: 'Sleep Diagnostic Monitor', icon: Moon, color: '#00D4AA', img: sleepSenseImg },
    { id: 'ventilators', cat: 'Ventilation', title: 'VT60ST', sub: 'Transport Ventilator', icon: Gauge, color: '#F97316', img: vt60stImg },
    { id: 'ventilators', cat: 'Ventilation', title: 'VT80ST', sub: 'ICU / Advanced Ventilator', icon: Gauge, color: '#F97316', img: vt80stImg },
  ];
  return (
    <section id="overview" className="relative bg-[#F8FAFC] py-28 lg:py-36 overflow-hidden">
      <LightGrid />
      <div ref={ref} className="relative z-10">
        <Wrap>
          <motion.div variants={stagger()} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.div variants={fadeUp}><ChLabel title="Product Portfolio" light /></motion.div>
            <motion.h2 variants={fadeUp} className="text-5xl lg:text-7xl font-black text-slate-900 leading-none tracking-tight mb-5 max-w-4xl">
              Eight devices.
              <br /><span className="text-[#1A6BFF]">One vision.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-slate-500 mb-20 max-w-2xl leading-relaxed">
              Deckmount builds clinical-grade medical devices across three product families — ECG acquisition, respiratory therapy, and critical care ventilation.
            </motion.p>
            <motion.div variants={stagger(.04)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((p, i) => (
                <motion.a key={`${p.id}-${i}`} href={`#${p.id}`} variants={scaleIn}
                  className="group relative rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1">
                  <div className="relative h-44 overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ background: `${p.color}20`, border: `1px solid ${p.color}30` }}>
                      <span className="text-[9px] font-black tracking-widest uppercase" style={{ color: p.color }}>{p.cat}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="font-black text-slate-900 mb-0.5">{p.title}</div>
                    <div className="text-sm text-slate-500">{p.sub}</div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </Wrap>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ECG SUITE SECTIONS
// ═══════════════════════════════════════════════════════════════════════════════

// Ecosystem diagram
const EcosystemOverview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <section id="ultramax" className="relative bg-[#050A14] py-28 lg:py-36 overflow-hidden">
      <GridBg />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(26,107,255,.06) 0%,transparent 65%)' }} />
      <div ref={ref} className="relative z-10">
        <Wrap>
          <motion.div variants={stagger()} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.div variants={fadeUp}><ChLabel number="01" title="Rhythm UltraMax Ecosystem" /></motion.div>
            <motion.h2 variants={fadeUp} className="text-5xl lg:text-7xl font-black text-white leading-none tracking-tight mb-5 max-w-4xl">
              One ecosystem.
              <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A6BFF] to-[#00D4AA]">Complete cardiac care.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-slate-400 mb-20 max-w-2xl leading-relaxed">
              Rhythm UltraMax hardware sends data via <strong className="text-white">BLE</strong> to the mobile app for instant field review, and via <strong className="text-white">USB</strong> to CardioX for deep clinical analysis — including 24–48 hour Holter monitoring.
            </motion.p>
            {/* 3-node diagram */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 items-start">
              <motion.div variants={slideLeft} className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/[.03] border border-white/[.07] hover:border-[#1A6BFF]/30 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-[#1A6BFF]/10 border border-[#1A6BFF]/15 flex items-center justify-center mb-4"><Smartphone className="h-7 w-7 text-[#1A6BFF]" /></div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00D4AA]/8 border border-[#00D4AA]/15 mb-3">
                  <Bluetooth className="h-3 w-3 text-[#00D4AA]" /><span className="text-[9px] font-black text-[#00D4AA] tracking-widest uppercase">BLE 5.0</span>
                </div>
                <h3 className="text-lg font-black text-white mb-2">Mobile Companion App</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Real-time ECG telemetry to smartphone. Instant reports under 10 seconds.</p>
              </motion.div>
              <motion.div variants={scaleIn} className="flex flex-col items-center text-center px-8">
                <div className="relative mb-5">
                  <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-44 h-44 lg:w-52 lg:h-52 rounded-[2rem] bg-gradient-to-br from-[#0A1428] to-[#050A14] border-2 border-[#1A6BFF]/20 overflow-hidden shadow-2xl shadow-[#1A6BFF]/15">
                    <img src={rhythmUltraMaxImg} alt="Rhythm UltraMax" className="w-full h-full object-contain p-4 opacity-90" />
                  </motion.div>
                  <motion.div animate={{ scale: [1, 1.18, 1], opacity: [.4, 0, .4] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 rounded-[2rem] border-2 border-[#1A6BFF]/30" />
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 bg-[#050A14] rounded-full border border-[#1A6BFF]/30">
                    <PulsingDot color="#1A6BFF" size={4} /><span className="text-[9px] font-black text-[#1A6BFF] tracking-widest uppercase">Hardware Core</span>
                  </div>
                </div>
                <h3 className="text-xl font-black text-white mb-1">Rhythm UltraMax</h3>
                <p className="text-xs text-slate-500 max-w-[180px]">12-lead clinical ECG. 24-bit. BLE + USB.</p>
              </motion.div>
              <motion.div variants={slideRight} className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/[.03] border border-white/[.07] hover:border-[#00D4AA]/30 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-[#00D4AA]/10 border border-[#00D4AA]/15 flex items-center justify-center mb-4"><Monitor className="h-7 w-7 text-[#00D4AA]" /></div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1A6BFF]/8 border border-[#1A6BFF]/15 mb-3">
                  <Usb className="h-3 w-3 text-[#1A6BFF]" /><span className="text-[9px] font-black text-[#1A6BFF] tracking-widest uppercase">USB Direct</span>
                </div>
                <h3 className="text-lg font-black text-white mb-2">CardioX Desktop Suite</h3>
                <p className="text-sm text-slate-500 leading-relaxed">30+ arrhythmia detection, HRV, AI Clinical Assistant, and Holter monitoring.</p>
              </motion.div>
            </div>
          </motion.div>
        </Wrap>
      </div>
    </section>
  );
};

// Rhythm UltraMax hardware detail
const ChapterUltraMax = () => (
  <ProductSection
    productId="rhythm-ultramax"
    number="" label="Rhythm UltraMax · Portable 12-Lead ECG"
    title="The device that<br/><span style='background:linear-gradient(to right,#1A6BFF,#00D4AA);-webkit-background-clip:text;-webkit-text-fill-color:transparent'>acquires it all.</span>"
    accentColor="#1A6BFF"
    description="Rhythm UltraMax captures all 12 leads simultaneously with hospital-grade 24-bit ADC precision. At 298 grams, it deploys in ambulances, rural clinics, emergency response, and bedside care — wherever patients need it."
    image={rhythmUltraMaxImg} imageAlt="Rhythm UltraMax RHYUM01"
    specs={[
      ['Lead configuration', '12-lead simultaneous ECG'],
      ['Sampling rate', '1,000 SPS per channel'],
      ['ADC resolution', '24-bit'],
      ['Wireless', 'Bluetooth LE 5.0'],
      ['Wired', 'USB direct to CardioX'],
      ['Battery life', '8 hours continuous acquisition'],
      ['Weight', '298 grams'],
      ['Standards', 'IEC 60601 compliant design'],
    ]}
    pills={['Ambulance ECG', 'Emergency Response', 'Rural Outreach', 'Clinic & OPD', 'Home Follow-up']}
    dark reverse
  />
);

// How It Connects
const HowItConnects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const Card = ({ pathLabel, pathColor, ConnIcon, title, desc, features }) => (
    <motion.div variants={fadeUp} className="rounded-3xl bg-gradient-to-br from-[#0A1428] to-[#050A14] border border-white/[.07] p-8 relative overflow-hidden">
      <GridBg op={.015} />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${pathColor}15`, border: `1px solid ${pathColor}25` }}>
            <ConnIcon className="h-5 w-5" style={{ color: pathColor }} /></div>
          <div>
            <div className="text-[10px] font-black tracking-widest uppercase" style={{ color: pathColor }}>{pathLabel}</div>
          </div>
        </div>
        <h3 className="text-2xl font-black text-white mb-3">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">{desc}</p>
        <div className="space-y-2">
          {features.map(f => (
            <div key={f} className="flex items-start gap-3">
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${pathColor}20` }}><Check className="h-2.5 w-2.5" style={{ color: pathColor }} /></div>
              <span className="text-sm text-slate-300">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
  return (
    <section className="relative bg-[#F8FAFC] py-28 lg:py-36 overflow-hidden">
      <LightGrid />
      <div ref={ref} className="relative z-10"><Wrap>
        <motion.div variants={stagger()} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp}><ChLabel title="Connectivity" light /></motion.div>
          <motion.h2 variants={fadeUp} className="text-5xl lg:text-7xl font-black text-slate-900 leading-none tracking-tight mb-5">One device.<br /><span className="text-[#1A6BFF]">Two clinical pathways.</span></motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-slate-500 mb-16 max-w-2xl leading-relaxed">Rhythm UltraMax connects wirelessly to the mobile app for field use, or directly via USB to the full CardioX desktop clinical suite.</motion.p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card pathLabel="Path A · BLE 5.0 Wireless" pathColor="#1A6BFF" ConnIcon={Smartphone} title="Field Clinical Review"
              desc="Real-time ECG telemetry streamed to Rhythm UltraMax Pro mobile app. Clinicians get instant rhythm analysis and shareable PDF reports within seconds."
              features={['Real-time live waveform on smartphone', 'ECG reports generated under 10 seconds', 'WhatsApp · Email · PDF delivery', 'Rapid rhythm disorder screening', 'Cloud sync for remote doctor review']} />
            <Card pathLabel="Path B · USB Direct" pathColor="#00D4AA" ConnIcon={Monitor} title="Deep Clinical Analysis"
              desc="Connected via USB to CardioX desktop — full diagnostic suite with real-time 12-lead visualization, advanced arrhythmia analysis, and AI-assisted reporting."
              features={['Real-time 12-lead ECG visualization', '30+ clinically significant arrhythmia tools', 'HRV analysis — Lorenz / Poincaré plots', 'AI Clinical Assistant and report drafting', 'Offline-first with automatic cloud sync']} />
          </div>
        </motion.div>
      </Wrap></div>
    </section>
  );
};

// CardioX Desktop
const ChapterCardioX = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const features = [
    { icon: Activity, title: '30+ Arrhythmia Tools', body: 'Detects 30+ clinically significant rhythm abnormalities for comprehensive cardiac screening.' },
    { icon: BarChart3, title: 'HRV Analysis', body: 'Lorenz / Poincaré scatter plots and full heart rate variability analysis included.' },
    { icon: Brain, title: 'AI Clinical Assistant', body: 'AI-assisted clinical report drafting and ECG interpretation support for clinicians.' },
    { icon: Zap, title: 'Hyperkalemia Screening', body: 'Fast 30-second capture test for peaked T-wave Hyperkalemia pattern detection.' },
    { icon: Cloud, title: 'Offline-First Sync', body: 'Patient records safely stored during outages. Automatic sync when connectivity returns.' },
    { icon: Shield, title: 'Secure Licensing', body: 'Hardware-bound license encryption with multi-pillar security verification.' },
  ];
  return (
    <section id="cardiox" className="relative bg-[#050A14] py-28 lg:py-36 overflow-hidden">
      <GridBg />
      <div ref={ref} className="relative z-10"><Wrap>
        <motion.div variants={stagger()} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp}><ChLabel number="02" title="CardioX RhythmPro · Desktop Clinical Suite" /></motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-14">
            <div>
              <motion.h2 variants={fadeUp} className="text-5xl lg:text-[3.5rem] font-black text-white leading-none tracking-tight mb-5">Where data<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A6BFF] to-[#00D4AA]">becomes diagnosis.</span></motion.h2>
              <motion.p variants={fadeUp} className="text-xl text-slate-400 leading-relaxed mb-6">A cross-platform desktop application built for diagnostic labs, cardiology units, and hospital review workflows.</motion.p>
              <motion.div variants={fadeUp} className="mb-8">
                <DownloadSpecButton productId="cardiox" light={false} />
              </motion.div>
            </div>
            <motion.div variants={slideRight}>
              <div className="rounded-3xl overflow-hidden border border-white/[.06] shadow-2xl">
                <img src={cardioxDashImg} alt="CardioX Dashboard" className="w-full h-[250px] object-contain p-2" />
              </div>
            </motion.div>
          </div>
          <motion.div variants={stagger(.05)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {features.map(f => (
              <motion.div key={f.title} variants={scaleIn} className="rounded-2xl p-5 border bg-white/[.03] border-white/[.07] hover:bg-white/[.06] hover:border-white/[.15] transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-[#1A6BFF]/10 flex items-center justify-center mb-3"><f.icon className="h-4 w-4 text-[#1A6BFF]" /></div>
                <div className="font-bold text-white text-sm mb-1">{f.title}</div>
                <p className="text-slate-400 text-xs leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="rounded-3xl overflow-hidden border border-white/[.06] shadow-2xl relative">
            <img src={cardiox12LeadImg} alt="12-Lead Monitor" className="w-full h-[380px] object-contain p-4" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050A14]/70 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="text-[9px] font-black text-[#00D4AA] tracking-widest uppercase mb-1">Live Clinical Display</div>
              <div className="text-white font-black text-xl">Simultaneous 12-Lead ECG Monitor</div>
            </div>
          </motion.div>
        </motion.div>
      </Wrap></div>
    </section>
  );
};

// Holter
const ChapterHolter = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <section className="relative bg-[#F8FAFC] py-28 lg:py-36 overflow-hidden">
      <LightGrid />
      <div ref={ref} className="relative z-10"><Wrap>
        <motion.div variants={stagger()} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp}><ChLabel number="03" title="Comprehensive Holter Analysis" light /></motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <motion.h2 variants={fadeUp} className="text-5xl lg:text-[3.5rem] font-black text-slate-900 leading-none tracking-tight mb-6">24–48 hours.<br /><span className="text-[#1A6BFF]">Every beat.<br />Documented.</span></motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-slate-500 leading-relaxed mb-8">Using a <strong className="text-slate-900">dedicated separate Holter recorder</strong>, patients wear the device for 24–48 hours. CardioX then provides full ambulatory ECG analysis — beat clustering, ST mapping, HRV, and clinical reports.</motion.p>
              <motion.div variants={fadeUp} className="rounded-2xl bg-[#1A6BFF]/5 border border-[#1A6BFF]/15 p-6 mb-8">
                <div className="font-bold text-slate-900 mb-2">Dedicated Holter Hardware Recorder</div>
                <p className="text-sm text-slate-500 leading-relaxed">A compact wearable recorder — separate from Rhythm UltraMax — worn continuously, capturing ambulatory ECG data across daily activity, sleep, and exertion.</p>
              </motion.div>
              <motion.div variants={stagger()} className="space-y-3 mb-8">
                {[{ icon: Clock, t: '24–48 hour continuous ambulatory recording' }, { icon: BarChart3, t: 'Beat template clustering — VE/SVE classification' }, { icon: Activity, t: 'Lorenz scatter plots & full HRV analysis' }, { icon: FileText, t: 'ST segment mapping and event detection' }, { icon: Brain, t: 'Multi-page comprehensive Holter report' }].map(({ icon: Icon, t }) => (
                  <motion.div key={t} variants={fadeUp} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#1A6BFF]/8 flex items-center justify-center flex-shrink-0"><Icon className="h-4 w-4 text-[#1A6BFF]" /></div>
                    <span className="text-slate-600 text-sm">{t}</span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp}>
                <DownloadSpecButton productId="holter" light={true} />
              </motion.div>
            </div>
            <motion.div variants={slideRight} className="space-y-4">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl"><img src={holterHwImg} alt="Holter Hardware" className="w-full h-[270px] object-contain p-4" /></div>
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl"><img src={holterSoftImg} alt="Holter Software" className="w-full h-[250px] object-contain p-4" /></div>
              <p className="text-center text-xs text-slate-400">CardioX · Comprehensive ECG Analysis Module</p>
            </motion.div>
          </div>
        </motion.div>
      </Wrap></div>
    </section>
  );
};

// 12 Channel ECG Tabletop
const Chapter12ChannelECG = () => (
  <ProductSection
    productId="12ch-ecg"
    number="04" label="12 Channel ECG · Hospital Tabletop Diagnostic System"
    title="Hospital-grade 12-lead ECG.<br/><span style='color:#1A6BFF'>Built for the clinic.</span>"
    accentColor="#1A6BFF"
    description="A full-featured 12-channel tabletop ECG system designed for hospital diagnostic labs, cardiology departments, and advanced outpatient clinics. Purpose-built for structured clinical workflows with high-clarity display, auto-analysis, and network reporting."
    image={ecg12ChImg} imageAlt="12 Channel ECG Tabletop"
    specs={[
      ['Lead configuration', '12-lead simultaneous ECG'],
      ['Display', 'Large integrated clinical display'],
      ['Analysis', 'Automated ECG interpretation'],
      ['Report format', 'PDF / thermal print'],
      ['Connectivity', 'LAN · Wi-Fi · USB'],
      ['Data storage', 'Internal patient record storage'],
    ]}
    pills={['Cardiology Dept', 'Diagnostic Lab', 'Advanced OPD', 'Referral Hospital']}
    dark reverse
  />
);

// 3 Channel ECG
const Chapter3ChannelECG = () => (
  <ProductSection
    productId="3ch-ecg"
    number="05" label="3 Channel ECG · Entry-Level Clinical ECG"
    title="Fast, reliable ECG<br/><span style='color:#1A6BFF'>for every clinic.</span>"
    accentColor="#1A6BFF"
    description="Entry-level 3-channel ECG system optimized for quick acquisition and connected reporting in smaller clinics and general practices. Simple operation, fast results, and clinician-friendly output — designed for high patient volume settings."
    image={ecg3ChImg} imageAlt="3 Channel ECG"
    features={[
      { icon: Activity, title: '3-channel simultaneous acquisition', body: 'Efficient 3-lead ECG capture for rapid clinical screening and routine cardiac checks.' },
      { icon: FileText, title: 'Quick automated reporting', body: 'Clean, printable ECG reports with automated rhythm labeling for fast clinical decisions.' },
      { icon: Monitor, title: 'Built-in display', body: 'Clear onboard LCD display for immediate waveform review at the point of care.' },
      { icon: Wifi, title: 'Connectivity and sharing', body: 'USB and network connectivity for digital report storage and sharing with specialists.' },
    ]}
    pills={['General Practice', 'Primary Care', 'Small Clinics', 'Health Camps']}
    dark={false}
  />
);

// ═══════════════════════════════════════════════════════════════════════════════
// RESPIRATORY DEVICES
// ═══════════════════════════════════════════════════════════════════════════════
const ChapterBiPAP = () => (
  <ProductSection
    productId="bipap"
    id="respiratory"
    number="06" label="BiPAP · Bilevel Positive Airway Pressure"
    title="Respiratory support,<br/><span style='color:#00D4AA'>precisely calibrated.</span>"
    accentColor="#00D4AA"
    description="Advanced bilevel positive airway pressure therapy system for sleep apnea management and respiratory support. Smooth pressure transitions, quiet operation, and comprehensive therapy data tracking for both hospital and home use."
    image={bipapImg} imageAlt="BiPAP Respiratory Device"
    specs={[
      ['Pressure range', '4–25 cmH₂O (IPAP / EPAP)'],
      ['Therapy modes', 'S · T · S/T · CPAP'],
      ['Humidification', 'Integrated heated humidifier'],
      ['Ramp time', '0–45 minutes configurable'],
      ['Data export', 'Smart card / USB export'],
      ['Alarm system', 'Apnea · Low pressure · Power failure'],
    ]}
    pills={['Sleep Apnea', 'Respiratory Therapy', 'Home Care', 'Hospital Ward']}
    dark reverse
  />
);

const ChapterSleepSense = () => (
  <ProductSection
    productId="sleepsense"
    number="07" label="SleepSense · Sleep Diagnostic Monitor"
    title="Understand sleep.<br/><span style='color:#00D4AA'>Diagnose better.</span>"
    accentColor="#00D4AA"
    description="Comprehensive ambulatory sleep monitoring system for overnight screening and diagnosis of sleep disorders. Tracks SpO₂, airflow, body position, chest and abdominal respiratory effort, and snoring for complete sleep study analysis."
    image={sleepSenseImg} imageAlt="SleepSense Sleep Monitor"
    features={[
      { icon: Moon, title: 'Multi-channel overnight monitoring', body: 'Simultaneously records SpO₂, airflow, body position, effort, and snoring through a comfortable wearable setup.' },
      { icon: BarChart3, title: 'AHI and event analysis', body: 'Automated calculation of Apnea-Hypopnea Index, RDI, and ODI for clinical sleep disorder classification.' },
      { icon: Clock, title: '12-hour recording capacity', body: 'Full night ambulatory recording with reliable data capture across sleep stages and position changes.' },
      { icon: FileText, title: 'Clinical sleep report', body: 'Comprehensive, clinician-ready sleep study report with visual event maps and severity scoring.' },
    ]}
    pills={['Sleep Lab', 'Sleep Apnea Screening', 'Home Sleep Testing', 'Pulmonology']}
    dark={false}
  />
);

// ═══════════════════════════════════════════════════════════════════════════════
// VENTILATION
// ═══════════════════════════════════════════════════════════════════════════════
const ChapterVentilators = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const specs60 = [
    ['Model', 'VT60ST Transport Ventilator'],
    ['Ventilation modes', 'VCV · PCV · SIMV · CPAP · PEEP'],
    ['Tidal volume', '50–2000 mL'],
    ['Respiratory rate', '1–60 bpm'],
    ['PEEP', '0–20 cmH₂O'],
    ['Power', 'AC mains + Internal battery'],
  ];
  const specs80 = [
    ['Model', 'VT80ST ICU / Advanced Ventilator'],
    ['Ventilation modes', 'VCV · PCV · PRVC · SIMV · BiPAP · CPAP'],
    ['Tidal volume', '20–2500 mL'],
    ['Respiratory rate', '1–80 bpm'],
    ['PEEP', '0–25 cmH₂O'],
    ['Power', 'AC mains + Extended battery'],
  ];
  return (
    <section id="ventilators" className="relative bg-[#050A14] py-28 lg:py-36 overflow-hidden">
      <GridBg />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%,rgba(249,115,22,.05) 0%,transparent 60%)' }} />
      <div ref={ref} className="relative z-10"><Wrap>
        <motion.div variants={stagger()} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp}><ChLabel number="08" title="VT60ST / VT80ST · Ventilators" /></motion.div>
          <motion.h2 variants={fadeUp} className="text-5xl lg:text-[3.5rem] font-black text-white leading-none tracking-tight mb-5 max-w-3xl">
            Precision ventilation.
            <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FB923C]">Wherever care demands.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-slate-400 mb-16 max-w-2xl leading-relaxed">
            The VT60ST and VT80ST deliver reliable, precision ventilation for ICU, transport, and emergency settings. Robust construction, comprehensive alarms, and multiple ventilation modes.
          </motion.p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* VT60ST */}
            <motion.div variants={slideLeft} className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#0A1428] to-[#050A14] border border-white/[.06] shadow-2xl">
              <div className="relative">
                <img src={vt60stImg} alt="VT60ST" className="w-full h-[300px] object-contain p-4 opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] to-transparent" />
                <div className="absolute top-4 left-4 px-2 py-1 rounded-full" style={{ background: 'rgba(249,115,22,.15)', border: '1px solid rgba(249,115,22,.3)' }}>
                  <span className="text-[9px] font-black text-[#F97316] tracking-widest uppercase">Transport</span>
                </div>
              </div>
              <div className="p-7">
                <div className="text-[10px] font-black tracking-widest text-[#F97316] uppercase mb-2">VT60ST</div>
                <h3 className="text-2xl font-black text-white mb-3">Transport Ventilator</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">Compact and robust transport ventilator for ICU-to-ICU transfers, ambulance transport, and emergency response. Dual power source with comprehensive alarm coverage.</p>
                <div className="space-y-0">{specs60.map(([l, v]) => <SpecRow key={l} label={l} value={v} />)}</div>
                <div className="flex flex-wrap gap-2 mt-5 mb-6">
                  {['ICU Transport', 'Ambulance', 'Emergency', 'Post-Op'].map(p => <Pill key={p}>{p}</Pill>)}
                </div>
                <DownloadSpecButton productId="vt60st" light={false} />
              </div>
            </motion.div>
            {/* VT80ST */}
            <motion.div variants={slideRight} className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#0A1428] to-[#050A14] border border-white/[.06] shadow-2xl">
              <div className="relative">
                <img src={vt80stImg} alt="VT80ST" className="w-full h-[300px] object-contain p-4 opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] to-transparent" />
                <div className="absolute top-4 left-4 px-2 py-1 rounded-full" style={{ background: 'rgba(249,115,22,.15)', border: '1px solid rgba(249,115,22,.3)' }}>
                  <span className="text-[9px] font-black text-[#F97316] tracking-widest uppercase">ICU / Advanced</span>
                </div>
              </div>
              <div className="p-7">
                <div className="text-[10px] font-black tracking-widest text-[#F97316] uppercase mb-2">VT80ST</div>
                <h3 className="text-2xl font-black text-white mb-3">ICU / Advanced Ventilator</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">Advanced ICU ventilator with expanded mode range including PRVC and BiPAP modes. Designed for complex respiratory management in critical care units.</p>
                <div className="space-y-0">{specs80.map(([l, v]) => <SpecRow key={l} label={l} value={v} />)}</div>
                <div className="flex flex-wrap gap-2 mt-5 mb-6">
                  {['ICU', 'Critical Care', 'Neonatal', 'Adult & Paediatric'].map(p => <Pill key={p}>{p}</Pill>)}
                </div>
                <DownloadSpecButton productId="vt80st" light={false} />
              </div>
            </motion.div>
          </div>
          {/* shared features */}
          <motion.div variants={fadeUp} className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[{ icon: Shield, t: 'Comprehensive Alarms', b: 'Apnea, high/low pressure, disconnect, power failure' }, { icon: Battery, t: 'Dual Power', b: 'AC mains + internal battery backup' }, { icon: Gauge, t: 'Multiple Modes', b: 'Volume, pressure, and spontaneous ventilation' }, { icon: Activity, t: 'Real-time Monitoring', b: 'Waveform display, loops, and trend tracking' }].map(({ icon: Icon, t, b }) => (
              <div key={t} className="rounded-2xl bg-white/[.03] border border-white/[.06] p-5">
                <div className="w-9 h-9 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-3"><Icon className="h-4 w-4 text-[#F97316]" /></div>
                <div className="font-bold text-white text-sm mb-1">{t}</div>
                <p className="text-slate-400 text-xs leading-relaxed">{b}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Wrap></div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════════════════════════════════════
const StatsRow = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const v1 = useCountUp(1000, inView, 1.6);
  const v2 = useCountUp(30, inView, 1.4);
  const v3 = useCountUp(48, inView, 1.5);
  const v4 = useCountUp(8, inView, 1.3);
  const stats = [
    { val: v1, suf: '', unit: 'SPS', label: 'per channel ECG acquisition', icon: Zap, color: '#1A6BFF' },
    { val: v2, suf: '+', unit: '', label: 'arrhythmia detection tools', icon: Activity, color: '#00D4AA' },
    { val: v3, suf: ' hr', unit: 'Max', label: 'ambulatory Holter recording', icon: Clock, color: '#1A6BFF' },
    { val: v4, suf: ' hr', unit: '', label: 'continuous ECG battery life', icon: Battery, color: '#00D4AA' },
  ];
  return (
    <section className="relative bg-[#F8FAFC] py-24 overflow-hidden">
      <LightGrid />
      <div ref={ref} className="relative z-10"><Wrap>
        <motion.div variants={stagger()} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <ChLabel title="By the Numbers" light />
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Clinical precision, measured.</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map(({ val, suf, unit, label, icon: Icon, color }) => (
              <motion.div key={label} variants={scaleIn} className="text-center p-7 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-500">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: `${color}10` }}><Icon className="h-5 w-5" style={{ color }} /></div>
                <div className="text-4xl lg:text-5xl font-black text-slate-900 leading-none mb-2 tracking-tight">
                  {unit && <span style={{ color }}>{unit}</span>}{val}{suf}
                </div>
                <div className="text-sm text-slate-500 leading-snug">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Wrap></div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// CLOSING
// ═══════════════════════════════════════════════════════════════════════════════
const Closing = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  return (
    <section className="relative bg-[#050A14] py-28 lg:py-40 overflow-hidden">
      <GridBg />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 80%,rgba(26,107,255,.09) 0%,transparent 60%)' }} />
      <div ref={ref} className="relative z-10"><Wrap>
        <motion.div variants={stagger()} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[.04] border border-white/[.08] mb-12">
            <PulsingDot color="#00D4AA" size={5} />
            <span className="text-xs font-semibold text-slate-400 tracking-[.15em] uppercase">Complete Clinical Ecosystem</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-5xl lg:text-[5.5rem] font-black text-white leading-none tracking-tight max-w-5xl mx-auto mb-10">
            From portable ECG to precision ventilation —
            <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A6BFF] via-[#4D8FFF] to-[#00D4AA]">Deckmount delivers.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-slate-500 max-w-3xl mx-auto mb-16 leading-relaxed">
            Eight clinical-grade medical devices across ECG acquisition, respiratory therapy, and critical care ventilation — engineered for Indian healthcare, built to international standards.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {['IEC 60601 Compliant Design', 'AI-Assisted Clinical Reporting', 'Offline-First ECG Architecture', '24-bit ADC Precision', '24–48 hr Holter Monitoring', 'ICU & Transport Ventilation'].map(item => (
              <div key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#00D4AA] flex-shrink-0" />
                <span className="text-slate-400 text-sm">{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Wrap></div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════════════
const Footer = () => (
  <footer className="bg-[#030710] border-t border-white/[.04] py-10">
    <Wrap>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1A6BFF] to-[#00D4AA] flex items-center justify-center"><Activity className="h-4 w-4 text-white" /></div>
          <div className="leading-none">
            <div className="text-[11px] font-black tracking-[.25em] text-white uppercase">Deckmount Electronics</div>
            <div className="text-[9px] text-slate-600 tracking-[.2em] uppercase mt-0.5">Clinical Device Innovation · India</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {['Rhythm UltraMax', 'CardioX', '12Ch ECG', '3Ch ECG', 'BiPAP', 'SleepSense', 'VT60ST', 'VT80ST'].map(p => (
            <a key={p} href="#" className="text-xs text-slate-700 hover:text-slate-400 transition-colors">{p}</a>
          ))}
        </div>
        <div className="text-xs text-slate-800">© 2026 Deckmount Electronics · India Roadshow</div>
      </div>
    </Wrap>
  </footer>
);

// ═══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  return (
    <div className="font-sans antialiased">
      <NavBar />
      <Hero />
      <ProductsOverview />

      {/* ECG Suite */}
      <CategoryBanner badge="Product Family 01" heading="ECG Suite" sub="From portable field acquisition to comprehensive desktop analysis and long-term Holter monitoring." color="#1A6BFF" />
      <EcosystemOverview />
      <ChapterUltraMax />
      <HowItConnects />
      <ChapterCardioX />
      <ChapterHolter />
      <Chapter12ChannelECG />
      <Chapter3ChannelECG />

      {/* Respiratory */}
      <CategoryBanner badge="Product Family 02" heading="Respiratory" sub="Advanced therapy and diagnostic devices for sleep apnea management and respiratory support." color="#00D4AA" />
      <ChapterBiPAP />
      <ChapterSleepSense />

      {/* Ventilation */}
      <CategoryBanner badge="Product Family 03" heading="Ventilation" sub="Transport and ICU ventilators engineered for precision respiratory support in critical care." color="#F97316" />
      <ChapterVentilators />

      <StatsRow />
      <Closing />
      <Footer />
    </div>
  );
}
