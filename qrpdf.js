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
  const opts = {
    errorCorrectionLevel: "M",
    type: "image/png",
    quality: 0.92,
    margin: 1,
  };
  return new Promise(function (resolve, reject) {
    QRCode.toDataURL(str, opts, function (err, url) {
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
  ////////////////////////////////////////////////////////////////////////////
  const qrImage = await generateQR(urlPdfDatabase);
  console.log("const qrImage ", qrImage);
  const pngImage = await pdfDoc.embedPng(qrImage);
  //////////////////////////////////////////////////////////////////////////////

  const page = pdfDoc.addPage();

  page.drawImage(pngImage, {
    x: page.getWidth() / 2 - 256 / 2 + 75,
    y: page.getHeight() / 2 - 256 + 250,
    width: 256,
    height: 256,
  });
  /////////////////////////////////////////////////////////////////////////////
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
