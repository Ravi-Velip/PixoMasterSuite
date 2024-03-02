const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputFolder = './input';
const outputFolder = './output';
const cropPixels = 400; // Change this value based on your requirement

// Create output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

// Process each image in the input folder
fs.readdirSync(inputFolder).forEach((file) => {
    const inputImagePath = path.join(inputFolder, file);
    const outputImagePath = path.join(outputFolder, `cropped_${file}`);

    // Use sharp to resize or crop images
    sharp(inputImagePath)
        .resize({
            width: cropPixels,
            height: cropPixels,
            fit: sharp.fit.contain, // or sharp.fit.cover, depending on your needs
            background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .extract({ left: 0, top: 0, width: cropPixels, height: cropPixels })
        .toFile(outputImagePath)
        .then(() => {
            console.log(`Successfully processed ${file}`);
        })
        .catch((err) => {
            console.error(`Error processing ${file}:`, err);
        });
});
