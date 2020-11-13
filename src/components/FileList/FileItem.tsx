/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { characters as characterUtil } from "@slippi/slippi-js";
import { getCharacterStockIcon } from "lib/resources";
import React from "react";
import { ProcessedFile } from "store/types";

const BasicFileItem: React.FC<{ name: string }> = (props) => {
  const { name, children } = props;
  return (
    <div
      css={css`
        padding: 1.5rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.3);
        margin: 1rem;
      `}
    >
      <div>
        <div
          css={css`
            font-size: 1.6rem;
          `}
        >
          {name}
        </div>
        <div>{children}</div>
      </div>
      <div>x</div>
    </div>
  );
};

export const FileItem: React.FC<ProcessedFile> = (props) => {
  const { filename, loading, error, details } = props;
  if (loading) {
    return <BasicFileItem name={filename}> loading...</BasicFileItem>;
  }
  if (error || !details) {
    return <BasicFileItem name={filename}>error :c</BasicFileItem>;
  }

  const players = details.settings.players;
  const icons = players.map((player) => {
    const charId = player.characterId as number;
    const color = characterUtil.getCharacterColorName(charId, player.characterColor as number);
    const src = getCharacterStockIcon(charId, color);
    return <img key={`${player.port}-icon`} src={src} />;
  });
  return <BasicFileItem name={filename}>{icons}</BasicFileItem>;
};
