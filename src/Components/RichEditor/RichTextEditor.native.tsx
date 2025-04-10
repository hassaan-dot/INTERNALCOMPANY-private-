import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";

interface Props {
  text?: string;
  editable?: boolean;
  onChangeText?: (val: string) => void;
}

const RichTextEditor: React.FC<Props> = ({
  text = "",
  editable = true,
  onChangeText,
}) => {
  const editorRef = useRef<RichEditor>(null);
  const [content, setContent] = useState(text);

  const handleChange = (val: string) => {
    setContent(val);
    if (onChangeText) onChangeText(val);
  };

  return (
    <View style={styles.container}>
      <RichEditor
        ref={editorRef}
        style={styles.editor}
        initialContentHTML={text}
        onChange={handleChange}
        disabled={!editable}
      />
      {editable && (
        <RichToolbar
          editor={editorRef}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
          ]}
          style={styles.toolbar}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  editor: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    minHeight: 250,
  },
  toolbar: {
    backgroundColor: "#333",
    borderRadius: 8,
    marginTop: 10,
  },
});

export default RichTextEditor;
