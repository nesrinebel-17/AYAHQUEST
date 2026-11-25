/* AYAHQUEST – English / Arabic */

const SEN = ["Al-Fatiha","Al-Baqarah","Aal-Imran","An-Nisa","Al-Maidah","Al-Anam","Al-Araf","Al-Anfal","At-Tawbah","Yunus","Hud","Yusuf","Ar-Rad","Ibrahim","Al-Hijr","An-Nahl","Al-Isra","Al-Kahf","Maryam","Ta-Ha","Al-Anbiya","Al-Hajj","Al-Muminun","An-Nur","Al-Furqan","Ash-Shuara","An-Naml","Al-Qasas","Al-Ankabut","Ar-Rum","Luqman","As-Sajdah","Al-Ahzab","Saba","Fatir","Ya-Sin","As-Saffat","Sad","Az-Zumar","Ghafir","Fussilat","Ash-Shura","Az-Zukhruf","Ad-Dukhan","Al-Jathiyah","Al-Ahqaf","Muhammad","Al-Fath","Al-Hujurat","Qaf","Adh-Dhariyat","At-Tur","An-Najm","Al-Qamar","Ar-Rahman","Al-Waqiah","Al-Hadid","Al-Mujadila","Al-Hashr","Al-Mumtahanah","As-Saff","Al-Jumuah","Al-Munafiqun","At-Taghabun","At-Talaq","At-Tahrim","Al-Mulk","Al-Qalam","Al-Haqqah","Al-Maarij","Nuh","Al-Jinn","Al-Muzzammil","Al-Muddaththir","Al-Qiyamah","Al-Insan","Al-Mursalat","An-Naba","An-Naziat","Abasa","At-Takwir","Al-Infitar","Al-Mutaffifin","Al-Inshiqaq","Al-Buruj","At-Tariq","Al-Ala","Al-Ghashiyah","Al-Fajr","Al-Balad","Ash-Shams","Al-Layl","Ad-Duha","Ash-Sharh","At-Tin","Al-Alaq","Al-Qadr","Al-Bayyinah","Az-Zalzalah","Al-Adiyat","Al-Qariah","At-Takathur","Al-Asr","Al-Humazah","Al-Fil","Quraysh","Al-Maun","Al-Kawthar","Al-Kafirun","An-Nasr","Al-Masad","Al-Ikhlas","Al-Falaq","An-Nas"];
const SAR = ["الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة","يونس","هود","يوسف","الرعد","إبراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه","الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم","لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر","فصلت","الشورى","الزخرف","الدخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق","الذاريات","الطور","النجم","القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة","الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم","الملك","القلم","الحاقة","المعارج","نوح","الجن","المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ","النازعات","عبس","التكوير","الانفطار","المطففين","الانشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد","الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات","القارعة","التكاثر","العصر","الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر","المسد","الإخلاص","الفلق","الناس"];
const NUMS = SEN.map((_, i) => i + 1);
const API_BASE = "https://ummahapi.com/api";
let API_SURAH_LIST = [];
/* ---------- language helpers ---------- */
const KEY = "ayahquest-v2";
const DEF = {points:0, rounds:0, streak:0, last:"", best:0, perfect:0, wins:0, dailyCount:0, daily:null, badges:[], seen:[], missed:[], bestTimed:0, reviewed:0, orders:0, lang:""};
const fresh = () => ({...DEF, badges:[], seen:[], missed:[]});
let st = fresh();
try { const r = localStorage.getItem(KEY); if (r) st = {...fresh(), ...JSON.parse(r)}; } catch (e) {}
st.seen = st.seen.map(x => typeof x === "string" ? SEN.indexOf(x) + 1 : x).filter(x => x > 0);
st.missed = st.missed.filter(m => m && typeof m.q === "object");
if (!st.lang) st.lang = (navigator.language || "").toLowerCase().startsWith("ar") ? "ar" : "en";
const L = () => st.lang;
const AD = "٠١٢٣٤٥٦٧٨٩";
const D = s => String(s).replace(/\d/g, d => AD[d]);
const fmt = n => L() === "ar" ? D(n) : String(n);
const sn = i => (L() === "ar" ? SAR : SEN)[i-1];
const sn2 = i => (L() === "ar" ? SEN : SAR)[i-1];
const num = n => ({en:String(n), ar:D(n)});
const optLabel = o => typeof o === "number" ? sn(o) : o[L()];
const optKey = o => typeof o === "number" ? "s" + o : o.en;

