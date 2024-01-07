// This plugin will generate random string values for each node selected in a Figma file.

// This file holds the main code/logic for the plugin. Code in this file has access to
// the *figma document* via the figma global object.


// This shows the HTML page in "ui.html".
figma.showUI(__html__);

figma.ui.resize(400, 420);

let stringResult = "";

// Random string - API key
function generateApiKeyString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';
  let genericString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    genericString += characters.charAt(randomIndex);
  }

  stringResult = genericString;
}

// Random string - Auth token
function generateTokenString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let tokenString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    tokenString += characters.charAt(randomIndex);
  }

  stringResult = tokenString;
}

// Random string - SID
function generateSidString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let sidString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sidString += characters.charAt(randomIndex);
  }

  console.log(sidString);
  stringResult = sidString;
}

// Random string - Generic
function generateGenericString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?';
  let genericString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    genericString += characters.charAt(randomIndex);
  }

  stringResult = genericString;
}

figma.ui.onmessage = async(pluginMessage) => {

  await figma.loadFontAsync(figma.currentPage.selection[0].fontName);

  for (const node of figma.currentPage.selection) {
    if (pluginMessage.dataType === "api-key") {
      // node.opacity *= 0.5
      generateApiKeyString(pluginMessage.charLength);
      node.characters = stringResult;

    } else if (pluginMessage.dataType === "token") {
      generateTokenString(pluginMessage.charLength);
      node.characters = stringResult;

    } else if (pluginMessage.dataType === "sid") {
      generateSidString(pluginMessage.charLength);
      node.characters = `${pluginMessage.prefix}${stringResult}`;
      
    } else if (pluginMessage.dataType === "generic") {
      generateGenericString(pluginMessage.charLength);
      node.characters = `${pluginMessage.prefix}${stringResult}`;
    } 
  }
  
  figma.closePlugin();
}