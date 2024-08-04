import { decode } from "base64-arraybuffer";
import { supabase } from "../lib/supabase";
import * as FileSystem from "expo-file-system";
import { supabaseUrl } from "../lib/supabase";

export const uploadFile = async (folderName, fileUri, isImage = true) => {
  try {
    let fileName = getFilePath(folderName, isImage);

    // 파일 정보 출력
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    console.log("파일 정보: ", fileInfo);

    // 파일이 존재하는지 확인
    if (!fileInfo.exists) {
      throw new Error("파일이 존재하지 않습니다");
    }

    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Base64 문자열 확인
    if (!fileBase64) {
      throw new Error("파일을 Base64 문자열로 변환하지 못했습니다");
    }

    let imageData = decode(fileBase64);
    console.log("인코딩된 이미지 데이터 길이: ", imageData.byteLength);

    console.log("파일 이름: ", fileName);
    console.log("파일 데이터: ", imageData);
    const { data, error } = await supabase.storage.from("upload").upload(fileName, imageData, {
      cacheControl: "3600",
      upsert: true,
      contentType: isImage ? "image/png" : "video/mp4",
    });

    if (error) {
      console.log("파일 업로드 오류: ", error);
      return { success: false, msg: "미디어를 업로드할 수 없습니다" };
    }

    console.log("파일 업로드 성공: ", data);
    return { success: true, data: data.path };
  } catch (error) {
    console.log("파일 업로드 예외: ", error);
    return { success: false, msg: "미디어를 업로드할 수 없습니다" };
  }
};

export const getFilePath = (folderName, isImage = true) => {
  return `/${folderName}/${new Date().getTime()}${isImage ? ".png" : ".mp4"}`;
};

export const getUserImageSrc = (imagePath) => {
  if (imagePath) {
    return getSupabaseFileUrl(imagePath);
  } else {
    return require("../assets/images/defaultUser.png");
  }
};

export const getSupabaseFileUrl = (filePath) => {
  if (filePath) return { uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}` };
  return null;
};

export const downloadFile = async (url) => {
  try {
    const { uri } = await FileSystem.downloadAsync(url, getLocalFilePath(url));
    return uri;
  } catch (e) {
    console.log("파일 다운로드 오류: ", e);
    return null;
  }
};

const getLocalFilePath = (filePath) => {
  let fileName = filePath.split("/").pop();
  return `${FileSystem.documentDirectory}${fileName}`;
};
