
import React, { useMemo, useState, useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ZAxis, ResponsiveContainer, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, RefreshCw, ArrowUp, ArrowDown, Shuffle } from "lucide-react";

// --- Embedded seedSongs from your CSV ---
const seedSongs = [
  {
    "title": "Black&Blue",
    "artist": "Vince Staples",
    "genre": "Hip-Hop",
    "energy": 65,
    "mood": 40
  },
  {
    "title": "So Far Ahead",
    "artist": "Clipse, Pharrell Williams, Pusha T, Malice",
    "genre": "Hip-Hop",
    "energy": 70,
    "mood": 50
  },
  {
    "title": "Sweet My Ear",
    "artist": "Jembaa Groove, K.O.G",
    "genre": "Afrobeat",
    "energy": 60,
    "mood": 70
  },
  {
    "title": "Hoe-nouns (feat. Thundercat & reggie)",
    "artist": "Smino, Thundercat, reggie",
    "genre": "Hip-Hop/Neo-Soul",
    "energy": 65,
    "mood": 60
  },
  {
    "title": "WAIT",
    "artist": "Doechii",
    "genre": "Hip-Hop",
    "energy": 75,
    "mood": 65
  },
  {
    "title": "What You Need (feat. Charlotte Day Wilson)",
    "artist": "KAYTRANADA, Charlotte Day Wilson",
    "genre": "House/R&B",
    "energy": 60,
    "mood": 75
  },
  {
    "title": "Lost My Treble Long Ago",
    "artist": "Vulfpeck",
    "genre": "Funk",
    "energy": 55,
    "mood": 70
  },
  {
    "title": "Days To Come",
    "artist": "Bonobo, Bajka",
    "genre": "Downtempo",
    "energy": 40,
    "mood": 60
  },
  {
    "title": "Shadows",
    "artist": "Bonobo, Jordan Rakei",
    "genre": "Electronic/Soul",
    "energy": 45,
    "mood": 55
  },
  {
    "title": "1990 (Interlude)",
    "artist": "G Yamazawa",
    "genre": "Hip-Hop/Spoken Word",
    "energy": 35,
    "mood": 45
  },
  {
    "title": "Monolith",
    "artist": "Mandrake Handshake",
    "genre": "Psychedelic Rock",
    "energy": 60,
    "mood": 50
  },
  {
    "title": "Input Source Select - Vinticious Version",
    "artist": "De Staat",
    "genre": "Alternative Rock",
    "energy": 65,
    "mood": 50
  },
  {
    "title": "Oh No",
    "artist": "Biig Piig",
    "genre": "Alt-Pop",
    "energy": 50,
    "mood": 55
  },
  {
    "title": "WEIGHT OFF",
    "artist": "KAYTRANADA, BADBADNOTGOOD",
    "genre": "Electronic/Hip-Hop",
    "energy": 65,
    "mood": 60
  },
  {
    "title": "So Cool",
    "artist": "Reuben James",
    "genre": "R&B/Jazz",
    "energy": 50,
    "mood": 70
  },
  {
    "title": "Idol Eyes",
    "artist": "Common Saints",
    "genre": "Psychedelic Soul",
    "energy": 55,
    "mood": 65
  },
  {
    "title": "Temptations",
    "artist": "Jitwam",
    "genre": "Funk",
    "energy": 60,
    "mood": 70
  },
  {
    "title": "Prone",
    "artist": "Masego",
    "genre": "R&B",
    "energy": 50,
    "mood": 60
  },
  {
    "title": "D'Evils",
    "artist": "SiR",
    "genre": "R&B",
    "energy": 45,
    "mood": 40
  },
  {
    "title": "Use Me",
    "artist": "Bill Withers",
    "genre": "Soul",
    "energy": 50,
    "mood": 70
  },
  {
    "title": "Make No Sound In The Digital Forest",
    "artist": "Incubus",
    "genre": "Alternative Rock",
    "energy": 60,
    "mood": 45
  },
  {
    "title": "Feet Don't Fail Me",
    "artist": "Queens of the Stone Age",
    "genre": "Rock",
    "energy": 70,
    "mood": 55
  },
  {
    "title": "Swangin'",
    "artist": "blackwave.",
    "genre": "Hip-Hop",
    "energy": 65,
    "mood": 60
  },
  {
    "title": "Lost in Paradise (\"Jujutsu Kaisen\")",
    "artist": "Studio Yuraki",
    "genre": "J-Pop/Anime",
    "energy": 75,
    "mood": 70
  },
  {
    "title": "Demons",
    "artist": "The Pineapple Thief",
    "genre": "Progressive Rock",
    "energy": 60,
    "mood": 40
  },
  {
    "title": "Deadcrush",
    "artist": "alt-J",
    "genre": "Indie Rock",
    "energy": 55,
    "mood": 50
  },
  {
    "title": "Fitzpleasure",
    "artist": "alt-J",
    "genre": "Indie Rock",
    "energy": 60,
    "mood": 45
  },
  {
    "title": "Cherry",
    "artist": "Jungle",
    "genre": "Funk",
    "energy": 65,
    "mood": 70
  },
  {
    "title": "Bookoo Bread Co",
    "artist": "Scallops Hotel",
    "genre": "Hip-Hop",
    "energy": 55,
    "mood": 50
  },
  {
    "title": "Make It Wit Chu",
    "artist": "Queens of the Stone Age",
    "genre": "Rock",
    "energy": 65,
    "mood": 60
  },
  {
    "title": "Daffodils (feat. Kevin Parker)",
    "artist": "Mark Ronson, Kevin Parker",
    "genre": "Disco/Funk",
    "energy": 70,
    "mood": 75
  },
  {
    "title": "Turnin' Me Up",
    "artist": "BJ The Chicago Kid",
    "genre": "R&B",
    "energy": 55,
    "mood": 65
  },
  {
    "title": "Power Trip (feat. Miguel)",
    "artist": "J. Cole, Miguel",
    "genre": "Hip-Hop/R&B",
    "energy": 65,
    "mood": 65
  },
  {
    "title": "NO HALO",
    "artist": "BROCKHAMPTON",
    "genre": "Hip-Hop",
    "energy": 65,
    "mood": 55
  },
  {
    "title": "welcome to chili's",
    "artist": "99 Neighbors",
    "genre": "Hip-Hop",
    "energy": 60,
    "mood": 55
  },
  {
    "title": "К окраинам",
    "artist": "Рушана",
    "genre": "Russian Indie",
    "energy": 50,
    "mood": 50
  },
  {
    "title": "Jiggy",
    "artist": "Victor Niglio, Mr. Man",
    "genre": "Dance",
    "energy": 80,
    "mood": 65
  },
  {
    "title": "El Melouk",
    "artist": "Ahmed Saad, Zenba, Double Zuksh",
    "genre": "Arabic Pop",
    "energy": 70,
    "mood": 60
  },
  {
    "title": "Ensalada (feat. Anderson .Paak)",
    "artist": "Freddie Gibbs, The Alchemist, Anderson .Paak",
    "genre": "Hip-Hop",
    "energy": 70,
    "mood": 60
  },
  {
    "title": "Chains & Whips",
    "artist": "Clipse, Kendrick Lamar",
    "genre": "Hip-Hop",
    "energy": 70,
    "mood": 50
  },
  {
    "title": "So Be It",
    "artist": "Clipse, Pusha T, Malice",
    "genre": "Hip-Hop",
    "energy": 65,
    "mood": 50
  },
  {
    "title": "Intergalactic Janet",
    "artist": "Ley Soul",
    "genre": "Funk",
    "energy": 65,
    "mood": 75
  },
  {
    "title": "Didn't Cha Know",
    "artist": "Erykah Badu",
    "genre": "Neo-Soul",
    "energy": 50,
    "mood": 65
  },
  {
    "title": "Selene",
    "artist": "Night Tapes",
    "genre": "Dream Pop",
    "energy": 45,
    "mood": 60
  },
  {
    "title": "Humans",
    "artist": "Night Tapes",
    "genre": "Dream Pop",
    "energy": 50,
    "mood": 55
  },
  {
    "title": "Mahal",
    "artist": "Glass Beams",
    "genre": "Psychedelic Jazz",
    "energy": 55,
    "mood": 65
  },
  {
    "title": "Not Like Us",
    "artist": "Kendrick Lamar",
    "genre": "Hip-Hop",
    "energy": 80,
    "mood": 55
  },
  {
    "title": "Cilvia Demo",
    "artist": "Isaiah Rashad",
    "genre": "Hip-Hop",
    "energy": 55,
    "mood": 50
  },
  {
    "title": "Trust",
    "artist": "Jordan Rakei",
    "genre": "Soul",
    "energy": 50,
    "mood": 65
  },
  {
    "title": "KARMA",
    "artist": "SiR, Isaiah Rashad",
    "genre": "Hip-Hop",
    "energy": 60,
    "mood": 55
  },
  {
    "title": "Envious",
    "artist": "SAULT",
    "genre": "R&B",
    "energy": 60,
    "mood": 65
  },
  {
    "title": "Self",
    "artist": "Cleo Sol",
    "genre": "Soul",
    "energy": 45,
    "mood": 70
  },
  {
    "title": "Wildfires",
    "artist": "SAULT",
    "genre": "R&B",
    "energy": 55,
    "mood": 65
  },
  {
    "title": "Summer Sun",
    "artist": "Common Saints",
    "genre": "Psychedelic",
    "energy": 50,
    "mood": 60
  },
  {
    "title": "Nightrider",
    "artist": "Tom Misch, Yussef Dayes",
    "genre": "Jazz Fusion",
    "energy": 55,
    "mood": 60
  },
  {
    "title": "Lonely Soul",
    "artist": "UNKLE, Richard Ashcroft",
    "genre": "Trip-Hop",
    "energy": 50,
    "mood": 40
  },
  {
    "title": "Smooth Sailing",
    "artist": "Queens of the Stone Age",
    "genre": "Rock",
    "energy": 60,
    "mood": 55
  },
  {
    "title": "Ditch",
    "artist": "Empara Mi",
    "genre": "Alt-Pop",
    "energy": 50,
    "mood": 45
  },
  {
    "title": "Forever Lost",
    "artist": "The Polish Ambassador, Lafa Taylor",
    "genre": "Electronic Hip-Hop",
    "energy": 60,
    "mood": 60
  },
  {
    "title": "Brnt",
    "artist": "Magic City Hippies, The EMEFE Horns",
    "genre": "Funk",
    "energy": 65,
    "mood": 70
  },
  {
    "title": "Destruction",
    "artist": "Joywave",
    "genre": "Indie Rock",
    "energy": 65,
    "mood": 50
  },
  {
    "title": "Garden",
    "artist": "Papadosio",
    "genre": "Jam Band",
    "energy": 55,
    "mood": 60
  },
  {
    "title": "Chapter 7 (feat. Ty)",
    "artist": "Ezra Collective, Ty",
    "genre": "Jazz/Funk",
    "energy": 60,
    "mood": 65
  },
  {
    "title": "BDE Bonus",
    "artist": "Mac Miller",
    "genre": "Hip-Hop",
    "energy": 60,
    "mood": 55
  },
  {
    "title": "All Apologies",
    "artist": "JMSN",
    "genre": "R&B",
    "energy": 45,
    "mood": 50
  },
  {
    "title": "Cherry Pop",
    "artist": "JMSN",
    "genre": "R&B",
    "energy": 50,
    "mood": 60
  },
  {
    "title": "Talk Is Cheap",
    "artist": "JMSN",
    "genre": "R&B",
    "energy": 50,
    "mood": 45
  },
  {
    "title": "Be Sweet",
    "artist": "Japanese Breakfast",
    "genre": "Indie Pop",
    "energy": 60,
    "mood": 75
  },
  {
    "title": "Clouds & Cream",
    "artist": "Sticky Fingers",
    "genre": "Indie Rock",
    "energy": 60,
    "mood": 65
  },
  {
    "title": "The Cold Wind",
    "artist": "Greta Van Fleet",
    "genre": "Rock",
    "energy": 70,
    "mood": 50
  },
  {
    "title": "Angels / Your Love",
    "artist": "Mr Jukes, BJ The Chicago Kid",
    "genre": "Funk",
    "energy": 60,
    "mood": 70
  },
  {
    "title": "Your Woman",
    "artist": "White Town",
    "genre": "Synth-Pop",
    "energy": 55,
    "mood": 55
  },
  {
    "title": "Discard Your Fear",
    "artist": "Riverside",
    "genre": "Progressive Rock",
    "energy": 65,
    "mood": 50
  },
  {
    "title": "The Final Thing On My Mind",
    "artist": "The Pineapple Thief",
    "genre": "Progressive Rock",
    "energy": 60,
    "mood": 45
  },
  {
    "title": "Oh Lorraine",
    "artist": "The Temperance Movement",
    "genre": "Blues Rock",
    "energy": 60,
    "mood": 55
  },
  {
    "title": "Ariah Being",
    "artist": "Kiev",
    "genre": "Indie Rock",
    "energy": 55,
    "mood": 55
  },
  {
    "title": "Cakey",
    "artist": "Kyle Gass Band",
    "genre": "Rock",
    "energy": 65,
    "mood": 60
  },
  {
    "title": "Telepathic",
    "artist": "Rose Hill Drive",
    "genre": "Rock",
    "energy": 60,
    "mood": 55
  },
  {
    "title": "Ribbon On A Branch",
    "artist": "Younger Brother",
    "genre": "Psytrance",
    "energy": 50,
    "mood": 60
  },
  {
    "title": "Gold",
    "artist": "Chet Faker",
    "genre": "Electro-Soul",
    "energy": 50,
    "mood": 60
  },
  {
    "title": "Undertow",
    "artist": "Chroma Key",
    "genre": "Ambient",
    "energy": 45,
    "mood": 40
  },
  {
    "title": "The Chain - 2004 Remaster",
    "artist": "Fleetwood Mac",
    "genre": "Classic Rock",
    "energy": 65,
    "mood": 60
  },
  {
    "title": "Wolves And Doors",
    "artist": "Finger Eleven",
    "genre": "Alternative Rock",
    "energy": 65,
    "mood": 50
  },
  {
    "title": "Hostage",
    "artist": "Nothing But Thieves",
    "genre": "Alternative Rock",
    "energy": 70,
    "mood": 40
  },
  {
    "title": "Roundabout - 2003 Remaster",
    "artist": "Yes",
    "genre": "Progressive Rock",
    "energy": 70,
    "mood": 60
  },
  {
    "title": "Make Luv - Live",
    "artist": "Room 5, Oliver Cheatham",
    "genre": "Disco",
    "energy": 70,
    "mood": 75
  },
  {
    "title": "Hailin From The Edge",
    "artist": "Apparat",
    "genre": "Electronic",
    "energy": 55,
    "mood": 45
  },
  {
    "title": "Nobody Speak (feat. Run the Jewels)",
    "artist": "DJ Shadow, Run The Jewels",
    "genre": "Hip-Hop",
    "energy": 70,
    "mood": 50
  },
  {
    "title": "Out of the Black",
    "artist": "Royal Blood",
    "genre": "Rock",
    "energy": 70,
    "mood": 45
  },
  {
    "title": "Days Are Forgotten",
    "artist": "Kasabian",
    "genre": "Rock",
    "energy": 65,
    "mood": 50
  },
  {
    "title": "Processed Beats",
    "artist": "Kasabian",
    "genre": "Rock",
    "energy": 60,
    "mood": 55
  },
  {
    "title": "Short Change Hero",
    "artist": "The Heavy",
    "genre": "Blues Rock",
    "energy": 55,
    "mood": 45
  },
  {
    "title": "Move With The Season",
    "artist": "Temples",
    "genre": "Psychedelic Rock",
    "energy": 60,
    "mood": 55
  },
  {
    "title": "New Day",
    "artist": "Karnivool",
    "genre": "Progressive Metal",
    "energy": 70,
    "mood": 40
  },
  {
    "title": "Have A Cigar - 2011 Remastered Version",
    "artist": "Pink Floyd",
    "genre": "Classic Rock",
    "energy": 65,
    "mood": 50
  },
  {
    "title": "Fragments of Time (feat. Todd Edwards)",
    "artist": "Daft Punk, Todd Edwards",
    "genre": "House/Funk",
    "energy": 70,
    "mood": 75
  },
  {
    "title": "Little Black Submarines - Radio Edit",
    "artist": "The Black Keys",
    "genre": "Blues Rock",
    "energy": 60,
    "mood": 40
  },
  {
    "title": "Alors on danse - Radio Edit",
    "artist": "Stromae",
    "genre": "Dance/Pop",
    "energy": 70,
    "mood": 70
  },
  {
    "title": "Makeba",
    "artist": "Jain",
    "genre": "World Pop",
    "energy": 65,
    "mood": 75
  },
  {
    "title": "Aquemini",
    "artist": "Outkast",
    "genre": "Hip-Hop",
    "energy": 65,
    "mood": 60
  },
  {
    "title": "Get Ur Freak On",
    "artist": "Missy Elliott",
    "genre": "Hip-Hop",
    "energy": 80,
    "mood": 65
  },
  {
    "title": "Milkshake",
    "artist": "Kelis",
    "genre": "R&B/Pop",
    "energy": 70,
    "mood": 65
  },
  {
    "title": "The Next Episode",
    "artist": "Dr. Dre, Snoop Dogg",
    "genre": "Hip-Hop",
    "energy": 75,
    "mood": 60
  },
  {
    "title": "Lauren",
    "artist": "Men I Trust",
    "genre": "Dream Pop",
    "energy": 45,
    "mood": 55
  },
  {
    "title": "Runaway - Remastered 2006",
    "artist": "Jamiroquai",
    "genre": "Acid Jazz",
    "energy": 65,
    "mood": 75
  },
  {
    "title": "Cosmic Girl - Remastered 2013",
    "artist": "Jamiroquai",
    "genre": "Funk",
    "energy": 70,
    "mood": 75
  },
  {
    "title": "Alright",
    "artist": "Kendrick Lamar",
    "genre": "Hip-Hop",
    "energy": 70,
    "mood": 65
  },
  {
    "title": "The Way You Move (feat. Sleepy Brown)",
    "artist": "Outkast, Sleepy Brown",
    "genre": "Funk/Hip-Hop",
    "energy": 70,
    "mood": 70
  },
  {
    "title": "Hey Ya!",
    "artist": "Outkast",
    "genre": "Pop/Hip-Hop",
    "energy": 80,
    "mood": 80
  },
  {
    "title": "Baby Got Back",
    "artist": "Sir Mix-A-Lot",
    "genre": "Hip-Hop",
    "energy": 75,
    "mood": 70
  },
  {
    "title": "Money Trees",
    "artist": "Kendrick Lamar, Jay Rock",
    "genre": "Hip-Hop",
    "energy": 65,
    "mood": 55
  },
  {
    "title": "i",
    "artist": "Kendrick Lamar",
    "genre": "Hip-Hop",
    "energy": 65,
    "mood": 70
  },
  {
    "title": "Bitch, Don't Kill My Vibe",
    "artist": "Kendrick Lamar",
    "genre": "Hip-Hop",
    "energy": 60,
    "mood": 55
  },
  {
    "title": "Them Changes",
    "artist": "Thundercat",
    "genre": "Funk",
    "energy": 60,
    "mood": 65
  },
  {
    "title": "Lost In Yesterday",
    "artist": "Tame Impala",
    "genre": "Psychedelic Pop",
    "energy": 65,
    "mood": 60
  },
  {
    "title": "Feels Like Summer",
    "artist": "Childish Gambino",
    "genre": "R&B",
    "energy": 60,
    "mood": 60
  },
  {
    "title": "The Seed (2.0)",
    "artist": "The Roots, Cody Chesnutt",
    "genre": "Hip-Hop",
    "energy": 65,
    "mood": 65
  },
  {
    "title": "Tailwhip",
    "artist": "Men I Trust",
    "genre": "Dream Pop",
    "energy": 50,
    "mood": 60
  },
  {
    "title": "Rebirth Of Slick (Cool Like Dat)",
    "artist": "Digable Planets",
    "genre": "Jazz Rap",
    "energy": 60,
    "mood": 65
  },
  {
    "title": "BULLFROG",
    "artist": "Doechii",
    "genre": "Hip-Hop",
    "energy": 70,
    "mood": 60
  },
  {
    "title": "CATFISH",
    "artist": "Doechii",
    "genre": "Hip-Hop",
    "energy": 70,
    "mood": 55
  }
];

