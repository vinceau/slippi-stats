/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { characters as characterUtil } from "@slippi/slippi-js";
import { getCharacterStockIcon } from "lib/resources";
import React from "react";
import { ProcessedFile } from "store/types";

const BasicFileItem: React.FC<{ name: string; onRemove?: () => void }> = (props) => {
  const { onRemove, name, children } = props;
  return (
    <div
      css={css`
        padding: 1.5rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.3);
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
      {onRemove && <button onClick={onRemove}>x</button>}
    </div>
  );
};

export interface FileItemProps {
  file: ProcessedFile;
  onRemove: () => void;
}

export const FileItem: React.FC<FileItemProps> = (props) => {
  const { file, onRemove } = props;
  const { filename, loading, error, details } = file;
  if (loading) {
    return <BasicFileItem name={filename}> loading...</BasicFileItem>;
  }
  if (error || !details) {
    return (
      <BasicFileItem onRemove={onRemove} name={filename}>
        error :c
      </BasicFileItem>
    );
  }

  const players = details.settings.players;
  const icons = players.map((player) => {
    const charId = player.characterId as number;
    const color = characterUtil.getCharacterColorName(charId, player.characterColor as number);
    const src = getCharacterStockIcon(charId, color);
    return <img key={`${player.port}-icon`} src={src} />;
  });
  return (
    <BasicFileItem onRemove={onRemove} name={filename}>
      {icons}
    </BasicFileItem>
  );
};
