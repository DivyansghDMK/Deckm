import { Canvas, useFrame } from '@react-three/fiber';
import { Html, RoundedBox } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Activity,
  ArrowRight,
  BatteryCharging,
  Bluetooth,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Heart,
  Monitor,
  ShieldCheck,
  Sparkles,
  TabletSmartphone,
  Users,
  Workflow,
  Globe,
  Printer,
} from 'lucide-react';

import rhythmFrontV2 from './assets/extracted/rhythm_ultramax_v2.png';
import rhythmFrontV3 from './assets/extracted/rhythm_ultramax_v3.png';
import ecgTabletop from './assets/extracted/ecg_tabletop.jpg';
import sleepSense from './assets/extracted/sleepsense_new.webp';
import cardioxAppDashboard from './assets/extracted/cardiox_app_dashboard.jpeg';
import cardioxPlaystore from './assets/extracted/cardiox_playstore.png';
import ecg12ChannelNew from './assets/extracted/ecg12channel_v3.png';
import ecg3Channel from './assets/extracted/ecg3channel_new.png';
import vt80stImage from './assets/extracted/vt80st_v3.jpg';
import vt60stImage from './assets/extracted/vt60st_v2.jpg';
import pdfImg349 from './assets/extracted/pdf_img_3_49.png';
import pdfImg347 from './assets/extracted/pdf_img_3_47.jpeg';
import pdfImg344 from './assets/extracted/pdf_img_3_44.png';
import pdfImg231 from './assets/extracted/pdf_img_2_31.jpeg';
import pdfImg16 from './assets/extracted/pdf_img_1_6.jpeg';
import pdfImg18 from './assets/extracted/pdf_img_1_8.jpeg';
import pdfImg110 from './assets/extracted/pdf_img_1_10.jpeg';
import pdfImg225 from './assets/extracted/pdf_img_2_25.jpeg';
import pdfImg112 from './assets/extracted/pdf_img_1_12.png';
import pdfImg227 from './assets/extracted/pdf_img_2_27.jpeg';
import pdfImg228 from './assets/extracted/pdf_img_2_28.jpeg';
import pdfImg230 from './assets/extracted/pdf_img_2_30.jpeg';
import pdfImg14 from './assets/extracted/pdf_img_1_4.jpeg';
import pdfImg069 from './assets/extracted/pdf_img_0_69.png';
import pdfImg067 from './assets/extracted/pdf_img_0_67.jpeg';
import whatsappImageCardiox from './assets/whatsapp_image_cardiox.jpeg';
import cardioxDashboard from './assets/cardiox_dashboard.png';
import cardiox12LeadEcg from './assets/cardiox_12lead_ecg.png';
import ecg12channelTabletop from './assets/ecg12channel_tabletop.png';
import cardioxHolterSoftware from './assets/cardiox_holter_software.png';

const navLinks = [
  { href: '#devices', label: 'Devices' },
  { href: '#software', label: 'Software' },
  { href: '#pdf-info', label: 'PDF Info' },
  { href: '#program', label: '6 Month Program' },
  { href: '#product-proof', label: 'Product Proof' },
  { href: '#features', label: 'Features' },
];

const heroStats = [
  { value: '1,000', label: 'samples/sec/channel' },
  { value: '99.9%', label: 'accuracy target' },
  { value: '16', label: 'hours recording' },
  { value: '80+', label: 'AI patterns' },
];

const proofMarkers = [
  '24-bit clinical precision',
  'Fluke tested validation',
  'Cloud-enabled reporting',
  'Built for hospital demos',
];

const deviceCards = [
  {
    title: 'Rhythm UltraMax',
    subtitle: 'Portable 12-Lead ECG System',
    quote: 'Built for premium clinical mobility.',
    image: pdfImg347,
  },
  {
    title: '12 Channel ECG',
    subtitle: 'Hospital Tabletop Diagnostic System',
    quote: 'Built to feel serious, clear, and fast in a clinic.',
    image: ecg12channelTabletop,
  },
  {
    title: '3 Channel ECG',
    subtitle: 'Entry-Level Clinical ECG System',
    quote: 'Designed around operational realities.',
    image: ecg3Channel,
  },
  {
    title: 'BiPAP VT20 ST',
    subtitle: 'Premium Respiratory Therapy',
    quote: 'Therapy that feels natural and calm.',
    image: vt80stImage,
  },
  {
    title: 'BiPAP VT60 ST',
    subtitle: 'Adaptive Ventilation Platform',
    quote: 'Strong support without added effort.',
    image: vt60stImage,
  },
  {
    title: 'Rhythm UltraMax Pro',
    subtitle: 'Live Review and Reporting Workflow',
    quote: 'Built to turn traces into decisions quickly.',
    image: cardioxAppDashboard,
  },
];

