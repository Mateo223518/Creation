const base = import.meta.env.BASE_URL;
const asset = (path: string) => `${base}${path}`;

export interface Artwork {
  src: string;
  title: string;
  subtitle: string;
  en: string;
  enDesc?: string;
  desc: string;
  year: string;
  vertical: boolean;
}

export const artworks: Artwork[] = [
  {
    src: asset("artworks/baochai.jpg"),
    title: "薛宝钗",
    subtitle: "蘅芜君",
    en: "Xue Baochai",
    desc: "宝钗立于蘅芜苑中，牡丹开处，人淡如菊。手执团扇半遮面，眉眼间是世故里的从容，也是闺阁中难言的克制。借柳絮喻志——好风凭借力，送我上青云——是女儿身里藏着的一颗丈夫心。",
    enDesc: "Baochai stands amid peonies in the Hengwu Garden, serene as chrysanthemum among them. Fan half-raised, her gaze holds both worldly composure and an unspoken restraint. Through willow catkins she voices ambition — on a fair wind I rise to the blue clouds — a strategist's heart within a daughter's form.",
    year: "2025.11.27",
    vertical: true,
  },
  {
    src: asset("artworks/daiyu.jpg"),
    title: "林黛玉",
    subtitle: "潇湘妃子",
    en: "Lin Daiyu",
    desc: "潇湘馆外竹影婆娑，黛玉倚窗而立，帕上点点是泪亦是墨。她葬花于暮春，把落红与自己一并埋进诗里。眉间一缕清愁，为的是那还未说出口的缘分，也是这世间看不透的聚散。竹影潇湘，泪尽而终。",
    enDesc: "Beyond the Bamboo Lodge shadows sway; Daiyu leans at the window, her handkerchief stained with tears that are also ink. She buries fallen petals in late spring, interring the blossoms and herself in verse. That furrow between her brows is for a fate not yet spoken, for the partings this world never makes clear.",
    year: "2025.11.30",
    vertical: true,
  },
  {
    src: asset("artworks/pipa-lady.jpg"),
    title: "琵琶仕女",
    subtitle: "白描",
    en: "Lady with Pipa",
    desc: "灵感取自白居易《琵琶行》。江州月夜，浔阳江头，她抱琵琶半遮面，弦上三两声，已惹得满座重闻皆掩泣。白描线条里飞天飘带翻飞如水波，琵琶半掩着她欲语还休的神情——千载之下，那声同是天涯沦落人仍在弦上未散。",
    enDesc: "Inspired by Bai Juyi's Song of the Pipa. On a moonlit night at Jiangzhou, by the Xunyang River, she cradles the pipa with face half-hidden; two or three notes already move the whole gathering to tears. In pure linework, flying ribbons ripple like water, the instrument half-veiling a look between speech and silence — a thousand years on, the feeling still lingers on those strings.",
    year: "2026.04.11",
    vertical: true,
  },
  {
    src: asset("artworks/monkey-king.jpg"),
    title: "齐天大圣",
    subtitle: "孙悟空",
    en: "Monkey King",
    desc: "齐天大圣立于花果山巅，金箍棒横扫九霄，旌旗猎猎作响。他踏碎凌霄的桀骜，是天地间不肯低头的那股气。披挂鲜烈，眼神灼灼——五百年五行山下，也压不灭的，是一颗齐天的心。",
    enDesc: "The Great Sage stands atop Mount Huaguo, golden staff sweeping the nine heavens, banners cracking in the wind. His defiance that shattered the Heavenly Palace is the one breath in all the world that will not bow. Armor blazing, eyes burning bright — five centuries beneath Five-Elements Mountain could not quench a heart that rivals heaven.",
    year: "2026.03.19",
    vertical: true,
  },
  {
    src: asset("artworks/christmas-tree.jpg"),
    title: "圣诞树",
    subtitle: "水彩小品",
    en: "Christmas Tree",
    desc: "冬夜窗前，圣诞树亮起暖光，顶上一颗星，树下一句手写的 Merry Christmas。水彩晕染开的，是雪意、是岁末、是漂泊者忽然柔软的一刻。不必有故事，那一点温热的光，就足以把整个冬天照亮。",
    enDesc: "By the window on a winter night, the tree glows warm, a single star at its crown and beneath it a handwritten Merry Christmas. Watercolor spreads into snow-sense, year-end, the sudden softening of a wanderer. It needs no story — that one warm glow is enough to light the whole winter through.",
    year: "2025.12.25",
    vertical: true,
  },
  {
    src: asset("artworks/cat-sketch.jpg"),
    title: "猫",
    subtitle: "铅笔素描",
    en: "Cat",
    desc: "猫蜷在旧书堆上，半阖着眼，像是听了一下午的雨。铅笔的灰度里藏着它的傲慢与温存——它不在意你看它，你却忍不住一直看它。眼波流转间，是这屋子里最安静的一位住客。",
    enDesc: "The cat curls on a stack of old books, eyes half-closed, as if it had listened to the rain all afternoon. In the pencil's grayscale hides its pride and its tenderness — it does not care that you watch it, yet you cannot look away. In its slow glance, the quietest tenant of the house.",
    year: "2026.04.24",
    vertical: false,
  },
];
