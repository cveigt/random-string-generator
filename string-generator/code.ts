// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

////////////////////////////////////////////////////////////////
// Random string with 32 characters

let stringResult = "";

function generateGenericString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?';
  let genericString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    genericString += characters.charAt(randomIndex);
  }

  // return randomString;
  // console.log(genericString);
  stringResult = genericString;
}

function generateTokenString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let tokenString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    tokenString += characters.charAt(randomIndex);
  }

  stringResult = tokenString;
}

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

// Usage:
// const randomString = generateRandomString(32);
// console.log(randomString);

////////////////////////////////////////////////////////////////
// Random string with ...


figma.ui.onmessage = async(pluginMessage) => {

  await figma.loadFontAsync({family: "Inter", style: "Black"});

  for (const node of figma.currentPage.selection) {
    if (pluginMessage.dataType === "api-key") {
      // node.opacity *= 0.5
      generateGenericString(pluginMessage.charLength);
      node.characters = stringResult;

    } else if (pluginMessage.dataType === "token") {
      generateTokenString(pluginMessage.charLength);
      node.characters = stringResult;

    } else if (pluginMessage.dataType === "sid") {
      generateSidString(pluginMessage.charLength);
      node.characters = `${pluginMessage.prefix}${stringResult}`;
    }
  }
  
  figma.closePlugin();
}

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

/*
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  } 

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
 */