const productShowcases = [
  {
    id: 'portable-ecg',
    kicker: 'Portable ECG',
    title: 'Rhythm UltraMax · ',
    subtitle: 'Portable 12-Lead ECG System',
    image: pdfImg347,
    images: [
      { src: pdfImg347, label: 'Rhythm UltraMax Device', desc: 'Simultaneous 12-Lead ECG physical acquisition hardware' },
      { src: pdfImg069, label: 'Mobile Companion App', desc: 'Real-time telemetry and cloud sync app on smartphones' },
      { src: cardioxDashboard, label: 'CardioX Dashboard Integration', desc: 'Direct desktop integration for clinicians and patient reviews' },
      { src: cardiox12LeadEcg, label: 'CardioX 12-Lead Software', desc: 'Full diagnostic monitoring terminal and review software' }
    ],
    description:
      'Portable 12-lead ECG built for field deployment, emergency response, and mobile diagnostics. Designed as a hardware acquisition layer, it transmits live traces to the mobile companion app and directly to the CardioX desktop suite.',
    quote: 'Built for Mobility. Trusted for Clinical Decisions.',
    problem: {
      title: 'The Problem We Saw',
      text: 'Most portable ECG systems fail outside controlled hospital environments. Clinicians repeatedly face consumer-grade devices that clinicians cannot rely on, poor waveform quality, delayed ECG reports that slow treatment decisions, fragmented software, difficult doctor review workflows, and bulky systems that cannot move easily.',
      points: [
        'Consumer-grade devices that clinicians cannot rely on.',
        'Poor waveform quality',
        'Delayed ECG reports that slow treatment decisions.',
        'Fragmented software',
        'Difficult doctor review workflows',
        'Bulky systems that cannot move easily',
      ],
      others: 'Existing systems were either portable but limited OR clinically strong but operationally heavy.',
    },
    missing: {
      title: 'What Others Are Missing',
      text: 'Most ECG systems still separate acquisition, analysis, reporting, and doctor review into disconnected workflows. Many devices lack simultaneous 12-lead capture, provide limited arrhythmia analysis, cannot generate fast reports, and break workflow between mobile and desktop review.',
      points: [
        'Real deployment movement',
        'Cloud-connected review',
        'Fast field diagnostics',
      ],
    },
    built: {
      title: 'What We Built Instead',
      text: 'Rhythm UltraMax combines simultaneous 12-lead ECG, 24-bit precision acquisition, HRV testing, automated arrhythmia detection to assist faster clinical review, cloud-connected reporting, and mobile-to-desktop workflow into one portable clinical ecosystem.',
      mobile: [
        'Full ECG reports under 10 seconds',
        'HRV testing',
        'Rapid screening of common rhythm disorders on mobile.',
        'Fast waveform review',
      ],
      desktop: [
        'Detects 30+ clinically significant rhythm abnormalities',
        'Hyperkalemia screening',
        'Waveform inspection tools',
        'Magnifier and caliper analysis',
        'Advanced clinical review workflow',
      ],
    },
    better: {
      title: 'Why Rhythm UltraMax Performs Better',
      points: [
        { title: 'Clinical-grade precision', text: '24-bit ADC with simultaneous 12-lead ECG at 1000 SPS/channel.' },
        { title: 'Cloud-Connected Intelligence', text: 'Real-time sync with Rhythm UltraMax Pro cloud for instant remote review.' },
        { title: 'Better doctor usability', text: 'Desktop waveform analysis with measurements, annotations, and detailed review.' },
        { title: 'Connected ecosystem', text: 'Device → Mobile → Cloud → Cardiox Desktop → Report.' },
        { title: 'Built for movement', text: 'Designed for ambulances, camps, clinics, bedside care, and outreach deployment.' },
        { title: 'Future-ready platform', text: 'Holter monitoring and expanded AI diagnostics already in development.' },
      ],
    },
    specs: [
      ['Lead mode', 'Simultaneous 12-lead ECG'],
      ['Sampling', '1,000 samples per second per channel'],
      ['ADC resolution', '24-bit'],
      ['Connectivity', 'BLE 5.0, USB, Cloud Sync (Standard)'],
      ['Battery life', '8 hours continuous acquisition (4000 mAh)'],
      ['Weight', '298 grams'],
      ['Standards', 'IEC 60601 compliant design'],
      ['Report format', 'PDF / WhatsApp / Email / Cloud Link'],
    ],
    workflow: [
      { title: 'Record', text: 'Full simultaneous 12-lead ECG at the point of care.' },
      { title: 'Review', text: 'Fast operator checks inside Rhythm UltraMax Pro.' },
      { title: 'Sync', text: 'Push the trace to cloud-connected storage.' },
      { title: 'Report', text: 'Generate a shareable clinical PDF quickly.' },
      { title: 'Doctor', text: 'Review on desktop with measurements and interpretation tools.' },
    ],
    useCases: [
      { title: 'Emergency response', text: 'Rapid acquisition during urgent care.' },
      { title: 'Ambulance ECG', text: 'Pre-hospital ECG capture and quick sharing.' },
      { title: 'Rural outreach', text: 'Mobile screening where infrastructure is limited.' },
      { title: 'Clinics and OPDs', text: 'Fast diagnosis in smaller practices and clinics.' },
      { title: 'Home follow-up', text: 'Remote rhythm review after discharge.' },
      { title: 'Occupational health', text: 'On-site checks in factories and camps.' },
    ],
    expansion: {
      title: 'Future Expansion',
      points: [
        { title: '24–72 Hour Holter Monitoring', text: 'Continuous ambulatory ECG monitoring for long-duration rhythm analysis and cardiac event detection.' },
        { title: 'Advanced AI Analysis', text: 'Expanded diagnostic intelligence and deeper arrhythmia interpretation workflows.' },
      ],
    },
  },
  {
    id: 'cardiox-rhythmpro',
    kicker: 'ECG & Holter Analysis Suite',
    title: 'CardioX (RhythmPro)',
    subtitle: 'Clinical-Grade Real-Time ECG Monitoring & AI-Powered Cardiac Diagnostics',
    image: whatsappImageCardiox,
    images: [
      { src: cardioxDashboard, label: 'CardioX Diagnostic Terminal', desc: 'Desktop interface for patient history and ECG records' },
      { src: cardiox12LeadEcg, label: '12-Lead Live Trace Monitor', desc: 'Hardware-accelerated drawing layout' },
      { src: cardioxHolterSoftware, label: 'Holter Analysis Software', desc: 'Advanced ECG & Holter analysis suite showing beat template clustering, Lorenz scatter plots, and ST mapping' },
      { src: whatsappImageCardiox, label: 'Holter Hardware Device', desc: 'Companion ambulatory Holter recorder for long-term clinical monitoring' }
    ],
    description:
      'CardioX is a medical-grade, cross-platform software application engineered for real-time twelve-lead ECG acquisition, long-term Holter analysis, and automated diagnostic reporting. Key metrics: 1000 SPS/channel acquisition, 24-bit ADC precision, <10 second ECG report generation, simultaneous 12-lead capture, 30+ arrhythmia analysis tools, HRV analysis, and Hyperkalemia screening support. While it acts as the primary software review terminal for the Rhythm UltraMax handheld ECG, CardioX also supports comprehensive long-term Holter monitoring when paired with dedicated ambulatory Holter hardware.',
    quote: 'Real-Time ECG Review Without Workflow Interruptions.',
    problem: {
      title: 'The Problem We Saw',
      text: 'Traditional ECG interpretation and Holter analysis software is slow, single-platform, runs poorly on low-spec hardware, and lacks modern AI assistance or automated reporting.',
      points: [
        'Slow ECG processing delays diagnosis.',
        'Fragmented desktop & mobile workflows',
        'Manual, time-consuming beat clustering',
        'No built-in clinical AI assistance',
        'Risk of losing patient data during poor internet connectivity.',
      ],
      others: 'Existing clinical software often forces hospitals to choose between modern AI features and offline reliability.',
    },
    missing: {
      title: 'What Others Are Missing',
      text: 'Most ECG systems do not support long-term ambulatory Holter monitoring, lack sub-pixel hardware acceleration, have weak security signatures, and lack automated multi-page PDF reports.',
      points: [
        'Adaptive noise-mitigation (DSP)',
        'Smooth real-time waveform rendering.',
        'Flexible lead layouts (e.g. 12x1, 3x4 + 1)',
        'Reliable offline operation with automatic synchronization.',
      ],
    },
    built: {
      title: 'What We Built Instead',
      text: 'CardioX integrates real-time 12-lead acquisition, advanced beat morphology clustering, and AI-driven clinical reporting into an offline-first desktop platform.',
      mobile: [
        'Pan-Tompkins peak detection',
        '8-stage noise mitigation filter',
        'Lead disconnection alerts.',
        'Offline persistent caching',
      ],
      desktop: [
        'Morphology Beat Template clustering',
        'Lorenz / Poincaré autonomic HRV maps',
        'AI Clinical Assistant & Interactive Chatbot',
        'Asynchronous background report compiler',
      ],
    },
    better: {
      title: 'Why CardioX Performs Better',
      points: [
        { title: 'Continuous Clinical Workflow', text: 'ECG rendering remains responsive even while filtering, analysis, and report generation run in the background.' },
        { title: 'Offline-First Resilience', text: 'Patient records remain safely stored during internet outages and automatically synchronize when connectivity returns.' },
        { title: 'High-Fidelity Rendering', text: 'Smooth real-time waveform rendering with graphics engine fallback for low-spec clinical devices.' },
        { title: 'Secure License Security', text: 'Three-pillar signature check combined with local hardware fingerprint registration.' },
        { title: 'AI Report Assistant', text: 'AI-assisted clinical report drafting and ECG interpretation support.' },
        { title: 'Specialty Screening', text: 'Includes Hyperkalemia Screening, Heart Rate Variability (HRV) tracking, and advanced Arrhythmia Detection.' },
      ],
    },
    specs: [
      ['Core Platform', 'Cross-platform desktop application'],
      ['Signal Analysis', 'Real-time ECG processing, Pan-Tompkins R-peak detection, noise suppression, QT/QTc calculation, HRV analysis'],
      ['Cloud Integration', 'Automatic synchronization, secure storage, background upload'],
      ['Security', 'License encryption, hardware binding, offline protection'],
    ],
    workflow: [
      { title: 'Acquisition', text: 'Smart lead derivation calculates 12-lead ECG from 8 physical channels.' },
      { title: 'Filtering', text: 'Notch, comb, and high-pass filters clean baseline drift and muscle tremors.' },
      { title: 'Analysis', text: 'Holter engine clusters beats by morphology for rapid review.' },
      { title: 'AI Review', text: 'AI-assisted clinical report drafting and interpretation support.' },
      { title: 'Cloud Archive', text: 'Secure upload and automatic synchronization with cloud repository.' },
    ],
    useCases: [
      { title: 'Diagnostic Labs', text: 'High-volume Holter clustering and multi-page reporting.' },
      { title: 'Mobile Clinics', text: 'Offline queueing and low-spec hardware rendering support.' },
      { title: 'Cardiology Units', text: 'Real-time 12-lead acquisition with vector axis calculations.' },
    ],
    expansion: {
      title: 'Future Product Vision',
      points: [
        { title: 'Next Generation AI Diagnostics', text: 'Edge-compiled CNN models for offline micro-arrhythmia detection.' },
        { title: 'HL7 / FHIR Integration', text: 'Native enterprise hospital records (EMR/EHR) interoperability layer.' },
      ],
    },
  },
  {
    id: '3-channel-ecg',
    kicker: '3 Channel ECG',
    title: '3 Channel ECG · ',
    subtitle: 'Entry-Level Clinical ECG System',
    image: ecg3Channel,
    description:
      'A practical 3-channel ECG system designed for faster acquisition and connected reporting in clinics.',
    quote: 'Designed around operational realities.',
    problem: {
      title: 'The Problem We Saw',
      text: 'Most entry-level ECG systems are built only to meet specifications — not to improve real clinical workflow. Clinics and diagnostic centers often face slow acquisition, difficult review, and outdated interfaces.',
      points: [
        'Slow ECG acquisition',
        'Difficult report review',
        'Outdated interfaces',
        'Unreliable recording-to-sharing workflow',
        'Operationally heavy machines',
      ],
      others: 'Many systems are technically functional but hard to deploy quickly and disconnected from modern digital workflows.',
    },
    missing: {
      title: 'What Others Are Missing',
      text: 'Most standard 3-channel ECG systems focus only on printing and basic acquisition. Very few are designed around workflow simplicity, digital sharing, and fast diagnosis flow.',
      points: [
        'Workflow simplicity',
        'Digital sharing',
        'Cleaner user experience',
        'Fast diagnosis flow',
        'Clinical presentation quality',
      ],
    },
    built: {
      title: 'What We Built Instead',
      text: 'The DECK MOUNT ELECTRONICS 3 Channel ECG system brings faster acquisition, easier operation, and connected reporting into one practical workflow.',
      mobile: [
        'Automatic, manual, and rhythm modes',
        'Wireless connectivity',
        'Real-time waveform preview',
      ],
      desktop: [
        'Interpretation software',
        'PDF export workflow',
        'Thermal reporting',
      ],
    },
    better: {
      title: 'Why Our ECG System Performs Better',
      points: [
        { title: 'Cloud-Enabled Workflow', text: 'Instantly sync ECG records to the central cloud for remote diagnostic review.' },
        { title: 'Simultaneous 12-Lead Capture', text: 'Simultaneous interpretation across all 12 leads improves clinical review speed.' },
        { title: 'Better Signal Intelligence', text: 'Lead fail indication, reversal detection, and pacemaker spike detection improve reliability.' },
        { title: 'Connected Reporting', text: 'Dedicated ECG download software with Cloud PDF workflow and USB/LAN connectivity.' },
        { title: 'Built for Continuous Use', text: 'Rechargeable battery backup and high uptime design for clinics and hospitals.' },
        { title: 'Clinical Trust', text: 'ISO 13485 compliance, MDR 2017 support, and 5-year warranty support confidence.' },
      ],
    },
    specs: [
      ['Lead system', 'Simultaneous 12-lead acquisition'],
      ['Modes', 'Auto, Manual, Rhythm'],
      ['Display', 'Real-time waveform preview'],
      ['Connectivity', 'USB, LAN, Cloud-Ready Wireless'],
      ['Output', 'Thermal print + Cloud PDF export'],
      ['Compliance', 'ISO 13485, MDR 2017'],
    ],
    workflow: [
      { title: 'Acquire', text: 'Automatic, manual, or rhythm ECG recording.' },
      { title: 'Preview', text: 'Real-time waveform display with quality indication.' },
      { title: 'Sync', text: 'Direct cloud upload for organization-wide access.' },
      { title: 'Interpret', text: 'Cloud-assisted interpretation software for review.' },
      { title: 'Export', text: 'Generate printable reports and Cloud-stored PDF files.' },
    ],
    useCases: [
      { title: 'Clinics', text: 'Fast adoption in outpatient settings.' },
      { title: 'Diagnostic centers', text: 'Reliable everyday acquisition.' },
      { title: 'Small hospitals', text: 'Stable entry-level diagnostic path.' },
    ],
    expansion: {
      title: 'Future Direction',
      points: [
        { title: 'Connected Ecosystems', text: 'Cloud-based review and mobile-to-desktop diagnostics.' },
        { title: 'AI Interpretation', text: 'Advanced cardiac monitoring and AI-assisted review workflows.' },
      ],
    },
  },
  {
    id: 'sleepsense',
    kicker: 'Sleep Study',
    title: 'Sleep Sense',
    subtitle: 'Level 3 Home Sleep Test',
    image: sleepSense,
    description:
      'Level 3 home sleep test built to bring the lab home.',
    quote: 'The lab comes home.',
    problem: {
      title: 'The Problem We Saw',
      text: 'Traditional sleep testing is expensive, uncomfortable, and difficult to scale. Patients often avoid lab testing, struggle with overnight hospital stays, experience delayed diagnosis, and fail to complete full studies.',
      points: [
        'Limited sleep lab capacity',
        'Operational complexity',
        'Difficult patient compliance',
      ],
    },
    missing: {
      title: 'What Others Are Missing',
      text: 'Most home sleep systems feel overly technical, lack clean workflows, generate difficult reports, and create poor patient experience. Many devices are built for recording — not for practical deployment.',
    },
    built: {
      title: 'What We Built Instead',
      text: 'Sleep Sense brings the sleep lab into the home. The system combines portable overnight recording, 16-hour continuous capture, breathing event analysis, SpO₂ and pulse tracking, printable PDF reports, and lightweight wearable design into a cleaner patient-friendly workflow.',
    },
    better: {
      title: 'Why Sleep Sense Performs Better',
      points: [
        { title: 'Home-first workflow', text: 'Testing happens naturally in the patient’s real sleep environment.' },
        { title: 'Cloud-Sync Reporting', text: 'Automatic data upload to clinical cloud for immediate overnight study review.' },
        { title: 'Better patient comfort', text: '214g wearable architecture designed for home usability.' },
        { title: 'Faster diagnosis', text: 'Actionable cloud reports ready for clinical review by morning.' },
        { title: 'Real respiratory tracking', text: 'Airflow, SpO₂, pulse, pleth, body position, and breathing events in one study.' },
      ],
    },
    specs: [
      ['Study type', 'Level 3 home sleep test'],
      ['Recording', '16 hours continuous'],
      ['Detection', '95%+ breathing event analysis'],
      ['Connectivity', 'Wireless Cloud Sync'],
      ['Storage', '8 GB (Local) + Unlimited Cloud'],
      ['Weight', '214 g'],
      ['Output', 'Printable PDF + Cloud Dashboard'],
    ],
    workflow: [
      { title: 'Device', text: 'Wear the device for overnight recording.' },
      { title: 'Cloud Sync', text: 'Auto-upload study data to the clinical portal.' },
      { title: 'Analysis', text: 'AI-assisted breathing event detection on cloud.' },
      { title: 'Report', text: 'Generate clinical PDF and interactive dashboard.' },
      { title: 'Review', text: 'Remote doctor review of SpO₂ and airflow data.' },
    ],
    useCases: [
      { title: 'Sleep clinics', text: 'Home sleep testing for faster diagnosis.' },
      { title: 'Pulmonology', text: 'Screening for apnea and desaturation.' },
      { title: 'Home care', text: 'Patient-friendly overnight testing.' },
      { title: 'Follow-up', text: 'Track response after CPAP initiation.' },
    ],
  },
  {
    id: 'bipap-vt20',
    kicker: 'Respiratory Care',
    title: 'BiPAP VT20 ST',
    subtitle: 'Premium Respiratory Therapy',
    image: vt80stImage,
    description:
      'Deckmount VT20 ST was designed to make respiratory therapy feel calmer, simpler, and easier to maintain long term.',
    quote: 'Therapy that feels natural and calm.',
    problem: {
      title: 'The Problem We Saw',
      text: 'Most respiratory therapy devices are designed around pressure delivery — not patient comfort, long-term usability, or therapy confidence. Patients struggle with uncomfortable airflow, dry throat, and confusing interfaces.',
      points: [
        'Uncomfortable airflow transitions',
        'Dry throat and nasal irritation',
        'Confusing interfaces',
        'Difficult setup',
        'Poor adherence to therapy',
        'Anxiety during night-time usage',
      ],
      others: 'Clinics also struggle with explaining therapy clearly and fragmented monitoring workflows.',
    },
    missing: {
      title: 'What Others Are Missing',
      text: 'Most BiPAP systems feel clinical but intimidating and operationally complex. They often lack smoother transitions and intelligent comfort workflows.',
      points: [
        'Therapy adherence',
        'Patient confidence',
        'Home usability',
        'Simplified respiratory care workflow',
      ],
    },
    built: {
      title: 'What We Built Instead',
      text: 'A patient-friendly respiratory platform that makes therapy easier to trust, explain, and continue every night.',
      mobile: [
        'Intelligent pressure support',
        'Multiple therapy modes',
        'Integrated humidification',
        'Smart reminders',
      ],
      desktop: [
        'Advanced safety alarms',
        'Oxygen compatibility',
        'Comfort-focused transitions',
      ],
    },
    better: {
      title: 'Why VT20 ST Performs Better',
      points: [
        { title: 'Cloud Adherence Tracking', text: 'Real-time therapy monitoring via cloud portal for better clinical follow-up.' },
        { title: 'Exhalation Relief', text: 'Pressure relief technology creates a smoother and more natural breathing experience.' },
        { title: 'Heated Humidifier', text: 'Built-in humidifier with 8 adjustable levels helps reduce throat and nasal dryness.' },
        { title: 'Auto On/Off', text: 'Automatically starts therapy when mask is worn and stops when removed.' },
        { title: '4.3-inch Display', text: 'Easy access to therapy settings, sleep data, and system status.' },
        { title: 'Advanced Safety', text: 'Detects air leakage, low pressure, and abnormal respiratory rates.' },
      ],
    },
    specs: [
      ['Modes', 'CPAP, S, T, ST, VAPS'],
      ['Connectivity', 'Integrated Cloud Monitoring'],
      ['Display', '4.3-inch color LCD'],
      ['Humidification', '8 levels, integrated'],
      ['Safety', 'Leakage, Pressure, and Rate alarms'],
      ['Convenience', 'Auto On/Off, Smart Reminders'],
    ],
    workflow: [
      { title: 'Setup', text: 'Configure therapy mode and comfort settings.' },
      { title: 'Sleep Therapy', text: 'Automatic airflow adjustment supports breathing.' },
      { title: 'Cloud Monitoring', text: 'Sync therapy data to cloud for adherence review.' },
      { title: 'Monitoring', text: 'System alarms and cloud reminders maintain quality.' },
      { title: 'Follow-Up', text: 'Clinicians adjust therapy remotely based on cloud data.' },
    ],
    useCases: [
      { title: 'Home care', text: 'Long-term respiratory support at home.' },
      { title: 'Sleep apnea', text: 'Comfortable overnight therapy.' },
      { title: 'Pulmonology', text: 'Post-hospital respiratory follow-up.' },
    ],
    expansion: {
      title: 'Future Respiratory Ecosystem',
      points: [
        { title: 'Connected Monitoring', text: 'Cloud-linked therapy review and remote adherence tracking.' },
        { title: 'AI Analysis', text: 'AI-assisted respiratory analysis and unified sleep workflows.' },
      ],
    },
  },
  {
    id: 'bipap-vt60',
    kicker: 'Noninvasive Ventilation',
    title: 'BiPAP VT60 ST',
    subtitle: 'Adaptive Ventilation Platform',
    image: vt60stImage,
    description:
      'Deckmount VT60 ST is a flexible noninvasive ventilation platform that adapts to different respiratory conditions while keeping therapy comfortable.',
    quote: 'Strong support without added effort.',
    problem: {
      title: 'The Problem We Saw',
      text: 'Most respiratory support systems are designed for pressure delivery alone — not for adaptable long-term care. Patients with COPD or hypoventilation require therapy that changes with their behavior.',
      points: [
        'Uncomfortable transitions',
        'Down therapy adaptability',
        'Difficult setup',
        'Dry throat and nasal discomfort',
        'Weak personalization',
        'Complicated operation',
      ],
      others: 'Clinics struggle with explaining advanced therapy clearly and maintaining long-term adherence.',
    },
    missing: {
      title: 'What Others Are Missing',
      text: 'Most standard systems focus on fixed pressure. They lack volume-assured ventilation and personalized comfort workflows.',
      points: [
        'Multiple adaptive modes',
        'Volume-assured ventilation',
        'Smooth pressure transitions',
        'Long-term adaptability',
      ],
    },
    built: {
      title: 'What We Built Instead',
      text: 'A flexible noninvasive ventilation platform designed to deliver stronger support without making therapy feel harder for the patient.',
      mobile: [
        'CPAP, S, ST, T, and VAPS modes',
        'Intelligent airflow response',
        'Heated humidification',
      ],
      desktop: [
        'Trigger sensitivity control',
        'Ramp-based transitions',
        'Leakage compensation',
      ],
    },
    better: {
      title: 'Why VT60 ST Performs Better',
      points: [
        { title: 'Cloud Ventilation Analysis', text: 'Unified cloud dashboard for monitoring COPD and hypoventilation therapy adherence.' },
        { title: 'Multi-Mode Ventilation', text: 'Supports CPAP, S, ST, T, and VAPS for a wide range of conditions.' },
        { title: 'Pressure Flexibility', text: 'IPAP up to 30 cmH2O and EPAP up to 28 cmH2O for customization.' },
        { title: 'Natural Sync', text: 'Customizable trigger sensitivity helps the machine respond to patient effort.' },
        { title: 'Ramp Comfort', text: 'Gradually increases pressure over 5–45 minutes for smoother sleep transition.' },
        { title: 'Personalized Care', text: 'Gender-specific settings improve therapy optimization.' },
      ],
    },
    specs: [
      ['Modes', 'CPAP, S, T, ST, VAPS'],
      ['Connectivity', 'Cloud-Linked Monitoring'],
      ['IPAP Range', '4 – 30 cmH2O'],
      ['EPAP Range', '4 – 28 cmH2O'],
      ['Tidal Volume', '150 – 1800 ml'],
      ['Comfort', 'Ramp Time (5-45 min), Heated Humidifier'],
    ],
    workflow: [
      { title: 'Setup', text: 'Configure therapy mode, pressure, and sensitivity.' },
      { title: 'Support', text: 'Machine dynamically supports breathing modes.' },
      { title: 'Cloud Sync', text: 'Auto-sync ventilation data for remote clinical review.' },
      { title: 'Overnight', text: 'Continuous airflow support assists ventilation.' },
      { title: 'Review', text: 'Clinicians adjust parameters remotely via cloud.' },
    ],
    useCases: [
      { title: 'COPD management', text: 'Stable ventilation for chronic conditions.' },
      { title: 'OHS therapy', text: 'Volume-assured pressure support.' },
      { title: 'Sleep wellness', text: 'Adaptable overnight respiratory care.' },
    ],
    expansion: {
      title: 'Future Respiratory Ecosystem',
      points: [
        { title: 'Remote Monitoring', text: 'Cloud-connected therapy review and AI ventilation analysis.' },
        { title: 'Connected Care', text: 'Adherence tracking and unified patient follow-up systems.' },
      ],
    },
  },
  {
    id: 'tabletop-ecg',
    kicker: '12 Channel ECG',
    title: '12 Channel ECG',
    subtitle: 'Hospital Tabletop Diagnostic System',
    image: ecg12channelTabletop,
    description:
      'A hospital-ready 12-channel ECG system focused on clinical trust, clear workflow, and faster setup.',
    quote: 'Built to feel serious, clear, and fast in a clinic.',
    problem: {
      title: 'The Problem We Saw',
      text: 'Many tabletop ECG systems feel outdated, slow, and operationally heavy. Clinics often deal with complicated workflows, poor presentation quality, slow setup, and disconnected reporting systems.',
      points: [
        'Complicated clinical workflows',
        'Poor presentation quality',
        'Slow setup and acquisition',
        'Disconnected reporting systems',
        'Weak visual trust during demos',
      ],
      others: 'Existing tabletop systems prioritize hardware over workflow, creating a slower operator experience.',
    },
    missing: {
      title: 'What Others Are Missing',
      text: 'Most standard tabletop systems lack connected reporting and are difficult to explain to buyers. Very few are designed for fast adoption and trust-building during clinical demos.',
      points: [
        'Connected reporting workflow',
        'Buyer trust-building design',
        'Cleaner customer demos',
        'Faster clinic adoption',
      ],
    },
    built: {
      title: 'What We Built Instead',
      text: 'We created a stable, modern 12-channel ECG system designed for clinical reliability and operational simplicity in hospitals.',
      mobile: [
        'Fast acquisition workflow',
        'Modern user interface',
        'Stable tabletop architecture',
      ],
      desktop: [
        'Digital report generation',
        'Clearer review path',
        'Hospital-ready presentation',
      ],
    },
    better: {
      title: 'Why Our Tabletop ECG Performs Better',
      points: [
        { title: 'Hospital Cloud Integration', text: 'Seamlessly sync patient records with hospital EMR and central clinical cloud.' },
        { title: 'Stronger Visual Trust', text: 'Built to look and feel clinically reliable during deployment.' },
        { title: 'Operational Clarity', text: 'Designed around fast acquisition and readable clinical workflow.' },
        { title: 'Cloud Reporting Flow', text: 'Instant remote review and digital report generation via cloud portal.' },
      ],
    },
    specs: [
      ['Lead system', '12-channel ECG'],
      ['Connectivity', 'USB, LAN, Cloud-Integrated Wireless'],
      ['Use', 'Hospital and clinic tabletop'],
      ['Reporting', 'Digital report and Cloud review'],
      ['Workflow', 'Fast acquisition and cloud-enabled presentation'],
    ],
    workflow: [
      { title: 'Setup', text: 'Quick tabletop configuration.' },
      { title: 'Acquisition', text: 'Fast 12-channel ECG capture.' },
      { title: 'Cloud Sync', text: 'Instant upload for hospital-wide clinical review.' },
      { title: 'Report', text: 'Digital report generation and secure cloud storage.' },
    ],
    useCases: [
      { title: 'Clinics', text: 'Fast adoption in outpatient settings.' },
      { title: 'Hospitals', text: 'Stable tabletop diagnostic workflow.' },
      { title: 'Diagnostic centers', text: 'Readable report and review flow.' },
    ],
  },
];

