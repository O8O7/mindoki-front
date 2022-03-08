import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Loader from "react-loader-spinner";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Comment from "../Comment";

import Markdown from "../Markdown";

const CommentForm = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const message = useSelector((state) => state.auth.message);
  const status_code = useSelector((state) => state.auth.status_code);
  const loading = useSelector((state) => state.auth.loading);
  const [focus, setFocus] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    content: "",
  });

  const { content } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const onSubmit = async (data) => {
    const contentData = data.content;
    const id = props.id;
    const body = JSON.stringify({ contentData, id });
    fetch(`/api/${props.category}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    }).then((data) => {
      console.log(data.status);
      if (data.status == 201) {
        alert("コメントに成功しました");
        setFormData({ content: "" });
        setFocus(false);
        // window.location.reload();
      } else {
        alert("コメントに失敗しました");
      }
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginTop: "1em",
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {content && content.length > 0 && (
            <div
              style={{
                border: "1px dashed #000",
                padding: "0 1em",
                marginBottom: "10px",
              }}
            >
              <p style={{ padding: 0, margin: 0 }}>プレビュー</p>
              <Comment
                posted_at="YYYY/mm/dd/hh:mm"
                username="your name"
                comment={content}
              />
            </div>
          )}
          {message && <span style={{ color: "red" }}>{message}</span>}
          {user ? (
            <TextField
              {...register("content", {
                required: "*入力してください",
                minLength: {
                  value: 2,
                  message: "2文字以上入力してください",
                },
                maxLength: {
                  value: 500,
                  message: "500文字以下で入力してください",
                },
              })}
              name="content"
              required
              fullWidth
              rows={focus ? 4 : 1}
              id="content"
              onClick={handleFocus}
              onChange={onChange}
              label="内容を入力"
              value={content}
              multiline
            />
          ) : (
            <TextField
              disabled
              label="コメント機能はログインが必要です"
              fullWidth
            />
          )}
          <span style={{ color: "red" }}>{errors.content?.message}</span>
        </Grid>
      </Grid>
      {user ? (
        loading ? (
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
        )
      ) : (
        <Button
          disabled
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mb: 2 }}
        >
          ログインしてください
        </Button>
      )}
    </Box>
  );
};

export default CommentForm;
