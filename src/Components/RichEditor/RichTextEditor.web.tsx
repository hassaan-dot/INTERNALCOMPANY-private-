import React, { useState } from "react";
import { View } from "react-native";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  const [content, setContent] = useState(text);

  const handleChange = (val: string) => {
    setContent(val);
    if (onChangeText) onChangeText(val);
  };

  return (
    <View style={{ flex: 1 }}>
      <ReactQuill
        value={content}
        onChange={handleChange}
        readOnly={!editable}
        style={{ height: 300, backgroundColor: "#fff" }}
      />
    </View>
  );
};

export default RichTextEditor;
