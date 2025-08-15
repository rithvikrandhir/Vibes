
import React, { useMemo, useState, useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ZAxis, ResponsiveContainer, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, RefreshCw, ArrowUp, ArrowDown, Shuffle } from "lucide-react";

// --- CSV Data Loading Function ---
const loadSongData = () => {
  // CSV data with categories
  const csvData = `title,artist,genre,energy,mood,category
Black&Blue,Vince Staples,Hip-Hop,65,40,heavy
So Far Ahead,"Clipse, Pharrell Williams, Pusha T, Malice",Hip-Hop,70,50,heavy
Sweet My Ear,"Jembaa Groove, K.O.G",Afrobeat,60,70,groovy
Hoe-nouns (feat. Thundercat & reggie)","Smino, Thundercat, reggie",Hip-Hop/Neo-Soul,65,60,groovy
WAIT,Doechii,Hip-Hop,75,65,party mode
What You Need (feat. Charlotte Day Wilson),"KAYTRANADA, Charlotte Day Wilson",House/R&B,60,75,groovy
Lost My Treble Long Ago,Vulfpeck,Funk,55,70,groovy
Days To Come,"Bonobo, Bajka",Downtempo,40,60,mellow
Shadows,"Bonobo, Jordan Rakei",Electronic/Soul,45,55,mellow
1990 (Interlude),G Yamazawa,Hip-Hop/Spoken Word,35,45,mellow
Monolith,Mandrake Handshake,Psychedelic Rock,60,50,heavy
Input Source Select - Vinticious Version,De Staat,Alternative Rock,65,50,heavy
Oh No,Biig Piig,Alt-Pop,50,55,mellow
WEIGHT OFF,"KAYTRANADA, BADBADNOTGOOD",Electronic/Hip-Hop,65,60,groovy
So Cool,Reuben James,R&B/Jazz,50,70,mellow
Idol Eyes,Common Saints,Psychedelic Soul,55,65,groovy
Temptations,Jitwam,Funk,60,70,groovy
Prone,Masego,R&B,50,60,mellow
D'Evils,SiR,R&B,45,40,heavy
Use Me,Bill Withers,Soul,50,70,groovy
Make No Sound In The Digital Forest,Incubus,Alternative Rock,60,45,heavy
Feet Don't Fail Me,Queens of the Stone Age,Rock,70,55,heavy
Swangin',blackwave.,Hip-Hop,65,60,groovy
Lost in Paradise ("Jujutsu Kaisen"),Studio Yuraki,J-Pop/Anime,75,70,party mode
Demons,The Pineapple Thief,Progressive Rock,60,40,heavy
Deadcrush,alt-J,Indie Rock,55,50,heavy
Fitzpleasure,alt-J,Indie Rock,60,45,heavy
Cherry,Jungle,Funk,65,70,groovy
Bookoo Bread Co,Scallops Hotel,Hip-Hop,55,50,heavy
Make It Wit Chu,Queens of the Stone Age,Rock,65,60,groovy
Daffodils (feat. Kevin Parker),"Mark Ronson, Kevin Parker",Disco/Funk,70,75,party mode
Turnin' Me Up,BJ The Chicago Kid,R&B,55,65,groovy
Power Trip (feat. Miguel),"J. Cole, Miguel",Hip-Hop/R&B,65,65,groovy
NO HALO,BROCKHAMPTON,Hip-Hop,65,55,heavy
welcome to chili's,99 Neighbors,Hip-Hop,60,55,heavy
К окраинам,Рушана,Russian Indie,50,50,heavy
Jiggy,"Victor Niglio, Mr. Man",Dance,80,65,party mode
El Melouk,"Ahmed Saad, Zenba, Double Zuksh",Arabic Pop,70,60,party mode
Ensalada (feat. Anderson .Paak),"Freddie Gibbs, The Alchemist, Anderson .Paak",Hip-Hop,70,60,party mode
Chains & Whips,"Clipse, Kendrick Lamar",Hip-Hop,70,50,heavy
So Be It,"Clipse, Pusha T, Malice",Hip-Hop,65,50,heavy
Intergalactic Janet,Ley Soul,Funk,65,75,groovy
Didn't Cha Know,Erykah Badu,Neo-Soul,50,65,groovy
Selene,Night Tapes,Dream Pop,45,60,mellow
Humans,Night Tapes,Dream Pop,50,55,mellow
Mahal,Glass Beams,Psychedelic Jazz,55,65,groovy
Not Like Us,Kendrick Lamar,Hip-Hop,80,55,heavy
Cilvia Demo,Isaiah Rashad,Hip-Hop,55,50,heavy
Trust,Jordan Rakei,Soul,50,65,groovy
KARMA,"SiR, Isaiah Rashad",Hip-Hop,60,55,heavy
Envious,SAULT,R&B,60,65,groovy
Self,Cleo Sol,Soul,45,70,mellow
Wildfires,SAULT,R&B,55,65,groovy
Summer Sun,Common Saints,Psychedelic,50,60,mellow
Nightrider,"Tom Misch, Yussef Dayes",Jazz Fusion,55,60,groovy
Lonely Soul,"UNKLE, Richard Ashcroft",Trip-Hop,50,40,heavy
Smooth Sailing,Queens of the Stone Age,Rock,60,55,heavy
Ditch,Empara Mi,Alt-Pop,50,45,heavy
Forever Lost,"The Polish Ambassador, Lafa Taylor",Electronic Hip-Hop,60,60,groovy
Brnt,"Magic City Hippies, The EMEFE Horns",Funk,65,70,groovy
Destruction,Joywave,Indie Rock,65,50,heavy
Garden,Papadosio,Jam Band,55,60,groovy
Chapter 7 (feat. Ty),"Ezra Collective, Ty",Jazz/Funk,60,65,groovy
BDE Bonus,Mac Miller,Hip-Hop,60,55,heavy
All Apologies,JMSN,R&B,45,50,heavy
Cherry Pop,JMSN,R&B,50,60,mellow
Talk Is Cheap,JMSN,R&B,50,45,heavy
Be Sweet,Japanese Breakfast,Indie Pop,60,75,groovy
Clouds & Cream,Sticky Fingers,Indie Rock,60,65,groovy
The Cold Wind,Greta Van Fleet,Rock,70,50,heavy
Angels / Your Love,"Mr Jukes, BJ The Chicago Kid",Funk,60,70,groovy
Your Woman,White Town,Synth-Pop,55,55,heavy
Discard Your Fear,Riverside,Progressive Rock,65,50,heavy
The Final Thing On My Mind,The Pineapple Thief,Progressive Rock,60,45,heavy
Oh Lorraine,The Temperance Movement,Blues Rock,60,55,heavy
Ariah Being,Kiev,Indie Rock,55,55,heavy
Cakey,Kyle Gass Band,Rock,65,60,groovy
Telepathic,Rose Hill Drive,Rock,60,55,heavy
Ribbon On A Branch,Younger Brother,Psytrance,50,60,mellow
Gold,Chet Faker,Electro-Soul,50,60,mellow
Undertow,Chroma Key,Ambient,45,40,heavy
The Chain - 2004 Remaster,Fleetwood Mac,Classic Rock,65,60,groovy
Wolves And Doors,Finger Eleven,Alternative Rock,65,50,heavy
Hostage,Nothing But Thieves,Alternative Rock,70,40,heavy
Roundabout - 2003 Remaster,Yes,Progressive Rock,70,60,party mode
Make Luv - Live,"Room 5, Oliver Cheatham",Disco,70,75,party mode
Hailin From The Edge,Apparat,Electronic,55,45,heavy
Nobody Speak (feat. Run the Jewels),"DJ Shadow, Run The Jewels",Hip-Hop,70,50,heavy
Out of the Black,Royal Blood,Rock,70,45,heavy
Days Are Forgotten,Kasabian,Rock,65,50,heavy
Processed Beats,Kasabian,Rock,60,55,heavy
Short Change Hero,The Heavy,Blues Rock,55,45,heavy
Move With The Season,Temples,Psychedelic Rock,60,55,heavy
New Day,Karnivool,Progressive Metal,70,40,heavy
Have A Cigar - 2011 Remastered Version,Pink Floyd,Classic Rock,65,50,heavy
Fragments of Time (feat. Todd Edwards),"Daft Punk, Todd Edwards",House/Funk,70,75,party mode
Little Black Submarines - Radio Edit,The Black Keys,Blues Rock,60,40,heavy
Alors on danse - Radio Edit,Stromae,Dance/Pop,70,70,party mode
Makeba,Jain,World Pop,65,75,groovy
Aquemini,Outkast,Hip-Hop,65,60,groovy
Get Ur Freak On,Missy Elliott,Hip-Hop,80,65,party mode
Milkshake,Kelis,R&B/Pop,70,65,party mode
The Next Episode,"Dr. Dre, Snoop Dogg",Hip-Hop,75,60,party mode
Lauren,Men I Trust,Dream Pop,45,55,mellow
Runaway - Remastered 2006,Jamiroquai,Acid Jazz,65,75,groovy
Cosmic Girl - Remastered 2013,Jamiroquai,Funk,70,75,party mode
Alright,Kendrick Lamar,Hip-Hop,70,65,party mode
The Way You Move (feat. Sleepy Brown),"Outkast, Sleepy Brown",Funk/Hip-Hop,70,70,party mode
Hey Ya!,Outkast,Pop/Hip-Hop,80,80,party mode
Baby Got Back,Sir Mix-A-Lot,Hip-Hop,75,70,party mode
Money Trees,"Kendrick Lamar, Jay Rock",Hip-Hop,65,55,heavy
i,Kendrick Lamar,Hip-Hop,65,70,groovy
Bitch, Don't Kill My Vibe,Kendrick Lamar,Hip-Hop,60,55,heavy
Them Changes,Thundercat,Funk,60,65,groovy
Lost In Yesterday,Tame Impala,Psychedelic Pop,65,60,groovy
Feels Like Summer,Childish Gambino,R&B,60,60,groovy
The Seed (2.0),"The Roots, Cody Chesnutt",Hip-Hop,65,65,groovy
Tailwhip,Men I Trust,Dream Pop,50,60,mellow
Rebirth Of Slick (Cool Like Dat),Digable Planets,Jazz Rap,60,65,groovy
BULLFROG,Doechii,Hip-Hop,70,60,party mode
CATFISH,Doechii,Hip-Hop,70,55,heavy`;

  // Parse CSV data
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const song = {};
    
    headers.forEach((header, index) => {
      let value = values[index];
      // Handle quoted values (like artist names with commas)
      if (value && value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      if (header === 'energy' || header === 'mood') {
        song[header] = parseInt(value);
      } else {
        song[header] = value;
      }
    });
    
    return song;
  });
};

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

