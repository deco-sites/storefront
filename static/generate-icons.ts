import { existsSync } from 'https://deno.land/std/fs/mod.ts';

const svgFilePath = "static/sprites.svg";
const outputFilePath = "static/adminIcons.ts";

async function generateIconsFile() {
  const svgContent = await Deno.readTextFile(svgFilePath);
  let existingContent = '';
  let existingIcons = new Set();
  let newIcons = [];
  
  // Verifies if adminIcons.ts already exists and reads the icons from there
  if (existsSync(outputFilePath)) {
    existingContent = await Deno.readTextFile(outputFilePath);
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
      const iconString = `export const ${id} = \`<svg id="${id}"${attributes}>${content}</svg>\`;\n`;
      existingContent += iconString;
    }
  }

  // If there are new icons, update AvailableIcons and the file
  if (newIcons.length > 0) {
    // Remove the existing AvailableIcons constant from the content
    existingContent = existingContent.replace(/export const AvailableIcons = { [^}]* };/g, '');
    // Adds all existing icons plus the new ones to the AvailableIcons constant
    const allIconsFiltered = [...existingIcons, ...newIcons].filter(icon => icon !== "AvailableIcons");
    const availableIconsString = `export const AvailableIcons = { ${allIconsFiltered.join(', ')} };`;
    existingContent += `\n${availableIconsString}`;

    await Deno.writeTextFile(outputFilePath, existingContent, { create: true });
    console.log('adminIcons.ts updated successfully with new icons.');
  } else {
    console.log('No new icons to add.');
  }
}

generateIconsFile().catch(console.error);