const pdfHighlights = [
  {
    title: 'Smart ECG Monitoring Ecosystem',
    text: 'The hero message from the PDF is now the page language, not a separate slide.',
    image: pdfImg347,
  },
  {
    title: '12 Lead Portable ECG',
    text: 'The device is framed as a full 12-lead portable product with a premium industrial feel.',
    image: pdfImg18,
  },
  {
    title: 'Portable ECG with 24-bit precision',
    text: 'High-fidelity signal capture, secure cloud connectivity, instant reporting, and clinical-grade accuracy.',
    image: pdfImg231,
  },
  {
    title: 'Complete 12-Lead Dashboard',
    text: 'The dashboard and history visuals communicate a proper workflow, not just hardware.',
    image: pdfImg112,
  },
  {
    title: 'Doctor Database & Sharing',
    text: 'Review, sharing, and “Reviewed by” confirmation give the product a connected clinical story.',
    image: pdfImg344,
  },
  {
    title: 'Engineered for Clinical Excellence',
    text: 'The PDF’s feature-board style is preserved with a polished, product-first presentation.',
    image: pdfImg16,
  },
];

const ultraMaxFeatureBlocks = [
  {
    eyebrow: 'ADVANCED FEATURES',
    title: 'Engineered for Clinical Excellence',
    subtitle:
      'Rhythm Ultra Max combines cutting-edge technology with practical design to deliver accurate, reliable, and accessible cardiac diagnostics anywhere, anytime.',
    badge: 'FLUKE TESTED',
    image: pdfImg347,
    points: [
      'Hospital-Grade 12-Lead Accuracy',
      'Simultaneous 12-lead ECG from 10 electrodes, tested on Fluke gold-standard equipment.',
      '1000 samples/sec/channel for precise and reliable cardiac assessment.',
    ],
  },
  {
    eyebrow: 'POWER & PORTABILITY',
    title: 'Extended Battery Performance',
    subtitle:
      '4000 mAh battery delivers up to 1 month of standby or 4 hours backup on a single charge.',
    badge: '4000 mAh',
    image: pdfImg231,
    points: [
      'Reliable performance with minimal downtime.',
      'Freedom from frequent recharging.',
      'Designed for field, bedside, and remote use.',
    ],
  },
  {
    eyebrow: 'MOBILE WORKFLOW',
    title: 'Portable Handheld Design',
    subtitle:
      'Weighing just 298 grams, this lightweight ECG is easy to carry and ideal for on-the-go, bedside, and remote care.',
    badge: '298 g',
    image: pdfImg18,
    points: [
      'Handheld form factor for mobile clinical teams.',
      'Easy to present in sales demos.',
      'Made for bedside and outreach workflows.',
    ],
  },
];