/* ---------- translations ---------- */
const I18N = {
en: {
  docTitle:"AYAHQUEST | Explore. Discover. Learn.",
  navHome:"Home", navChallenges:"Challenges", navLibrary:"Library", navProgress:"My Progress", navStart:"Start Exploring ↗",
  heroTitle:"Discover the Quran.<br><span>One verse at a time.</span>",
  heroP:"Explore the beauty of the Holy Quran through interactive challenges, quizzes and exciting discoveries.",
  heroBtn1:"Start Your Journey →", heroBtn2:"Explore Library", statSurahs:"Surahs", statDisc:"Discoveries", statJourney:"Journey", bookSub:"EXPLORE THE HOLY QURAN",
  chTag:"THE LEARNING EXPERIENCE", chTitle:"Choose your <span>challenge</span>", chSub:"Every round is different: questions are drawn at random.",
  cGo:"Start challenge →",
  c1Tag:"01 / VERSE HUNT", c1T:"Find the Verse", c1P:"Use the clues to identify the correct Surah.",
  c2Tag:"02 / WORD PUZZLE", c2T:"Mystery Word", c2P:"Guess the hidden word letter by letter.",
  c3Tag:"03 / SURAH QUEST", c3T:"Surah Explorer", c3P:"Test your knowledge of the chapters of the Quran.",
  c4Tag:"04 / REVIEW", c4T:"Review mode", c4P:"Replay the questions you missed until you master them.",
  c5Tag:"05 / SPEED", c5T:"60 seconds", c5P:"Answer as many questions as you can before time runs out.",
  c6Tag:"06 / ORDER", c6T:"Order the Surahs", c6P:"Put four Surahs in the order they appear in the Quran.",
  libTag:"A WORLD OF KNOWLEDGE", libTitle:"The Quran <span>Library</span>", libSub:"Your space to explore and learn.",
  progTag:"YOUR PERSONAL JOURNEY", progTitle:"Your <span>Progress</span>", progSub:"Every challenge is a step forward.",
  pcPoints:"Total Points", pcLevel:"Learning Level", pcRounds:"Rounds Completed", pcStreak:"Day Streak",
  badgesTitle:"Badges", share:"Share my score", reset:"Reset progress", resetConfirm:"Click again to confirm",
  footP:"Explore. Discover. Learn.", footSmall:"A journey of knowledge through the Holy Quran.",
  langBtn:"عربي",
  greetM:"GOOD MORNING", greetA:"GOOD AFTERNOON", greetE:"GOOD EVENING",
  greet:(g,s)=>`✦ ${g}, EXPLORER` + (s ? ` · ${s}-DAY STREAK` : ""),
  lvlText:n=>`${n} points to the next level`,
  pctSurahs:"Surahs discovered", pctBadges:"Badges unlocked",
  panelEyebrow:"AYAHQUEST / ACTIVE CHALLENGE", back:"← Back to challenges",
  verseT:"Find the Verse", verseD:"Read the clue and choose the correct Surah.",
  knowT:"Surah Explorer", knowD:"Test your knowledge of the Quran.",
  reviewT:"Review mode", reviewD:"Replay the questions you missed.",
  wordT:"Mystery Word", wordD:"Guess the hidden word letter by letter. You have 6 lives.",
  timedT:"60 seconds", timedD:"Answer as many questions as you can before time runs out.",
  orderT:"Order the Surahs", orderD:"Tap the Surahs in the order they appear in the Quran, from first to last.",
  lblVerse:"MYSTERY CLUE", lblKnow:"SURAH QUEST", lblReview:"REVIEW",
  qOf:(l,i,n)=>`${l} · QUESTION ${i} / ${n}`,
  ok10:"✦ Correct! +10 points", ko:a=>`Not quite. The answer is ${a}.`,
  next:"Next question →", results:"See results", roundDone:"Round complete!", earned:n=>`+${n} points earned`, again:"Play again ↻",
  emptyT:"Nothing to review yet", emptyP:"You haven’t missed any question. Play a round first.",
  clue:"CLUE", wordOk:(w,p)=>`✦ Excellent! It is ${w}. +${p} points`, wordKo:w=>`Out of lives. The word was ${w}.`, another:"Another word ↻", anotherOne:"Another one ↻", letter:"Letter",
  tm:(s,c)=>`⏱ ${s}s · ${c} correct`, plus5:"✦ +5 points", wasAns:a=>`The answer was ${a}`, timeUp:"Time’s up!", timedRes:(s,b)=>`${s} correct answers · your best: ${b}`,
  notThat:"Not that one. Try another.", orderOk:p=>`✦ Perfect order! +${p} points`, orderBtn:(k,n,i)=>`${k}. ${n} (Surah ${i})`,
  libT:"Explore the 114 Surahs", libSearch:"Search by name or number…", fAll:"All Surahs", fNew:"Not explored yet", fSeen:"Explored", rnd:"🎲 Random Surah",
  cnt:(n,s,t,p)=>`${n} Surah${n===1?"":"s"} shown · ${s} / ${t} explored (${p}%) · tap a Surah to mark it as explored`,
  noSurah:"No Surah found.", discover:n=>`Discover: ${n}`,
  dailyTag:"☀ DAILY CHALLENGE · +20 POINTS", dailyDoneTag:"☀ DAILY CHALLENGE · COMPLETED", dailyOne:"One attempt per day.",
  dailyOk:"✦ Correct! +20 points. A new question arrives tomorrow.", dailyKo:a=>`Not quite. The answer was ${a}. A new question arrives tomorrow.`,
  badgeToast:(i,n,m)=>`${i} Badge unlocked: ${n}` + (m ? ` (+${m} more)` : ""),
  shareTxt:(p,s,t)=>`I have ${p} points and ${s}/${t} Surahs discovered on AYAHQUEST!`, copied:"Score copied to clipboard"
},
ar: {
  docTitle:"آية كويست | استكشف. اكتشف. تعلّم.",
  navHome:"الرئيسية", navChallenges:"التحديات", navLibrary:"المكتبة", navProgress:"تقدّمي", navStart:"ابدأ الاستكشاف ↖",
  heroTitle:"اكتشف القرآن الكريم.<br><span>آيةً بعد آية.</span>",
  heroP:"استكشف جمال القرآن الكريم عبر تحديات تفاعلية واختبارات واكتشافات ممتعة.",
  heroBtn1:"ابدأ رحلتك ←", heroBtn2:"تصفّح المكتبة", statSurahs:"سورة", statDisc:"اكتشافات", statJourney:"رحلة", bookSub:"استكشف القرآن الكريم",
  chTag:"تجربة التعلّم", chTitle:"اختر <span>تحدّيك</span>", chSub:"كل جولة مختلفة: الأسئلة تُختار عشوائيًا.",
  cGo:"ابدأ التحدي ←",
  c1Tag:"٠١ / البحث عن السورة", c1T:"اعرف السورة", c1P:"استعن بالتلميحات لتعرف السورة الصحيحة.",
  c2Tag:"٠٢ / لغز الكلمات", c2T:"الكلمة الغامضة", c2P:"خمّن الكلمة المخفية حرفًا حرفًا.",
  c3Tag:"٠٣ / رحلة السور", c3T:"مستكشف السور", c3P:"اختبر معرفتك بسور القرآن الكريم.",
  c4Tag:"٠٤ / المراجعة", c4T:"وضع المراجعة", c4P:"أعد الأسئلة التي أخطأت فيها حتى تتقنها.",
  c5Tag:"٠٥ / السرعة", c5T:"٦٠ ثانية", c5P:"أجب عن أكبر عدد من الأسئلة قبل انتهاء الوقت.",
  c6Tag:"٠٦ / الترتيب", c6T:"رتّب السور", c6P:"رتّب أربع سور كما وردت في المصحف.",
  libTag:"عالم من المعرفة", libTitle:"<span>مكتبة</span> القرآن", libSub:"مساحتك للاستكشاف والتعلّم.",
  progTag:"رحلتك الشخصية", progTitle:"<span>تقدّمك</span>", progSub:"كل تحدٍّ خطوة إلى الأمام.",
  pcPoints:"مجموع النقاط", pcLevel:"مستوى التعلّم", pcRounds:"الجولات المكتملة", pcStreak:"أيام متتالية",
  badgesTitle:"الأوسمة", share:"شارك نتيجتي", reset:"إعادة تعيين التقدّم", resetConfirm:"اضغط مرة أخرى للتأكيد",
  footP:"استكشف. اكتشف. تعلّم.", footSmall:"رحلة معرفية مع القرآن الكريم.",
  langBtn:"English",
  greetM:"صباح الخير", greetA:"نهارك سعيد", greetE:"مساء الخير",
  greet:(g,s)=>`✦ ${g}` + (s ? ` · سلسلة ${fmt(s)} أيام` : ""),
  lvlText:n=>`${fmt(n)} نقطة للوصول إلى المستوى التالي`,
  pctSurahs:"سور مكتشفة", pctBadges:"أوسمة مفتوحة",
  panelEyebrow:"تحدٍّ جارٍ", back:"→ العودة إلى التحديات",
  verseT:"اعرف السورة", verseD:"اقرأ التلميح واختر السورة الصحيحة.",
  knowT:"مستكشف السور", knowD:"اختبر معرفتك بالقرآن الكريم.",
  reviewT:"وضع المراجعة", reviewD:"أعد الأسئلة التي أخطأت فيها.",
  wordT:"الكلمة الغامضة", wordD:"خمّن الكلمة المخفية حرفًا حرفًا. لديك ٦ محاولات.",
  timedT:"٦٠ ثانية", timedD:"أجب عن أكبر عدد من الأسئلة قبل انتهاء الوقت.",
  orderT:"رتّب السور", orderD:"اضغط على السور بحسب ترتيبها في المصحف، من الأولى إلى الأخيرة.",
  lblVerse:"تلميح", lblKnow:"رحلة السور", lblReview:"مراجعة",
  qOf:(l,i,n)=>`${l} · السؤال ${fmt(i)} من ${fmt(n)}`,
  ok10:"✦ أحسنت! +١٠ نقاط", ko:a=>`ليست صحيحة. الإجابة هي ${a}.`,
  next:"السؤال التالي ←", results:"عرض النتيجة", roundDone:"انتهت الجولة!", earned:n=>`كسبت ${fmt(n)} نقطة`, again:"العب مجددًا ↻",
  emptyT:"لا شيء للمراجعة بعد", emptyP:"لم تُخطئ في أي سؤال. العب جولة أولًا.",
  clue:"تلميح", wordOk:(w,p)=>`✦ أحسنت! الكلمة هي ${w}. +${fmt(p)} نقطة`, wordKo:w=>`انتهت محاولاتك. الكلمة هي ${w}.`, another:"كلمة أخرى ↻", anotherOne:"واحدة أخرى ↻", letter:"حرف",
  tm:(s,c)=>`⏱ ${fmt(s)}ث · ${fmt(c)} صحيحة`, plus5:"✦ +٥ نقاط", wasAns:a=>`الإجابة كانت ${a}`, timeUp:"انتهى الوقت!", timedRes:(s,b)=>`${fmt(s)} إجابات صحيحة · أفضل نتيجة لك: ${fmt(b)}`,
  notThat:"ليست هذه. جرّب أخرى.", orderOk:p=>`✦ ترتيب صحيح! +${fmt(p)} نقطة`, orderBtn:(k,n,i)=>`${fmt(k)}. ${n} (السورة ${fmt(i)})`,
  libT:"استكشف السور الـ١١٤", libSearch:"ابحث بالاسم أو الرقم…", fAll:"كل السور", fNew:"لم تُستكشف بعد", fSeen:"تم استكشافها", rnd:"🎲 سورة عشوائية",
  cnt:(n,s,t,p)=>`${fmt(n)} سورة معروضة · ${fmt(s)} / ${fmt(t)} مستكشفة (${fmt(p)}٪) · اضغط على سورة لتعليمها كمستكشفة`,
  noSurah:"لم يُعثر على سورة.", discover:n=>`اكتشف: ${n}`,
  dailyTag:"☀ تحدّي اليوم · +٢٠ نقطة", dailyDoneTag:"☀ تحدّي اليوم · اكتمل", dailyOne:"محاولة واحدة في اليوم.",
  dailyOk:"✦ أحسنت! +٢٠ نقطة. سؤال جديد غدًا.", dailyKo:a=>`ليست صحيحة. الإجابة كانت ${a}. سؤال جديد غدًا.`,
  badgeToast:(i,n,m)=>`${i} وسام جديد: ${n}` + (m ? ` (+${fmt(m)} أخرى)` : ""),
  shareTxt:(p,s,t)=>`لديّ ${fmt(p)} نقطة واكتشفت ${fmt(s)}/${fmt(t)} سورة في آية كويست!`, copied:"تم نسخ نتيجتك"
}};
function tr(k, ...a){ const v = I18N[L()][k] ?? I18N.en[k]; return typeof v === "function" ? v(...a) : v; }

