import { existsSync } from "https://deno.land/std/fs/mod.ts";
import { exec } from "https://deno.land/x/exec/mod.ts";

const spriteFilePath = "static/sprites.svg";
const adminIconsFilePath = "static/adminIcons.ts";
const iconsFolderPath = "static/icons";
const typeFileIconPath = "components/ui/IconTypes.ts";

async function extractIconsFromSprite() {
  const content = await Deno.readTextFile(spriteFilePath);

  const regex = /<symbol id="(.+?)"(.+?)>(.+?)<\/symbol>/gs;
  let matchSymbol;
  while ((matchSymbol = regex.exec(content)) !== null) {
    const [_, id, attributes, content] = matchSymbol;

    const iconString = `<svg${attributes}>${content}</svg>\n`;

    if (!existsSync(iconsFolderPath)) {
      await Deno.mkdir(iconsFolderPath);
    }

    if (!existsSync(`static/icons/${id}.svg`)) {
      await Deno.writeTextFile(`static/icons/${id}.svg`, iconString);
    }
  }

  console.log(`Icons extracted from ${spriteFilePath}`);
}

async function addIconsInSprite() {
  let iconsContent: {
    name: string;
    content: string;
  }[] = [];

  if (existsSync(iconsFolderPath)) {
    const files = Deno.readDirSync(iconsFolderPath);
    for (const file of files) {
      if (!file.isFile) return;
      const [name] = file.name.split(".");
      const filePath = `${iconsFolderPath}/${file.name}`;
      const iconContent = await Deno.readTextFile(filePath);

      const content = iconContent.replace("<svg", `<symbol id="${name}"`)
        .replace("</svg>", "</symbol>");

      iconsContent.push({
        name,
        content,
      });
    }
  }

  iconsContent = iconsContent.sort((a, b) => a.name.localeCompare(b.name));

  const typeAvailableIcons = iconsContent
    .map(({ name }) => `'${name}'`)
    .join("|");

  const iconsTypeFile = `
      export type AvailableIcons = ${typeAvailableIcons}
  `;

  await Deno.writeTextFile(typeFileIconPath, iconsTypeFile);

  exec(`deno fmt ${typeFileIconPath}`);

  console.log(`File ${typeFileIconPath} updated`);

  const spritesFile = `<svg style="display:none">\n${
    iconsContent
      .map(({ content }) => `    ${content}`)
      .join("\n")
  }\n</svg>`;

  await Deno.writeTextFile(spriteFilePath, spritesFile);

  console.log(`File ${spriteFilePath} updated`);
}

async function updateAdminIcons() {
  const svgContent = await Deno.readTextFile(spriteFilePath);
  let existingContent = "";
  const existingIcons = new Set();
  const newIcons = [];

  // Verifies if adminIcons.ts already exists and reads the icons from there
  if (existsSync(adminIconsFilePath)) {
    existingContent = await Deno.readTextFile(adminIconsFilePath);
    const regexExtract = /export const (\w+) =/g;
    let matchExtract;
    while ((matchExtract = regexExtract.exec(existingContent)) !== null) {
      existingIcons.add(matchExtract[1]);
    }
  }

  const regex = /<symbol id="(.+?)"(.+?)>(.+?)<\/symbol>/gs;
  let matchSymbol;
  while ((matchSymbol = regex.exec(svgContent)) !== null) {
    const [_, id, attributes, content] = matchSymbol;
    // Adds only new icons
    if (!existingIcons.has(id)) {
      newIcons.push(id);
      const iconString =
        `export const ${id} = \`<svg id="${id}"${attributes}>${content}</svg>\`;\n`;
      existingContent += iconString;
    }
  }

  // If there are new icons, update AvailableIcons and the file
  if (newIcons.length > 0) {
    // Remove the existing AvailableIcons constant from the content
    existingContent = existingContent.replace(
      /export const AvailableIcons = { [^}|\n]* };/g,
      "",
    );
    // Adds all existing icons plus the new ones to the AvailableIcons constant
    const allIconsFiltered = [...existingIcons, ...newIcons].filter(
      (icon) => icon !== "AvailableIcons",
    );

    const availableIconsString = `export const AvailableIcons = { ${
      allIconsFiltered.join(", ")
    } };`;
    existingContent += `\n${availableIconsString}`;

    await Deno.writeTextFile(adminIconsFilePath, existingContent, {
      create: true,
    });
    console.log(`File ${adminIconsFilePath} updated.`);
  } else {
    console.log("No new admin icons to add.");
  }
}

await extractIconsFromSprite().catch(console.error);
await addIconsInSprite().catch(console.error);
await updateAdminIcons().catch(console.error);
