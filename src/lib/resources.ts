import { characters as characterUtil } from "@slippi/slippi-js";

export type Side = "left" | "right";

function sanitize(text: string, replacement = "-"): string {
  return text.toLowerCase().replace(/[. &]+/gi, replacement);
}

function getCharacterFolderFromId(characterId: string | number, color?: string) {
  const characterName = characterUtil.getCharacterName(+characterId);
  return getCharacterFolderFromName(characterName, color);
}

function getCharacterFolderFromName(character: string, color = "Default") {
  const charFolder = sanitize(character);
  const colorFolder = sanitize(color);
  return `${process.env.PUBLIC_URL}/images/characters/${charFolder}/${colorFolder}`;
}

export function getCharacterPortrait(characterId: string | number, color?: string): string {
  const folder = getCharacterFolderFromId(characterId, color);
  return `${folder}/portrait.png`;
}

export function getCharacterVSScreen(side: Side, characterId: string | number, color?: string): string {
  const folder = getCharacterFolderFromId(characterId, color);
  return `${folder}/vs-${side}.png`;
}
