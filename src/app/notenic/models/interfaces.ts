
export interface UploadImages {
  imageUrls: string[];
}

export interface DeleteImage {
  success: true;
}

export interface CreateNote {
  title: string;
  markdown: string;
  image: string;
  public: boolean;
}
