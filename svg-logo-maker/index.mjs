import inquirer from 'inquirer';
import fs from 'fs';
import { Circle, Triangle, Square } from './lib/shapes.mjs';

// Function to get user input
async function getUserInput() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter text for the logo (up to 3 characters):',
      validate: input => input.length <= 3 || 'Text must be 3 characters or less'
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hexadecimal):'
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape for the logo:',
      choices: ['circle', 'triangle', 'square']
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hexadecimal):'
    }
  ]);

  return answers;
}

// Function to generate SVG based on user input
function generateSVG({ text, textColor, shape, shapeColor }) {
  let shapeElement;

  switch (shape) {
    case 'circle':
      shapeElement = new Circle();
      break;
    case 'triangle':
      shapeElement = new Triangle();
      break;
    case 'square':
      shapeElement = new Square();
      break;
  }

  shapeElement.setColor(shapeColor);

  const svg = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shapeElement.render()}
      <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>
  `;

  return svg;
}

// Main function to run the application
async function main() {
  const answers = await getUserInput();
  const svgContent = generateSVG(answers);

  fs.writeFileSync('logo.svg', svgContent.trim());

  console.log('Generated logo.svg');
}

main();