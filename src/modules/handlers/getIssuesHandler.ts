import { octokit } from "../../helpers/key";
import type { Issue, NamedRepo } from "../../helpers/interfaces";

export async function getIssuesHandler(
  owner: string,
  repo: string
): Promise<NamedRepo> {
  const repoName: string = `${owner}-${repo}`;

  return await octokit
    .request(`GET /repos/${owner}/${repo}/issues`, {
      owner,
      repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      state: "all",
      per_page: 10,
    })
    .then((response) => {
      const repInfo: NamedRepo = {
        [repoName]: {
          open: [],
          progress: [],
          done: [],
        },
      };
      response.data.map((el: any) => {
        const issueObj: Issue = {
          name: el.title,
          id: el.number,
          creator_id: el.user.login,
          created_at: el.created_at,
          comments: el.comments,
        };
        if (el.state === "closed") {
          repInfo[repoName].done.push(issueObj);
        } else if (el.state === "open") {
          if (el.assignee !== null) {
            repInfo[repoName].progress.push(issueObj);
          } else {
            repInfo[repoName].open.push(issueObj);
          }
        }
      });

      return repInfo;
    });
}