const ultraMaxSpecGroups = [
  {
    title: 'Product Basics',
    rows: [
      ['Product Name', 'Rhythm Ultra Max'],
      ['Dimensions', '171 mm (L) x 95 mm (W) x 40.5 mm (H)'],
      ['Weight', '298 grams'],
      ['Power', 'Rechargeable Li-Po Battery, 3.7 V / 4000 mAh'],
      ['Charging', 'USB Type B, 8-10 hrs charging time, up to 1 month standby or up to 160 ECGs'],
      ['Operating Conditions', '10 °C to 50 °C, 20% to 90% relative humidity'],
      ['Storage Conditions', '0 °C to 55 °C, 10% to 90% relative humidity'],
      ['Warranty', '1 year'],
    ],
  },
  {
    title: 'ECG Acquisition Details',
    rows: [
      ['Number of Channels', '12-lead simultaneous ECG from 10 electrodes'],
      ['Connectivity', 'BLE 5.0 (Bluetooth) & USB 2.0 & above'],
      ['Frequency Response', '0.01 ~ 250 Hz'],
      ['Time Constant', '> 3 seconds'],
      ['Input Impedance', '> 50M Ohms'],
      ['Input CIR Current', '≤ 0.1 μA'],
      ['Patient Leak Current', '< 10 μA'],
      ['Sensitivity (Amplitude)', '5, 10, 20 mm/mV'],
      ['Recording Speed', '12.5, 25, 50 mm/sec'],
      ['CMRR', '> 110 dB'],
      ['A to D Conversion', '24 bit'],
      ['Sampling Frequency', '1000 samples per sec/channel'],
      ['Filters', 'Line frequency, base line, and muscle filters'],
      ['Noise Level', '< 15 μVp-p'],
    ],
  },
  {
    title: 'Data, Sharing, and Compatibility',
    rows: [
      ['Patient Data', 'Name, Age, Gender'],
      ['LED Indicators', 'Battery, electrodes, and app connection'],
      ['Analysis', 'HR, PR, QRS, QT, QTc, QTcF, RV5, SV1, P/QRS/T deviation'],
      ['ECG Sharing (PDF)', 'WhatsApp and Mail'],
      ['App Compatibility', 'Windows 10 & above, Android 6.0 & above'],
      ['What\'s in the Box', 'Rhythm Ultra Max, power cable, adapter, electrodes x10, cable with crocodile clip, carry bag, user manual'],
    ],
  },
];

