const fs = require("fs");
const path = require("path");
const prDist = path.join(__dirname, "project-dist");
const htmlFile = path.join(__dirname, "project-dist", "index.html");
const template = path.join(__dirname, "template.html");
const cssFile = path.join(__dirname, "project-dist", "style.css");
const styles = path.join(__dirname, "styles");
const assetsNew = path.join(__dirname, "project-dist", "assets");
const assets = path.join(__dirname, "assets");
const components = path.join(__dirname, "components");
const bundleCss = fs.createWriteStream(cssFile);

async function buildPage() {
  fs.mkdir(prDist, { recursive: true }, (err) => {
    if (err) {
      console.log("error");
    }
  });
  fs.mkdir(assetsNew, { recursive: true }, (err) => {
    if (err) {
      console.log("error");
    }
  });
  async function copyAssets(dec, copy) {
    await fs.promises.readdir(dec, { withFileTypes: true }).then((files) => {
      files.forEach((file) => {
        if (file.isDirectory()) {
          copyAssets(path.join(dec, file.name), path.join(copy, file.name));
        } else {
          fs.mkdir(copy, { recursive: true }, (err) => {
            if (err) {
              console.log("error");
            }
          });
          fs.promises.copyFile(
            path.join(dec, file.name),
            path.join(copy, file.name)
          )};
      });
    });
  };
  copyAssets(assets, assetsNew);
  async function cssCopy() {
    fs.promises.readdir(styles, { withFileTypes: true }).then((files) => {
      files.forEach((file) => {
        const extFile = path.extname(file.name);
        if (file.isFile() && extFile === ".css") {
          const stream = fs.createReadStream(path.resolve(styles, file.name));
          stream.on("data", (data) => bundleCss.write(data));
        }
      });
    });
  }
  cssCopy();
  async function htmlCopy() {
    const stream = fs.createWriteStream(htmlFile);
    const templateFile = fs.createReadStream(template);
    templateFile.on("data", async (data) => {
      const getHTML = async () => {
        let reg = data.toString(),
          files = await fs.promises.readdir(components);
        for (let file of files) {
          const res = await fs.promises.readFile(path.join(components, file));
          const str = path.parse(path.join(components, file));
          reg = reg.replace(`{{${str.name}}}`, `${res}`);
        };
        return reg;
      };
      const htmlNew = await getHTML();
      stream.write(htmlNew);
    });
  };
  htmlCopy();
};
buildPage();
