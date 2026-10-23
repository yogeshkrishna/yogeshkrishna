import { mkdir, writeFile, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('../assets/', import.meta.url));
const username = 'yogeshkrishna';
const C = { bg:'#0c101b', panel:'#121a2b', line:'#27344b', text:'#f1f5ff', muted:'#9aaac1', cyan:'#62e4e9', violet:'#b19bff', pink:'#ef9fce' };
const esc = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const text = (x,y,t,size=18,color=C.text,more='') => `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" ${more}>${esc(t)}</text>`;
function svg(w,h,body,title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"><title>${esc(title)}</title><defs><linearGradient id="accent"><stop stop-color="${C.cyan}"/><stop offset=".55" stop-color="${C.violet}"/><stop offset="1" stop-color="${C.pink}"/></linearGradient><radialGradient id="glow"><stop stop-color="#3b326b" stop-opacity=".7"/><stop offset="1" stop-color="${C.bg}" stop-opacity="0"/></radialGradient><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#28344d" stroke-opacity=".32"/></pattern></defs><style>text{font-family:Segoe UI,Arial,sans-serif}.mono{font-family:Consolas,monospace}.pulse{animation:pulse 3s ease-in-out infinite}@keyframes pulse{50%{opacity:.3}}@media(prefers-reduced-motion:reduce){*{animation:none!important}}</style><rect x=".5" y=".5" width="${w-1}" height="${h-1}" rx="18" fill="${C.bg}" stroke="${C.line}"/>${body}</svg>`;
}
const label = (x,y,t) => text(x,y,t,13,C.cyan,'letter-spacing="2.5" class="mono"');
const pill = (x,y,t,color=C.cyan,w=null) => {w??=t.length*8+30;return `<rect x="${x}" y="${y}" width="${w}" height="30" rx="15" fill="${color}" fill-opacity=".09" stroke="${color}" stroke-opacity=".35"/>${text(x+15,y+20,t,13,color,'class="mono"')}`;};

function hero() {
  let b=`<rect x="1" y="1" width="1198" height="418" rx="18" fill="url(#grid)"/><ellipse cx="880" cy="190" rx="420" ry="270" fill="url(#glow)"/><path d="M0 417H1200" stroke="url(#accent)" stroke-width="4"/>`;
  b+=label(52,58,'HELLO, WORLD. I\'M');
  b+=text(48,143,'YOGESH',83,C.text,'font-weight="800" letter-spacing="-3"');
  b+=`<text x="48" y="229" fill="url(#accent)" font-size="83" font-weight="800" letter-spacing="-3">KRISHNA</text>`;
  b+=text(54,280,'Building useful things,',25,C.text)+text(54,315,'one idea at a time.',25,C.muted);
  b+=pill(52,354,'CSE @ RVCE',C.cyan,132)+pill(196,354,'BENGALURU, IN',C.violet,157);
  b+=`<g transform="translate(650 70)"><rect width="496" height="278" rx="14" fill="#101725" stroke="#35425d"/><path d="M0 44H496" stroke="#35425d"/><circle cx="23" cy="22" r="5" fill="#ed9bb4"/><circle cx="43" cy="22" r="5" fill="#ead49a"/><circle cx="63" cy="22" r="5" fill="#62e4b2"/>`;
  b+=text(475,27,'yogesh / workspace',12,C.muted,'text-anchor="end" class="mono"');
  b+=text(25,85,'$ whoami',18,C.cyan,'class="mono"');
  b+=text(25,117,'developer. student. always curious.',16,C.text,'class="mono"');
  b+=text(25,159,'$ cat interests.txt',18,C.cyan,'class="mono"');
  b+=text(25,191,'automation / backend / web',16,C.text,'class="mono"');
  b+=text(25,220,'exploring ML + security',16,C.muted,'class="mono"');
  b+=text(25,254,'$ build the next thing',18,C.violet,'class="mono"');
  b+=`<rect class="pulse" x="267" y="237" width="9" height="19" fill="${C.violet}"/></g>`;
  b+=`<path d="M1025 366H1102V389" fill="none" stroke="${C.violet}" stroke-opacity=".6"/><circle cx="1102" cy="389" r="4" fill="${C.violet}"/><circle class="pulse" cx="1170" cy="50" r="4" fill="${C.cyan}"/>`;
  return svg(1200,420,b,'Yogesh Krishna — developer, student, always curious');
}