const cardioxFeatureBlocks = [
  {
    title: 'Rhythm UltraMax Pro',
    subtitle:
      'A clinical-grade ECG intelligence platform connecting clinics, doctors, and patients in one ecosystem.',
    image: cardioxAppDashboard,
    cards: [
      {
        title: '12-Lead ECG',
        text: 'Live acquisition with real-time metrics including HR, PR, QRS, QT/QTc, ST, and AI arrhythmia detection across 80+ diagnostic patterns.',
      },
      {
        title: 'HRV Analysis',
        text: 'Dedicated Lead II capture with interval tracking and long-window rhythm variability analysis.',
      },
      {
        title: 'Hyperkalemia Detection',
        text: 'Specialized screening that analyzes T-wave, PR, and QRS behavior across Lead II and precordial signals.',
      },
      {
        title: 'Waveform Analysis',
        text: 'Doctors can pull pre-recorded ECGs from a patient\'s phone via API, then review them on desktop with magnifier, ruler, caliper, and annotation tools.',
      },
      {
        title: 'Rhythm UltraMax Pro',
        text: 'The mobile app shows device connected status, quick access, and fast ECG recording for the patient-facing capture layer.',
      },
    ],
  },
  {
    title: 'Clinical Workflow',
    subtitle:
      'Patient records an ECG on mobile, uploads it through API, and the doctor reviews it on Rhythm UltraMax desktop for report generation.',
    image: pdfImg112,
    cards: [
      {
        title: 'Mobile to Desktop Review',
        text: 'The patient records on the phone app, the trace syncs through API, and the doctor opens it on desktop for precision review.',
      },
      {
        title: 'AI Diagnostics + Reports',
        text: 'AI diagnostics, PDF / JSON reports, cloud sync, offline-first support, and multi-lead display modes keep the workflow clinical and complete.',
      },
      {
        title: 'One Line Summary',
        text: 'Rhythm UltraMax Pro is a full cardiac diagnostic suite: live ECG, HRV, hyperkalemia screening, and mobile-to-desktop waveform review in one platform.',
      },
    ],
  },
  {
    title: 'Upcoming Portal Structure',
    subtitle:
      'A structured multi-role system for clinic operations, doctor review, and controlled access.',
    image: pdfImg347,
    cards: [
      {
        title: 'HCP Account',
        text: 'Runs ECG tests, manages patients, and lets admins create users, associate doctors, and export reports.',
      },
      {
        title: 'Doctor Account',
        text: 'Receives linked ECG reports from clinics, reviews them, and approves reports with doctor visibility inside the HCP account.',
      },
      {
        title: 'Organization Hierarchy',
        text: 'Deckmount → Organizations → HCP Head / Head Doctor → Admins → Clinical Users / Jr Doctors / Receptionists.',
      },
      {
        title: 'Role-Based Control',
        text: 'Clinical users can manage patients but cannot create other users, keeping the workflow structured and safe.',
      },
    ],
  },
];

const sixMonthProgram = [
  {
    month: 'Month 1-2',
    title: 'Product story alignment',
    text: 'Refine the final device images, brochure copy, and comparative messaging for every product line.',
  },
  {
    month: 'Month 3-4',
    title: 'App and workflow rollout',
    text: 'Connect the ECG, sleep, and respiratory products to a unified review and reporting journey.',
  },
  {
    month: 'Month 5-6',
    title: 'Market launch and review',
    text: 'Publish the final presentation, train the sales team, and prepare the clinical demo material.',
  },
];

const featureRows = [
  {
    icon: Activity,
    title: 'Live ECG Monitoring',
    text: 'Real-time waveform tracking with clinical precision.',
    image: pdfImg16,
  },
  {
    icon: Sparkles,
    title: 'Intelligent Detection',
    text: 'Advanced analysis for cardiac abnormalities.',
    image: pdfImg225,
  },
  {
    icon: Workflow,
    title: 'Unified Dashboard',
    text: 'Centralized view of reports and patient history.',
    image: pdfImg112,
  },
  {
    icon: BatteryCharging,
    title: 'Extended Battery Performance',
    text: 'The battery callout from the PDF stays visible as a product benefit.',
    image: pdfImg231,
  },
  {
    icon: Bluetooth,
    title: 'Mobile App-Based ECG Recording',
    text: 'Connectivity is shown as part of the clinical workflow.',
    image: pdfImg069,
  },
  {
    icon: ShieldCheck,
    title: '99.9% Accuracy',
    text: 'A direct confidence metric that keeps the product presentation strong.',
    image: pdfImg347,
  },
];

const floatIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

function SectionHeader({ kicker, title, text }) {
  return (
    <div className="max-w-3xl">
      <p className="text-[10px] font-black uppercase tracking-[0.45em] text-brand-blue mb-4">
        {kicker}
      </p>
      <h2 className="text-4xl md:text-5xl font-black leading-[0.95] tracking-tight text-slate-950">
        {title}
      </h2>
      <p className="mt-5 text-base md:text-lg leading-8 text-slate-600">
        {text}
      </p>
    </div>
  );
}

