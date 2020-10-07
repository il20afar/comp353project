import React from "react";
import a from "./a.jpeg";
import b from "./b.jpeg";
import c from "./c.jpeg";
import d from "./d.jpeg";
import e from "./e.jpeg";
import f from "./f.jpeg";

const images = [a, b, c, d, e, f].map((elem) => (
  <img src={elem} alt={`./${elem}.jpeg`} />
));

export default images;
