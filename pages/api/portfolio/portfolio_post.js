import cookie from "cookie";

export default async function PortfolioPost(req, res) {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    if (access === false) {
      return res.status(401).json({
        error: "アクセストークンがありません",
      });
    }

    const formData = req.body;

    try {
      const apiRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/`,
        {
          method: "POST",
          headers: {
            Authorization: `JWT ${access}`,
          },
          body: formData,
        }
      );

      const data = await apiRes.json();

      if (apiRes.status === 200) {
        return res.status(apiRes.status).json({
          message: "記事投稿に成功しました",
        });
      } else {
        return res.status(apiRes.status).json({
          error: "記事投稿に失敗しました",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "記事投稿に失敗しました",
      });
    }
  } else {
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
}
