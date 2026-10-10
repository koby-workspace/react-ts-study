import { constants, copyFileSync } from "node:fs";

const seedPath = new URL("../db.seed.json", import.meta.url);
const dataPath = new URL("../db.json", import.meta.url);
const reset = process.argv.includes("--reset");

try {
  copyFileSync(seedPath, dataPath, reset ? 0 : constants.COPYFILE_EXCL);
  console.log(reset ? "mock 데이터를 초기화했습니다." : "db.json을 생성했습니다.");
} catch (error) {
  if (!reset && error.code === "EEXIST") {
    console.log("기존 db.json을 유지합니다.");
  } else {
    throw error;
  }
}