function ImageCard({ image, title, text, className = '' }) {
  return (
    <motion.article
      {...floatIn}
      whileHover={{ y: -6, scale: 1.01 }}
      className={[
        'group overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]',
        className,
      ].join(' ')}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-white">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-7 md:p-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-bold text-slate-950">{title}</h3>
            {text ? <p className="mt-1 text-xs font-black uppercase tracking-[0.28em] text-slate-400">{text}</p> : null}
          </div>
          <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </motion.article>
  );
}

function ProductGallery({ images, title, subtitle }) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <motion.article
      {...floatIn}
      className="group overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-white flex items-center justify-center p-6 min-h-[300px]">
        <img
          src={images[activeIdx].src}
          alt={images[activeIdx].label || title}
          className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-[1.01]"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2.5 px-6 py-4 overflow-x-auto justify-center border-b border-slate-100 bg-slate-50/50">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-white p-1 transition-all ${
                activeIdx === idx
                  ? 'border-brand-blue scale-[1.04] shadow-md'
                  : 'border-slate-200 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.src} alt={img.label} className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      )}

      <div className="p-6 md:p-8 flex-grow">
        <h3 className="text-xl font-bold text-slate-950">
          {images[activeIdx].label}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {images[activeIdx].desc || subtitle}
        </p>
      </div>
    </motion.article>
  );
}

