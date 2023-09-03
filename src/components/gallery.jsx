import { Image } from "./image";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export const Gallery = (props) => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Trending</h2>
          <p>News around the world</p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {props.data
              ? props.data.map((d, i) => (
                  <div
                    key={`${d.title}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                    style={{ padding: "10px" }}
                  >
                    <a href={d.link} target="_blank">
                      <Card
                        sx={{ maxWidth: 350, height: 360 }}
                        className="Cards"
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="210"
                            image={d.image}
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {d.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {d.text}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>{" "}
                    </a>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