// Dynamic color function based on category
const getSongColor = (category) => {
  switch (category) {
    case 'mellow':
      return "#eab308"; // Yellow
    case 'groovy':
      return "#22c55e"; // Green
    case 'party mode':
      return "#a855f7"; // Purple
    case 'heavy':
      return "#ef4444"; // Red
    default:
      return "#6b7280"; // Gray for unknown categories
  }
};

export default function App(){
  const [allSongs] = useState(loadSongData().map((d,i)=>({...d, idx:i+1})));
  const [points, setPoints] = useState([...allSongs]);

  // Filter songs by category
  const filteredSongs = useMemo(() => {
    if (categoryFilter === "all") return allSongs;
    return allSongs.filter(song => song.category === categoryFilter);
  }, [allSongs, categoryFilter]);

  // Update points when filter changes
  useEffect(() => {
    setPoints([...filteredSongs]);
    setStartIdx(0); // Reset start index when filter changes
  }, [filteredSongs]);
  const [genrePenalty, setGenrePenalty] = useState(8);
  const [startIdx, setStartIdx] = useState(0);
  const [orderForHeatmap, setOrderForHeatmap] = useState("manual");
  const [playlistLen, setPlaylistLen] = useState(20);
  const [isDark, setIsDark] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");

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
      category: song.category,
      color: getSongColor(song.category) // All songs get colors based on their category
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
    
    const text = list.map((s, i) => `${i + 1}. ${s.title} — ${s.artist} (${s.genre}) [${s.category}]`).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
  };

  const reset = () => {
    setPoints([...allSongs]);
    setGenrePenalty(8); setStartIdx(0); setOrderForHeatmap('manual'); setPlaylistLen(20); setCategoryFilter('all');
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
              <label className="text-sm text-muted-foreground">Category filter</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="mellow">Mellow</SelectItem>
                  <SelectItem value="groovy">Groovy</SelectItem>
                  <SelectItem value="party mode">Party Mode</SelectItem>
                  <SelectItem value="heavy">Heavy</SelectItem>
                </SelectContent>
              </Select>
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
                  return <div className="bg-popover text-popover-foreground p-2 rounded-none border border-border shadow-md">
                    <div className="font-semibold">{p.order}. {p.title}</div>
                    <div className="text-sm">{p.artist}</div>
                    <div className="text-xs text-muted-foreground mt-1">Category: {p.category}</div>
                  </div>;
                }} />
                <Scatter data={vizData}>{vizData.map((d,i)=>(<Cell key={i} fill={d.color}/>))}</Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          
          {/* Color Legend and Category Stats */}
          <div className="flex flex-wrap gap-6 text-sm mb-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-muted-foreground">Mellow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground">Groovy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                <span className="text-muted-foreground">Party Mode</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-muted-foreground">Heavy</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Showing {points.length} of {allSongs.length} songs
              {categoryFilter !== 'all' && ` (${categoryFilter} only)`}
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
                  <div className="text-card-foreground">
                    <div>{i+1}. {p.title} — {p.artist}</div>
                    <div className="text-xs text-muted-foreground">{p.genre} • {p.category}</div>
                  </div>
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
                  <div className="text-card-foreground">
                    <div>{i+1}. {p.title} — {p.artist}</div>
                    <div className="text-xs text-muted-foreground">{p.genre} • {p.category}</div>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="flow" className="mt-4">
              <ol className="space-y-1">
                {suggested.map((s)=>(<li key={s.title} className="text-card-foreground">
                  <div>{s.order}. {s.title} — {s.artist}</div>
                  <div className="text-xs text-muted-foreground ml-4">{s.genre} • {s.category}</div>
                </li>))}
              </ol>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
