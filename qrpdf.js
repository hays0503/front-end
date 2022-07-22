const qr_pdf = require("pdf-lib");
var QRCode = require("qrcode");

function createQr(urlPdfDatabase) {
  const qrcode = QRCode.toDataURL(urlPdfDatabase);
  console.log("qrcode: ", qrcode.resolve());
}

function setQr(url) {
  console.log(url);
}

async function modifyPdf(urlPdfDatabase) {
  //ссылка на pdf из бд
  const url = urlPdfDatabase;
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await qr_pdf.PDFDocument.load(existingPdfBytes);
  //////////////////////////////////////////////////////////////////////////////
  const toDataURLImage = createQr(url);
  console.log("toDataURLImage: ", toDataURLImage);
  //////////////////////////////////////////////////////////////////////////////
  const jpgUrl = "https://pdf-lib.js.org/assets/cat_riding_unicorn.jpg";

  const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer());

  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);

  const jpgDims = jpgImage.scale(0.5);

  const page = pdfDoc.addPage();

  page.drawImage(jpgImage, {
    x: page.getWidth() / 2 - jpgDims.width / 2,
    y: page.getHeight() / 2 - jpgDims.height / 2 + 250,
    width: jpgDims.width,
    height: jpgDims.height,
  });
  ///////////////////////////////////////////////////////////////////////////////
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  //console.log(pdfDataUri);
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
