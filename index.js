#!/usr/bin/env node

import { doesPackageLockExist, jsonDepCheck } from "./utils.js";
let packegeName = "package-lock.json";

const filestocheck = ["package-lock.json", "yarn.lock", "pnpm-lock.yaml"];

for (const file of filestocheck) {
  doesPackageLockExist(file, packegeName);
}

jsonDepCheck(packegeName);
