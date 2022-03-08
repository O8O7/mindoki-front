import cookie from "cookie";

export default async function Rest(req, res) {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    if (access === false) {
      return res.status(401).json({
        error: "アクセストークンがありません",
      });
    }

    const { language, title, tag, description, is_public } = req.body;

    const body = JSON.stringify({
      language,
      title,
      tag,
      description,
      is_public,
    });

    try {
      const apiRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/article/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${access}`,
          },
          body: body,
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
