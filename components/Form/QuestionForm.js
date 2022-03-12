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

import ReactTags from "react-tag-autocomplete";
import MarkdownDialog from "../MarkdownDialog";
import QuestionDetail from "../Detail/QuestionDetail";
import { post_question } from "../../reduxs/actions/question";

const QuestionForm = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const message = useSelector((state) => state.auth.message);
  //   const loading = useSelector((state) => state.auth.loading);
  const [loading, setLoading] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [tags, setTags] = useState([]);
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

  const { title, content } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data) => {
    // if (dispatch && dispatch !== null && dispatch !== undefined) {
    //   await dispatch(post_question(language, data.title, tags, data.content));
    // }
    if (language && data.title && data.content) {
      setLoading(true);
      const body = JSON.stringify({
        language: language,
        title: data.title,
        tag: tags,
        description: data.content,
      });
      fetch("/api/question/rest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      }).then((data) => {
        if (data.status == 201) {
          alert("Q&A投稿に成功しました");
          router.replace("/question");
        } else {
          alert("Q&A投稿に失敗しました");
        }
      });
      setLoading(false);
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
        {content && (
          <Grid item xs={12}>
            <div
              style={{
                border: "1px dashed #000",
                padding: "0 1em",
                marginBottom: "10px",
              }}
            >
              <p style={{ padding: 0, margin: 0 }}>プレビュー</p>
              <QuestionDetail
                title="投稿したタイトルが入ります"
                posted_at="yyyy/mm/dd/"
                edited_at="yyyy/mm/dd/"
                description={content}
                comment={0}
                good={0}
              />
            </div>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            {...register("content", {
              required: "*入力してください",
              minLength: {
                value: 2,
                message: "2文字以上入力してください",
              },
              maxLength: {
                value: 50000,
                message: "50000文字以下で入力してください",
              },
            })}
            name="content"
            required
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                setFormData({ ...formData, content: content + "  " });
              }
            }}
            fullWidth
            rows={15}
            id="content"
            onChange={onChange}
            label="内容を入力"
            value={content}
            autoFocus
            multiline
            sx={{ tabSize: 2 }}
          />
          <span style={{ color: "red" }}>{errors.content?.message}</span>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            // justifyContent: "space-between",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <MarkdownDialog />
        </Grid>
      </Grid>
      <br />
      {message && <span style={{ color: "red" }}>{message}</span>}
      {loading ? (
        <Loader
          style={{ textAlign: "center" }}
          type="Oval"
          color="#F59E00"
          width={50}
          height={50}
        />
      ) : (
        <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
          送信
        </Button>
      )}
    </Box>
  );
};

export default QuestionForm;
