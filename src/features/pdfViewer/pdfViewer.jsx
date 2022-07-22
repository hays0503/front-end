import React, { memo, useRef, useEffect, useState } from "react";
import "./css/pdfViewer.css";

const PdfViewer = memo(() => {
  const pdfViewerRef = useRef();
  const pdfUrlRef = useRef(null);
  const [isUrlEmpty, setIsUrlEmpty] = useState(false);

  const setPdf = (urlPdf) => {
    console.log(process.env.PUBLIC_URL + "/get_pdf?urlpdf=" + urlPdf);
    fetch(process.env.PUBLIC_URL + "/get_pdf?urlpdf=" + urlPdf)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        console.log(data);
        pdfViewerRef.current.src = data;
      })
      .catch((error) => {
        if (error) {
          alert("Что то случилось с бд ! ");
        }
      });
  };

  const handleSubmit = (e) => {
    setIsUrlEmpty(true);
    setPdf(pdfUrlRef.current.value);
  };

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      console.log("setPdf 1-1 рендер");
      //setPdf();
      console.log("setPdf 1-2 рендер");
    } else {
      console.log("setPdf 3 рендер");
    }
  });

  return (
    <div className="pdfViewer">
      <div>
        <p>Загрузить и изменить(добавить qr-код) pdf</p>
        <input type="text" ref={pdfUrlRef} placeholder="Ссылку на pdf сюда" />
        <button onClick={() => handleSubmit()}>
          Запросить изменённый pdf{" "}
        </button>
      </div>
      <div>
        {!isUrlEmpty ? (
          <img
            style={{
              width: "50%",
              height: "50%",
              webKitClipPath: "inset(5px 21% 5px 23% round 5%)",
              clipPath: "inset(5px 21% 5px 23% round 5%)",
            }}
            src="https://icdn.lenta.ru/images/2017/01/26/14/20170126145423288/preview_007275b2bef5897c77d648cac2b0097c.jpg"
            alt="img"
          />
        ) : (
          <iframe
            style={{
              alignSelf: "flex-start",
              width: "95vw",
              height: "85vh",
            }}
            title="pdf"
            width={"100%"}
            height={"100%"}
            ref={pdfViewerRef}
          ></iframe>
        )}
      </div>
    </div>
  );
});

export default PdfViewer;
