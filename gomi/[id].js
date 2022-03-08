import { useRouter } from "next/router";

export default async (req, res) => {
  const { id } = useRouter();

  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    if (access === false) {
      return res.status(401).json({
        error: "アクセストークンがありません",
      });
    }

    const body = JSON.stringify({
      id,
    });

    try {
      const apiRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/article/good/`,
        {
          method: "POST",
          headers: {
            Authorization: `JWT ${access}`,
          },
        }
      );
      const data = await apiRes.json();

      if (apiRes.status === 200) {
        return res.status(200).json({
          data,
        });
      } else {
        return res.status(apiRes.status).json({
          error: "グッドに失敗しました",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "グッドに失敗しました",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
};
