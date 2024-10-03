import { LocalStorageAliases } from "@/services/types";

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function readAliasesFromLocalstorage() {
  const aliases = localStorage.getItem("aliases");
  return aliases
    ? (JSON.parse(aliases) as LocalStorageAliases)
    : ({ aliases: [] } as LocalStorageAliases);
}

export function writeAliasesToLocalstorage(aliases: LocalStorageAliases) {
  localStorage.setItem("aliases", JSON.stringify(aliases));
}

export function addAliasToLocalstorage(alias: string) {
  const aliases = readAliasesFromLocalstorage();
  aliases.aliases.push(alias);
  writeAliasesToLocalstorage(aliases);
}
