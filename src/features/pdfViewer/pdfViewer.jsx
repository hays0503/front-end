import React, { memo, useRef, useEffect } from "react";
import "./css/pdfViewer.css";

const PdfViewer = memo(() => {
  let base64pdf = null;
  const pdfViewerRef = useRef();
  const setPdf = () => {
    fetch(
      //   process.env.PUBLIC_URL +
      "http://localhost:3001/" +
        "get_pdf?urlpdf=https://pdf-lib.js.org/assets/with_update_sections.pdf"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        console.log(data);
        base64pdf = data;
        pdfViewerRef.current.src = data;
      })
      .catch((error) => {
        if (error) {
          alert("Что то случилось с бд ! ");
        }
      });
  };

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      console.log("setPdf 1-1 рендер");
      setPdf();
      console.log("setPdf 1-2 рендер");
    } else {
      console.log("setPdf 3 рендер");
    }
  });

  return (
    <div className="pdfViewer">
      {base64pdf}
      <iframe
        title="pdf"
        width={"100%"}
        height={"100%"}
        ref={pdfViewerRef}
      ></iframe>
    </div>
  );
});

export default PdfViewer;
