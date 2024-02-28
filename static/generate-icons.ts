import { existsSync } from 'https://deno.land/std/fs/mod.ts';

const svgFilePath = "static/sprites.svg";
const outputFilePath = "static/adminIcons.ts";

async function generateIconsFile() {
  const svgContent = await Deno.readTextFile(svgFilePath);

  const regex = /<symbol id="(.+?)"(.+?)>(.+?)<\/symbol>/gs;
  let match;
  let svgStrings = '';
  let iconNames = [];

  while ((match = regex.exec(svgContent)) !== null) {
    const [fullMatch, id, attributes, content] = match;
    svgStrings += `export const ${id} = \`<svg id="${id}"${attributes}>${content}</svg>\`;\n`;
    iconNames.push(id);
  }

  const outputFileContent = `${svgStrings}\nexport const AvailableIcons = { ${iconNames.join(', ')} };`;

  await Deno.writeTextFile(outputFilePath, outputFileContent);

  console.log('Icons as string file generated successfully.');
}

if (existsSync(outputFilePath)) {
  console.log('Icons as string file already exists. Skipping generation.');
} else {
  generateIconsFile().catch(console.error);
}