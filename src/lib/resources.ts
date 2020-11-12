import { characters as characterUtil } from "@slippi/slippi-js";

function sanitize(text: string, replacement = "-"): string {
  return text.toLowerCase().replace(/[. &]+/gi, replacement);
}

export function getCharacterFolderFromId(characterId: string | number, color?: string) {
  const characterName = characterUtil.getCharacterName(+characterId);
  return getCharacterFolderFromName(characterName, color);
}

export function getCharacterFolderFromName(character: string, color = "Default") {
  const charFolder = sanitize(character);
  const colorFolder = sanitize(color);
  return `${process.env.PUBLIC_URL}/images/characters/${charFolder}/${colorFolder}`;
}