function project(n,title,sub,kind,color) {
  let b=`<rect x="1" y="1" width="558" height="168" rx="18" fill="url(#grid)"/><path d="M1 169H559" stroke="${color}" stroke-width="2"/>`;
  b+=text(25,34,`${n} / ${kind}`,12,color,'class="mono" letter-spacing="1.5"');
  b+=text(24,87,title,36,C.text,'font-weight="750" letter-spacing="-1"');
  b+=text(26,120,sub,16,C.muted);
  const icon = kind==='AUTOMATION' ? '<path d="M463 66L479 79L463 92M486 96H510"/>' : kind==='BACKEND' ? '<rect x="457" y="57" width="58" height="21" rx="5"/><rect x="457" y="86" width="58" height="21" rx="5"/><path d="M465 67H469M465 96H469"/>' : kind==='WORKBENCH' ? '<path d="M457 105V70M477 105V84M497 105V55M517 105V64M448 111H525"/>' : '<path d="M459 72C451 70 447 77 446 91L444 103C443 112 449 113 455 105L464 99H496L505 106C512 114 518 110 516 101L514 86C512 75 508 70 500 72ZM454 87H468M461 80V94M499 84V85M506 91V92"/>';
  b+=`<g fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity=".7">${icon}</g>`;
  return svg(560,170,b,`${title}: ${sub}`);
}

function toolbox() {
  let b=label(34,37,'TOOLS I REACH FOR');
  const rows=[['LANGUAGES',['Python','C','JavaScript','TypeScript','SQL','HTML / CSS'],C.cyan],['WEB',['Node.js','Express','React','Next.js','Canvas'],C.violet],['DATA + TOOLS',['PostgreSQL','Redis','SQLite','Prisma','Selenium','Git'],C.pink]];
  rows.forEach(([name,items,color],i)=>{let x=220,y=63+i*57;b+=text(34,y+21,name,12,C.muted,'letter-spacing="1.3" class="mono"');items.forEach(t=>{const w=t.length*8+30;b+=pill(x,y,t,color,w);x+=w+9;});});
  return svg(1200,247,b,'Languages, web frameworks, databases, and development tools used in my projects');
}

