import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState } from "react";
import Button from "@mui/material/Button";
import { v4 as uuid } from "uuid";

export default function CommentView() {
  const [commentText, setCommentText] = useState("");
  const [editCommentText, setEditCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [commentsData, setCommentsData] = useState([]);

  const onCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const cancelComment = () => {
    setCommentText("");
  };

  const addComment = () => {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);
    setCommentsData([
      ...commentsData,
      {
        id: small_id,
        comment: commentText,
        replies: [],
        editMode: false,
        replyMode: false
      }
    ]);
    setCommentText("");
  };

  const editOrReplyComment = (id, action, text) => {
    let newCommentData = commentsData.map((e) => {
      return e.id === id
        ? {
            ...e,
            [action]: true
          }
        : e;
    });

    if (action === "editMode") {
      setEditCommentText(text);
    }
    setCommentsData(newCommentData);
  };

  const onReplyTextChange = (e) => {
    setReplyText(e.target.value);
  };

  const cancelReply = (id) => {
    let newCommentData = commentsData.map((e) => {
      return e.id === id
        ? {
            ...e,
            replyMode: false
          }
        : e;
    });

    setCommentsData(newCommentData);
    setReplyText("");
  };

  const addReply = (id) => {
    let newCommentData = commentsData.map((e) => {
      return e.id === id
        ? {
            ...e,
            replies: [...e.replies, replyText],
            replyMode: false
          }
        : e;
    });

    setCommentsData(newCommentData);
    setReplyText("");
  };

  const onEditComment = (event) => {
    setEditCommentText(event.target.value);
  };

  const onSaveComment = (id) => {
    let newCommentData = commentsData.map((e) => {
      return e.id === id
        ? {
            ...e,
            comment: editCommentText,
            editMode: false
          }
        : e;
    });

    setCommentsData(newCommentData);
    setEditCommentText("");
  };

  return (
    <>
      {console.log(commentsData)}
      <Box display="flex" flexDirection="column" p={2}>
        <Box pt={1}>
          <TextField
            id="outlined-multiline-static"
            label="Add a comment..."
            multiline
            minRows={2}
            fullWidth
            value={commentText}
            onChange={onCommentChange}
          />
          <Box display="flex" py={1}>
            <Box flexGrow={1} />
            <Button
              size="small"
              style={{ textTransform: "none" }}
              onClick={cancelComment}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              style={{ textTransform: "none" }}
              onClick={addComment}
              disabled={!commentText}
            >
              Comment
            </Button>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" textAlign="left">
          {commentsData.map((e) => {
            return (
              <Box key={e.id} py={1}>
                <Box display="flex" flexDirection="column" pt={1}>
                  {!!e.editMode ? (
                    <>
                      <TextField
                        id="outlined-multiline-static"
                        label="Add a comment..."
                        multiline
                        minRows={2}
                        fullWidth
                        value={editCommentText}
                        onChange={onEditComment}
                      />
                      <Box display="flex" py={1} pl={0.5}>
                        <Button
                          size="small"
                          variant="contained"
                          style={{ textTransform: "none" }}
                          onClick={() => onSaveComment(e.id)}
                          disabled={!editCommentText}
                        >
                          Save
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      {e.comment}
                      <Box display="flex">
                        <Button
                          size="small"
                          onClick={() =>
                            editOrReplyComment(e.id, "editMode", e.comment)
                          }
                          style={{ textTransform: "none" }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          onClick={() => editOrReplyComment(e.id, "replyMode")}
                          style={{ textTransform: "none" }}
                        >
                          Reply
                        </Button>
                      </Box>
                    </>
                  )}
                  <Box pl={2.5}>
                    {!!e.replyMode && (
                      <Box display="flex" flexDirection="column" pt={1}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Add a reply..."
                          multiline
                          minRows={2}
                          fullWidth
                          value={replyText}
                          onChange={onReplyTextChange}
                        />
                        <Box display="flex" py={1}>
                          <Box flexGrow={1} />
                          <Button
                            size="small"
                            style={{ textTransform: "none" }}
                            onClick={() => cancelReply(e.id)}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            style={{ textTransform: "none" }}
                            onClick={() => addReply(e.id)}
                            disabled={!replyText}
                          >
                            Reply
                          </Button>
                        </Box>
                      </Box>
                    )}
                    {e.replies.length > 0 && (
                      <Box display="flex" flexDirection="column">
                        {e.replies.map((r) => {
                          return <Box py={0.5}>{r}</Box>;
                        })}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
