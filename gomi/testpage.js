import Markdown from "../components/Markdown";
import { Container } from "@mui/material";
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
  //   createData("段落", 49),
  //   createData("Br 改行", 3.9),
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

export default function BasicTable() {
  return (
    <TableContainer sx={{ marginTop: "100px" }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">書き方(例)</TableCell>
            <TableCell align="center">結果</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">
                <Markdown description={row.calories} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
