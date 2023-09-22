import instance from "services/api";

class ImageService {
  
  uploadImage(image) {
    const data = new FormData();
    data.append("image", image);
    return instance.post(`/common/v1/image`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

const imageService = new ImageService();

export default imageService;