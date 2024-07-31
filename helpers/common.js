// 자주사용할 수 있는 함수들을 정의한 파일입니다.
import { Dimensions } from "react-native"; // Dimensions는 화면의 크기를 가져오는데 사용됩니다.

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window"); // 화면의 크기를 가져옵니다.

export const capitalize = (str) => {
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
}; // 문자열의 첫 글자를 대문자로 변환합니다.

export const wp = (percentage) => {
  return (percentage * deviceWidth) / 100;
}; // 화면의 너비를 기준으로 퍼센트 값을 계산합니다.
export const hp = (percentage) => {
  return (percentage * deviceHeight) / 100;
}; // 화면의 높이를 기준으로 퍼센트 값을 계산합니다.

export const stripHtmlTags = (html) => {
  return html.replace(/<[^>]*>?/gm, "");
}; // HTML 태그를 제거합니다. 이것이 필요한 이유는 HTML 태그를 제거하면 텍스트를 더 쉽게 읽을 수 있기 때문입니다. 주로 블로그나 웹사이트의 본문을 가져올 때 사용합니다.
