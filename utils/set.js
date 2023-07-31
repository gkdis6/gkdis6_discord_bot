const adCho = [
  "루피",
  "조로",
  "우솝",
  "쵸파",
  "로빈",
  "시라호시",
  "도플라밍고",
  "사보",
  "후지토라",
  "타시기",
  "바질호킨스",
  "징베",
  "야마토",
  "료쿠규",
];
const apCho = [
  "나미",
  "상디",
  "프랑키",
  "브룩",
  "샹크스",
  "시라호시",
  "검은수염",
  "아오키지",
  "아카이누",
  "키자루",
  "로우",
  "타시기",
  "루치",
  "스네이크맨",
  "키드",
];
const adBool = ["로져", "레일리", "스코퍼가반", "흰수염", "거프", "시키", "카이도"];
const apBool = ["센고쿠", "시키", "드래곤", "제트", "빅맘"];
const adYoung = ["핸콕", "카번딧슈", "버기", "니카"];
const apYoung = ["에이스", "핸콕", "비비", "우타", "미호크"];
const adZe = ["크로커다일", "레베카", "카타쿠리", "킹", "마르코"];
const apZe = ["에넬", "아인", "시노부", "레드필드", "마르코"];
const randomZe = ["키쿄우", "부릉냐", "쿠죠죠타로", "나미카제미나토", "료우기시키", "타츠마키", "쿠치키바쿠야", "마운틴히그마", "유카리"];
const hanghae = ["연합세력", "패왕의길", "도박광", "최고의 도움", "도움소 잠그기"];
const unit = [...new Set([...adCho, ...apCho, ...adBool, ...apBool, ...apYoung, ...adYoung, ...apZe, ...adZe, ...randomZe])];
let result;

export function getRandomSet() {
  const set = new Set(unit);
  result = [...set];

  const resultlength = result.size || result.length;
  return result[getRandom(resultlength)];
}

export function getCharRandomSet() {
  const unitChar = unit.map((v) => v.split(""));
  const flat = [].concat.apply([], unitChar);
  const uniqueValues = [...new Set(flat)];
  const firstPtr = getRandom(uniqueValues.length);
  const firstStr = uniqueValues.splice(firstPtr, 1);
  const secondPtr = getRandom(uniqueValues.length);
  const secondStr = uniqueValues.splice(secondPtr, 1);
  let res = unit.filter((it) => it.includes(firstStr) || it.includes(secondStr));
  return firstStr + secondStr + "\n" + res;
}

export function getHanghaeSet() {
  result = hanghae;
  const resultlength = result.size || result.length;
  return result[getRandom(resultlength)];
}

const getRandom = (max) => Math.floor(Math.random() * max);
