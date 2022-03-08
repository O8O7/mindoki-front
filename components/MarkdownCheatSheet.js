import Markdown from "./Markdown";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData("見出し1", "# 見出し1"),
  createData("見出し2", "## 見出し2"),
  createData("見出し3", "### 見出し3"),
  createData("見出し4", "#### 見出し4"),
  createData("見出し5", "##### 見出し5"),
  createData("見出し6", "###### 見出し6"),
  createData("改行", "スペース\n\n2つ"),
  //   createData("改行キャンセル", "バック \\スラッシュ"),
  createData("引用", "> Blockquote"),
  createData("コード", "```python\r\nimport datetime\n```"),
  createData("インラインコード", "`pip install django`"),
  createData("水平線", "---"),
  createData("箇条書き", "- リスト"),
  createData("番号付き箇条書き", "1) リスト"),
  createData("イタリック", "*イタリック*"),
  createData("ストロング", "**ストロング**"),
  createData("リンク", "[Google](https://www.google.com)"),
  createData("画像", "![Image](URL)"),
  //   createData("テーブル", "| TH1 | TH2 | \n----|----"),
  //   createData("テーブル", "- [x] not"),
];

export default function MarkdownCheatSheet() {
  return (
    <>
      <h2 style={{ textAlign: "center", margin: "5px" }}>
        Markdown記法チートシート
      </h2>
      <TableContainer
        sx={{ whiteSpace: "nowrap", borderRadius: 0 }}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: "0.5em" }} align="center">
                種類
              </TableCell>
              <TableCell sx={{ padding: "0.5em" }} align="center">
                書き方(例)
              </TableCell>
              <TableCell sx={{ padding: "0.5em" }} align="center">
                結果
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell sx={{ padding: "0.5em" }} align="center">
                  {row.name}
                </TableCell>
                <TableCell sx={{ padding: "0.5em" }} align="center">
                  {row.calories}
                </TableCell>
                <TableCell sx={{ padding: "0.5em", margin: 0 }} align="center">
                  <Markdown description={row.calories} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