// --- Helper functions ---
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
function hexToRgb(hex){ const h=hex.replace('#',''); return { r:parseInt(h.slice(0,2),16), g:parseInt(h.slice(2,4),16), b:parseInt(h.slice(4,6),16)} }
function rgbToHex({r,g,b}){ const to=(n)=>n.toString(16).padStart(2,'0'); return `#${to(r)}${to(g)}${to(b)}` }
function lerpHex(a,b,t){ const A=hexToRgb(a), B=hexToRgb(b); return rgbToHex({ r:Math.round(lerp(A.r,B.r,t)), g:Math.round(lerp(A.g,B.g,t)), b:Math.round(lerp(A.b,B.b,t)) }); }

function distance(a, b, genrePenalty = 8) {
  const dE = a.energy - b.energy; const dM = a.mood - b.mood;
  return Math.sqrt(dE*dE + dM*dM) + (a.genre === b.genre ? 0 : genrePenalty);
}

function greedyPath(data, startIndex = 0, genrePenalty = 8) {
  const remaining = data.map((d, i) => ({ ...d, _i: i }));
  const path = [];
  let current = remaining.splice(Math.max(0, Math.min(startIndex, remaining.length - 1)), 1)[0];
  path.push(current);
  while (remaining.length) {
    let bestIdx = 0, bestD = Infinity;
    for (let i = 0; i < remaining.length; i++) {
      const d = distance(current, remaining[i], genrePenalty);
      if (d < bestD) { bestD = d; bestIdx = i; }
    }
    current = remaining.splice(bestIdx, 1)[0];
    path.push(current);
  }
  return path;
}

