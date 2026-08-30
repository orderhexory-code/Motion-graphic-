# Beyond Minds — Motion Video Engine

Remotion-based motion graphics pipeline, phone-only workflow ke liye bana hai. Do outputs milte hain:

1. **Live web preview** (GitHub Pages) — koi video file download nahi, browser me hi scrub/play karo. Isi se apna kaam check karo — data bahut kam lagega.
2. **Final MP4 render** (GitHub Actions artifact) — sirf jab video final ho jaaye aur upload karna ho, tab download karo.

## ⭐ Current composition: StopHuntHook

Abhi jo primary video bana hai wo `src/hook/StopHuntHook.tsx` — 30-second premium proof-of-concept: real animated candlestick chart, glass-UI order tickets, screen shake + particle burst on the stop-hunt moment, glitch typography, film grain, synced sound design. Chart ka data `src/hook/chartData.ts` me hai.

Purana 72-scene full script system (`src/data/script.ts` + `src/scenes/`) bhi maujood hai — `MainVideo` composition ke through, agar baad me poora video isi tarah banana ho.

## Live preview kaise dekhein (ZERO video download)

### One-time setup (sirf pehli baar)
1. Repo ke **Settings → Pages** me jao
2. **Source** ko **"GitHub Actions"** pe set karo (dropdown se)

### Har baar jab edit karo
1. Code push karo GitHub pe
2. **Actions** tab → **"Deploy Web Preview"** workflow apne aap trigger ho jaayega (ya manually "Run workflow" dabao)
3. 1-2 min baad, repo ke **Settings → Pages** pe apna live URL milega: `https://tumhara-username.github.io/repo-name/`
4. Us URL ko bookmark kar lo — ab jab bhi edit karke push karoge, wahi URL automatically update ho jaayega. Sirf refresh karna hai, phir se download/setup nahi karna.

Ye ek **interactive player** hai — play/pause/scrub sab kar sakte ho, aur ye actual video file nahi hai, live animation code chal raha hai browser me. Isliye data usage bahut kam (ek dafa fonts+audio load hote hain, phir sab local).

## Final video download karni ho (jab happy ho jaao)

1. **Actions** tab → **"Render Motion Video"** workflow → **Run workflow**
2. 15-35 min lagega (720p/1080p premium graphics render karne me time lagta hai — normal hai)
3. Complete hone pe, us run ke page pe **Artifacts** section me `rendered-video` milega — MP4 download karo

## Naya scene/story banana ho

`StopHuntHook.tsx` ke pattern ko follow karke naya "hook" bana sakte ho `src/hook/` me, ya `src/data/script.ts` wale generic system se simple version bana sakte ho. Bata dena, main bana dunga.

## Video specs

- Resolution: 1920x1080 (16:9)
- FPS: 30
- Font: Kalam (hand-drawn look), Inter (bold premium look)
- Accent color: `#FF5A36` (Beyond Minds orange)

## Premium visual layer (StopHuntHook)

- **Real animated candlestick chart** — data-driven, hardcoded narrative price action (`src/hook/chartData.ts` + `CandlestickChart.tsx`)
- **Glass-UI order tickets** — LONG ENTRY / STOP LOSS panels, glassmorphism style (`GlassPanel.tsx`)
- **Screen shake + particle burst + flash** synced exactly to the moment price wicks through the stop-loss line (`ScreenShake.tsx`, `ParticleBurst.tsx`)
- **Glitch/RGB-split typography** for emphasis beats (`GlitchText.tsx`)
- **Film grain overlay** for cinematic texture (`FilmGrain.tsx`)
- **Animated background** — moving grid + floating particles (`src/components/AnimatedBackground.tsx`)

## Sound design

Sound effects `public/audio/` me hain — sab **synthesized**, koi copyright issue nahi:

| File | Kahan use hota hai |
|---|---|
| `whoosh.wav` | Scene transitions / camera pushes |
| `click.wav` | Text reveal pop |
| `chime.wav` | Quote emphasis |
| `marker.wav` | Whiteboard underline draw (legacy scenes) |
| `impact.wav` | Stop-loss hit moment — the big thump |
| `drone.wav` | Background ambient hum (loop, bahut low volume) |

Better SFX chahiye ho to `public/audio/` me same naam se replace kar do — koi code change nahi karna padega.

## Troubleshooting

- **Preview me audio nahi baj raha:** GitHub Pages subpath ka issue ho sakta hai — `preview/src/main.tsx` me `remotion_staticBase` line check karo. Visuals fully kaam karenge, sirf audio ka fallback edge-case hai.
- **Render 60 min se zyada le raha:** `render.yml` me `timeout-minutes` badha do.
- **Naya npm package version error (ETARGET):** `package.json` me hamesha `"latest"` use karo pinned version ki jagah.
