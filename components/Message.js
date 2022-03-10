import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import Link from "next/link";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function BottomAppBar() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/common/tag/`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <>
      <CssBaseline />
      <Paper square sx={{ p: "10px", position: "relative", mr: "7px" }}>
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          sx={{ p: 2, pb: 0 }}
        >
          おすすめタグ
        </Typography>
        {data && data.results && data.results.length > 0 && (
          <>
            {data.results.map((tag, i) => (
              <span key={`home_tag_i_${i}`} className="tag_side">
                <Link href={`/${tag.name}`}>
                  <a>{tag.name}</a>
                </Link>
              </span>
            ))}
          </>
        )}
      </Paper>
    </>
  );
}
