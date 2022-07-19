import React from "react";
import { CircularProgress } from "@material-ui/core";

export default function Loading() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#f0f2f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
}
