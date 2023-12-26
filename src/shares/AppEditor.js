import { Editor } from "primereact/editor";
import { useState } from "react";

export const AppEditor = ({onChange}) => {
   const [content, setContent] = useState("");

  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <select className="ql-font">
          <option value="serif"></option>
          <option value="sans-serif"></option>
          <option value="monospace"></option>
        </select>
        <select className="ql-size">
          <option value="small"></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
        <button className="ql-align" aria-label="Align"></button>
        <button className="ql-color" aria-label="Color"></button>
        <button className="ql-background" aria-label="Background"></button>
        <button className="ql-list" aria-label="Ordered"></button>
        <button className="ql-script" value="sub"></button>
        <button className="ql-script" value="super"></button>
        <button className="ql-code" aria-label="Code"></button>
        <button className="ql-link" aria-label="Link"></button>
        <button className="ql-clean" aria-label="Clean"></button>
      </span>
    );
  };

  return (
    <Editor
      headerTemplate={renderHeader()}
      value={content}
      onTextChange={(e) => {
        setContent(e.htmlValue);
        onChange(e.htmlValue);
      }}
      style={{ height: "320px" }}
    />
  );
};
