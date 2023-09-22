import {
    useMutation,
  } from "react-query";
  import imageService from "api/services/image-service";
  
  const useUploadImageMutation = () => {
    return useMutation({
      mutationFn: (image) => imageService.uploadImage(image),
      onSuccess: ()=>{}
    });
  };
  
  
  export {
    useUploadImageMutation,
  };