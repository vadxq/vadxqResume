import { InitCmd } from "../commands";
import { AbstractAction } from "./abstract.action";
import * as path from "path";
import { requestUrl } from "../utils/download";
import { isRewrite, formatDate } from "../utils/utils";
import { getGitInfo, readConfig } from "../utils/info";
import { optionView } from "../ui/optionInput";
import { initSelector } from "../views/initSelector";

interface initData {
  username: string;
  repo: string;
  branch: string;
  download: string | undefined;
  path: string | undefined;
  repoSource: number;
}

interface initUIValue {
  tpl: string;
  path: string;
}

export class InitAction extends AbstractAction {
  public async handle(inputs: InitCmd) {
    var config = readConfig();
    //github
    let data = {
      username:
        inputs.options.username || config.repoSource === 0
          ? config.github!.username
          : config.gitlab!.username,
      repo:
        inputs.options.repo || config.repoSource === 0
          ? config.github!.repo
          : config.gitlab!.repo,
      branch:
        inputs.options.branch || config.repoSource === 0
          ? config.github!.branch
          : config.gitlab!.branch || "master",
      download: inputs.tpl,
      path: inputs.path,
      repoSource: config.repoSource
    };
    if (!data.download) {
      showInitUI(data);
      return;
    }
    isRewrite(data.path, () => {
      initTpl(data, inputs.options.others);
    });
  }
}
/**
 * Show init GUI
 * @param data
 */
function showInitUI(data: initData) {
  initSelector({
    ...data,
    onSubmit: (value: initUIValue) => {
      data.download = value.tpl;
      data.path = value.path;
      initTpl(data, true);
    }
  });
}

function initTpl(data: initData, others: boolean) {
  if (!data.path && data.download) {
    data.path = path.basename(data.download).split(".")[0];
  }
  var name = path.basename(data.path as string);
  const gitInfo = getGitInfo();

  var options: { [k: string]: any } = { name, date: formatDate(new Date()) };

  if (gitInfo.name) {
    options.author = gitInfo.name;
  }
  if (gitInfo.email) {
    options.email = gitInfo.email;
  }

  doDownload(data, options);
}

const doDownload = (data: any, options: any) => {
  // use command down
  // requestUrl(
  //   data.username,
  //   data.repo,
  //   data.branch,
  //   data.download as string,
  //   data.path as string,
  //   options
  // );
};
