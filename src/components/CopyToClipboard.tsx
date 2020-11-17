/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import Copy from "react-copy-to-clipboard";

export interface CopyToClipboardProps {
  text: string;
  onCopyText?: string;
  onCopyTimeoutMs?: number;
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = (props) => {
  const [copied, setCopied] = React.useState(false);
  const timeoutMs = props.onCopyTimeoutMs || 2000;
  const copyText = props.onCopyText || "copied!";

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), timeoutMs);
  };

  if (copied) {
    return <span>{copyText}</span>;
  }

  return (
    <span
      css={css`
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      `}
    >
      <Copy text={props.text} onCopy={onCopy}>
        {props.children}
      </Copy>
    </span>
  );
};