function flowScores(ordered, genrePenalty){
  const n = ordered.length;
  const scores = new Array(n).fill(0);
  for (let i=0;i<n;i++){
    let c=0, count=0;
    if (i>0){ c += distance(ordered[i-1], ordered[i], genrePenalty); count++; }
    if (i<n-1){ c += distance(ordered[i], ordered[i+1], genrePenalty); count++; }
    scores[i] = count? c/count : 0;
  }
  const min = Math.min(...scores), max = Math.max(...scores); const range = max - min || 1;
  return scores.map(s => (s - min) / range);
}

// Dynamic color function based on mood and energy
const getSongColor = (mood, energy) => {
  // Create a vibrant color palette based on mood (hue) and energy (saturation/brightness)
  const hue = (mood / 100) * 360; // Mood maps to hue (0-360)
  const saturation = Math.max(60, (energy / 100) * 80 + 20); // Energy maps to saturation (20-100)
  const lightness = Math.max(30, (energy / 100) * 40 + 30); // Energy also affects brightness (30-70)
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export default function App(){
  const [allSongs] = useState(seedSongs.map((d,i)=>({...d, idx:i+1})));
  const [points, setPoints] = useState([...allSongs]);
  const [genrePenalty, setGenrePenalty] = useState(8);
  const [startIdx, setStartIdx] = useState(0);
  const [orderForHeatmap, setOrderForHeatmap] = useState("manual");
  const [playlistLen, setPlaylistLen] = useState(20);
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const suggested = useMemo(() => {
    if (!points.length) return [];
    const path = greedyPath(points, startIdx, genrePenalty);
    return path.slice(0, playlistLen).map((d,i)=>({...d, order:i+1}));
  }, [points, startIdx, genrePenalty, playlistLen]);

  const manual = useMemo(()=> points.slice(0, playlistLen).map((d,i)=>({...d, order:i+1})), [points, playlistLen]);
  
  // Create a genre penalty-aware version of the manual list for better visualization
  const manualOptimized = useMemo(()=> {
    const limitedPoints = points.slice(0, playlistLen);
    const path = greedyPath(limitedPoints, 0, genrePenalty);
    return path.map((d,i)=>({...d, order:i+1}));
  }, [points, playlistLen, genrePenalty]);
  
  const orderedForHeat = orderForHeatmap === 'suggested' ? suggested : manualOptimized;

  const heatColors = useMemo(()=>{
    const scores = flowScores(orderedForHeat, genrePenalty);
    const map = {}; 
    orderedForHeat.forEach((d,i)=>{ 
      // Use vibrant colors based on flow scores - from cool blue to warm red
      const score = scores[i];
      if (score < 0.3) {
        map[`${d.title}|${d.artist}`] = "#3b82f6"; // Cool blue for smooth transitions
      } else if (score < 0.7) {
        map[`${d.title}|${d.artist}`] = "#10b981"; // Green for medium flow
      } else {
        map[`${d.title}|${d.artist}`] = "#ef4444"; // Red for rough transitions
      }
    });
    return map;
  }, [orderedForHeat, genrePenalty]);

  const vizData = useMemo(()=> {
    const data = orderForHeatmap === 'manual' ? manual : suggested;
    return data.slice(0, playlistLen).map((song, i) => ({
      energy: song.energy,
      mood: song.mood,
      order: i + 1,
      title: song.title,
      artist: song.artist,
      color: i === startIdx ? "#ff6b6b" : getSongColor(song.mood, song.energy) // Start song gets special red color
    }));
  }, [manual, suggested, orderForHeatmap, playlistLen, startIdx]);

  const exportOrder = () => {
    let list;
    let filename;
    
    if (orderForHeatmap === 'suggested') {
      list = suggested;
      filename = "suggested-playlist-order.txt";
    } else {
      list = manualOptimized; // Export the genre-optimized version
      filename = "genre-optimized-playlist-order.txt";
    }
    
    const text = list.map((s, i) => `${i + 1}. ${s.title} — ${s.artist} (${s.genre})`).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
  };

  const reset = () => {
    setPoints([...allSongs]);
    setGenrePenalty(8); setStartIdx(0); setOrderForHeatmap('manual'); setPlaylistLen(20);
  };

  const move = (i, dir) => {
    const j = i + dir; if (j < 0 || j >= Math.min(points.length, playlistLen)) return;
    const c = [...points]; [c[i], c[j]] = [c[j], c[i]]; setPoints(c);
  };

  const shuffleN = () => {
    const shuffled = [...allSongs].sort(()=>Math.random()-0.5).slice(0, playlistLen);
    setPoints(shuffled);
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-background">
      <div className="mx-auto max-w-7xl grid gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Playlist Mapper – Embedded Data + Shuffle
          </h1>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-none"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? '☀️' : '🌙'}
          </Button>
        </div>

        <div className="shadow-lg border border-border p-4 md:p-6 grid gap-6 bg-card rounded-none">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
            <div>
              <label className="text-sm text-muted-foreground">Genre penalty: {genrePenalty}</label>
              <Slider value={[genrePenalty]} min={0} max={20} step={1} onValueChange={(v)=>setGenrePenalty(v[0])} />
              <div className="text-xs text-muted-foreground mt-1">
                Higher = smoother genre transitions
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Start track</label>
              <Input type="number" min={1} max={points.length} value={startIdx+1} onChange={(e)=>setStartIdx(clamp(Number(e.target.value)-1,0,points.length-1))} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Heatmap evaluates</label>
              <Select value={orderForHeatmap} onValueChange={setOrderForHeatmap}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="suggested">Suggested</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Playlist length</label>
              <Input type="number" min={1} max={allSongs.length} value={playlistLen} onChange={(e)=>setPlaylistLen(clamp(Number(e.target.value),1,allSongs.length))} />
              <div className="text-xs text-muted-foreground mt-1">Showing {Math.min(points.length, playlistLen)} of {points.length} songs</div>
            </div>
            <Button onClick={shuffleN}><Shuffle className="mr-2 h-4 w-4"/>Shuffle N</Button>
            <div className="flex gap-2">
              <Button onClick={exportOrder}><Download className="mr-2 h-4 w-4"/>Export</Button>
              <Button variant="secondary" onClick={reset}><RefreshCw className="mr-2 h-4 w-4"/>Reset</Button>
            </div>
          </div>

          <div className="h-[420px] w-full">
            <ResponsiveContainer>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" dataKey="order" domain={[1, playlistLen]} stroke="var(--muted-foreground)" />
                <YAxis type="number" dataKey="mood" domain={[0,100]} stroke="var(--muted-foreground)" />
                <ZAxis type="number" dataKey="energy" range={[60,200]} />
                <Tooltip content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload;
                  return <div className="bg-popover text-popover-foreground p-2 rounded-none border border-border shadow-md">{p.order}. {p.title} — {p.artist}</div>;
                }} />
                <Scatter data={vizData}>{vizData.map((d,i)=>(<Cell key={i} fill={d.color}/>))}</Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          
          {/* Color Legend - Moved outside chart container */}
          <div className="flex flex-wrap gap-4 text-sm mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-muted-foreground">Start Track</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-muted-foreground">Low Energy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-muted-foreground">Medium Energy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-muted-foreground">High Energy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-500"></div>
              <span className="text-muted-foreground">Mood: Sad → Happy</span>
            </div>
          </div>

          <Tabs defaultValue="order">
            <TabsList>
              <TabsTrigger value="order">Manual Reorder</TabsTrigger>
              <TabsTrigger value="optimized">Genre Optimized</TabsTrigger>
              <TabsTrigger value="flow">Suggested Flow</TabsTrigger>
            </TabsList>
            <TabsContent value="order" className="mt-4">
              {manual.map((p,i)=>(
                <div key={i} className="flex justify-between items-center bg-card p-2 mb-1 rounded-none shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
                  <div className="text-card-foreground">{i+1}. {p.title} — {p.artist}</div>
                  <div className="flex gap-1">
                    <Button size="icon" onClick={()=>move(i,-1)}><ArrowUp className="h-4 w-4"/></Button>
                    <Button size="icon" onClick={()=>move(i,1)}><ArrowDown className="h-4 w-4"/></Button>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="optimized" className="mt-4">
              <div className="mb-2 text-sm text-muted-foreground">
                Order optimized for smooth genre transitions (penalty: {genrePenalty})
              </div>
              {manualOptimized.map((p,i)=>(
                <div key={i} className="flex justify-between items-center bg-accent/10 p-2 mb-1 rounded-none shadow-sm border border-accent/20 hover:shadow-md hover:bg-accent/20 transition-all duration-200">
                  <div className="text-card-foreground">{i+1}. {p.title} — {p.artist}</div>
                  <div className="text-xs text-muted-foreground">{p.genre}</div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="flow" className="mt-4">
              <ol className="space-y-1">
                {suggested.map((s)=>(<li key={s.title} className="text-card-foreground">{s.order}. {s.title} — {s.artist}</li>))}
              </ol>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
