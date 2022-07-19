import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Rightbar from "./Rightbar";
import { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  accordion: {
    position: "fixed",
    right: 10,
    width: "450px",
    bottom: "0",
    right: "20px",
    borderRadius: "0.8rem 0.8rem 0 0",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  accordionHeader: {
    width: "100%",
    borderRadius: "0.8rem 0.8rem 0 0",
  },
}));

export default function OnlineFriends() {
  const classes = styles();
  const theme = useTheme();
  const [expand, setExpand] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setExpand(!isMobile);
  }, [isMobile]);

  const handleChange = () => {
    setExpand(!expand);
  };

  return (
    <Accordion
      className={classes.accordion}
      expanded={expand}
      onChange={handleChange}
      square={false}
    >
      <AccordionSummary expandIcon={<ExpandLessIcon />} className={classes.accordionHeader}>
        <Typography style={{ fontWeight: "500", fontSize: "1.2em" }}>
          Online Friends (dummy)
        </Typography>
      </AccordionSummary>
      <AccordionDetails style={{ height: "80vh" }}>
        <Rightbar />
      </AccordionDetails>
    </Accordion>
  );
}
