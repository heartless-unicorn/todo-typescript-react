interface Issue {
  name: string;
  id: number;
  creator_id: string;
  created_at: string;
  comments: number;
}
interface Repo {
  open: Array<Issue>;
  progress: Array<Issue>;
  done: Array<Issue>;
}
interface NamedRepo {
  [key: string]: Repo;
}

interface movebleItem {
  id: string;
  curPosition: string;
  path: string;
  source: string;
}

interface Context {
  issuesPath: string;
  setIssuesPath: React.Dispatch<React.SetStateAction<string>>;
}
export type { Issue, Repo, NamedRepo, movebleItem, Context };
