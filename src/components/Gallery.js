import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto.format&dpr=2 2x`,
  };
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
];

export const Gallery = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [itemDataState, setItemDataState] = useState(itemData);

  const toggleSelect = (img) => {
    if (selectedItems.includes(img)) {
      setSelectedItems(selectedItems.filter((item) => item !== img));
    } else {
      setSelectedItems([...selectedItems, img]);
    }
  };

  const handleDelete = () => {
    const remainingItems = itemDataState.filter(
      (item) => !selectedItems.includes(item.img)
    );
    setItemDataState(remainingItems);
    setSelectedItems([]);
  };

  const moveImage = (draggedImg, targetImg) => {
    const draggedIndex = itemDataState.findIndex((item) => item.img === draggedImg);
    const targetIndex = itemDataState.findIndex((item) => item.img === targetImg);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const updatedItemData = [...itemDataState];
      [updatedItemData[draggedIndex], updatedItemData[targetIndex]] = [
        updatedItemData[targetIndex],
        updatedItemData[draggedIndex],
      ];
      setItemDataState(updatedItemData);
    }
  };

  const handleDragStart = (e, img) => {
    e.dataTransfer.setData("text/plain", img);
    setDraggedItem(img);
  };

  const handleDragOver = (e, img) => {
    e.preventDefault();
    if (draggedItem === img) return;
    setHoveredItem(img);
  };

  const handleDragLeave = (img) => {
    setHoveredItem(null);
  };

  const handleDrop = (e, img) => {
    e.preventDefault();
    if (draggedItem === img) return;
    moveImage(draggedItem, img);
    setDraggedItem(null);
    setHoveredItem(null);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      p={2}
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Grid item xs={8} sm={8} md={8} lg={8}>
        <Box
          sx={{
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
            p: 2,
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {selectedItems.length > 0 ? (
              <>
                <Typography variant="body1" pr={2} fontWeight="bold">
                  <Checkbox
                    checked={selectedItems.length === itemDataState.length}
                    onChange={() => {
                      if (selectedItems.length === itemDataState.length) {
                        setSelectedItems([]);
                      } else {
                        setSelectedItems(itemDataState.map((item) => item.img));
                      }
                    }}
                  />{" "}
                  {selectedItems.length} File Selected
                </Typography>
                <Button variant="text" color="warning" onClick={handleDelete}>
                  Delete File
                </Button>
              </>
            ) : (
              <Typography variant="h5" pb={2}>
                Gallery
              </Typography>
            )}
          </Box>

          <Divider />

          <Box
            sx={{
              p: 2,
            }}
          >
            <ImageList variant="quilted" cols={5} rowHeight={121}>
              {itemDataState.map((item) => (
                <ImageListItem
                  key={item.img}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                  sx={{ overflow: "hidden", borderRadius: "10px" }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.img)}
                  onDragOver={(e) => handleDragOver(e, item.img)}
                  onDragLeave={() => handleDragLeave(item.img)}
                  onDrop={(e) => handleDrop(e, item.img)}
                >
                  <div
                    style={{
                      position: "relative",
                      transition: "transform 0.5s ease-in-out",
                    }}
                    onMouseEnter={() => setHoveredItem(item.img)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {(hoveredItem === item.img ||
                      selectedItems.includes(item.img)) && (
                      <Checkbox
                        checked={selectedItems.includes(item.img)}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          zIndex: 2,
                          display: "block",
                          color: "white",
                        }}
                        onChange={() => toggleSelect(item.img)}
                      />
                    )}
                    <img
                      {...srcset(item.img, 121, item.rows, item.cols)}
                      alt={item.title}
                      style={{
                        transition: "all linear 0.3s",
                        transform:
                          hoveredItem === item.img ||
                          selectedItems.includes(item.img)
                            ? "scale(1.1)"
                            : "scale(1)",
                        rotate:
                          hoveredItem === item.img ||
                          selectedItems.includes(item.img)
                            ? "3deg"
                            : "0deg",
                        borderRadius:
                          hoveredItem === item.img ||
                          selectedItems.includes(item.img)
                            ? "10px"
                            : "0px",
                        width: "100%",
                      }}
                    />
                    {hoveredItem === item.img && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: "rgba(0, 0, 0, 0.5)",
                          zIndex: 1,
                        }}
                      />
                    )}
                  </div>
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Gallery;
