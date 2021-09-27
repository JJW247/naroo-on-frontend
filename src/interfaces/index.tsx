export interface IResourceContent {
  content: string;
}

export interface IResources {
  type: string;
  content_id: string;
  content: string;
}

export interface IStudentEditInAdmin {
  id: string;
  email: string;
  nickname: string;
  phone: string;
}

export interface ILectureInList {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  teacher_nickname: string;
  status: string | null;
  expired: string | null;
  tags: ITags[] | [] | null;
}

export interface ILectureInListAdmin {
  student_id: string;
  lecture_id: string;
  title: string;
  thumbnail: string;
  teacher_nickname: string;
  status: string | null;
  expired: string | null;
}

export interface ITags {
  id: string;
  name: string;
}

export interface ILectureDetail {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  teacher_nickname: string;
  status: string | null;
  expired: string | null;
  videos:
    | {
        id: string;
      }[]
    | []
    | null;
  notices: INoticesInLecture[];
  tags: ITags[] | [] | null;
  users: string;
}

export interface ILectureVideoDetail {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  teacher_nickname: string;
  status: string | null;
  expired: string | null;
  videos:
    | {
        id: string;
        title: string;
        url: string;
      }[]
    | []
    | null;
  tags: ITags[] | [] | null;
  users: string;
}

export interface INoticesInLecture {
  id: string;
  created_at: string;
  creator_nickname: string;
  title: string;
  description: string;
}