/* ---------- question banks ---------- */
const VERSE_BANK = [
  {q:{en:"Which Surah is recited in every unit (rakah) of Salah?", ar:"أي سورة تُقرأ في كل ركعة من ركعات الصلاة؟"}, a:1},
  {q:{en:"Which is the longest Surah of the Quran?", ar:"ما أطول سورة في القرآن الكريم؟"}, a:2},
  {q:{en:"Which is the shortest Surah of the Quran?", ar:"ما أقصر سورة في القرآن الكريم؟"}, a:108},
  {q:{en:"Which Surah is the only one that does not begin with the Bismillah?", ar:"ما السورة الوحيدة التي لا تبدأ بالبسملة؟"}, a:9},
  {q:{en:"Which Surah tells the story of Prophet Yusuf?", ar:"أي سورة تروي قصة النبي يوسف عليه السلام؟"}, a:12},
  {q:{en:"Which Surah tells the story of the People of the Cave?", ar:"أي سورة تروي قصة أصحاب الكهف؟"}, a:18},
  {q:{en:"Which Surah is named after Maryam (Mary)?", ar:"أي سورة سُمّيت باسم مريم عليها السلام؟"}, a:19},
  {q:{en:"Which Surah is named after the Elephant?", ar:"أي سورة سُمّيت باسم الفيل؟"}, a:105},
  {q:{en:"Which Surah is known for the refrain “Which of the favours of your Lord will you deny?”", ar:"أي سورة تتكرر فيها الآية «فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ»؟"}, a:55},
  {q:{en:"Which Surah is named after Friday?", ar:"أي سورة سُمّيت باسم يوم الجمعة؟"}, a:62},
  {q:{en:"Which Surah is named after the Ant?", ar:"أي سورة سُمّيت باسم النمل؟"}, a:27},
  {q:{en:"Which Surah is named after the Bee?", ar:"أي سورة سُمّيت باسم النحل؟"}, a:16},
  {q:{en:"Which Surah is named after Prophet Nuh (Noah)?", ar:"أي سورة سُمّيت باسم نبي الله نوح عليه السلام؟"}, a:71},
  {q:{en:"Which Surah is named after Luqman, the wise man?", ar:"أي سورة سُمّيت باسم الرجل الحكيم لقمان؟"}, a:31}
];
const KNOW_BANK = [
  {q:{en:"How many Surahs are there in the Holy Quran?", ar:"كم عدد سور القرآن الكريم؟"}, a:num(114), o:[num(114),num(100),num(120)]},
  {q:{en:"Which is the first Surah of the Quran?", ar:"ما أول سورة في القرآن الكريم؟"}, a:1, o:[1,2,112]},
  {q:{en:"Which is the last Surah of the Quran?", ar:"ما آخر سورة في القرآن الكريم؟"}, a:114, o:[114,113,112]},
  {q:{en:"How many verses does Surah Al-Fatiha have?", ar:"كم عدد آيات سورة الفاتحة؟"}, a:num(7), o:[num(7),num(5),num(10)]},
  {q:{en:"How many verses does Surah Al-Baqarah have?", ar:"كم عدد آيات سورة البقرة؟"}, a:num(286), o:[num(286),num(200),num(114)]},
  {q:{en:"How many verses does Surah Al-Ikhlas have?", ar:"كم عدد آيات سورة الإخلاص؟"}, a:num(4), o:[num(4),num(3),num(6)]},
  {q:{en:"Which Surah’s name means “The Cave”?", ar:"أي سورة سُمّيت باسم الكهف الذي لجأ إليه الفتية؟"}, a:18, o:[18,105,22]},
  {q:{en:"Which Surah’s name means “The Cow”?", ar:"أي سورة سُمّيت باسم بقرة بني إسرائيل؟"}, a:2, o:[2,16,27]},
  {q:{en:"Which Surah is said in a hadith to equal a third of the Quran?", ar:"أي سورة ورد في الحديث الشريف أنها تعدل ثلث القرآن؟"}, a:112, o:[112,113,103]},
  {q:{en:"Which holy book was revealed to Prophet Muhammad ﷺ?", ar:"ما الكتاب الذي أُنزل على النبي محمد ﷺ؟"}, a:{en:"Quran",ar:"القرآن"}, o:[{en:"Quran",ar:"القرآن"},{en:"Tawrat",ar:"التوراة"},{en:"Injil",ar:"الإنجيل"}]}
];
[1,12,18,19,36,55,67,112].forEach(n => KNOW_BANK.push({q:{en:`Which Surah is number ${n} in the Quran?`, ar:`ما اسم السورة رقم ${D(n)} في القرآن الكريم؟`}, a:n}));

