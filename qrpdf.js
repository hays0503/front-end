const qr_pdf = require("pdf-lib");
var QRCode = require("qrcode");
var FetchApi = require("node-fetch");

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

function buildQrCodeUrl(str) {
  return new Promise(function (resolve, reject) {
    QRCode.toDataURL(str, function (err, url) {
      if (err) {
        console.error("buildQrCodeUrl: ", err, str);
        reject(err);
        return;
      }
      //console.log("buildQrCodeUrl:", url);
      resolve(url);
    });
  });
}

async function modifyPdf(urlPdfDatabase) {
  //ссылка на pdf из бд
  const url = urlPdfDatabase;
  console.log("const url", url);
  const existingPdfBytes = await FetchApi(url).then((res) => res.arrayBuffer());
  const pdfDoc = await qr_pdf.PDFDocument.load(existingPdfBytes);
  //////////////////////////////////////////////////////////////////////////////
  // const qrImage = await buildQrCodeUrl(urlPdfDatabase);
  // console.log("const qrImage ", qrImage);
  // const pngImage = pdfDoc.embedPng(qrImage);
  // //////////////////////////////////////////////////////////////////////////////
  // const pngDims = pngImage.scale(0.5);

  // const page = pdfDoc.addPage();

  // page.drawImage(pngImage, {
  //   x: page.getWidth() / 2 - pngDims.width / 2 + 75,
  //   y: page.getHeight() / 2 - pngDims.height + 250,
  //   width: pngDims.width,
  //   height: pngDims.height,
  // });
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
