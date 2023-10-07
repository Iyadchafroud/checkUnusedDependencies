import fs from "fs";

import path from "path";
import shell from "shelljs";
import chalk from "chalk";
const args = process.argv;
const excludeDependenciesFromPruning = args.slice(2);
/**
 * Prunes unused dependencies from the package.json file.
 *
 * @param {string} packegeName - The name of the package.json file.
 * @param {Array<string>} dependenciestoPrune - An array of dependencies to prune.
 */
function prunePackageJson(packegeName, dependenciestoPrune) {
  console.log(
    chalk.bold.underline.blue(
      ` 🚀 Pruning unused dependencies operation started.`
    )
  );

  if (packegeName === "pnpm-lock.yaml") {
    shell.exec(`pmpm remove ${dependenciestoPrune.join(" ")}`);
  } else if (packegeName === "yarn.lock") {
    shell.exec(`yarn remove ${dependenciestoPrune.join(" ")}`);
  } else {
    shell.exec(`npm uninstall ${dependenciestoPrune.join(" ")}`);
  }
  console.log(chalk.bold.underline.green("✅ Unused Dependencies deleted."));
}

/**
 * Checks if a package lock file exists and assign the name of the file if it does exist to packagename
 *
 * @param {string} fileTocheck - The path of the file to check.
 * @return {void} - Does not return a value.
 */
function doesPackageLockExist(fileTocheck, lockPackageName) {
  try {
    const packageLockPath = path.join(process.cwd(), fileTocheck);
    const stat = fs.existsSync(packageLockPath);

    if (stat === true) {
      lockPackageName = fileTocheck;
    }
  } catch (error) {
    console.error({ error });
  }
}
/**
 * Executes a dependency check using the depcheck tool and prunes unnecessary dependencies from the package.json file.
 *
 * @param {string} packageName - The name of the package.json file to be pruned.
 * @return {void} This function does not return anything.
 */
function jsonDepCheck(packegeName) {
  try {
    const child = shell.exec("depcheck    --json  ", { async: true });

    child.stdout.on("data", function (data) {
      const dependenciesCanbePruned = [
        ...JSON.parse(data).dependencies,
        ...JSON.parse(data).devDependencies,
      ];
      console.log("🚀  dependenciesCanbePruned:", dependenciesCanbePruned);
      const PackageJsonToPrune = dependenciesCanbePruned.filter(
        (dependencie) => !excludeDependenciesFromPruning.includes(dependencie)
      );

      PackageJsonToPrune.length > 0 &&
        prunePackageJson(packegeName, PackageJsonToPrune);
    });
    child.stderr.on("data", function (data) {
      console.log(chalk.bold.underline.red("This is std err message", data));
    });
    child.on("close", function (code) {
      if (code === 0) {
        console.log(
          chalk.bold.underline.green(
            "✅ there is no unused Dependencies to be deleted."
          )
        );
      }
    });
  } catch (error) {
    chalk.bold.underline.red(
      "This is erorr message you need to install depcheck"
    );
  }
}
export { doesPackageLockExist, jsonDepCheck };
