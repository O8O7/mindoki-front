import { useForm } from "react-hook-form";
import { useRef, useCallback, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Autocomplete } from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import ReactTags from "react-tag-autocomplete";
import MarkdownDialog from "../MarkdownDialog";

const PortfolioForm = (props) => {
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);

  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  const message = useSelector((state) => state.auth.message);
  const loading = useSelector((state) => state.auth.loading);
  const [isPublic, setIsPublic] = useState(false);
  const [language, setLanguage] = useState("");

  const reactTags = useRef();

  const onDelete = useCallback(
    (tagIndex) => {
      setTags(tags.filter((_, i) => i !== tagIndex));
    },
    [tags]
  );

  const onAddition = useCallback(
    (newTag) => {
      setTags([...tags, newTag]);
    },
    [tags]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = () => {
    setIsPublic(!isPublic);
  };

  const { title, content } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data) => {
    if (language && data.title && data.content && image && image.length <= 5) {
      let access = false;
      try {
        access = document.cookie
          .split("; ")
          .find((row) => row.startsWith("access"))
          .split("=")[1];
      } catch (err) {
        alert("アクセストークンがありません");
        return;
      }

      const formData = new FormData();
      formData.append("language", language);

      formData.append("title", data.title);
      formData.append("description", data.content);
      for (let i = 0; i < tags.length; i++) {
        formData.append("tag", tags[i].name);
      }
      for (let i = 0; i < image.length; i++) {
        formData.append("images", image[i]);
      }
      formData.append("is_public", isPublic ? "True" : "False");
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/`, {
        method: "POST",
        headers: {
          Authorization: `JWT ${access}`,
        },
        body: formData,
      }).then((data) => {
        if (data.status == 201) {
          alert("記事投稿に成功しました");
          router.replace("/portfolio");
        } else {
          alert("記事投稿に失敗しました");
        }
      });
    } else if (!image) {
      alert("画像を選択してください");
    } else if (image && image.length >= 5) {
      alert("画像は5枚以下で選択してください");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            fullWidth
            options={props.languages}
            onChange={(event, value) => {
              if (value) {
                setLanguage(value.label);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="言語を選択"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("title", {
              required: "*入力してください",
              minLength: {
                value: 2,
                message: "2文字以上入力してください",
              },
              maxLength: {
                value: 64,
                message: "64文字以下で入力してください",
              },
            })}
            // autoComplete="given-name"
            name="title"
            required
            fullWidth
            id="title"
            onChange={onChange}
            label="タイトル"
            value={title}
            autoFocus
          />
          <span style={{ color: "red" }}>{errors.title?.message}</span>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <label htmlFor="image">
              紹介画像を1枚以上5枚以下で選択してください
            </label>
            <input
              name="image"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImage(e.target.files)}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <ReactTags
            ref={reactTags}
            tags={tags}
            suggestions={suggestions}
            onDelete={onDelete}
            onAddition={onAddition}
            placeholderText="タグを入力"
            allowNew
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("content", {
              required: "*入力してください",
              minLength: {
                value: 2,
                message: "2文字以上入力してください",
              },
              maxLength: {
                value: 100000,
                message: "100000文字以下で入力してください",
              },
            })}
            name="content"
            required
            fullWidth
            rows={20}
            id="content"
            onChange={onChange}
            label="内容を入力"
            value={content}
            autoFocus
            multiline
          />
          <span style={{ color: "red" }}>{errors.content?.message}</span>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                value="allowExtraEmails"
                color="primary"
              />
            }
            label="公開する"
          />
          <MarkdownDialog />
        </Grid>
      </Grid>
      <br />
      {message && <span style={{ color: "red" }}>{message}</span>}
      {loading ? (
        <Loader type="Oval" color="#F59E00" width={50} height={50} />
      ) : (
        <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
          送信
        </Button>
      )}
    </Box>
  );
};

export default PortfolioForm;
