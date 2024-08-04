import { View, Text, StyleSheet, ScrollView, Pressable, Image as RNImage, Alert, TouchableOpacity, TextInput } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContext";
import { getSupabaseFileUrl, uploadFile } from "../../services/imageService";
import { Image } from "expo-image";
import Button from "../../components/Button";
import { AntDesign, FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Video, AVPlaybackStatus } from "expo-av";
import { createOrUpdatePost } from "../../services/postService";
import Header from "../../components/Header";
import { useLocalSearchParams, useRouter } from "expo-router";
import Avatar from "../../components/Avatar";
import Icon from "../../assets/icons";

const NewPost = () => {
  const { user } = useAuth();
  const post = useLocalSearchParams();
  console.log("post: ", post);
  const [file, setFile] = useState(null);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (post && post.id) {
      setBody(post.body);
      setFile(post.file || null);
    }
  }, []);

  const onPick = async (isImage) => {
    let mediaConfig = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    };

    if (!isImage) {
      mediaConfig = {
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
      };
    }
    let result = await ImagePicker.launchImageLibraryAsync(mediaConfig);

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const onSubmit = async () => {
    if (!body && !file) {
      Alert.alert("Post", "Please choose an image or add post body!");
      return;
    }

    setLoading(true);
    let data = {
      file,
      body,
      userId: user?.id,
    };
    if (post && post.id) data.id = post.id;

    let res = await createOrUpdatePost(data);
    setLoading(false);
    if (res.success) {
      setFile(null);
      setBody("");
      router.back();
    } else {
      Alert.alert("Post", res.msg);
    }
  };

  const isLocalFile = (file) => {
    if (!file) return null;
    return typeof file == "object";
  };

  const getFileType = (file) => {
    if (!file) return null;
    if (isLocalFile(file)) {
      return file.type;
    }
    if (file.includes("postImages")) {
      return "image";
    }
    return "video";
  };

  const getFileUri = (file) => {
    if (!file) return null;
    if (isLocalFile(file)) {
      return file.uri;
    } else {
      return getSupabaseFileUrl(file)?.uri;
    }
  };

  console.log("file: ", file);

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Header title="Create Post" mb={15} />

        <ScrollView contentContainerStyle={{ gap: 20 }}>
          <View style={styles.header}>
            <Avatar uri={user?.image} size={hp(6.5)} rounded={theme.radius.xl} />
            <View style={{ gap: 2 }}>
              <Text style={styles.username}>{user && user.name}</Text>
              <Text style={styles.publicText}>Public</Text>
            </View>
          </View>
          <View style={styles.textEditor}>
            <TextInput style={styles.input} multiline placeholder="What's on your mind?" value={body} onChangeText={setBody} />
          </View>
          {file && (
            <View style={styles.file}>
              {getFileType(file) == "video" ? (
                <Video
                  style={{ flex: 1 }}
                  source={{
                    uri: getFileUri(file),
                  }}
                  useNativeControls
                  resizeMode="cover"
                  isLooping
                />
              ) : (
                <Image source={{ uri: getFileUri(file) }} contentFit="cover" style={{ flex: 1 }} />
              )}
              <Pressable style={styles.closeIcon} onPress={() => setFile(null)}>
                <AntDesign name="closecircle" size={25} color="rgba(255, 0,0,0.6)" />
              </Pressable>
            </View>
          )}
          <View style={styles.media}>
            <Text style={styles.addImageText}>Add to your post</Text>
            <View style={styles.mediaIcons}>
              <TouchableOpacity onPress={() => onPick(true)}>
                <Icon name="image" size={30} color={theme.colors.dark} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPick(false)}>
                <Icon name="video" size={33} color={theme.colors.dark} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Button buttonStyle={{ height: hp(6.2) }} title={post && post.id ? "Update" : "Post"} loading={loading} hasShadow={false} onPress={onSubmit} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  username: {
    fontSize: hp(2.2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  publicText: {
    fontSize: hp(1.7),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
  },
  textEditor: {
    // marginTop: 10,
  },
  input: {
    height: hp(20),
    borderColor: theme.colors.gray,
    borderWidth: 1,
    borderRadius: theme.radius.xl,
    padding: 10,
    textAlignVertical: "top",
  },
  media: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radius.xl,
    borderColor: theme.colors.gray,
  },
  mediaIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  addImageText: {
    fontSize: hp(1.9),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  file: {
    height: hp(30),
    width: "100%",
    borderRadius: theme.radius.xl,
    overflow: "hidden",
    borderColor: theme.colors.gray,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default NewPost;
