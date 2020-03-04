import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';

export default function MyEditor() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  );
  return (
       <Editor editorState={editorState} onChange={setEditorState} />
  )
}