import chalk from "chalk";

export default class Logging {
  public static info(args: any): void {
    console.log(
      chalk.blue(`[${new Date().toLocaleString()}][INFO]`),
      typeof args === "string" ? chalk.blueBright(args) : args
    );
  }

  public static warn(args: any) {
    console.log(
      chalk.yellow(`[${new Date().toLocaleString()}][INFO]`),
      typeof args === "string" ? chalk.yellowBright(args) : args
    );
  }

  public static error(args: any): void {
    console.log(
      chalk.red(`[${new Date().toLocaleString()}][INFO]`),
      typeof args === "string" ? chalk.redBright(args) : args
    );
  }

  public static log(arg: any): void {
    this.info(arg);
  }
}
