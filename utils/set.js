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
  "주얼리보니",
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
  "코비",
];
const adBool = ["로져", "레일리", "스코퍼가반", "흰수염", "거프", "시키", "카이도"];
const apBool = ["센고쿠", "시키", "드래곤", "제트", "빅맘"];
const adYoung = ["핸콕", "카번딧슈", "버기", "니카"];
const apYoung = ["에이스", "핸콕", "비비", "우타", "미호크", "류마"];
const adZe = ["크로커다일", "레베카", "카타쿠리", "킹", "마르코", "알비다"];
const apZe = ["에넬", "아인", "시노부", "레드필드", "마르코"];
const randomZe = ["키쿄우", "부릉냐", "쿠죠죠타로", "나미카제미나토", "료우기시키", "타츠마키", "쿠치키바쿠야", "마운틴히그마", "유카리", "콘파쿠요우무", "고죠사토루", "아냐포저"];
const hanghae = ["연합세력", "패왕의길", "도박광", "최고의 도움", "도움소 잠그기", "특성공학", "랜덤"];
const unit = [...new Set([...adCho, ...apCho, ...adBool, ...apBool, ...apYoung, ...adYoung, ...apZe, ...adZe, ...randomZe])];
const unitCommand = {
    "루피":"해적왕이될사나이",
    "조로":"최강의검사",
    "우솝":"바다의전사",
    "쵸파":"순록의사!",
    "로빈":"악마의자식",
    "시라호시":"해왕류를다스리는인어공주",
    "도플라밍고":"어둠의조커",
    "사보":"혁명군참모총장",
    "후지토라":"분노하는맹호",
    "타시기":"해군의홍일점",
    "바질호킨스":"운명의마술사",
    "징베":"바다의협객",
    "야마토":"오니히메",
    "료쿠규":"신해군대장초록소",
    "나미":"날씨는맑음",
    "상디":"지옥에서돌아온자",
    "프랑키":"무적의아이언파이러츠",
    "브룩":"소울킹",
    "샹크스":"정상해전종결자",
    "검은수염":"치밀하고비열한어둠",
    "아오키지":"전해군대장푸른꿩",
    "아카이누":"해군원수붉은개",
    "키자루":"해군대장노란원숭이",
    "로우":"백개의심장을바친자",
    "루치":"검은정의를좇는하얀새",
    "스네이크맨":"다섯번째황제",
    "키드":"신세대의이단아",
    "로져":"해정왕골D로져",
    "레일리":"명왕실버즈레일리",
    "스코퍼가반":"대검호스코퍼가반",
    "흰수염":"대해적흰수염",
    "거프":"해군영웅거프",
    "시키":"천신금사자시키",
    "카이도":"백수의제왕카이도",
    "센고쿠":"부처님센고쿠",
    "드래곤":"폭풍을몰아오는바람",
    "제트":"신념의흑완제트",
    "빅맘":"탐식의강철풍선",
    "핸콕":"아마존릴리의여제",
    "카번딧슈":"해적왕자",
    "버기":"천냥광대",
    "니카":"태양의신",
    "에이스":"화권의에이스",
    "비비":"파이러츠왕녀",
    "우타":"세계의가희",
    "미호크":"매의눈미호크",
    "크로커다일":"",
    "레베카":"",
    "카타쿠리":"",
    "킹":"",
    "마르코":"",
    "에넬":"",
    "아인":"",
    "시노부":"",
    "레드필드":"",
    "키쿄우":"",
    "부릉냐":"",
    "쿠죠죠타로":"",
    "나미카제미나토":"",
    "료우기시키":"",
    "타츠마키":"",
    "쿠치키바쿠야":"",
    "마운틴히그마":"",
    "유카리":"",
    "알비다":"",
    "콘파쿠요우무":"",
    "고죠사토루":"",
    "아냐포저":"",
    "코비":"해군의미래",
    "류마":"",
    "주얼리보니":"일그러진미래",
}
let result;

export function getRandomSet(detail) {
  let arr = [];
  if(detail === undefined || detail.indexOf('초') > -1){
    arr = [...arr, ...adCho, ...apCho];
  }
  if(detail === undefined || detail.indexOf('불') > -1){
      arr = [...arr, ...adBool, ...apBool];
  }
  if(detail === undefined || detail.indexOf('영') > -1){
      arr = [...arr, ...adYoung, ...apYoung];
  }
  if(detail === undefined || detail.indexOf('제') > -1){
      arr = [...arr, ...adZe, ...apZe];
  }
  const set = new Set(arr);

  result = [...set];

  const resultlength = result.size || result.length;
  const choose = getRandom(resultlength);
  return result[choose] + "\n" + unitCommand[result[choose]];
}

export function getCommand(detail) {
    return unitCommand[detail] || "정확히 다시 입력해주세요";
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

export function getNightmareSet() {
  const cho = new Set([...adCho, ...apCho]);
  let arrCho = [...cho];
  const bool = new Set([...adBool, ...apBool]);
  let arrBool = [...bool];
  const young = new Set([...adYoung, ...apYoung]);
  let arrYoung = [...young];
  const ze = new Set([...adZe, ...apZe]);
  let arrZe = [...ze];

  let str = '악몽 룰을 적용합니다.\n초월                    불멸                    제한                    영원\n'

  for(let i = 0; i<7; i++){
    const choPtr = getRandom(arrCho.length);

    str += arrCho[choPtr];
    for(let j = 0; j<28-strLength(arrCho[choPtr]); j++){
        str += " ";
    }

    arrCho.splice(choPtr,1);
    if(i <= 1){
        const boolPtr = getRandom(arrBool.length);
        const zePtr = getRandom(arrZe.length);
        str += arrBool[boolPtr];
        for(let j = 0; j<28-strLength(arrBool[boolPtr]); j++){
            str += " ";
        }
        str += arrZe[zePtr];
        for(let j = 0; j<28-strLength(arrZe[zePtr]); j++){
            str += " ";
        }
        arrBool.splice(boolPtr,1);
        arrZe.splice(zePtr,1);
    }
    if(i == 0) {
        const youngPtr = getRandom(arrYoung.length);
        str += arrYoung[youngPtr];
        for(let j = 0; j<28-strLength(arrYoung[youngPtr]); j++){
            str += " ";
        }
        arrYoung.splice(youngPtr,1);
    }
    str += '\n';
  }
  str += '\n밴 되었습니다.';
  return str;
}

const getRandom = (max) => Math.floor(Math.random() * max);

const strLength = (str) => str.split("").reduce((acc, cur) => {
    if (cur.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/)) {
        return acc + 4;
    } else {
        return acc + 1;
    }
}, 0);