async function get(url,isJson=true) {
  const headers={'User-Agent':'yogeshkrishna-profile','Accept':isJson?'application/vnd.github+json':'text/html'};
  if(process.env.GH_TOKEN && url.startsWith('https://api.github.com/')) headers.Authorization=`Bearer ${process.env.GH_TOKEN}`;
  const r=await fetch(url,{headers,signal:AbortSignal.timeout(25000)});
  if(!r.ok) throw new Error(`${new URL(url).pathname}: HTTP ${r.status}`);
  return isJson?r.json():r.text();
}
function contributionDays(html) {
  const tips=new Map([...html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)].map(m=>[m[1].match(/\bfor="([^"]+)"/)?.[1],m[2].replace(/<[^>]*>/g,'').trim()]));
  const days=[];
  for(const m of html.matchAll(/<td\b[^>]*data-date="\d{4}-\d{2}-\d{2}"[^>]*>/g)) {
    const date=m[0].match(/data-date="([^"]+)"/)?.[1],id=m[0].match(/\bid="([^"]+)"/)?.[1],level=Number(m[0].match(/data-level="(\d)"/)?.[1]);
    const tip=tips.get(id),match=tip?.match(/^(No|[\d,]+) contributions? on /);
    if(!match || !Number.isInteger(level)) throw new Error('GitHub contribution markup changed; retaining previous cards.');
    days.push({date,level,count:match[1]==='No'?0:Number(match[1].replaceAll(',',''))});
  }
  days.sort((a,b)=>a.date.localeCompare(b.date));
  if(days.length<350 || new Set(days.map(d=>d.date)).size!==days.length) throw new Error('Incomplete contribution calendar.');
  return days;
}

function activity(user,repos,days) {
  const total=days.reduce((a,d)=>a+d.count,0),stars=repos.reduce((a,r)=>a+r.stargazers_count,0);
  let b=label(35,37,'PUBLIC GITHUB / THE LAST YEAR');
  [[repos.length,'PUBLIC REPOS'],[stars,'REPO STARS'],[user.followers,'FOLLOWERS'],[total,'CONTRIBUTIONS']].forEach(([v,t],i)=>{
    const x=36+i*290;b+=text(x,88,Number(v).toLocaleString('en-US'),38,i%2?C.violet:C.cyan,'font-weight="750"');b+=text(x,112,t,11,C.muted,'letter-spacing="1.4" class="mono"');
  });
  b+='<path d="M35 135H1165" stroke="#27344b"/>';
  const start=new Date(days[0].date+'T00:00:00Z'),colors=['#1a2437','#284e62','#357e8d','#51b8bf','#85f1e2'];
  const positions=days.map(d=>{const dt=new Date(d.date+'T00:00:00Z');return {...d,x:35+Math.floor((dt-start)/86400000/7)*20.4,y:160+dt.getUTCDay()*19};});
  for(const d of positions) b+=`<rect x="${d.x}" y="${d.y}" width="15" height="14" rx="3" fill="${colors[d.level]}"><title>${d.date}: ${d.count} contributions</title></rect>`;
  b+=text(35,326,`${days[0].date} — ${days.at(-1).date}`,12,C.muted,'class="mono"');
  b+=text(1015,326,'Less',11,C.muted,'text-anchor="end"');
  colors.forEach((color,i)=>{b+=`<rect x="${1026+i*20}" y="315" width="14" height="13" rx="3" fill="${color}"/>`;});
  b+=text(1163,326,'More',11,C.muted,'text-anchor="end"');
  // A subtle animated perimeter marks the live-data card without distorting counts.
  b+=`<rect x="1" y="1" width="1198" height="349" rx="18" fill="none" stroke="${C.cyan}" stroke-opacity=".22" class="pulse"/>`;
  return svg(1200,351,b,`${repos.length} public repositories, ${stars} repository stars, ${user.followers} followers, ${total} contributions in the displayed calendar`);
}

function languages(totals) {
  const data=Object.entries(totals).filter(([,n])=>n>0).sort((a,b)=>b[1]-a[1]);
  const sum=data.reduce((a,[,n])=>a+n,0);
  if(!sum) throw new Error('No language bytes returned.');
  const top=data.slice(0,6);if(data.length>6)top.push(['Other',data.slice(6).reduce((a,[,n])=>a+n,0)]);
  const colors=[C.cyan,C.violet,C.pink,'#9bd89f','#e6cc8a','#85b0e8','#697a94'];
  let b=label(35,37,'LANGUAGES IN MY REPOSITORIES')+text(35,65,'Code bytes across public, non-fork, non-archived repositories',14,C.muted);
  let x=35;top.forEach(([name,n],i)=>{const width=n/sum*1130;b+=`<rect x="${x}" y="88" width="${width}" height="13" fill="${colors[i]}"><title>${esc(name)}: ${(n/sum*100).toFixed(1)}%</title></rect>`;x+=width;});
  top.forEach(([name,n],i)=>{const px=35+(i%4)*286,py=140+Math.floor(i/4)*34;b+=`<circle cx="${px+5}" cy="${py-5}" r="5" fill="${colors[i]}"/>`+text(px+19,py,`${name} · ${(n/sum*100).toFixed(1)}%`,14,C.text);});
  return svg(1200,204,b,'Repository language distribution by code bytes; not a measure of proficiency');
}

async function main() {
  // Fetch and validate everything before replacing any card.
  const [user,calendar]=await Promise.all([get(`https://api.github.com/users/${username}`),get(`https://github.com/users/${username}/contributions`,false)]);
  const repos=[];for(let page=1;;page++){const batch=await get(`https://api.github.com/users/${username}/repos?per_page=100&type=owner&page=${page}`);if(!Array.isArray(batch))throw new Error('Invalid repository data.');repos.push(...batch);if(batch.length<100)break;}
  if(user.login?.toLowerCase()!==username || !Number.isInteger(user.followers))throw new Error('Invalid user data.');
  const publicRepos=repos.filter(r=>!r.private && r.owner.login.toLowerCase()===username);
  const totals={};const eligible=publicRepos.filter(r=>!r.fork&&!r.archived);
  // Limit request concurrency to stay friendly to the public API.
  for(let i=0;i<eligible.length;i+=3){const batch=await Promise.all(eligible.slice(i,i+3).map(r=>get(r.languages_url)));for(const langs of batch)for(const [name,n] of Object.entries(langs)){if(typeof n!=='number'||n<0)throw new Error('Invalid language data.');totals[name]=(totals[name]||0)+n;}}
  const days=contributionDays(calendar);
  const button=(t,w)=>svg(w,34,`<rect x="1" y="1" width="${w-2}" height="32" rx="10" fill="#172439"/>${text(w/2,23,t,13,C.cyan,'text-anchor="middle" font-weight="600"')}`,t);
  const assets={
    'hero.svg':hero(),
    'project-gformbot.svg':project('01','gformbot','Forms, from your terminal.','AUTOMATION',C.cyan),
    'project-techfest.svg':project('02','Techfest API','Behind the registration desk.','BACKEND',C.violet),
    'project-railguard.svg':project('03','Railguard','Decisions with a paper trail.','WORKBENCH',C.pink),
    'project-cyberhack.svg':project('04','CYBER HACK','Grapple. Hack. Escape.','BROWSER GAME','#a2dfac'),
    'toolbox.svg':toolbox(),
    'button-projects.svg':button('EXPLORE PROJECTS ↗',190),
    'button-email.svg':button('GET IN TOUCH ↗',167),
    'activity.svg':activity(user,publicRepos,days),
    'languages.svg':languages(totals),
    'footer.svg':svg(1200,132,`<path d="M0 1H1200" stroke="url(#accent)" stroke-width="3"/>${text(600,61,'KEEP LEARNING. KEEP BUILDING.',24,C.text,'text-anchor="middle" font-weight="700" letter-spacing="2"')}${text(600,94,'yogeshkrishna / see you in the next commit',14,C.muted,'text-anchor="middle" class="mono"')}`,'Keep learning. Keep building.'),
  };
  await mkdir(out,{recursive:true});
  for(const [name,content] of Object.entries(assets)){await writeFile(out+name+'.tmp',content);await rename(out+name+'.tmp',out+name);}
  console.log(`Generated ${Object.keys(assets).length} SVG assets from ${publicRepos.length} public repositories and ${days.length} contribution days.`);
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
