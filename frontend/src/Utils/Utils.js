import * as React from "react";
import { v4 as uuid } from "uuid";

// [HELPER COMPONENTS] -> Better code styling
const D = React.forwardRef((props, ref) => {
  const { cn, ...rest } = props;
  return <div ref={ref} className={cn} {...rest} />;
});

const readUploadedFileAsText = (inputFile) => {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsDataURL(inputFile);
  });
};

const filesToBase64 = async (files) =>
  await Promise.all(files.map((file) => readUploadedFileAsText(file)));

const data = {
  send: async (table, action, fields) => {
    try {
      const req = await fetch(process.env.REACT_APP_PHP_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table,
          action,
          ...fields,
        }),
      });
      const res = await req.json();
      return res;
    } catch (error) {
      return error.toString();
    }
  },
};

const HighlightedContent = (props) => {
  const { content, searchTerm } = props;

  const separatedString = content
    .replace(searchTerm, `*&*${searchTerm}*&*`)
    .split("*&*");

  return searchTerm === ""
    ? content
    : separatedString.map((elem) => (
        <span
          key={uuid()}
          style={elem === searchTerm ? { color: "#f55538" } : {}}
        >
          {elem}
        </span>
      ));
};

export { D, data, HighlightedContent, filesToBase64 };
