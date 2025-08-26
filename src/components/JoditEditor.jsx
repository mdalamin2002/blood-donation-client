import { useEffect, useRef } from "react";

export default function JoditEditor({ value, onChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = (e) => {
    onChange(e.currentTarget.innerHTML);
  };

  return (
    <div
      ref={editorRef}
      contentEditable
      className="w-full min-h-[160px] p-3 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      onInput={handleInput}
      suppressContentEditableWarning={true}
    />
  );
}