const WORDS = {
  en:[["RAMADAN","The blessed month in which the Quran began to be revealed."],["ZAKAT","The obligatory charity, one of the five pillars of Islam."],["KAABA","The cube-shaped house in Mecca that Muslims face in prayer."],["SALAH","The prayer performed five times a day."],["HAJJ","The pilgrimage to Mecca, a pillar of Islam."],["WUDU","The ablution performed before prayer."],["SUJUD","The act of prostration in prayer."],["SAWM","The Arabic word for fasting."]],
  ar:[["رمضان","الشهر الذي بدأ فيه نزول القرآن الكريم."],["زكاة","الصدقة الواجبة، وهي ركن من أركان الإسلام."],["كعبة","البيت المشرّف في مكة المكرمة الذي يتجه إليه المسلمون في صلاتهم."],["صلاة","العبادة التي يؤديها المسلم خمس مرات في اليوم."],["حج","زيارة مكة المكرمة لأداء المناسك، وهو ركن من أركان الإسلام."],["وضوء","الطهارة التي يؤديها المسلم قبل الصلاة."],["سجود","وضع الجبهة على الأرض في الصلاة."],["صوم","الامتناع عن الطعام والشراب من الفجر إلى المغرب."]]
};
const LETTERS = {en:"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), ar:"ابتثجحخدذرزسشصضطظعغفقكلمنهويةءى".split("")};

/* ---------- storage / progress ---------- */
function save(){ try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
const day = d => d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
function touchStreak(){
  const today = day(new Date()), y = new Date(); y.setDate(y.getDate()-1);
  if (st.last === today) return;
  st.streak = st.last === day(y) ? st.streak + 1 : 1;
  st.best = Math.max(st.best, st.streak);
  st.last = today; save(); render();
}
const $ = id => document.getElementById(id);
const shuffle = a => { a = a.slice(); for (let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const pick = (a,n) => shuffle(a).slice(0,n);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function markSeen(a){ if (typeof a === "number" && !st.seen.includes(a)) st.seen.push(a); }

const BADGES = [
  {id:"first", icon:"🌱", test:s=>s.rounds>=1, en:["First steps","Complete your first round"], ar:["الخطوات الأولى","أكمل جولتك الأولى"]},
  {id:"p100", icon:"⭐", test:s=>s.points>=100, en:["Century","Earn 100 points"], ar:["المئة","اكسب ١٠٠ نقطة"]},
  {id:"p500", icon:"📚", test:s=>s.points>=500, en:["Scholar","Earn 500 points"], ar:["طالب علم","اكسب ٥٠٠ نقطة"]},
  {id:"s3", icon:"🔥", test:s=>s.best>=3, en:["Steady","Reach a 3-day streak"], ar:["المواظب","حقّق سلسلة ٣ أيام"]},
  {id:"s7", icon:"🌙", test:s=>s.best>=7, en:["Devoted","Reach a 7-day streak"], ar:["الثابت","حقّق سلسلة ٧ أيام"]},
  {id:"perfect", icon:"🎯", test:s=>s.perfect>=1, en:["Flawless","Score 5 out of 5 in a round"], ar:["بلا أخطاء","احصل على ٥ من ٥ في جولة"]},
  {id:"word", icon:"🧩", test:s=>s.wins>=3, en:["Wordsmith","Solve 3 mystery words"], ar:["صاحب الكلمات","حُلّ ٣ كلمات غامضة"]},
  {id:"daily", icon:"☀️", test:s=>s.dailyCount>=3, en:["Daily habit","Answer 3 daily challenges correctly"], ar:["عادة يومية","أجب عن ٣ تحديات يومية بشكل صحيح"]},
  {id:"explorer", icon:"🧭", test:s=>s.seen.length>=20, en:["Explorer","Discover 20 Surahs"], ar:["المستكشف","اكتشف ٢٠ سورة"]},
  {id:"speed", icon:"⚡", test:s=>s.bestTimed>=8, en:["Speedster","8 correct answers in 60 seconds"], ar:["السريع","٨ إجابات صحيحة في ٦٠ ثانية"]},
  {id:"review", icon:"🔁", test:s=>s.reviewed>=1, en:["Reviser","Complete a review round"], ar:["المراجع","أكمل جولة مراجعة"]},
  {id:"order", icon:"🔢", test:s=>s.orders>=3, en:["Order keeper","Order the Surahs 3 times"], ar:["حافظ الترتيب","رتّب السور ٣ مرات"]}
];
let toastTimer;
function toast(msg){ const t = $("toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(()=>t.classList.remove("show"), 3500); }
function checkBadges(){
  const fresh_ = BADGES.filter(b => !st.badges.includes(b.id) && b.test(st));
  if (!fresh_.length) return;
  st.badges.push(...fresh_.map(b=>b.id)); save();
  toast(tr("badgeToast", fresh_[0].icon, fresh_[0][L()][0], fresh_.length-1));
}
function renderBadges(){
  $("badges").innerHTML = BADGES.map(b => { const on = st.badges.includes(b.id);
    return `<div class="badge ${on?"on":""}"><span class="bi" aria-hidden="true">${on?b.icon:"🔒"}</span><strong>${esc(b[L()][0])}</strong><small>${esc(b[L()][1])}</small></div>`; }).join("");
  $("bcount").textContent = `${fmt(st.badges.length)} / ${fmt(BADGES.length)}`;
}
function renderPct(){
  const rows = [[tr("pctSurahs"), st.seen.length, NUMS.length], [tr("pctBadges"), st.badges.length, BADGES.length]];
  $("pct").innerHTML = rows.map(([l,n,t]) => { const p = Math.round(n/t*100); return `<div><div class="top"><span>${l} · ${fmt(n)} / ${fmt(t)}</span><b>${fmt(p)}${L()==="ar"?"٪":"%"}</b></div><div class="bar" role="progressbar" aria-label="${l}" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><i style="width:${p}%"></i></div></div>`; }).join("");
}
function render(){
  checkBadges();
  $("points").textContent = fmt(st.points);
  $("level").textContent = fmt(Math.floor(st.points/50)+1);
  $("rounds").textContent = fmt(st.rounds);
  $("streak").textContent = fmt(st.streak);
  const into = st.points % 50;
  $("lvltext").textContent = tr("lvlText", 50-into);
  $("lvlbar").style.width = (into/50*100)+"%";
  renderBadges(); renderDaily(); renderPct();
}
let resetArmed = false;
function resetProgress(){
  const b = $("resetBtn");
  if (!resetArmed){ resetArmed = true; b.textContent = tr("resetConfirm"); setTimeout(()=>{resetArmed=false;b.textContent=tr("reset");},4000); return; }
  const lang = st.lang; st = fresh(); st.lang = lang; save(); render(); resetArmed = false; b.textContent = tr("reset");
}

/* ---------- daily challenge ---------- */
function rng(a){ return () => { a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function seededShuffle(a, r){ a=a.slice(); for (let i=a.length-1;i>0;i--){ const j=Math.floor(r()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function dailyQuestion(){
  let h = 0; for (const c of day(new Date())) h = (h*31 + c.charCodeAt(0)) | 0;
  const r = rng(h), pool = [...VERSE_BANK, ...KNOW_BANK];
  const it = pool[Math.floor(r()*pool.length)];
  const opts = it.o ? it.o : [it.a, ...seededShuffle(NUMS.filter(n=>n!==it.a), r).slice(0,2)];
  return {q:it.q, a:it.a, o:seededShuffle(opts, r)};
}
function renderDaily(){
  const el = $("daily");
  const done = st.daily && st.daily.date === day(new Date());
  const k = L() + (done ? ":done:" + st.daily.ok : ":open:" + day(new Date()));
  if (el.dataset.k === k) return;
  el.dataset.k = k;
  const q = dailyQuestion();
  if (done){
    el.innerHTML = `<span class="eyebrow">${tr("dailyDoneTag")}</span><h3>${esc(q.q[L()])}</h3><p class="msg ${st.daily.ok?"ok":"ko"}">${esc(st.daily.ok ? tr("dailyOk") : tr("dailyKo", optLabel(q.a)))}</p>`;
    return;
  }
  el.innerHTML = `<span class="eyebrow">${tr("dailyTag")}</span><h3>${esc(q.q[L()])}</h3><div class="opts">${q.o.map(o=>`<button data-k="${esc(optKey(o))}">${esc(optLabel(o))}</button>`).join("")}</div><p class="msg">${tr("dailyOne")}</p>`;
  el.querySelectorAll(".opts button").forEach(b => b.onclick = () => {
    const ok = b.dataset.k === optKey(q.a);
    touchStreak();
    st.daily = {date: day(new Date()), ok};
    if (ok){ st.points += 20; st.dailyCount++; markSeen(q.a); }
    save(); render();
  });
}

/* ---------- panels ---------- */
const game = $("game"), grid = $("challenges");
let timer;
function openPanel(title, desc, inner){
  grid.hidden = true; game.hidden = false;
  game.innerHTML = `<div class="panel"><span class="eyebrow">${tr("panelEyebrow")}</span><h2>${esc(title)}</h2><p>${esc(desc)}</p>${inner}<div class="row"><button class="btn ghost" onclick="closeGame()">${tr("back")}</button></div></div>`;
  game.scrollIntoView({behavior:"smooth", block:"start"});
}
function hideGame(){ clearInterval(timer); game.hidden = true; game.innerHTML = ""; grid.hidden = false; }
function closeGame(){ hideGame(); $("missions").scrollIntoView({behavior:"smooth"}); }

/* ---------- quiz engine ---------- */
function build(it){ return {q:it.q, a:it.a, o: shuffle(it.o ? it.o : [it.a, ...pick(NUMS.filter(n=>n!==it.a), 2)])}; }
function recordMissed(q){
  if (!st.missed.some(m=>m.q.en===q.q.en)) st.missed = [...st.missed, {q:q.q, a:q.a, o:q.o}].slice(-30);
  save();
}
function clearMissed(q){ st.missed = st.missed.filter(m=>m.q.en!==q.en); }

function startQuiz(titleKey, descKey, bank, labelKey){
  const qs = pick(bank, 5).map(it => ({q:it.q, a:it.a, o:shuffle(it.o)}));
  let i = 0, score = 0;
  touchStreak();
  function show(){
    const q = qs[i];
    $("qbody").innerHTML = `<div class="bar"><i style="width:${i/qs.length*100}%"></i></div>
      <div class="qcard"><span class="eyebrow">${tr("qOf", tr(labelKey), i+1, qs.length)}</span><h3>${esc(q.q[L()])}</h3>
      <div class="opts">${q.o.map(o=>`<button data-k="${esc(optKey(o))}">${esc(optLabel(o))}</button>`).join("")}</div>
      <p class="msg" id="msg" aria-live="polite"></p></div>`;
    $("qbody").querySelectorAll(".opts button").forEach(b => b.onclick = () => answer(b, q));
  }
  function answer(btn, q){
    const bs = [...document.querySelectorAll(".opts button")];
    bs.forEach(b => b.disabled = true);
    const msg = $("msg"), good = bs.find(b=>b.dataset.k===optKey(q.a));
    if (btn === good){ score++; st.points += 10; markSeen(q.a); clearMissed(q.q); save(); render(); btn.classList.add("good"); msg.className="msg ok"; msg.textContent=tr("ok10"); }
    else { recordMissed(q); btn.classList.add("bad"); good.classList.add("good"); msg.className="msg ko"; msg.textContent=tr("ko", optLabel(q.a)); }
    const next = document.createElement("div"); next.className="row";
    next.innerHTML = `<button class="btn primary">${i+1<qs.length ? tr("next") : tr("results")}</button>`;
    next.firstChild.onclick = () => { i++; i<qs.length ? show() : finish(); };
    document.querySelector(".qcard").appendChild(next);
    next.firstChild.focus();
  }
  function finish(){
    st.rounds++; if (score === qs.length) st.perfect++; if (labelKey === "lblReview") st.reviewed++; save(); render();
    $("qbody").innerHTML = `<div class="qcard"><h3>${tr("roundDone")}</h3><p style="font-size:42px;color:var(--gold);font-weight:800">${fmt(score)} / ${fmt(qs.length)}</p><p class="msg ok">${tr("earned", score*10)}</p><div class="row"><button class="btn primary" id="again">${tr("again")}</button></div></div>`;
    $("again").onclick = () => startQuiz(titleKey, descKey, bank, labelKey);
  }
  openPanel(tr(titleKey), tr(descKey), `<div id="qbody"></div>`);
  show();
}
function startVerse(){ startQuiz("verseT","verseD", VERSE_BANK.map(build), "lblVerse"); }
function startKnowledge(){ startQuiz("knowT","knowD", KNOW_BANK.map(build), "lblKnow"); }
function startReview(){
  if (!st.missed.length){
    openPanel(tr("reviewT"), tr("reviewD"), `<div class="qcard"><h3>${tr("emptyT")}</h3><p class="msg ok">${tr("emptyP")}</p></div>`);
    return;
  }
  startQuiz("reviewT","reviewD", st.missed, "lblReview");
}

/* ---------- Mystery Word (hangman) ---------- */
function startWord(){
  const list = WORDS[L()], [word, clue] = list[Math.floor(Math.random()*list.length)], chars = Array.from(word);
  const used = new Set(); let lives = 6, over = false;
  touchStreak();
  openPanel(tr("wordT"), tr("wordD"), `<div class="qcard"><span class="eyebrow">${tr("clue")}</span><h3>${esc(clue)}</h3><div class="lives" id="lives" aria-live="polite"></div><div class="word" id="wd"></div><div class="keys" id="keys"></div><p class="msg" id="msg" aria-live="polite"></p><div class="row" id="end"></div></div>`);
  LETTERS[L()].forEach(l => {
    const b = document.createElement("button"); b.textContent = l; b.setAttribute("aria-label", tr("letter")+" "+l);
    b.onclick = () => guess(l, b); $("keys").appendChild(b);
  });
  function draw(){
    $("wd").innerHTML = chars.map(c=>`<span>${used.has(c)||over?c:""}</span>`).join("");
    $("lives").textContent = "♥".repeat(lives) + "♡".repeat(6-lives);
  }
  function guess(l, b){
    if (over) return;
    used.add(l); b.disabled = true;
    if (chars.includes(l)) b.classList.add("good"); else { b.classList.add("bad"); lives--; }
    const won = chars.every(c=>used.has(c));
    if (won || lives === 0){
      over = true; $("keys").querySelectorAll("button").forEach(x=>x.disabled=true);
      st.rounds++;
      if (won){ const pts = 10 + lives*2; st.points += pts; st.wins++; $("msg").className="msg ok"; $("msg").textContent=tr("wordOk", word, pts); }
      else { $("msg").className="msg ko"; $("msg").textContent=tr("wordKo", word); }
      save(); render();
      $("end").innerHTML = `<button class="btn primary" id="again">${tr("another")}</button>`;
      $("again").onclick = startWord;
    }
    draw();
  }
  draw();
}

/* ---------- 60 seconds ---------- */
function allBank(){ return [...VERSE_BANK, ...KNOW_BANK].map(build); }
function startTimed(){
  clearInterval(timer); touchStreak();
  const bank = allBank(); let time = 60, score = 0, q, over = false;
  openPanel(tr("timedT"), tr("timedD"), `<div class="qcard"><div id="tm" style="color:var(--gold);font-weight:800;font-size:20px"></div><h3 id="tq"></h3><div class="opts" id="to"></div><p class="msg" id="tmsg" aria-live="polite"></p><div class="row" id="tend"></div></div>`);
  function show(){
    q = bank[Math.floor(Math.random()*bank.length)];
    $("tq").textContent = q.q[L()];
    $("to").innerHTML = shuffle(q.o).map(o=>`<button data-k="${esc(optKey(o))}">${esc(optLabel(o))}</button>`).join("");
    $("to").querySelectorAll("button").forEach(b => b.onclick = () => choose(b));
  }
  function choose(b){
    if (over) return;
    const ok = b.dataset.k === optKey(q.a);
    if (ok){ score++; st.points += 5; markSeen(q.a); clearMissed(q.q); save(); render(); } else recordMissed(q);
    $("tmsg").className = "msg " + (ok ? "ok" : "ko");
    $("tmsg").textContent = ok ? tr("plus5") : tr("wasAns", optLabel(q.a));
    show();
  }
  const tick = () => { $("tm").textContent = tr("tm", time, score); };
  function end(){
    over = true; clearInterval(timer); st.rounds++;
    if (score > st.bestTimed) st.bestTimed = score;
    save(); render();
    $("tq").textContent = tr("timeUp"); $("to").innerHTML = "";
    $("tmsg").className = "msg ok"; $("tmsg").textContent = tr("timedRes", score, st.bestTimed);
    $("tend").innerHTML = `<button class="btn primary" id="again">${tr("again")}</button>`;
    $("again").onclick = startTimed;
  }
  timer = setInterval(() => { time--; tick(); if (time <= 0) end(); }, 1000);
  tick(); show();
}

/* ---------- Order the Surahs ---------- */
function startOrder(){
  touchStreak();
  const items = pick(NUMS, 4), sorted = [...items].sort((a,b)=>a-b);
  let step = 0, mistakes = 0;
  openPanel(tr("orderT"), tr("orderD"), `<div class="qcard"><div class="opts" id="oo">${shuffle(items).map(n=>`<button data-n="${n}">${esc(sn(n))}</button>`).join("")}</div><p class="msg" id="omsg" aria-live="polite"></p><div class="row" id="oend"></div></div>`);
  const msg = $("omsg");
  document.querySelectorAll("#oo button").forEach(b => b.onclick = () => {
    if (b.disabled) return;
    const want = sorted[step];
    if (Number(b.dataset.n) === want){
      b.disabled = true; b.classList.add("good"); b.textContent = tr("orderBtn", step+1, sn(want), want); step++;
      if (step === sorted.length) done();
    } else {
      mistakes++; b.classList.add("bad"); setTimeout(()=>b.classList.remove("bad"), 600);
      msg.className = "msg ko"; msg.textContent = tr("notThat");
    }
  });
  function done(){
    const pts = Math.max(5, 15 - mistakes*5);
    st.points += pts; st.orders++; st.rounds++; items.forEach(markSeen); save(); render();
    msg.className = "msg ok"; msg.textContent = tr("orderOk", pts);
    $("oend").innerHTML = `<button class="btn primary" id="again">${tr("anotherOne")}</button>`;
    $("again").onclick = startOrder;
  }
}

/* ---------- share ---------- */
function shareScore(){
  const text = tr("shareTxt", st.points, st.seen.length, NUMS.length);
  if (navigator.share) navigator.share({text}).catch(()=>{});
  else if (navigator.clipboard) navigator.clipboard.writeText(text).then(()=>toast(tr("copied")), ()=>toast(text));
  else toast(text);
}

async function openSurah(number) {
  const el = $("lib");

  const item = API_SURAH_LIST.find(
    s => Number(s.number) === Number(number)
  );

  const name = L() === "ar"
    ? (item?.name_arabic || SAR[number - 1])
    : (item?.name_english || SEN[number - 1]);

  el.innerHTML = `
    <div class="lib">
      <div class="surah-navigation">
  <button class="btn ghost" id="prevSurah"
    ${number <= 1 ? "disabled" : ""}>
    ← Previous
  </button>

  <button class="btn ghost" id="backLibrary">
    Library
  </button>

  <button class="btn ghost" id="nextSurah"
    ${number >= 114 ? "disabled" : ""}>
    Next →
  </button>
</div>

      <h3>${fmt(number)} · ${esc(name)}</h3>

      <p class="count" id="surahStatus">
        ${L() === "ar" ? "جاري تحميل الآيات..." : "Loading verses..."}
      </p>

      <div id="ayahContent"></div>
    </div>
  `;

  $("backLibrary").onclick = () => openLibrary();
$("prevSurah").onclick = () => {
  if (number > 1) openSurah(number - 1);
};

$("nextSurah").onclick = () => {
  if (number < 114) openSurah(number + 1);
};
  try {
    const response = await fetch(
      `${API_BASE}/quran/surah/${number}?script=uthmani&translation=en`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();

    // Inspect the API response
    console.log("FULL SURAH API RESPONSE:", result);

    // Find the verses in the possible response structures
    const data = result.data || result;

    const ayahs =
      data.ayahs ||
      data.surah?.ayahs ||
      data.surah?.verses ||
      data.verses ||
      result.ayahs ||
      [];

    if (!Array.isArray(ayahs) || ayahs.length === 0) {
      throw new Error(
        "No verses found. Check FULL SURAH API RESPONSE in Console."
      );
    }

    $("surahStatus").textContent =
      L() === "ar"
        ? `${D(ayahs.length)} آية`
        : `${ayahs.length} verses`;

    $("ayahContent").innerHTML = ayahs.map((ayah, index) => {
      const arabic =
        ayah.text ||
        ayah.text_uthmani ||
        ayah.arabic ||
        ayah.text_arabic ||
        "";

      const translation =
        typeof ayah.translation === "string"
          ? ayah.translation
          : ayah.translation?.text ||
            ayah.translations?.sahih_international ||
            ayah.translations?.en ||
            ayah.translation_en ||
            "";

      const ayahNumber =
        ayah.number_in_surah ||
        ayah.ayah_number ||
        ayah.number ||
        index + 1;

      return `
        <article class="ayah-card">
          <div class="ayah-number">${fmt(ayahNumber)}</div>

          <p class="arabic-text" dir="rtl">
            ${esc(arabic)}
          </p>

          <p class="translation" dir="ltr">
            ${esc(translation || "Translation unavailable")}
          </p>
        </article>
      `;
    }).join("");

  } catch (error) {
    console.error("Surah loading error:", error);

    $("surahStatus").textContent = "";

    $("ayahContent").innerHTML = `
      <p class="msg ko">
        ${L() === "ar"
          ? "تعذّر تحميل السورة. حاول مرة أخرى."
          : "Unable to load this Surah. Please try again."}
      </p>

      <button class="btn primary" id="retrySurah">
        ${L() === "ar" ? "إعادة المحاولة" : "Try again"}
      </button>
    `;

    $("retrySurah").onclick = () => openSurah(number);
  }
}

/* ---------- Library ---------- */

/* ---------- Library ---------- */
function openLibrary(scroll = true) {
  const el = $("lib");

  el.innerHTML = `
    <div class="lib">
      <h3>${tr("libT")}</h3>
      <p class="count" id="cnt"></p>

      <input id="q" type="search"
        placeholder="${esc(tr("libSearch"))}"
        aria-label="${esc(tr("libSearch"))}"
        autocomplete="off">

      <div class="lrow">
        <select id="flt" aria-label="Filter">
          <option value="all">${tr("fAll")}</option>
          <option value="new">${tr("fNew")}</option>
          <option value="seen">${tr("fSeen")}</option>
        </select>

        <button type="button" class="btn ghost" id="rnd">
          ${tr("rnd")}
        </button>
      </div>

      <div class="sur" id="res"></div>
    </div>
  `;

  const q = $("q");

  // Get names from API, with static fallback
  function getSurahNames(i) {
    const item = API_SURAH_LIST.find(
      s => Number(s.number) === i
    );

    return {
      en: item?.name_english || SEN[i - 1],
      ar: item?.name_arabic || SAR[i - 1]
    };
  }

  function run() {
    const raw = q.value.trim();
    const t = raw.toLowerCase().replace(/-/g, "");
    const f = $("flt").value;

    const list = NUMS
      .filter(i => {
        const names = getSurahNames(i);

        return (
          !t ||
          names.en.toLowerCase().replace(/-/g, "").includes(t) ||
          names.ar.includes(raw) ||
          SEN[i - 1].toLowerCase().replace(/-/g, "").includes(t) ||
          SAR[i - 1].includes(raw) ||
          String(i) === t ||
          D(i) === raw
        );
      })
      .filter(i =>
        f === "all" ||
        (f === "seen" ? st.seen.includes(i) : !st.seen.includes(i))
      );

    const percentage = Math.round(
      st.seen.length / NUMS.length * 100
    );

    $("cnt").textContent = tr(
      "cnt",
      list.length,
      st.seen.length,
      NUMS.length,
      percentage
    );

    $("res").innerHTML = list.length
      ? list.map(i => {
          const on = st.seen.includes(i);
          const names = getSurahNames(i);

          const primary = L() === "ar" ? names.ar : names.en;
          const secondary = L() === "ar" ? names.en : names.ar;

          return `
            <button type="button"
              class="${on ? "seen" : ""}"
              data-n="${i}"
              aria-pressed="${on}">

              <span>${fmt(i)}</span>

              <strong>
                ${esc(primary)}
                <small>${esc(secondary)}</small>
              </strong>

              <span>${on ? "✓" : "✦"}</span>
            </button>
          `;
        }).join("")
      : `<p>${tr("noSurah")}</p>`;
  }

  q.addEventListener("input", run);
  $("flt").addEventListener("change", run);

  $("rnd").onclick = () => {
    const pool = NUMS.filter(i => !st.seen.includes(i));

    const n = pick(
      pool.length ? pool : NUMS,
      1
    )[0];

    q.value = String(n);
    $("flt").value = "all";

    run();

    const names = getSurahNames(n);
    toast(tr("discover", L() === "ar" ? names.ar : names.en));
  };

  $("res").onclick = e => {
  const b = e.target.closest("button[data-n]");
  if (!b) return;

  const n = Number(b.dataset.n);

  if (!st.seen.includes(n)) {
    st.seen.push(n);
    save();
    render();
  }

  openSurah(n);
};
  run();

  if (scroll) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}


/* ---------- language ---------- */
function greet(){
  const h = new Date().getHours();
  $("greet").textContent = tr("greet", tr(h<12 ? "greetM" : h<18 ? "greetA" : "greetE"), st.streak);
}
function applyLang(){
  const ar = L() === "ar";
  document.documentElement.lang = L(); document.documentElement.dir = ar ? "rtl" : "ltr";
  document.title = tr("docTitle");
  document.querySelectorAll("[data-i18n]").forEach(el => el.innerHTML = tr(el.dataset.i18n));
  $("langBtn").textContent = tr("langBtn");
  $("hs1").textContent = fmt(114); $("hs2").textContent = fmt("01");
  hideGame(); openLibrary(false); greet(); render();
}
$("langBtn").onclick = () => { st.lang = L() === "ar" ? "en" : "ar"; save(); applyLang(); };

applyLang();



async function loadQuranSurahs() {
  try {
    console.log("Connecting to UmmahAPI...");

    const response = await fetch(`${API_BASE}/quran/surahs`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();

    API_SURAH_LIST = result.data.surahs;

    if (!Array.isArray(API_SURAH_LIST) ||
        API_SURAH_LIST.length !== 114) {
      throw new Error("Invalid Surah list");
    }

    console.log("AYAHQUEST API connected successfully!");
    console.log("Number of Surahs:", API_SURAH_LIST.length);
    console.table(API_SURAH_LIST);

    openLibrary(false);

  } catch (error) {
    console.error("Quran API Error:", error);
  }
}

loadQuranSurahs();