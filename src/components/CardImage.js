import React, { useState } from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  imageLoader: {
    padding: theme.spacing(8),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function CardImage({ className, src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const classes = useStyles();
  return (
    <>
      {!isLoaded && (
        <div className={classes.imageLoader}>
          <CircularProgress />
        </div>
      )}
      <img
        className={className}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
    </>
  );
}
