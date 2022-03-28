import type { MDEditorProps } from "@uiw/react-md-editor";
import MDEditor from "@uiw/react-md-editor";

type MdEditorProps = {
  value: string | undefined;
  onChange: (markdown: string) => void;
} & MDEditorProps;

export const MdEditor = ({
  value,
  onChange,
  ...editorProps
}: MdEditorProps) => (
  <MDEditor value={value} onChange={onChange} height={500} {...editorProps} />
);
