import {
    Text,
    SimpleGrid,
    ActionIcon,
    Image,
    Badge,
    Box,
    Skeleton,
  } from "@mantine/core";
  import { IconUpload, IconX } from "@tabler/icons-react";
  import { useUploadImageMutation } from "api/hooks/image-hook";
  import { useEffect, useRef, useState } from "react";
  
  function DropZone({
    onAllUploaded,
    isUploading,
    setIsUploading,
    setMainImageIndex,
    isMultiple
  }) {
    const [files, setFiles] = useState([]);
    const [mainImage, setMainImage] = useState(0);
    const [uploadedFiles, setUploadedFiles] = useState([]);
  
    const inputRef = useRef(null);
  
    const uploadMutation = useUploadImageMutation();
  
    const handleDropEvent = () => {
      if (!isUploading) setIsUploading(true);
  
      let selectedFiles = Array.from(inputRef.current?.files || []);
  
      if(isMultiple) {
        selectedFiles = selectedFiles.filter(
            (file) => !files.map((f) => f.name).includes(file.name)
        );
    
        files.push(...selectedFiles);
        setFiles([...files]);
        return;
      }
      setFiles(selectedFiles)
    };
  
    useEffect(() => {
      if (uploadedFiles.length === files.length) {
        setIsUploading(false);
        onAllUploaded(uploadedFiles);
        return;
      }
      if (!isUploading) setIsUploading(true);
    }, [uploadedFiles]);
  
    useEffect(() => {
      let allUploaded = true;
      for (let i = 0; i < files.length; ++i) {
        const file = files[i];
        if (!file.uploaded) {
          allUploaded = false;
          uploadMutation.mutateAsync(file).then((data) => {
            if (data.data.success) {
              const updatedFiles = files;
              updatedFiles[i].uploaded = true;
              updatedFiles[i].url = data.data.image.name;
              updatedFiles[i].id = data.data.image.id;
              setFiles(updatedFiles);
  
              const uploadedFiles = updatedFiles.filter((v) => v.uploaded);
              setUploadedFiles(uploadedFiles);
            }
          });
        }
      }
      if (allUploaded) setIsUploading(false);
    }, [files]);
  
    const handleDeleteUploaded = (name) => {
      setUploadedFiles(uploadedFiles.filter((file) => file.name !== name));
    };
  
    const previews = files.map((file, index) => {
      const imageUrl = URL.createObjectURL(file);
      return (
        <div
          style={{
            transition: "transform 500ms ease",
            position: "relative",
            // borderRadius: "1rem",
            cursor: "pointer",
          }}
        >
          {/* <LoadingOverlay
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
              backgroundColor: "transparent",
              borderRadius: "1rem",
            }}
            overlayOpacity={0}
            overlayBlur={file.uploaded ? 0 : 5}
            visible={!file.uploaded}
          /> */}
  
          {file.uploaded ? (
            <>
              <Image
                width={150}
                height={150}
                src={imageUrl}
                radius={"0.5rem"}
                onClick={() => {
                  if (setMainImageIndex) {
                    setMainImageIndex(index);
                  }
                  setMainImage(index);
                }}
              />
              <ActionIcon
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  borderRadius: "1rem",
                }}
                color="red"
                onClick={() => {
                  const filesList = files.filter((_, i) => i !== index);
                  setFiles(filesList);
                  handleDeleteUploaded(file.name);
                }}
              >
                <IconX />
              </ActionIcon>
              {index === mainImage && (
                <Box
                  sx={{
                    position: "absolute",
                    left: 5,
                    top: 5,
                  }}
                >
                  <Badge color="red">main</Badge>
                </Box>
              )}
            </>
          ) : (
            <Skeleton visible={!file.uploaded} width={150} height={150} />
          )}
        </div>
      );
    });
  
    return (
      <div style={{ cursor: !files.length ? "pointer" : "auto" }}>
        <input
          type={"file"}
          style={{ display: "none" }}
          multiple={isMultiple}
          onChange={handleDropEvent}
          ref={inputRef}
        />
        <div
          onClick={() => (!files.length ? inputRef.current?.click() : null)}
          style={{
            backgroundColor: "#61",
            borderRadius: "0.5rem",
            height: "auto",
            paddingBlock: "3rem",
            border: "dashed",
            display: "grid",
            placeItems: "center",
            borderColor: "gray",
          }}
        >
          {files.length ? (
            <SimpleGrid
              cols={4}
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
              mt={previews.length > 0 ? "xl" : 0}
            >
              {previews}
              <div
                style={{ cursor: "pointer" }}
                onClick={() => inputRef.current?.click()}
              >
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "0.5rem",
                    position: "relative",
                    display: "grid",
                    placeItems: "center",
                    border: "dashed",
                    borderColor: "gray",
                  }}
                >
                  <IconUpload size="3.2rem" stroke={1.5} />
                </div>
              </div>
            </SimpleGrid>
          ) : (
            <div style={{ display: "flex", gap: "1rem" }}>
              <IconUpload size="3.2rem" stroke={1.5} />
  
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default DropZone;