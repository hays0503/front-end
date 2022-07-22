const qr_pdf = require("pdf-lib");
var QRCode = require("qrcode");

const generateQR = (text) => {
  const opts = {
    errorCorrectionLevel: "M",
    type: "image/png",
    quality: 0.92,
    margin: 1,
  };
  try {
    //console.log(await QRCode.toDataURL(text));
    return QRCode.toDataURL(text, opts);
  } catch (err) {
    console.error(err);
  }
};

async function modifyPdf(urlPdfDatabase) {
  //ссылка на pdf из бд
  const url = urlPdfDatabase;
  console.log("const url", url);
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
  const pdfDoc = await qr_pdf.PDFDocument.load(existingPdfBytes);
  //////////////////////////////////////////////////////////////////////////////
  const qrImage = await generateQR(urlPdfDatabase);
  console.log("const qrImage ", qrImage);
  const pngImage = pdfDoc.embedPng(qrImage);
  //////////////////////////////////////////////////////////////////////////////
  const jpgUrl = "https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg";
  const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer());
  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);

  const jpgDims = jpgImage.scale(0.5);
  const pngDims = pngImage.scale(0.5);

  const page = pdfDoc.addPage();

  page.drawImage(jpgImage, {
    x: page.getWidth() / 2 - jpgDims.width / 2,
    y: page.getHeight() / 2 - jpgDims.height / 2 + 250,
    width: jpgDims.width,
    height: jpgDims.height,
  });
  page.drawImage(pngImage, {
    x: page.getWidth() / 2 - pngDims.width / 2 + 75,
    y: page.getHeight() / 2 - pngDims.height + 250,
    width: pngDims.width,
    height: pngDims.height,
  });
  ///////////////////////////////////////////////////////////////////////////////
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  console.log("console.log(pdfDataUri); ", pdfDataUri);
  return JSON.stringify(pdfDataUri);
}
const getQrPdf = (urlPdfDatabase) => {
  return new Promise(function (resolve, reject) {
    resolve(modifyPdf(urlPdfDatabase));
  });
};

module.exports = {
  getQrPdf,
};
