import sharp from 'sharp';
import fs from 'fs';

async function generateLogos() {
  const fullImgPath = '/app/applet/public/webstack-logo-themed.png';
  const img = sharp(fullImgPath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // 1. Precise bounding box of Emblem (top part)
  let minX1 = w, maxX1 = 0, minY1 = h, maxY1 = 0;
  for (let y = 200; y < 1320; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      if (data[idx + 3] > 40) {
        if (x < minX1) minX1 = x;
        if (x > maxX1) maxX1 = x;
        if (y < minY1) minY1 = y;
        if (y > maxY1) maxY1 = y;
      }
    }
  }

  // 2. Precise bounding box of Text (bottom part)
  let minX2 = w, maxX2 = 0, minY2 = h, maxY2 = 0;
  for (let y = 1320; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      if (data[idx + 3] > 40) {
        if (x < minX2) minX2 = x;
        if (x > maxX2) maxX2 = x;
        if (y < minY2) minY2 = y;
        if (y > maxY2) maxY2 = y;
      }
    }
  }

  console.log('Emblem BBox:', { minX1, maxX1, minY1, maxY1, w: maxX1 - minX1, h: maxY1 - minY1 });
  console.log('Text BBox:', { minX2, maxX2, minY2, maxY2, w: maxX2 - minX2, h: maxY2 - minY2 });

  // Extract emblem cleanly
  const emblemBuf = await sharp(fullImgPath)
    .extract({
      left: minX1,
      top: minY1,
      width: maxX1 - minX1 + 1,
      height: maxY1 - minY1 + 1
    })
    .png()
    .toBuffer();

  await sharp(emblemBuf).toFile('/app/applet/public/webstack-emblem.png');
  await sharp(emblemBuf).toFile('/app/applet/src/assets/webstack-emblem.png');

  // Extract text cleanly
  const textBuf = await sharp(fullImgPath)
    .extract({
      left: minX2,
      top: minY2,
      width: maxX2 - minX2 + 1,
      height: maxY2 - minY2 + 1
    })
    .png()
    .toBuffer();

  // Create horizontal logo lockup: [Emblem] [WebStack]
  const targetH = 180;
  const resizedEmblem = await sharp(emblemBuf)
    .resize({ height: targetH })
    .toBuffer();
  const resEmblemMeta = await sharp(resizedEmblem).metadata();

  const textH = Math.round(targetH * 0.52);
  const resizedText = await sharp(textBuf)
    .resize({ height: textH })
    .toBuffer();
  const resTextMeta = await sharp(resizedText).metadata();

  const gap = 32;
  const paddingX = 20;
  const totalW = resEmblemMeta.width + gap + resTextMeta.width + paddingX * 2;
  const totalH = Math.max(resEmblemMeta.height, resTextMeta.height) + 20;

  const embY = Math.round((totalH - resEmblemMeta.height) / 2);
  const txtY = Math.round((totalH - resTextMeta.height) / 2);

  await sharp({
    create: {
      width: totalW,
      height: totalH,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([
    { input: resizedEmblem, left: paddingX, top: embY },
    { input: resizedText, left: paddingX + resEmblemMeta.width + gap, top: txtY }
  ])
  .png()
  .toFile('/app/applet/public/webstack-logo-horizontal.png');

  // Also save to src/assets
  await sharp('/app/applet/public/webstack-logo-horizontal.png')
    .toFile('/app/applet/src/assets/webstack-logo-horizontal.png');

  // Create favicon 128x128 and 64x64
  await sharp(emblemBuf)
    .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('/app/applet/public/favicon.png');

  console.log('All logo assets successfully generated!');
}

generateLogos().catch(console.error);