function SpecTable({ rows, valueLabel = 'This device' }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
      <div className="grid grid-cols-[1fr_1.3fr] bg-slate-950 px-6 py-5 text-xs font-black uppercase tracking-[0.28em] text-white">
        <div>Feature</div>
        <div>{valueLabel}</div>
      </div>
      <div className="divide-y divide-slate-100">
        {rows.map(([feature, value]) => (
          <div key={feature} className="grid grid-cols-[1fr_1.3fr] gap-4 px-6 py-5 text-lg">
            <div className="font-bold text-slate-950">{feature}</div>
            <div className="leading-7 text-slate-600">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PillGroup({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-slate-600"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function UseCaseGrid({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-[1.35rem] bg-slate-50 p-6 shadow-[0_14px_30px_rgba(15,23,42,0.04)]"
        >
          <div className="text-sm font-semibold text-brand-blue">
            {item.title}
          </div>
          <p className="mt-2 text-base leading-7 text-slate-700">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

function HighlightGrid({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-[1.35rem] bg-slate-50 p-6 shadow-[0_14px_30px_rgba(15,23,42,0.04)]"
        >
          <p className="mt-2 text-base leading-7 text-slate-700">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

function WorkflowStrip({ steps }) {
  return (
    <div className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {steps.map((step, index) => (
          <div key={step.title} className="rounded-[1.2rem] bg-slate-50 p-5">
            <div className="text-sm font-semibold text-brand-blue">
              {step.title}
            </div>
            <p className="mt-2 text-base leading-7 text-slate-700">{step.text}</p>
            {index < steps.length - 1 ? (
              <div className="mt-4 text-sm font-semibold text-slate-400">
                →
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function SpecSheet({ groups }) {
  return (
    <div className="grid gap-6">
      {groups.map((group) => (
        <motion.div
          key={group.title}
          {...floatIn}
          className="overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
        >
          <div className="bg-slate-950 px-6 py-5 text-white">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-200">
              Product specification
            </p>
            <h3 className="mt-2 text-3xl font-black tracking-tight">{group.title}</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {group.rows.map(([label, value]) => (
              <div key={label} className="grid gap-2 px-6 py-4 md:grid-cols-[0.38fr_0.62fr] md:items-start">
                <div className="text-xs font-black uppercase tracking-[0.28em] text-slate-400">
                  {label}
                </div>
                <div className="text-base leading-7 text-slate-700">{value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SceneRotator({ scenes }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!scenes || scenes.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % scenes.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [scenes]);

  if (!scenes || scenes.length === 0) return null;

  const activeScene = scenes[index];
  const previousScene = scenes[(index + scenes.length - 1) % scenes.length];
  const nextScene = scenes[(index + 1) % scenes.length];

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-slate-950 shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-200">
          Scene reel
        </p>
        <p className="mt-2 text-base leading-7 text-slate-300">
          A calm field screen, a tense emergency trace, and a clean home follow-up.
        </p>
      </div>
      <div className="relative h-[22rem] overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.16),_transparent_50%),linear-gradient(135deg,_#020617,_#0f172a_58%,_#111827)]">
        <Canvas camera={{ position: [0, 0.3, 7.5], fov: 38 }}>
          <color attach="background" args={['#020617']} />
          <ambientLight intensity={0.65} />
          <directionalLight position={[2.4, 4.5, 4]} intensity={1.2} color="#e0f2fe" />
          <pointLight position={[0, 1.5, 4]} intensity={1.7} color="#2563eb" />
          <pointLight position={[0, -1, 2]} intensity={0.8} color="#f8fafc" />
          <StageDeck activeScene={activeScene} previousScene={previousScene} nextScene={nextScene} />
        </Canvas>
        <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-4">
          <SceneTrace scene={activeScene} />
        </div>
      </div>
    </div>
  );
}

function SceneTrace({ scene }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let frame = 0;
    let raf = 0;

    const loop = () => {
      frame += 1;
      setPhase(frame / 60);
      raf = window.requestAnimationFrame(loop);
    };

    raf = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(raf);
  }, [scene.title]);

  const config = scene.trace || { color: '#60a5fa', speed: 1, noise: 0, glow: 0.45, breath: 0.18 };
  const points = Array.from({ length: 48 }, (_, i) => {
    const x = (i / 47) * 100;
    const base = Math.sin((i + phase * config.speed * 10) * 0.4);
    const beat = Math.max(0, Math.sin((i + phase * config.speed * 8) * 1.8)) ** 6;
    const jitter = config.noise * Math.sin((i * 3.7 + phase * 26) % 9) * (i % 4 === 0 ? 1 : 0.35);
    const y = 54 - base * 5 - beat * (scene.trace?.amplitude ?? 22) - jitter * 10;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');

  const glow = 0.55 + Math.sin(phase * 2.4) * (config.breath ?? 0.12);

  return (
    <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-950/85 px-3 py-3 shadow-[0_16px_30px_rgba(0,0,0,0.35)]">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">
          {scene.title}
        </div>
        <div className="text-xs font-black uppercase tracking-[0.28em] text-slate-500">
          {scene.trace?.label}
        </div>
      </div>
      <svg viewBox="0 0 100 72" className="h-20 w-full overflow-visible">
        <defs>
          <filter id="sceneGlow">
            <feGaussianBlur stdDeviation="2.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <polyline
          points={points}
          fill="none"
          stroke={config.color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={glow}
          filter="url(#sceneGlow)"
        />
        <polyline
          points={points}
          fill="none"
          stroke={config.color}
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
        />
      </svg>
    </div>
  );
}

function StageDeck({ activeScene, previousScene, nextScene }) {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(state.clock.elapsedTime * 0.18) * 0.06, 0.03);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -0.08, 0.02);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(state.clock.elapsedTime * 0.65) * 0.035, 0.04);
  });

  return (
    <group ref={group}>
      <SceneCard scene={previousScene} position={[-2.6, 0.05, -1.4]} active={false} tilt={0.16} />
      <SceneCard scene={nextScene} position={[2.6, 0.05, -1.4]} active={false} tilt={-0.16} />
      <SceneCard scene={activeScene} position={[0, 0.25, 0]} active={true} tilt={0} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.75, 0]}>
        <circleGeometry args={[3.0, 64]} />
        <meshBasicMaterial color="#1d4ed8" transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function SceneCard({ scene, active, position, tilt }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;
    const targetScale = active ? 1.02 : 0.82;
    ref.current.scale.x = THREE.MathUtils.damp(ref.current.scale.x, targetScale, 4.5, delta);
    ref.current.scale.y = THREE.MathUtils.damp(ref.current.scale.y, targetScale, 4.5, delta);
    ref.current.scale.z = THREE.MathUtils.damp(ref.current.scale.z, targetScale, 4.5, delta);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, active ? 0 : tilt, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, active ? -0.06 : -0.02, 0.04);
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <RoundedBox args={[active ? 3.9 : 2.2, active ? 2.9 : 2.3, 0.16]} radius={0.14} smoothness={8}>
          <meshStandardMaterial
            color={active ? '#0b1220' : '#111827'}
            metalness={0.26}
            roughness={0.38}
            emissive={active ? '#1d4ed8' : '#020617'}
            emissiveIntensity={active ? 0.35 : 0.1}
          />
        </RoundedBox>
      </mesh>
      {active ? (
        <Html transform distanceFactor={1.15} position={[0, 0, 0.11]} center>
          <div className="w-[310px] rounded-[1.15rem] border border-white/10 bg-slate-950/95 px-5 py-4 text-white shadow-[0_18px_35px_rgba(0,0,0,0.35)]">
            <div className="text-xs font-black uppercase tracking-[0.35em] text-blue-200">
              {scene.title}
            </div>
            <div className="mt-3 text-base leading-7 text-slate-200">
              {scene.text}
            </div>
          </div>
        </Html>
      ) : (
        <Html transform distanceFactor={1.15} position={[0, 0, 0.11]} center>
          <div className="w-[190px] rounded-[1rem] border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-200 shadow-[0_14px_25px_rgba(0,0,0,0.28)]">
            <div className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">
              {scene.title}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function TypewriterText({ text, className = '', speed = 22 }) {
  const [visible, setVisible] = useState(text.length);

  useEffect(() => {
    setVisible(0);
    const timer = window.setInterval(() => {
      setVisible((current) => {
        if (current >= text.length) {
          window.clearInterval(timer);
          return text.length;
        }
        return current + 1;
      });
    }, speed);

    return () => window.clearInterval(timer);
  }, [text, speed]);

  return <span className={className}>{text.slice(0, visible)}</span>;
}

function CountUp({ value, className = '', active = true }) {
  const [display, setDisplay] = useState(active ? value : '0');
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active) {
      setDisplay('0');
      return undefined;
    }

    const match = String(value).match(/^([\d.,]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const target = Number(match[1].replace(/,/g, ''));
    const suffix = match[2];
    const duration = 1200;
    let start = 0;
    let raf = 0;

    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = target * (0.15 + progress * 0.85);
      const rounded = target >= 100 ? Math.round(current) : current.toFixed(target % 1 === 0 ? 0 : 1);
      setDisplay(`${Number(rounded).toLocaleString()}${suffix}`);

      if (progress < 1) {
        raf = window.requestAnimationFrame(tick);
      }
    };

    if (!startedRef.current) {
      setDisplay(`0${suffix}`);
    }

    raf = window.requestAnimationFrame(tick);
    startedRef.current = true;

    return () => window.cancelAnimationFrame(raf);
  }, [active, value]);

  return <span className={className}>{display}</span>;
}

function HeroMetric({ value, label }) {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      className="rounded-3xl border border-white/10 bg-white/8 p-4 shadow-[0_12px_35px_rgba(15,23,42,0.05)] backdrop-blur"
      viewport={{ once: true, amount: 0.7 }}
      onViewportEnter={() => setActive(true)}
    >
      <div className="text-2xl font-black tracking-tight text-white">
        <CountUp value={value} active={active} />
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
        {label}
      </div>
    </motion.div>
  );
}

function ProductShowcase({ product, reverse = false }) {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    
    // Create a temporary container for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${product.title} - Brochure</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
            
            * { box-sizing: border-box !important; }
            
            body { 
              font-family: 'Inter', sans-serif; 
              margin: 0;
              padding: 0;
              background: white;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            @page {
              size: A4 portrait;
              margin: 0;
            }

            .brochure-page {
              width: 210mm;
              min-height: 297mm;
              padding: 15mm;
              margin: 0 auto;
              background: white;
              overflow: visible !important;
              position: relative;
            }

            /* Force visibility for all print elements */
            .brochure-page * {
              overflow: visible !important;
              opacity: 1 !important;
              visibility: visible !important;
              transform: none !important;
            }

            .no-print { display: none !important; }
            
            /* Ensure images don't break page */
            img {
              max-width: 100% !important;
              height: auto !important;
              display: block !important;
              page-break-inside: avoid;
            }

            /* Custom Grid for Print */
            .grid { display: grid !important; }
            .col-span-12 { grid-column: span 12 / span 12 !important; }
            .lg\\:col-span-7 { grid-column: span 7 / span 12 !important; }
            .lg\\:col-span-5 { grid-column: span 5 / span 12 !important; }
            
            @media print {
              .brochure-page {
                width: 100%;
                margin: 0;
                padding: 10mm;
              }
              button, .print-btn { display: none !important; }
            }
          </style>
          <script>
            window.tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    'brand-blue': '#2563eb',
                  }
                }
              }
            }
          </script>
        </head>
        <body>
          <div class="brochure-page">
            ${printContent.innerHTML}
          </div>
          <script>
            // Remove all interactive elements
            document.querySelectorAll('button, .print-btn').forEach(el => el.remove());
            
            // Function to wait for all images to load
            function waitForImages() {
              const images = document.querySelectorAll('img');
              const promises = Array.from(images).map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => {
                  img.onload = resolve;
                  img.onerror = resolve;
                });
              });
              return Promise.all(promises);
            }

            window.onload = () => {
              waitForImages().then(() => {
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 800);
              });
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <motion.section
      {...floatIn}
      className="relative rounded-[3rem] bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.06)] xl:p-10"
      id={product.id}
      ref={printRef}
    >
      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="absolute right-8 top-8 z-30 flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg transition-all hover:scale-105 hover:bg-brand-blue sm:right-10 sm:top-10"
      >
        <Printer className="h-3.5 w-3.5" />
        Print Brochure
      </button>

      <div className="grid grid-cols-12 gap-6 items-start">
        {/* TOP SECTION: NARRATIVE & SPECS */}
        <div className={`col-span-12 flex flex-col gap-6 lg:col-span-7 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
          {/* 1. Product Intro */}
          <div className="rounded-[2.25rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)] xl:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-brand-blue shadow-sm">
              {product.kicker}
            </div>
            <h3 className="mt-4 text-5xl font-black leading-[0.92] tracking-tight text-slate-950 xl:text-6xl">
              {product.title}
            </h3>
            <div className="mt-2 text-xs font-black uppercase tracking-[0.3em] text-slate-400">
              {product.subtitle}
            </div>
            <p className="mt-4 text-xl leading-8 text-slate-700">
              {product.description}
            </p>
            <div className="mt-5 rounded-[1.4rem] bg-gradient-to-br from-blue-50 to-white p-6 shadow-[0_12px_30px_rgba(37,99,235,0.05)]">
              <div className="text-xs font-black uppercase tracking-[0.35em] text-brand-blue">
                Identity line
              </div>
              <p className="mt-2 text-lg font-semibold leading-8 text-slate-900">
                “<TypewriterText text={product.quote || 'Built for clinical excellence.'} speed={18} />”
              </p>
            </div>
          </div>

          {/* 2. The Problem We Saw */}
          {product.problem && (
            <div className="rounded-[2.25rem] bg-slate-950 p-8 text-white shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
              <div className="text-xs font-black uppercase tracking-[0.4em] text-blue-200">
                {product.problem.title}
              </div>
              <p className="mt-4 text-lg leading-8 text-slate-200">
                {product.problem.text}
              </p>
              {product.problem.points && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {product.problem.points.map((point) => (
                    <div key={point} className="flex items-center gap-2 rounded-[1.1rem] bg-white/5 px-4 py-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                      <div className="text-sm font-medium text-slate-300">{point}</div>
                    </div>
                  ))}
                </div>
              )}
              {product.problem.others && (
                <p className="mt-4 text-base leading-7 text-slate-400 border-t border-white/10 pt-4">
                  {product.problem.others}
                </p>
              )}
            </div>
          )}

          {/* 3. What Others Are Missing */}
          {product.missing && (
            <div className="rounded-[2.25rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
              <div className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">
                {product.missing.title}
              </div>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                {product.missing.text}
              </p>
              {product.missing.points && (
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {product.missing.points.map((point) => (
                    <div key={point} className="rounded-[1.15rem] bg-slate-50 px-4 py-4 text-center">
                      <div className="text-sm font-semibold text-brand-blue">{point}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. What We Built Instead */}
          {product.built && (
            <div className="rounded-[2.25rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
              <div className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">
                {product.built.title}
              </div>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                {product.built.text}
              </p>
              {product.built.mobile && (
                <div className="mt-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-3">
                    Mobile Ecosystem
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {product.built.mobile.map((item) => (
                      <div key={item} className="rounded-[1.15rem] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {product.built.desktop && (
                <div className="mt-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-3">
                    Desktop Review Suite
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {product.built.desktop.map((item) => (
                      <div key={item} className="rounded-[1.15rem] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* SIDEBAR: IMAGE & SPECS */}
        <div className={`col-span-12 flex flex-col gap-6 lg:col-span-5 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
          {product.images && product.images.length > 0 ? (
            <ProductGallery images={product.images} title={product.title} subtitle={product.subtitle} />
          ) : (
            <ImageCard image={product.image} title={product.title} text={product.subtitle} className="bg-gradient-to-br from-white to-slate-50" />
          )}

          {/* 6. Quick Specs */}
          <div className="rounded-[2.25rem] bg-slate-950 p-8 text-white shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
            <div className="text-xs font-black uppercase tracking-[0.4em] text-blue-200">
              Quick Specs
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {(product.specs || []).slice(0, 6).map(([label, value]) => (
                <div key={label} className="rounded-[1.15rem] bg-white/5 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.28em] text-blue-200">
                    {label}
                  </div>
                  <div className="mt-2 text-base leading-7 text-slate-200">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Real Deployment Environments */}
          {product.useCases && (
            <div className="rounded-[2.25rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
              <div className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">
                Deployment Environments
              </div>
              <div className="mt-5 grid gap-3">
                {product.useCases.map((useCase) => (
                  <div key={useCase.title} className="flex items-center justify-between rounded-[1.1rem] bg-slate-50 px-4 py-4 transition-colors hover:bg-slate-100">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{useCase.title}</div>
                      <div className="text-xs text-slate-500">{useCase.text}</div>
                    </div>
                    <div className="text-brand-blue">→</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM SECTION: PERFORMANCE & WORKFLOW */}
        <div className="col-span-12 mt-6 flex flex-col gap-6 lg:order-3">
          {/* 5. Why We Perform Better */}
          {product.better && (
            <div className="rounded-[2.25rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)] xl:p-10">
              <div className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 text-center mb-8">
                {product.better.title}
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {product.better.points.map((point) => (
                  <div key={point.title} className="rounded-[1.5rem] bg-slate-50 p-6 shadow-sm transition-transform hover:scale-[1.01]">
                    <div className="text-base font-black text-brand-blue uppercase tracking-wider">{point.title}</div>
                    <p className="mt-3 text-base leading-7 text-slate-700">{point.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. Workflow */}
          {product.workflow && (
            <div className="rounded-[2.25rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
              <div className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-6">
                Clinical Workflow
              </div>
              <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-between">
                {product.workflow.map((step, idx) => (
                  <div key={step.title} className="flex-1 flex flex-col lg:flex-row items-center gap-4">
                    <div className="relative rounded-[1.25rem] bg-slate-50 p-5 flex-grow w-full h-full shadow-sm border border-slate-100">
                      <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue text-xs font-black text-white shadow-lg">
                        {idx + 1}
                      </div>
                      <div className="mt-2 text-sm font-black text-slate-900 uppercase tracking-tight">{step.title}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
                    </div>
                    {idx < product.workflow.length - 1 && (
                      <ChevronRight className="h-6 w-6 text-slate-300 hidden lg:block flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. Future Expansion */}
          {product.expansion && (
            <div className="rounded-[2.25rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
              <div className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-6">
                {product.expansion.title}
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {product.expansion.points.map((point) => (
                  <div key={point.title} className="rounded-[1.25rem] bg-slate-50 p-5">
                    <div className="text-sm font-semibold text-brand-blue">{point.title}</div>
                    <p className="mt-2 text-base leading-7 text-slate-700">{point.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

function SpecHero() {
  return (
    <section id="specifications" className="py-20">
      <SectionHeader
        kicker="Product specification"
        title="Rhythm Ultra Max specification sheet."
        text="The core technical data from the PDF is presented here as a clean product specification section for the website."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          {...floatIn}
          className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
        >
          <div className="relative bg-gradient-to-br from-slate-950 to-slate-800 p-6 text-white">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-blue-200">
              ADVANCED FEATURES
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h3 className="text-4xl font-black tracking-tight">Engineered for Clinical Excellence</h3>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.3em] text-slate-950">
                FLUKE TESTED
              </span>
            </div>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Rhythm Ultra Max combines cutting-edge technology with practical design to deliver accurate, reliable, and accessible cardiac diagnostics anywhere, anytime.
            </p>
          </div>
          <div className="p-5">
            <img
              src={pdfImg347}
              alt="Rhythm Ultra Max product"
              className="h-[500px] w-full object-contain rounded-[1.5rem] bg-gradient-to-br from-slate-50 to-white p-4"
              loading="eager"
              decoding="async"
            />
          </div>
        </motion.div>

        <SpecSheet groups={ultraMaxSpecGroups} />
      </div>
    </section>
  );
}

function App() {
  const globalPrintRef = useRef(null);

  const handleGlobalPrint = () => {
    const printContent = globalPrintRef.current;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Deckmount Clinical Device Portfolio</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
            
            * { box-sizing: border-box !important; }
            
            body { 
              font-family: 'Inter', sans-serif; 
              margin: 0;
              padding: 0;
              background: white;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            @page {
              size: A4 portrait;
              margin: 0;
            }

            .brochure-page {
              width: 210mm;
              margin: 0 auto;
              background: white;
              overflow: visible !important;
            }

            /* Global Print Styles */
            section {
              page-break-after: always;
              padding: 15mm !important;
              width: 210mm !important;
              min-height: 297mm !important;
            }

            .no-print, button, .print-btn { display: none !important; }
            
            img {
              max-width: 100% !important;
              height: auto !important;
              display: block !important;
              page-break-inside: avoid;
            }

            .grid { display: grid !important; }
            .col-span-12 { grid-column: span 12 / span 12 !important; }
            .lg\\:col-span-7 { grid-column: span 7 / span 12 !important; }
            .lg\\:col-span-5 { grid-column: span 5 / span 12 !important; }
            
            @media print {
              .brochure-page { width: 100%; margin: 0; }
            }
          </style>
          <script>
            window.tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    'brand-blue': '#2563eb',
                  }
                }
              }
            }
          </script>
        </head>
        <body>
          <div class="brochure-page">
            ${printContent.innerHTML}
          </div>
          <script>
            document.querySelectorAll('button, .print-btn, header, footer, #specifications, .max-w-5xl').forEach(el => el.remove());
            
            function waitForImages() {
              const images = document.querySelectorAll('img');
              const promises = Array.from(images).map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => {
                  img.onload = resolve;
                  img.onerror = resolve;
                });
              });
              return Promise.all(promises);
            }

            window.onload = () => {
              waitForImages().then(() => {
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 1000);
              });
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 text-slate-900" ref={globalPrintRef}>
      <div className="w-full px-8 py-8 xl:px-12 2xl:px-16">
        <header className="rounded-[2rem] bg-slate-950/90 px-6 py-5 shadow-[0_12px_40px_rgba(15,23,42,0.18)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-slate-950 shadow-lg">
                <Heart className="h-5 w-5" />
              </div>
              <div className="leading-none">
                <div className="text-sm font-black uppercase tracking-[0.28em] text-white">
                  Clinical Device Showcase
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.35em] text-blue-300">
                  Internal product story
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleGlobalPrint}
                className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-950 shadow-lg transition-all hover:scale-105 hover:bg-brand-blue hover:text-white"
              >
                <Printer className="h-3.5 w-3.5" />
                Download Portfolio PDF
              </button>
              <div className="hidden text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 lg:block">
                Six products. One narrative.
              </div>
            </div>
          </div>
        </header>

        <section className="grid items-center gap-16 py-24 xl:grid-cols-[1.08fr_0.92fr] xl:gap-14 xl:py-28">
          <motion.div {...floatIn} className="max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[0.45em] text-brand-blue">
              Internal launch story
            </p>
            <h1 className="mt-4 text-6xl font-black leading-[0.92] tracking-tight text-slate-950 md:text-7xl xl:text-[94px]">
              Hospital-grade diagnostics that can actually travel.
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-700 md:text-2xl">
              Four products. Short positioning. Real specs. Clear workflows. Built for field deployment,
              emergency response, clinics, and connected follow-up.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#devices"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-xs font-black uppercase tracking-[0.22em] text-white transition-transform hover:scale-[1.02]"
              >
                View product cards
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-7">
              <PillGroup
                items={[
                  'Portable 12-lead ECG',
                  'Home sleep testing',
                  'CPAP / BiPAP therapy',
                  '12-channel ECG',
                  'Rhythm UltraMax Pro workflow',
                  'CardioX (RhythmPro)',
                  'Field deployment',
                ]}
              />
            </div>
          </motion.div>

          <motion.div
            {...floatIn}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="rounded-[2rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur"
          >
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { title: 'Where it is used', text: 'Ambulances, rural camps, clinics, and home follow-up.' },
                  { title: 'Why it matters', text: 'Shorter demos, clearer value, better clinical trust.' },
                  { title: 'Workflow', text: 'Device, app, cloud, report, and doctor review.' },
                  { title: 'What buyers want', text: 'Real specs, trusted visuals, and simple comparisons.' },
                ].map((item) => (
                <div key={item.title} className="rounded-[1.35rem] bg-slate-50 p-6 text-slate-950">
                  <div className="text-xs font-black uppercase tracking-[0.35em] text-brand-blue">
                    {item.title}
                  </div>
                  <p className="mt-2 text-base leading-7 text-slate-700">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="devices" className="space-y-12 pb-16 xl:space-y-16">
          {productShowcases.map((product, index) => (
            <ProductShowcase
              key={product.id}
              product={product}
              reverse={index % 2 === 1}
            />
          ))}
        </section>

        {/* Strong Closing Ecosystem Statement */}
        <motion.section
          {...floatIn}
          className="my-16 rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 p-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.15)] text-center max-w-6xl mx-auto border border-white/5"
        >
          <h3 className="text-2xl md:text-3xl font-black leading-tight tracking-tight max-w-4xl mx-auto text-slate-100">
            From emergency response to advanced cardiology, the Rhythm UltraMax ecosystem delivers a complete ECG workflow—from acquisition and AI-assisted interpretation to secure reporting and long-term Holter analysis—all within a single integrated platform.
          </h3>
        </motion.section>

        <footer className="pb-8">
        </footer>
      </div>
    </main>
  );
}

export default App;
